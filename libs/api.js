/*
Copyright 2021 JAMPS (jamps.pro)

Authors: Olaf Wasilewski (olaf.wasilewski@gmx.de)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction,
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var redis = require('redis');
var async = require('async');
var filterIterate = require('./filterIterate.js');
var stats = require('./stats.js');
const functions = require('./functions.js');
const loggerFactory = require('./logger.js');
const logger = loggerFactory.getLogger('Api', 'system');
module.exports = function (portalConfig, poolConfigs) {
	var _this = this;
	var portalStats = this.stats = new stats(portalConfig, poolConfigs);
	this.liveStatConnections = {};
	this.handleApiRequest = function (req, res, next) {
		switch (req.params.method) {
			case 'stats':
				res.header('Content-Type', 'application/json');
				res.end(portalStats.statsString);
				return;
			case 'payments':
				var poolBlocks = [];
				for (var pool in portalStats.stats.pools) {
					poolBlocks.push({ name: pool, pending: portalStats.stats.pools[pool].pending, payments: portalStats.stats.pools[pool].payments });
				}
				res.header('Content-Type', 'application/json');
				res.end(JSON.stringify(poolBlocks));
				return;
			case 'worker_stats':
				res.header('Content-Type', 'application/json');
				if (req.url.indexOf("?") > 0) {
					var url_parms = req.url.split("?");
					if (url_parms.length > 0) {
						var history = {};
						var workers = {};
						var address = url_parms[1] || null;
						if (address != null && address.length > 0) {
							address = address.split(".")[0];
							portalStats.getBalanceByAddress(address, function (balances) {
								portalStats.getTotalSharesByAddress(address, function (shares) {
									var totalHash = parseFloat(0.0);
									var totalHeld = parseFloat(0.0);
									var totalShares = shares;
									var networkSols = 0;
									var networkDiff = 0;
									for (var h in portalStats.statHistory) {
										for (var pool in portalStats.statHistory[h].pools) {
											for (var w in portalStats.statHistory[h].pools[pool].workers) {
												if (w.startsWith(address)) {
													if (history[w] == null) {
														history[w] = [];
													}
													if (portalStats.statHistory[h].pools[pool].workers[w].hashrate) {
														history[w].push({
															time: portalStats.statHistory[h].time,
															hashrate: portalStats.statHistory[h].pools[pool].workers[w].hashrate
														});
													}
												}
											}
										}
									}
									for (var pool in portalStats.stats.pools) {
										for (var w in portalStats.stats.pools[pool].workers) {
											if (w.startsWith(address)) {
												workers[w] = portalStats.stats.pools[pool].workers[w];
												for (var b in balances.balances) {
													if (w == balances.balances[b].worker) {
														workers[w].paid = balances.balances[b].paid;
														workers[w].balance = balances.balances[b].balance;
														workers[w].immature = balances.balances[b].immature;
													}
												}
												workers[w].balance = (workers[w].balance || 0);
												workers[w].immature = (workers[w].immature || 0);
												workers[w].paid = (workers[w].paid || 0);
												totalHash += portalStats.stats.pools[pool].workers[w].hashrate;
												networkSols = portalStats.stats.pools[pool].poolStats.networkSols;
												networkDiff = portalStats.stats.pools[pool].poolStats.networkDiff;
											}
										}
									}
									res.end(JSON.stringify({
										miner: address,
										totalHash: totalHash,
										totalShares: totalShares,
										networkSols: networkSols,
										networkDiff: networkDiff,
										immature: (balances.totalImmature * 100000000),
										balance: balances.totalHeld,
										paid: balances.totalPaid,
										workers: workers,
										history: history
									}));
								});
							});
						} else {
							res.end(JSON.stringify({
								result: "error"
							}));
						}
					} else {
						res.end(JSON.stringify({
							result: "error"
						}));
					}
				} else {
					res.end(JSON.stringify({
						result: "error"
					}));
				}
				return;
			case 'pool_fees':
				res.header('Content-Type', 'application/json');
				var o = { pools: [] };
				for (var pool in poolConfigs) {
					var ttotal = 0.0;
					var rewardRecipients = portalStats.stats.pools[pool].rewardRecipients || {};
					for (var r in rewardRecipients) {
						ttotal += rewardRecipients[r];
					}
					var intSec = poolConfigs[pool].paymentProcessing.paymentInterval || 0;
					var intMinPymt = poolConfigs[pool].paymentProcessing.minimumPayment || 0;
					var strSchema = poolConfigs[pool].paymentProcessing.schema || "PROP";
					tmpStr = functions.secToDHMSStr(intSec);
					o.pools.push({ "coin": pool, "fee": ttotal, "payoutscheme": strSchema, "interval": intSec, "intervalstr": tmpStr, "minimum": intMinPymt });
				}
				res.end(JSON.stringify(o));
				return;
			case 'pool_stats':
				res.header('Content-Type', 'application/json');
				res.end(JSON.stringify(portalStats.statPoolHistory));
				return;
			case 'live_stats':
				res.writeHead(200, {
					'Content-Type': 'text/event-stream',
					'Cache-Control': 'no-cache',
					'Connection': 'keep-alive'
				});
				res.write('\n');
				var uid = Math.random().toString();
				_this.liveStatConnections[uid] = res;
				req.on("close", function () {
					delete _this.liveStatConnections[uid];
				});
				return;
			default: next();
		}
	};
	Object.filter = (obj, predicate) =>
		Object.keys(obj)
			.filter(key => predicate(obj[key]))
			.reduce((res, key) => (res[key] = obj[key], res), {});
	this.handleAdminApiRequest = function (req, res, next) {
		switch (req.params.method) {
			case 'pools': {
				res.end(JSON.stringify({
					result: poolConfigs
				}));
				return;
			}
			default: next();
		}
	};
};
function readableSeconds(t) {
	var seconds = Math.round(t);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	hours = hours - (days * 24);
	minutes = minutes - (days * 24 * 60) - (hours * 60);
	seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
	if (days > 0) {
		return (days + "d " + hours + "h " + minutes + "m " + seconds + "s");
	}
	if (hours > 0) {
		return (hours + "h " + minutes + "m " + seconds + "s");
	}
	if (minutes > 0) {
		return (minutes + "m " + seconds + "s");
	}
	return (seconds + "s");
}
