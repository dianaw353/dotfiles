#!/bin/bash

# Function to check if there is a fullscreen window with fullscreen: 2
check_fullscreen() {
    hyprctl clients | grep 'fullscreen: 2' > /dev/null
}

# Track previous fullscreen status
status_file="/tmp/hypr_status"

# Initialize status file if it doesn't exist
if [[ ! -f $status_file ]]; then
    echo "no" > $status_file
fi

previous_status=$(cat $status_file)

# Check current fullscreen status
if check_fullscreen; then
    current_status="yes"
else
    current_status="no"
fi

# Debugging output
echo "Previous status: $previous_status"
echo "Current status: $current_status"

# If fullscreen status changed from yes to no, restart hypridle
if [[ "$previous_status" == "yes" && "$current_status" == "no" ]]; then
    echo "Fullscreen status changed: Restarting hypridle..."
    killall hypridle
    hypridle &
fi

# Update status file with the current status
echo "$current_status" > $status_file

# Process the action based on the argument
case "$1" in
    "brightness")
        # Adjust screen brightness
        if check_fullscreen; then
            exit 0
        else
            brightnessctl -s set 10
        fi
        ;;
    "keyboard")
        # Turn off keyboard backlight
        if check_fullscreen; then
            exit 0
        else
            brightnessctl -sd rgb:kbd_backlight set 0
        fi
        ;;
    "lock")
        # Lock the session
        if check_fullscreen; then
            exit 0
        else
            loginctl lock-session
            playerctl --all-players pause
        fi
        ;;
    "dpms")
        # Turn off DPMS (Display Power Management Signaling)
        if check_fullscreen; then
            exit 0
        else
            hyprctl dispatch dpms off
        fi
        ;;
    "hibernate")
    # Trigger hibernate
    if check_fullscreen; then
        exit 0
    else
        systemctl hibernate
    fi
    ;;
esac
