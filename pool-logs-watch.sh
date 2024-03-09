#!/bin/bash

echo ""
echo "AITTCOIN Pool Start Watching Logs..."
echo ""

source ~/.bashrc
source /etc/os-release

## who am i? ##
SCRIPTNAME="$(readlink -f ${BASH_SOURCE[0]})"
BASEDIR="$(dirname $SCRIPTNAME)"

## Okay, print it ##
echo "Script name : $SCRIPTNAME"
echo "Current working dir : $PWD"
echo "Script location path (dir) : $BASEDIR"
echo ""

if [ "${1}" != "" ]; then
  watch -n1 -- "sudo tail -n1000 ~/.pm2/logs/pool-out.log | grep -i -a \"${1}\"" ;
else
  pm2 logs pool ;
fi

echo ""
echo "Starting Watch Logs!"
echo ""

exit 0
