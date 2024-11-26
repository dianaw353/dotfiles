#!/bin/bash
if pgrep -x "agsv1" > /dev/null; then
  agsv1 -q; agsv1
elif pgrep -x "ags" > /dev/null; then
  ags quit -i js; ags run -d ~/.config/agsv2
else
  agsv1
fi
