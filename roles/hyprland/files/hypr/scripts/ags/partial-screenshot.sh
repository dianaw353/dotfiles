#!/bin/bash
pgrep agsv1 > /dev/null
if [[ "$?" != "0" ]]; then
  agsv1 -r 'recorder.screenshot()'
else
  ags request 'recorder.screenshot.partial'
fi
