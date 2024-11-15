#!/bin/bash

# Color codes
RESTORE='\033[0m'
BLACK='\033[00;30m'
RED='\033[00;31m'
GREEN='\033[00;32m'
YELLOW='\033[00;33m'
BLUE='\033[00;34m'
PURPLE='\033[00;35m'
CYAN='\033[00;36m'
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

# Emoji codes
CHECK_MARK="${GREEN}\xE2\x9C\x94${RESTORE}"
X_MARK="${RED}\xE2\x9C\x96${RESTORE}"
PIN="${RED}\xF0\x9F\x93\x8C${RESTORE}"
CLOCK="${GREEN}\xE2\x8C\x9B${RESTORE}"
ARROW="${CYAN}\xE2\x96\xB6${RESTORE}"
BOOK="${RED}\xF0\x9F\x93\x8B${RESTORE}"
WARNING="${RED}\xF0\x9F\x9A\xA8${RESTORE}"
RIGHT_ANGLE="${GREEN}\xE2\x88\x9F${RESTORE}"

DOTFILES_LOG="$HOME/.dotfiles.log"
DOTFILES_DIR="$HOME/dotfiles"

set -e

# Paths
REPO="dianaw353/dotfiles"
REPO_URL="https://github.com/$REPO.git"

# Default to stable mode
MODE="stable"

function print_help {
  cat << EOF
Usage: $0 [options]

META OPTIONS
  --help                     show list of command-line options

BRANCH
  stable                     Use the stable release from GitHub (downloads the latest release as a ZIP file).
  rolling                    Clone the latest version directly from the GitHub repository.

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

# Function to display task status
function _task {
  if [[ $TASK != "" ]]; then
    printf "${OVERWRITE}${LGREEN} [✓]  ${LGREEN}${TASK}${RESTORE}\n"
  fi
  TASK=$1
  printf "${LBLACK} [ ]  ${TASK}${RESTORE}\n"
}

# Improved command execution with retry and error handling
function _cmd {
  local command="$1"         # Command to run
  local retries=${2:-3}      # Number of retries (default: 3)
  local retry_delay=${3:-2}  # Delay between retries in seconds (default: 2s)
  local error_message=${4:-"Command failed: $command"} # Custom error message

  if ! [[ -f $DOTFILES_LOG ]]; then
    touch $DOTFILES_LOG
  fi
  > $DOTFILES_LOG

  for ((i=0; i<retries; i++)); do
    if eval "$command" 1> /dev/null 2> $DOTFILES_LOG; then
      return 0 # success
    else
      printf "${OVERWRITE}${LRED} [X]  Attempt $((i+1)) failed: ${TASK}${RESTORE}\n"
      sleep $retry_delay
    fi
  done

  # Final failure message with error output
  printf "${OVERWRITE}${LRED} [X]  ${TASK} - ${error_message}${RESTORE}\n"
  while read -r line; do
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
  printf "${OVERWRITE}${LGREEN} [✓]  ${LGREEN}${TASK}${RESTORE}\n"
  _clear_task
}

# Arch setup function
function arch_setup {
  for pkg in ansible curl python python-pip python-watchdog openssh rsync git noto-fonts-emoji jq; do
    if ! pacman -Q $pkg >/dev/null 2>&1; then
      _task "Installing $pkg"
      _cmd "sudo pacman -S --noconfirm $pkg" 5 2 "Failed to install $pkg."
    fi
  done
}

# Update Ansible Galaxy
function update_ansible_galaxy {
  local os=$1
  _task "Updating Ansible Galaxy"
  if [ -f "$DOTFILES_DIR/requirements/$os.yml" ]; then
    _cmd "ansible-galaxy install -r $DOTFILES_DIR/requirements/$os.yml" 3 2 "Ansible Galaxy update for $os.yml failed."
  fi
  if [ -f "$DOTFILES_DIR/requirements/common.yml" ]; then
    _cmd "ansible-galaxy install -r $DOTFILES_DIR/requirements/common.yml" 3 2 "Ansible Galaxy update for common.yml failed."
  else
    printf "${LYELLOW} [-] ./requirements/common.yml does not exist. Skipping Ansible Galaxy update.${RESTORE}\n"
  fi
}

# Get the latest version
function get_latest_version {
  if [[ $MODE == "rolling" ]]; then
    curl --silent "https://api.github.com/repos/$REPO/commits/heads/main" | \
      jq -r .sha
  else
    curl --silent "https://api.github.com/repos/$REPO/releases/latest" | \
      jq -r .tag_name
  fi
}

# Get the installed version
function get_installed_version {
  if [[ $MODE == "rolling" ]] && [[ -d "$DOTFILES_DIR/.git" ]]; then
    cd $DOTFILES_DIR
    git rev-parse HEAD
  elif [[ -f "$DOTFILES_DIR/VERSION" ]]; then
    cat $DOTFILES_DIR/VERSION
  fi
}

# Check if we have the latest version
function check_version {
  local latest_version="$(get_latest_version)"
  local installed_version="$(get_installed_version)"

  _task "Checking for updates..."
  [[ "${latest_version}" != "${installed_version}" ]] || _cmd "false" 1 0 "You already have the latest version."
}

# Get the diff between local and remote versions so we know what changes to apply
function get_upgrade_diff {
  local latest_version=$(get_latest_version)
  local installed_version=$(get_installed_version)

  curl --silent \
    -H "Accept: application/vnd.github.diff" \
    "https://api.github.com/repos/dianaw353/dotfiles/compare/${installed_version}...${latest_version}"
}

# Perform an upgrade by patching/pulling instead of cloning everything from scratch
function upgrade {
  local latest_version=$(get_latest_version)

  _task "Upgrading existing dotfiles..."
  _cmd "cd $DOTFILES_DIR" 3 2 "Failed to enter into existing dotfiles directory."
  if [[ -d "$DOTFILES_DIR/.git" ]]; then
    _cmd "git stash" 3 2 "Failed to stash unstaged changes."
    _cmd "git fetch $REPO_URL $latest_version" 3 2 "Failed to fetch the latest version."
    _cmd "git checkout FETCH_HEAD" 3 2 "Failed to checkout fetched version."
    _cmd "echo 'Upgrade complete! You may want to pop your stash with git stash pop.'" 1 0 "Upgrade complete! You may want to pop your stash with git stash pop."
  elif [[ -f "$DOTFILES_DIR/VERSION" ]]; then
    _cmd "$(get_upgrade_diff) | patch -p1" 3 2 "Failed to fetch and apply the update."
  fi
}

# Get the latest release zip URL
function get_latest_zip {
  curl --silent "https://api.github.com/repos/$REPO/releases/latest" | \
    jq -r .zipball_url
}

# Download the latest release and extract it
function download_latest_release {
  local zip_url=$(get_latest_zip)
  local zip_file="$HOME/dotfiles_latest.zip"

  _task "Downloading the latest release from GitHub"
  _cmd "curl -L -o $zip_file $zip_url" 3 2 "Failed to download the latest release."

  _task "Extracting the downloaded zip file"
  _cmd "unzip -o $zip_file -d $HOME/dotfiles_temp" 3 2 "Failed to extract the latest release."

  _task "Renaming the extracted folder to dotfiles"
  _cmd "rm -rf $DOTFILES_DIR" 3 2 "Failed to remove old dotfiles directory."
  _cmd "mv $HOME/dotfiles_temp/*dotfiles-* $DOTFILES_DIR" 3 2 "Failed to rename extracted folder."

  _task "Cleaning up"
  _cmd "rm -rf $zip_file $HOME/dotfiles_temp" 3 2 "Cleanup failed."
}

# Clone repository for rolling updates
function clone_repository {
  if [[ ! -d "$DOTFILES_DIR/.git" ]]; then
    _task "Cloning the repository"
    _cmd "rm -rf $DOTFILES_DIR" 3 2 "Failed to remove old dotfiles directory."
    _cmd "git clone $REPO_URL $DOTFILES_DIR" 3 2 "Failed to clone repository."
  else
    _task "Pulling latest changes"
    _cmd "cd $DOTFILES_DIR" 3 2 "Failed to enter into existing dotfiles directory."
    _cmd "git pull $REPO_URL main --rebase" 3 2 "Failed to pull the latest changes."
  fi
}

# Load OS and setup based on detected OS
source /etc/os-release
_task "Loading Setup for detected OS: $ID"
case $ID in
  arch)
    arch_setup
    ;;
  *)
    _task "Unsupported OS"
    _cmd "echo 'Unsupported OS'" 1 0 "Unsupported OS detected."
    ;;
esac

if [[ -f "$DOTFILES_DIR/VERSION" ]]; then
  check_version
  upgrade
elif [[ $MODE == "rolling" ]]; then
  clone_repository
else
  download_latest_release
fi

# Update Ansible roles
update_ansible_galaxy $ID
