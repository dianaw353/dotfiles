#!/bin/bash
pgrep ags > /dev/null
if [[ "$?" != "0" ]]; then
  agsv1 -t powermenu
else
  ags toggle powermenu
fi
