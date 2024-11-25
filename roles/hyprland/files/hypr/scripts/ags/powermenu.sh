#!/bin/bash
if pgrep -x "agsv1" > /dev/null; then
  agsv1 -t powermenu
else
  ags toggle powermenu
fi
