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

function calculateExpMovingAvg(mArray, mRange) {
	var k = 2/ (mRange + 1);
	emaArray = [[mArray[0][0], mArray[0][1]]];
	for (var i = 1; i < mArray.length; i++) {
		var height = mArray[i][1] * k + emaArray[i - 1][1] * (1 - k);
		emaArray.push([mArray[i][0], height]);
	}
	return emaArray;
}
function capFirst(s) {
	return s.charAt(0).toUpperCase() + s.slice(1);
}
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
function generateName() {
	var name1 = ['raging', 'mad', 'hashing', 'cool', 'rich', 'honorable', 'king', 'fast', 'killer', 'sweet'];
	var name2 = ['cromulon', 'computer', 'hasher', 'PC', 'rig', 'miner', 'otter', 'cronenberg', 'gazorpazorp'];
	var name = name1[Math.floor(Math.random() * name1.length)].toLowerCase() + name2[Math.floor(Math.random() * name2.length)].toLowerCase();
	return name;
}
function getRandomColor() {
	var letters = '0123456789ABCDEF'.split('');
	var color = '#';
	for (var i = 0; i < 6; i++ ) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}
function getRandomPastelColor() {
	var r = (Math.round(Math.random() * 127) + 127).toString(16);
	var g = (Math.round(Math.random() * 127) + 127).toString(16);
	var b = (Math.round(Math.random() * 127) + 127).toString(16);
	return '#' + r + g + b;
}
function addChartData(chart, dataset, data, update) {
	dataset.data.shift();
	dataset.data.push(data);
	if(update) {
		chart.update();
	}
}
this.getReadableHashrate = function(hashrate) {
	hashrate = (hashrate * 1000000);
	if(hashrate < 1000000) {
		hashrate = hashrate * 100000;
	}
	var i = Math.max(0, Math.floor((Math.log(hashrate / 1000) / Math.log(1000)) - 1));
	hashrate = (hashrate / 1000) / Math.pow(1000, i + 1);
	return hashrate.toFixed(2);
};
this.getScaledHashrate = function(hashrate, i) {
	hashrate = (hashrate * 1000000);
	if(hashrate < 1000000) {
		hashrate = hashrate * 100000;
	}
	hashrate = (hashrate / 1000) / Math.pow(1000, i + 1);
	return hashrate.toFixed(2);
};
this.getReadableHashrateString = function(hashrate) {
	hashrate = (hashrate * 1000000);
	if(hashrate < 1000000) {
		hashrate = hashrate * 100000;
	}
	var byteUnits = [' H/s', ' KH/s', ' MH/s', ' GH/s', ' TH/s', ' PH/s'];
	var i = Math.max(0, Math.floor((Math.log(hashrate / 1000) / Math.log(1000)) - 1));
	hashrate = (hashrate / 1000) / Math.pow(1000, i + 1);
	return hashrate.toFixed(2) + ' ' + byteUnits[i];
};
this.getReadableHashratePair = function(hashrate) {
	hashrate = (hashrate * 1000000);
	if(hashrate < 1000000) {
		hashrate = hashrate * 100000;
	}
	var byteUnits = [' H/s', ' KH/s', ' MH/s', ' GH/s', ' TH/s', ' PH/s'];
	var i = Math.max(0, Math.floor((Math.log(hashrate / 1000) / Math.log(1000)) - 1));
	hashrate = (hashrate/1000) / Math.pow(1000, i + 1);
	return [hashrate.toFixed(2), byteUnits[i], i];
};
this.getReadableNetworkDiff = function(networkDiff) {
	networkDiff = (networkDiff * 1000000);
	if(networkDiff < 1000000) {
		networkDiff = networkDiff * 100000;
	}
	var i = Math.max(0, Math.floor((Math.log(networkDiff / 1000) / Math.log(1000)) - 1));
	networkDiff = (networkDiff / 1000) / Math.pow(1000, i + 1);
	return networkDiff.toFixed(2);
};
this.getScaledNetworkDiff = function(networkDiff) {
	networkDiff = (networkDiff * 1000000);
	if(networkDiff < 1000000) {
		networkDiff = networkDiff * 100000;
	}
	networkDiff = (networkDiff / 1000) / Math.pow(1000, i + 1);
	return networkDiff.toFixed(2);
};
this.getReadableNetworkDiffString = function(networkDiff) {
	networkDiff = (networkDiff * 1000000);
	if(networkDiff < 1000000) {
		networkDiff = networkDiff * 100000;
	}
	var byteUnits = [' H/s', ' KH/s', ' MH/s', ' GH/s', ' TH/s', ' PH/s'];
	var i = Math.max(0, Math.floor((Math.log(networkDiff / 1000) / Math.log(1000)) - 1));
	networkDiff = (networkDiff / 1000) / Math.pow(1000, i + 1);
	return networkDiff.toFixed(2) + byteUnits[i];
};
this.getReadableNetworkDiffPair = function(networkDiff) {
	networkDiff = (networkDiff * 1000000);
	if(networkDiff < 1000000) {
		networkDiff = networkDiff * 100000;
	}
	var byteUnits = [' H/s', ' KH/s', ' MH/s', ' GH/s', ' TH/s', ' PH/s'];
	var i = Math.max(0, Math.floor((Math.log(networkDiff / 1000) / Math.log(1000)) - 1));
	networkDiff = (networkDiff / 1000) / Math.pow(1000, i + 1);
	return [networkDiff.toFixed(2), byteUnits[i], i];
};
this.getReadableNetworkHash = function(networkHash) {
	networkHash = (networkHash * 1000000);
	if(networkHash < 1000000) {
		networkHash = networkHash * 100000;
	}
	var i = Math.max(0, Math.floor((Math.log(networkHash / 1000) / Math.log(1000)) - 1));
	networkHash = (networkHash / 1000) / Math.pow(1000, i + 1);
	return networkHash.toFixed(2);
};
this.getScaledNetworkHash = function(networkHash) {
	networkHash = (networkHash * 1000000);
	if(networkHash < 1000000) {
		networkHash = networkHash * 100000;
	}
	networkHash = (networkHash / 1000) / Math.pow(1000, i + 1);
	return networkHash.toFixed(2);
};
this.getReadableNetworkHashString = function(networkHash) {
	networkHash = (networkHash * 1000000);
	if(networkHash < 1000000) {
		networkHash = networkHash * 100000;
	}
	var byteUnits = [' H/s', ' KH/s', ' MH/s', ' GH/s', ' TH/s', ' PH/s'];
	var i = Math.max(0, Math.floor((Math.log(networkHash / 1000) / Math.log(1000)) - 1));
	networkHash = (networkHash / 1000) / Math.pow(1000, i + 1);
	return networkHash.toFixed(2) + byteUnits[i];
};
this.getReadableNetworkHashPair = function(networkHash) {
	networkHash = (networkHash * 1000000);
	if(networkHash < 1000000) {
		networkHash = networkHash * 100000;
	}
	var byteUnits = [' H/s', ' KH/s', ' MH/s', ' GH/s', ' TH/s', ' PH/s'];
	var i = Math.max(0, Math.floor((Math.log(networkHash / 1000) / Math.log(1000)) - 1));
	networkHash = (networkHash / 1000) / Math.pow(1000, i + 1);
	return [networkHash.toFixed(2), byteUnits[i], i];
};
function createDefaultLineChart(ctx, datasets, xLabel, yLabel) {
	return createLineChart(ctx, datasets, xLabel, yLabel, { beginAtZero: true });
}
function createLineChart(ctx, datasets, xLabel, yLabel, ticks) {
	// console.log(datasets[0].data)
	dataArray =datasets[0].data
	let uniqueDataArray = dataArray.reduce((accumulator, current) => {
		if (!accumulator.find(item => item.t === current.t)) {
		  accumulator.push(current);
		}
		return accumulator;
	  }, []);
	  uniqueDataArray.sort((a, b) => a.t - b.t);
	console.log(uniqueDataArray);
	return new Chart(ctx, {
		type: 'line',
		
		data: {
			datasets:  [{
				label: datasets[0].label,
				data: uniqueDataArray,
				fill: true,
				borderWidth: 2,
				backgroundColor: 'rgba(101,157,189,0.3)',
				borderColor: '#659dd6',
				tension: 0.1
			}]
		},
		options: {
			spanGaps: true,
			animation: {
				easing: 'easeInExpo',
				duration: 500,
				xAxis: true,
				yAxis: true,
			},
			responsive: true,
			maintainAspectRatio: false,
			elements: {
				point: { radius: 3 }
			},
			legend: {
				display: true,
				position: 'bottom',
			},
			scales: {
				xAxes: [{
					gridLines : {
						display : false,
					},
					type: 'time',
					time: {
						unit: 'hour'
					},
					display: true
				}],
				yAxes: [{
					ticks: ticks,
					display: false,
					gridLines : {
						display : false,
					},
					scaleLabel: {
						display: false,
						labelString: yLabel
					}
				}]
			}
		}
	});
}
