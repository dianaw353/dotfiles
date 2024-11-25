#!/bin/bash
if pgrep -x "agsv1" > /dev/null; then
  agsv1 -t keybinds
else
  ags toggle keybinds
fi
