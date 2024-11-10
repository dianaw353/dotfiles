#!/bin/bash

# color codes
RESTORE='\033[0m'
NC='\033[0m'
BLACK='\033[00;30m'
RED='\033[00;31m'
GREEN='\033[00;32m'
YELLOW='\033[00;33m'
BLUE='\033[00;34m'
PURPLE='\033[00;35m'
CYAN='\033[00;36m'
SEA="\\033[38;5;49m"
LIGHTGRAY='\033[00;37m'
LBLACK='\033[01;30m'
LRED='\033[01;31m'
LGREEN='\033[01;32m'
LYELLOW='\033[01;33m'
LBLUE='\033[01;34m'
LPURPLE='\033[01;35m'
LCYAN='\033[01;36m'
WHITE='\033[01;37m'
OVERWRITE='\e[1A\e[K'

# emoji codes
CHECK_MARK="${GREEN}\xE2\x9C\x94${NC}"
X_MARK="${RED}\xE2\x9C\x96${NC}"
PIN="${RED}\xF0\x9F\x93\x8C${NC}"
CLOCK="${GREEN}\xE2\x8C\x9B${NC}"
ARROW="${SEA}\xE2\x96\xB6${NC}"
BOOK="${RED}\xF0\x9F\x93\x8B${NC}"
HOT="${ORANGE}\xF0\x9F\x94\xA5${NC}"
WARNING="${RED}\xF0\x9F\x9A\xA8${NC}"
RIGHT_ANGLE="${GREEN}\xE2\x88\x9F${NC}"

DOTFILES_LOG="$HOME/.dotfiles.log"
DOTFILES_DIR="$HOME/dotfiles"

set -e

# Paths
REPO="dianaw353/dotfiles"
REPO_URL="https://github.com/$REPO.git"

# Default to stable
MODE="stable"

function print_help {
  cat << EOF
Usage: $0 [options]

META OPTIONS
  --help                     show list of command-line options

BRANCH
  stable                     Use the stable release from GitHub. This will download the latest release as a ZIP file and extract it.
  rolling                    Clone the latest version directly from the GitHub repository. This will use git to clone the repository.

EOF
}

# Parse flags
while [[ $# -gt 0 ]]; do
  case $1 in
    stable)
      MODE="stable"
      shift
      ;;
    rolling)
      MODE="rolling"
      shift
      ;;
    -h|--help)
      print_help
      exit 0
      ;;
    *)
      echo "Invalid option: $1"
      print_help
      exit 1
      ;;
  esac
done

# _header colorize the given argument with spacing
function _task {
  if [[ $TASK != "" ]]; then
    printf "${OVERWRITE}${LGREEN} [✓]  ${LGREEN}${TASK}\n"
  fi
  TASK=$1
  printf "${LBLACK} [ ]  ${TASK} \n${LRED}"
}

# _cmd performs commands with error checking
function _cmd {
  if ! [[ -f $DOTFILES_LOG ]]; then
    touch $DOTFILES_LOG
  fi
  > $DOTFILES_LOG
  if eval "$1" 1> /dev/null 2> $DOTFILES_LOG; then
    return 0 # success
  fi
  printf "${OVERWRITE}${LRED} [X]  ${TASK}${LRED}\n"
  while read line; do
    printf "      ${line}\n"
  done < $DOTFILES_LOG
  printf "\n"
  rm $DOTFILES_LOG
  exit 1
}

function _clear_task {
  TASK=""
}

function _task_done {
  printf "${OVERWRITE}${LGREEN} [✓]  ${LGREEN}${TASK}\n"
  _clear_task
}

function backup_dotfiles() {
  local backup_dir="$HOME/dotfiles_backup/$(date +'%Y%m%d_%H%M%S')"
  _task "Creating backup directory: $backup_dir"
  mkdir -p "$backup_dir" || {
    printf "${LYELLOW} [-] Failed to create backup directory. Skipping backup.\n"
    return 1
  }

  _task "Backing up dotfiles"
  if mv "$DOTFILES_DIR/"* "$backup_dir/" 2>/dev/null; then
    _task_done
  else
    printf "${LYELLOW} [-] Couldn't find files to back up. Skipping.\n"
  fi
}

# Arch setup function
function arch_setup {
  for pkg in ansible python python-pip python-watchdog openssh rsync git noto-fonts-emoji; do
    if ! pacman -Q $pkg >/dev/null 2>&1; then
      _task "Installing $pkg"
      _cmd "sudo pacman -S --noconfirm $pkg"
    fi
  done
}

# Function to update Ansible Galaxy
function update_ansible_galaxy() {
  local os=$1
  local os_requirements=""
  _task "Updating Ansible Galaxy"
  if [ -f "$DOTFILES_DIR/requirements/$os.yml" ]; then
    _task "${OVERWRITE}Updating Ansible Galaxy with OS Config: $os"
    _cmd "ansible-galaxy install -r $DOTFILES_DIR/requirements/$os.yml"
  fi
  if [ -f "$DOTFILES_DIR/requirements/common.yml" ]; then
    _cmd "ansible-galaxy install -r $DOTFILES_DIR/requirements/common.yml"
  else
    printf "${LYELLOW} [-] ./requirements/common.yml does not exist. Skipping Ansible Galaxy update.\n"
  fi
}

# Function to get the latest release tag
get_latest_release() {
  curl --silent "https://api.github.com/repos/$REPO/releases/latest" | \
    grep '"tag_name":' | \
    sed -E 's/.*"([^"]+)".*/\1/'
}

# Function to get the latest zip URL
get_latest_zip() {
  curl --silent "https://api.github.com/repos/$REPO/releases/latest" | \
    grep '"zipball_url":' | \
    sed -E 's/.*"([^"]+)".*/\1/'
}

# Function to download the latest release and extract it
download_latest_release() {
  local zip_url=$(get_latest_zip)
  local zip_file="$HOME/dotfiles_latest.zip"

  _task "Backing up existing dotfiles"
  backup_dotfiles

  _task "Downloading the latest release from GitHub"
  _cmd "curl -L -o $zip_file $zip_url"

  _task "Extracting the downloaded zip file"
  _cmd "unzip -o $zip_file -d $HOME/dotfiles_temp"

  _task "Renaming the extracted folder to dotfiles"
  _cmd "mv $HOME/dotfiles_temp/*dotfiles-* $DOTFILES_DIR"

  _task "Cleaning up"
  _cmd "rm -rf $zip_file $HOME/dotfiles_temp"
}

# Function to clone the repository for rolling
clone_repository() {
  _task "Cloning the repository"
  _cmd "rm -rf $DOTFILES_DIR"
  _cmd "git clone $REPO_URL $DOTFILES_DIR"
}

source /etc/os-release
_task "Loading Setup for detected OS: $ID"
case $ID in
  arch)
    arch_setup
    ;;
  *)
    _task "Unsupported OS"
    _cmd "echo 'Unsupported OS'"
    ;;
esac

backup_dotfiles

if [[ $MODE == "rolling" ]]; then
  clone_repository
else
  download_latest_release
fi

update_ansible_galaxy $ID

