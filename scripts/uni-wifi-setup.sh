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

DOTFILES_LOG="$HOME/.uni-wifi-script.log"

# _header colorize the given argument with spacing
function _task {
  # if _task is called while a task was set, complete the previous
  if [[ $TASK != "" ]]; then
    printf "${OVERWRITE}${LGREEN} [✓]  ${LGREEN}${TASK}\n"
  fi
  # set new task title and print
  TASK=$1
  printf "${LBLACK} [ ]  ${TASK} \n${LRED}"
}

# _cmd performs commands with error checking
function _cmd {
  # create log if it doesn't exist
  if ! [[ -f $DOTFILES_LOG ]]; then
    touch $DOTFILES_LOG
  fi
  # empty conduro.log
  > $DOTFILES_LOG
  # hide stdout, on error we print and exit
  if eval "$1" 1> /dev/null 2> $DOTFILES_LOG; then
    return 0 # success
  fi
  # read error from log and add spacing
  printf "${OVERWRITE}${LRED} [X]  ${TASK}${LRED}\n"
  while read line; do
    printf "      ${line}\n"
  done < $DOTFILES_LOG
  printf "\n"
  # remove log file
  rm $DOTFILES_LOG
  # exit installation
  exit 1
}

function _clear_task {
  TASK=""
}

function _task_done {
  printf "${OVERWRITE}${LGREEN} [✓]  ${LGREEN}${TASK}\n"
  _clear_task
}

function arch_setup() {
  _task "Syncing repos"
  _cmd "sudo pacman -Sy"
  if ! pacman -Q python3 >/dev/null 2>&1; then
    _task "Installing Python3"
    _cmd "sudo pacman -S --noconfirm python"
  fi
  if ! pacman -Q python-dbus >/dev/null 2>&1; then
    _task "Installing Python-dbus"
    _cmd "sudo pacman -S --noconfirm python-dbus"
  fi
  if ! pacman -Q inetutils >/dev/null 2>&1; then
    _task "Installing inetutils"
    _cmd "sudo pacman -S --noconfirm inetutils"
  fi
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

echo "Please go to this website to get connected to the internet https://cloud.securew2.com/public/80462/utahtech_Trailblazers/?run"
echo "Once the file is downloaded run this command: 'sh ~/Downloads/SecureW2_JoinNow.run'"
