AITTCOIN Stratum - v1.0.1 Mining Pool
================

[![License](https://img.shields.io/badge/license-GPL--3.0-blue)](https://opensource.org/licenses/GPL-3.0)

Highly Efficient mining pool for AITTCOIN!

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
### Install


 	git clone https://github.com/AITTCOIN/MiningPool
 	cd MiningPool
  	
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
	
	export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
	[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
	
	nvm install 10.24.1
 	nvm use 10.24.1
  	npm install pm2 -g

#### !!!Please note that npm install is not required, please run directly!!!


### Run Pool
    
    cd ~/AITTCOIN-Pool
    chmod 777 pool-logs-watch.sh pool-reset-stats.sh pool-restart.sh pool-start.sh pool-stop.sh
    sudo bash pool-start.sh


### Configure Pool


```javascript
{
    "poolname": "AITTCOIN Pool",
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

Change "address": "AU5KFJNJ8AmmE3zcV6JBSwNjuGihtZ4QQ2", to your pool created wallet address in file AITTCOIN.json:

    cd ~/AITTCOIN-Pool/pools
    nano AITTCOIN.json

```javascript
{
    "enabled": true,
    "coin": "AITTCOIN.json",
    "address": "AU5KFJNJ8AmmE3zcV6JBSwNjuGihtZ4QQ2",
    "donateaddress": "AU5KFJNJ8AmmE3zcV6JBSwNjuGihtZ4QQ2",
    "rewardRecipients": {
        "AU5KFJNJ8AmmE3zcV6JBSwNjuGihtZ4QQ2": 0.5
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


-------

## License
```
Licensed under the GPL-3.0
Copyright (c) 2024 AITTCOIN
```
