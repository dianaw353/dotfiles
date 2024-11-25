#!/bin/bash
if pgrep -x "agsv1" > /dev/null; then
  agsv1 -r 'recorder.start'
else
  ags request 'recorder.start'
fi
