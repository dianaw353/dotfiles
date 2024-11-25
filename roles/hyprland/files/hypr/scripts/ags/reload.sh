#!/bin/bash
if pgrep -x "agsv1" > /dev/null; then
  agsv1 -q; agsv1
else
  ags quit; ags run ~/.config/agsv2/config.js
fi
