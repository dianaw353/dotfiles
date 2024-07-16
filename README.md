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

## Arch Linux Prefered `archinstall` Settings
This is my preferred Arch Linux installation setup (using: 'archinstall') for using these dotfiles. The script will configure everything else you need.
- Profile: minimal
- Audio: None

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
1. Edit the variables in `group_vars`
> [!WARNING]
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

## Source/Inspiration
- TechDufus: https://github.com/TechDufus/dotfiles
- Logan Marchione: https://github.com/loganmarchione/ansible-arch-linux
- Dreams of Autonomy: https://github.com/dreamsofautonomy/zensh and https://github.com/dreamsofautonomy/zen-omp
