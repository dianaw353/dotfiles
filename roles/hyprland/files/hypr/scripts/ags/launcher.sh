#!/bin/bash
pgrep agsv1 > /dev/null
if [[ "$?" != "0" ]]; then
  agsv1 -t launcher
else
  ags toggle launcher
fi
