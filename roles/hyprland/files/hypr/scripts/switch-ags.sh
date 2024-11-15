#!/bin/bash
pgrep ags > /dev/null
if [[ "$?" != "0" ]]; then
  agsv1 -q; ags run ~/.config/agsv2/config.js
else
  ags quit; agsv1
fi
