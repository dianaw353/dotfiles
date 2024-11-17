#!/bin/bash
pgrep agsv1 > /dev/null
if [[ "$?" != "0" ]]; then
  agsv1 -r 'recorder.start'
else
  ags request 'recorder.start'
fi
