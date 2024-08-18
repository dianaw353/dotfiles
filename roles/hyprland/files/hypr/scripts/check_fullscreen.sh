#!/bin/bash

# Get the currently focused window's ID
focused_window=$(hyprctl clients | grep 'focused' | awk '{print $1}')

# Determine the script's action based on the calling context
case "$1" in
    "brightness")
        # Adjust screen brightness
        if hyprctl clients | grep "$focused_window" | grep -q 'fullscreen: 2'; then
            exit 0
        else
            brightnessctl -s set 10
        fi
        ;;
    "keyboard")
        # Turn off keyboard backlight
        if hyprctl clients | grep "$focused_window" | grep -q 'fullscreen: 2'; then
            exit 0
        else
            brightnessctl -sd rgb:kbd_backlight set 0
        fi
        ;;
    "lock")
        # Lock the session
        if hyprctl clients | grep "$focused_window" | grep -q 'fullscreen: 2'; then
            exit 0
        else
            loginctl lock-session
        fi
        ;;
esac
