<div align="center">
 <h1>Dotfiles</h1>
</div>

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/dianaw353/dotfiles?style=for-the-badge&color=FFB1C8&logoColor=D9E0EE&labelColor=292324)
![GitHub Repo stars](https://img.shields.io/github/stars/dianaw353/dotfiles?style=for-the-badge&color=FFB686&logoColor=D9E0EE&labelColor=292324&logo=andela)
![GitHub repo size](https://img.shields.io/github/repo-size/dianaw353/dotfiles?style=for-the-badge&color=CAC992&logoColor=D9E0EE&labelColor=292324&logo=protondrive)
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
> This is currently under heavy development, so expect some features to be missing, buggy, or broken. <br>
  Laptop workarounds are based on community feedback. <br>
  Nvidia support is unofficial since I don't use Nvidia graphics, but I'll do my best with help from the community.

## Showcase
   Comming Soon!

## Featues

<details>
<summary>Dotfile Featues</summary>
<br>

- Clean fastfetch, zsh, and oh-my-posh
- GTK Focus
- Login screen
- Aylur gtk shell bar (Comming soon)
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
- And more

Many more featues are comming soon
</details>

## Supports

**Linux Distro**

   - Arch Linux

**Window Managers/Desktop Environments**

   - Hyprland

## Requirements

1. Clone this repo

   Follow this if you want the stable release
   ```
   # Stable Release
   pacman -S unzip curl jq   
   bash <(curl -s https://raw.githubusercontent.com/dianaw353/dotfiles/main/dotfiles)
   cd dotfiles
   ```
   OR Follow this for the rolling release
   ```
   #Rolling Release
   git clone https://github.com/dianaw353/dotfiles.git -b main
   cd dotfiles
   ```
1. Run the following script
   ```
   ./dotfiles
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
To view the upcoming featues please view [this](https://github.com/dianaw353/dotfiles/issues?q=is%3Aissue+label%3AFeature+is%3Aopen)

## Acknowledgements
- TechDufus: https://github.com/TechDufus/dotfiles
- Logan Marchione: https://github.com/loganmarchione/ansible-arch-linux
- Dreams of Autonomy: https://github.com/dreamsofautonomy/zensh and https://github.com/dreamsofautonomy/zen-omp
- Aylur: https://github.com/Aylur/dotfiles
- Kotontrion: https://github.com/kotontrion/dotfiles
- Stephan Raabe: https://gitlab.com/stephan-raabe/dotfiles
