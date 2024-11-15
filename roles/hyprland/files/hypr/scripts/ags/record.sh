#!/bin/bash
pgrep ags > /dev/null
if [[ "$?" != "0" ]]; then
  agsv1 -r 'recorder.start'
else
  ags request 'recorder.start'
fi
