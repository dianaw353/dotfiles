#!/bin/bash

# Check if ags is running
if pgrep -x "ags" > /dev/null; then
    # If ags is running, kill it and start agsv1
    echo "Stopping ags and starting agsv1..."
    ags quit -i js
    agsv1 run &
elif pgrep -x "agsv1" > /dev/null; then
    # If agsv1 is running, kill it and start ags
    echo "Stopping agsv1 and starting ags..."
    agsv1 -q
    ags run -d ~/.config/agsv2 &
else
    # If neither are running, start ags
    echo "Neither ags nor agsv1 are running. Starting ags..."
    #ags run -d ~/.config/agsv2 &
fi

