Cyber Pool AITTCOIN Stratum - v1.0.1 Special Edition
================

[![License](https://img.shields.io/badge/license-GPL--3.0-blue)](https://opensource.org/licenses/GPL-3.0)

Highly Efficient mining pool for AITTCOIN!

-------
### Screenshots
http://aittcoinpool.ath.cx/

![ScreenShot](https://github.com/mardock2009/AITTCOIN-Pool/blob/master/pool.jpg?raw=true)
-------
### Node Open Mining Portal consists of 3 main modules:
| Project                     |
| --------------------------  |
| [JAMPS AITTCOIN Pool]      |
| [Cyber Pool RVN  Stratum]   |
| [JAMPS AITTCOIN Hashing]   |

-------
### Requirements
***NOTE:*** _These requirements will be installed in the install section!_<br />
* Ubuntu Server 18.04.* LTS
* Coin daemon
* Node Version Manager
* Node 10.24.1
* Process Manager 2 / pm2
* Redis Server
* ntp

-------

### Install AITTCOIN Daemon


### Install Pool

    sudo apt install git -y
    cd ~
    git config --global http.https://gopkg.in.followRedirects true
    git clone https://github.com/mardock2009/AITTCOIN-Pool.git
    cd AITTCOIN-Pool/
    chmod 777 install.sh
    ./install.sh

-------
### Configure Pool

Change "stratumHost": "rvn.jamps.pro", to your IP or DNS in file config.json:

    cd ~/AITTCOIN-Pool
    nano config.json

```javascript
{
    "poolname": "Ravncoin Pool",
    "devmode": false,
    "devmodePayMinimim": 0.25,
    "devmodePayInterval": 120,
    "logips": true,       
    "anonymizeips": true,
    "ipv4bits": 16,
    "ipv6bits": 16,
    "defaultCoin": "AITTCOIN",
    "poollogo": "/website/static/img/poollogo.png",
    "discord": "Join our #mining channel on Discord: ",
    "discordlink": "https://aittcoin.org/about",
    "pagetitle": "AITTCOIN Pool - 0.5 % Fees Promo - Run By Professionals",
    "pageauthor": "JAMPS",
    "pagedesc": "A reliable, low fee, easy to use mining pool for AITTCOIN! Get started mining today!",
    "pagekeywds": "GPU,CPU,Hash,Hashrate,Cryptocurrency,Crypto,Mining,Pool,AITTCOIN,Easy,Simple,How,To",
    "btcdonations": "1GXEm97T5iXAeYHBj2GuL3TKKRpkNas4Qt",
    "ltcdonations": "LWBZWLmjqeQFnMqS9NctcdSx3TEYHyzfGz",
    "rvndonations": "RNs3ne88DoNEnXFTqUrj6zrYejeQpcj4jk",
    "logger" : {
        "level" : "debug",
        "file" : "/home/pool/AITTCOIN-Pool/logs/AITTCOIN_debug.log"
    },
    "cliHost": "127.0.0.1",
    "cliPort": 17117,
    "clustering": {
        "enabled": false,
        "forks": "auto"
    },
    "defaultPoolConfigs": {
        "blockRefreshInterval": 400,
        "jobRebroadcastTimeout": 25,
        "connectionTimeout": 600,
        "emitInvalidBlockHashes": false,
        "validateWorkerUsername": true,
        "tcpProxyProtocol": false,
        "banning": {
            "enabled": true,
            "time": 600,
            "invalidPercent": 50,
            "checkThreshold": 500,
            "purgeInterval": 300
        },
        "redis": {
            "host": "127.0.0.1",
            "port": 6379
        }
    },
    "website": {
        "enabled": true,
        "sslenabled": false,
        "sslforced": false,
        "host": "0.0.0.0",
        "port": 80,
        "sslport": 443,
        "sslkey": "/home/pool/AITTCOIN-Pool/certs/privkey.pem",
        "sslcert": "/home/pool/AITTCOIN-Pool/certs/fullchain.pem",
        "stratumHost": "rvn.jamps.pro",
        "stats": {
            "updateInterval": 900,
            "historicalRetention": 43200,
            "hashrateWindow": 900
        }
    },
    "redis": {
        "host": "127.0.0.1",
        "port": 6379
    }
}

```

Change "address": "RNs3ne88DoNEnXFTqUrj6zrYejeQpcj4jk", to your pool created wallet address in file AITTCOIN.json:

    cd ~/AITTCOIN-Pool/pools
    nano AITTCOIN.json

```javascript
{
    "enabled": true,
    "coin": "AITTCOIN.json",
    "address": "RNs3ne88DoNEnXFTqUrj6zrYejeQpcj4jk",
    "donateaddress": "RNs3ne88DoNEnXFTqUrj6zrYejeQpcj4jk",
    "rewardRecipients": {
        "RNs3ne88DoNEnXFTqUrj6zrYejeQpcj4jk": 0.5
    },
    "paymentProcessing": {
        "enabled": true,
        "schema": "PROP",
        "paymentInterval": 300,
        "minimumPayment": 1,
        "maxBlocksPerPayment": 1,
        "minConf": 30,
        "coinPrecision": 8,
        "daemon": {
            "host": "127.0.0.1",
            "port": 8766,
            "user": "user1",
            "password": "pass1"
        }
    },
    "ports": {
	"10008": {
            "diff": 0.05,
    	    "varDiff": {
    	        "minDiff": 0.025,
    	        "maxDiff": 1024,
    	        "targetTime": 10,
    	        "retargetTime": 60,
    	        "variancePercent": 30,
    		"maxJump": 25
    	    }
        },
        "10016": {
	    "diff": 0.10,
            "varDiff": {
                "minDiff": 0.05,
                "maxDiff": 1024,
    	        "targetTime": 10,
    	        "retargetTime": 60,
    	        "variancePercent": 30,
		"maxJump": 25
            }
        },
        "10032": {
	    "diff": 0.20,
            "varDiff": {
    		"minDiff": 0.10,
    		"maxDiff": 1024,
    	        "targetTime": 10,
    	        "retargetTime": 60,
    	        "variancePercent": 30,
    		"maxJump": 50
    	    }
        },
	"10256": {
	    "diff": 1024000000,
            "varDiff": {
                "minDiff": 1024000000,
                "maxDiff": 20480000000,
    	        "targetTime": 10,
    	        "retargetTime": 60,
    	        "variancePercent": 30,
		"maxJump": 25
            }
        }
    },
    "daemons": [
        {
            "host": "127.0.0.1",
            "port": 8766,
            "user": "user1",
            "password": "pass1"
        }
    ],
    "p2p": {
        "enabled": false,
        "host": "127.0.0.1",
        "port": 8767,
        "disableTransactions": true
    },
    "mposMode": {
        "enabled": false,
        "host": "127.0.0.1",
        "port": 3306,
        "user": "me",
        "password": "mypass",
        "database": "rvn",
        "checkPassword": true,
        "autoCreateWorker": false
    }
}

```

### Run Pool
    
    cd ~/AITTCOIN-Pool
    chmod 777 pool-logs-watch.sh pool-reset-stats.sh pool-restart.sh pool-start.sh pool-stop.sh
    sudo bash pool-start.sh


-------

## License
```
Licensed under the GPL-3.0
Copyright (c) 2021 mardock2009 / JAMPS
```
