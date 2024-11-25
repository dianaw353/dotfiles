#!/bin/bash
if pgrep -x "agsv1" > /dev/null; then
  agsv1 -t overview
else
  ags toggle overview
fi
