#!/bin/bash
if pgrep -x "agsv1" > /dev/null; then
  agsv1 -t launcher
else
  ags toggle launcher
fi
