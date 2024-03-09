#!/bin/bash

echo ""
echo "AITTCOIN Pool Stoping..."
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

pm2 stop pool

echo ""
echo "Ravencoin Pool Stopped!"
echo ""

exit 0
