#!/bin/bash
pgrep ags > /dev/null
if [[ "$?" != "0" ]]; then
  agsv1 -r 'recorder.screenshot(true)'
else
  ags request 'recorder.screenshot.full'
fi
