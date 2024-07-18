<div align="center">
 <h1> Dotfiles V1.0.1 Beta</h1>
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
   Also, an automated post install installation script currently avalable for `arch` distros.<br/>
</p>

<hr />
</div>

> [!WARNING]
> This is currently under havey deleopment so expect features to me missing, buggey, or broken

## Goals
   To provide a fully automated `arch` post install script currently for `hyprland` Window Manager that is easy to set up and maintain. 

## Showcase
   Comming Soon!

## Requirements

1. Clone this repo
   ```
   #Stable Release
   git clone https://github.com/dianaw353/dotfiles.git -b main --depth=1
   cd dotfiles
   #Rolling Release
   git clone https://github.com/dianaw353/dotfiles.git -b dev --depth=1
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
To view the upcoming featues please view [this](https://github.com/dianaw353/dotfiles/issues?q=is%3Aissue+label%3AFeature+)

## Acknowledgements
- TechDufus: https://github.com/TechDufus/dotfiles
- Logan Marchione: https://github.com/loganmarchione/ansible-arch-linux
- Dreams of Autonomy: https://github.com/dreamsofautonomy/zensh and https://github.com/dreamsofautonomy/zen-omp
- Aylur: https://github.com/Aylur/dotfiles
- Kotontrion: https://github.com/kotontrion/dotfiles
- Stephan Raabe: https://gitlab.com/stephan-raabe/dotfiles
