<div align="center">
 <h1> Dotfiles </h1>
</div>

<div align="center">

![GitHub last commit](https://img.shields.io/github/last-commit/dianaw353/dotfiles?style=for-the-badge&color=FFB1C8&logoColor=D9E0EE&labelColor=292324)
![GitHub Repo stars](https://img.shields.io/github/stars/dianaw353/dotfiles?style=for-the-badge&color=FFB686&logoColor=D9E0EE&labelColor=292324&logo=andela)
![GitHub repo size](https://img.shields.io/github/repo-size/dianaw353/dotfiles?style=for-the-badge&color=CAC992&logoColor=D9E0EE&labelColor=292324&logo=protondrive)
</a>
 
</div>

Ansible playbook to set up my setup currently on arch linux (if there is demand ill add other OS's)

## Requirements

1. Install the necessary packages
   ```
   sudo pacman -S ansible git python python-pip python-watchdog
   ```
1. Clone this repo
   ```
   git clone https://github.com/dianaw353/dotfiles.git
   cd dotfiles
   ```
1. Install the Ansible requirements
   ```
   ansible-galaxy install -r requirements.yml
   ```
1. (Optional) Edit the variables in `group_vars`
1. (Optional) Run the playbook in check mode to view potential changes
   ```
   ansible-playbook main.yml --ask-become-pass --check
   ````
1. Run the playbook (enter your user's password when prompted)
   ```
   ansible-playbook main.yml --ask-become-pass
   ```


## TO DO
- [x] Add shell config
- [ ] Add hyprland config

## Source/Inspiration
- TechDufus: https://github.com/TechDufus/dotfiles
