#!/bin/bash
if pgrep -x "agsv1" > /dev/null; then
  agsv1 -r 'recorder.screenshot(true)'
else
  ags request 'recorder.screenshot.full'
fi
