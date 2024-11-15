#!/bin/bash
pgrep ags > /dev/null
if [[ "$?" != "0" ]]; then
  agsv1 -t keybinds
else
  ags toggle keybinds
fi
