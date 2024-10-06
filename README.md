<div align="center">
 <h1>Dotfiles</h1>
</div>

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/dianaw353/dotfiles?style=for-the-badge&color=FFB1C8&logoColor=D9E0EE&labelColor=292324)
![GitHub Repo stars](https://img.shields.io/github/stars/dianaw353/dotfiles?style=for-the-badge&color=FFB686&logoColor=D9E0EE&labelColor=292324&logo=andela)
![GitHub repo size](https://img.shields.io/github/repo-size/dianaw353/dotfiles?style=for-the-badge&color=CAC992&logoColor=D9E0EE&labelColor=292324&logo=protondrive)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/dianaw353/dotfiles?style=for-the-badge&labelColor=292324&color=CBA6F7)
![Github open issues](https://img.shields.io/github/issues/dianaw353/dotfiles?style=for-the-badge&labelColor=292324&color=D9E0EE)

</a>
</div>
<hr />
<div align="center">
<p>
   A linux desktop environment configuration using <a href='https://github.com/aylur/ags'>Aylur's Gtk Shell</a>.<br/>
   Also, an automated post install installation script.<br/>
</p>

<hr />
</div>

> [!WARNING]
> Laptop workarounds are based on community feedback, and Nvidia support is unofficial but supported with community help.

## Showcase
   Comming Soon!

## Featues

<details>
<summary>Dotfile Featues</summary>
<br>

- Clean fastfetch, zsh, and oh-my-posh
- GTK Focus
- Ags login screen
- Ags status bar
- Great hypridle config (won't lock screen in full screen, pause all player media when locked)
- And more
Many More Featues comming soon
</details>


<details>
<summary>Script Features</summary>
<br>

- Fully Automated
- GPU Drivers Installation
- Configurable (e.g. cursor icons, chaotic_aur, shell, etc)
- Optimize Pacman (e.g parallel downloads, color, VerbosePkgLists)
- Laptop Workarounds (Framework autobrighness disbale only atm)
- KVM Setup w/ 3d Acceleration
- Set up gaming dependencies
- Simple hyprland config
- And more

Many more featues are comming soon
</details>

## Supports

**Linux Distro**

   - Arch Linux

## Requirements

1. Run this command

   ```
   pacman -S curl   
   # Stable Release
   bash <(curl -s https://raw.githubusercontent.com/dianaw353/dotfiles/main/dotfiles.sh) stable
   # Rolling Release
   bash <(curl -s https://raw.githubusercontent.com/dianaw353/dotfiles/main/dotfiles.sh) rolling
   cd dotfiles
   ```   
   
1. Edit the variables in `group_vars`
> [!NOTE]
> This config is made for my setup so there may be a few things you want to change in group_vars/all.yml.
1. (Optional) Run the playbook in check mode to view potential changes
   ```
   ansible-playbook main.yml --ask-become-pass --check
   ````
1. Run the playbook (enter your user's password when prompted)
   ```
   ansible-playbook main.yml --ask-become-pass
   ```
1. (Optional) Run the playbook to run tasks with the value. (This will run the code needed for just that one application) PS. List of each task is in group_vars/all.yml under the default_roles flag :3
   ```
   ansible-playbook main.yml --ask-become-pass -t <Name of roles>
   ```


## To do
For upcoming features, check [this page](https://github.com/dianaw353/dotfiles/issues?q=is%3Aissue+label%3AFeature+is%3Aopen).

## Acknowledgements
- TechDufus: https://github.com/TechDufus/dotfiles
- Logan Marchione: https://github.com/loganmarchione/ansible-arch-linux
- Dreams of Autonomy: https://github.com/dreamsofautonomy/zensh and https://github.com/dreamsofautonomy/zen-omp
- Aylur: https://github.com/Aylur/dotfiles
- Kotontrion: https://github.com/kotontrion/dotfiles
- Stephan Raabe: https://gitlab.com/stephan-raabe/dotfiles
and more that I have forgot to add
