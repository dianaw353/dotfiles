#!/bin/bash
pgrep hyprsunset > /dev/null && killall hyprsunset || hyprsunset -t 4000 &
