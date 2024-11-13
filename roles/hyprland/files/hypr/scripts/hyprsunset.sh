#!/bin/bash

if `pgrep hyprsunset > /dev/null`; then
    killall hyprsunset
else
    hyprsunset -t 4000 &
fi
