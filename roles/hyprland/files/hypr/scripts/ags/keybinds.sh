#!/bin/bash
pgrep agsv1 > /dev/null
if [[ "$?" != "0" ]]; then
  agsv1 -t keybinds
else
  ags toggle keybinds
fi
