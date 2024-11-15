#!/bin/bash
pgrep ags > /dev/null
if [[ "$?" != "0" ]]; then
  agsv1 -q; agsv1
else
  ags quit; ags run ~/.config/agsv2/config.js
fi
