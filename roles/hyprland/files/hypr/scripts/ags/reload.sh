#!/bin/bash
if pgrep -x "agsv1" > /dev/null; then
  agsv1 -q; agsv1
elif pgrep -x "ags" > /dev/null; then
  ags quit; ags run ~/.config/agsv2/config.js
else
  agsv1
fi
