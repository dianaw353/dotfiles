#!/bin/bash
pgrep ags > /dev/null
if [[ "$?" != "0" ]]; then
  agsv1 -t overview
else
  ags toggle overview
fi