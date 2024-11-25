#!/bin/bash
if pgrep -x "agsv1" > /dev/null; then
  agsv1 -r 'recorder.screenshot()'
else
  ags request 'recorder.screenshot.partial'
fi
