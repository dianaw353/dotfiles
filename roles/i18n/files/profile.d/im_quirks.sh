# Some IM quirks to force fcitx to be the default IME
export XMODIFIERS=@im=fcitx
export QT_IM_MODULE=fcitx
# Wayland is the priority here since Hyprland is a Wayland compositor.
export QT_IM_MODULES="wayland;fcitx;"
