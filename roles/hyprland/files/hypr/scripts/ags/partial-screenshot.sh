#!/bin/bash
pgrep ags > /dev/null
if [[ "$?" != "0" ]]; then
  agsv1 -r 'recorder.screenshot()'
else
  ags request 'recorder.screenshot.partial'
fi
