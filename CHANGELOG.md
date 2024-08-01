Version 1.0.5
https://github.com/dianaw353/dotfiles/releases/tag/V1.0.5
--------------------------------------------------------
**Script**
- Reorganise some flags
- GTK window buttons configuration (no buttons default)
- Command to disable oh-my-posh update warnings
- Add systemd-timesync module
- Move many apps to core_apps
- Update installation method
- Remove sunroof & spotube

Version 1.0.4
https://github.com/dianaw353/dotfiles/releases/tag/V1.0.4
--------------------------------------------------------
**Script Changes**
- WIP/ALPHA: Add variable for driver preference for Nvidia GPUs
- Make terms for package managers more generic
- Merge audio/bluetooth into system role

**Hyprland**
- Add hypridle & hyprlock

**Fixes**
- Install openssh as a preliminary dependency
- Install some missing packages for a barebones Arch install fresh out of the wiki replication
- Separate new Nvidia cards from old, unsupported ones
- Install Nouveau dependencies if opted out of proprietary Nvidia drivers

Version 1.0.3
https://github.com/dianaw353/dotfiles/releases/tag/V1.0.3
--------------------------------------------------------
**Fixes**
- Add playerctl
- Move avatar to pfp and mountain to wallpaper in Pictures
- Premission improvements

Version 1.0.2
https://github.com/dianaw353/dotfiles/releases/tag/V1.0.2
--------------------------------------------------------
**Script Changes**
  - Install KVM
  - Set up KVM w/ 3d acceleration support
  - Detect if user is using VM
  - Add is_vm for additional configuration
    - Change hyprland env's depending if is_vm is set to true
  - Add is_nvidia for additional configuration
    - Change hyprland env's depending if is_nvidia is set to true
  - Greetd gets images from assets

**Hyprland Changes**
- QT_QPA_PLATFORMTHEME,qt5ct added 
- Add gamemode script
- Change missioncenter windowrules to use class instead of title and preferences to be shown in the center of the screen
- Autostart hyprpaper and add hyprpaper config

**Fixes**
- Hyprland scripts are now executable
- Ansible host fixes 
- Rename gpu_drivers.yml to main.yml
- Rebase main.yml
- Add xdg-desktop-portal-gtk to system compatibility packages
- Move Greetd config to correct location 
- Install all ansible requirements
- Fix cursor install to install correct package
- Replace swww with hyprpaper
- Add assets folder
  
Version 1.0.1
https://github.com/dianaw353/dotfiles/releases/tag/V1.0.1
--------------------------------------------------------
- Script: Add sunroof and spotube as new applications
- Script: Add 4 new flags
  - Hyprland: Add autostart template for the following to work
    - Icons: Add new icons section
      - Add flag for cursor package (AUR ONLY ATM) 
      - Add flag for cursor theme
      - Add flag to change cursor size
  - Pacman: Add for chaotic_aur
    - Update pacman conf to also have ILoveCandy and VerbosePkgLists
- Script: rate-mirrors added
  - Add rate-mirrors package
  - Update pacman & chaotic aur mirrors list
- Script: Refactor framework workaround to laptop workarounds
- Update pacman conf to also have ILoveCandy and VerbosePkgLists
- Refactor aur_helper
- Add script to backup dotfiles
- Add Hyprshot
- Add keybindings for hyprshot
- Add keybindings to set active windodw to fullscreen
- Add libadwaita as a dependencie

Version 1.0
https://github.com/dianaw353/dotfiles/releases/tag/V1.0
--------------------------------------------------------
- Inital Release
