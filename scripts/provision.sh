#!/usr/bin/env bash

update_and_configure() {
  sudo apt update -y
  sudo apt upgrade -y
  sudo apt autoremove -y
}

install_ubuntu_reqs() {
  sudo apt-get install -y ca-certificates curl gnupg
  sudo mkdir -p /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
  NODE_MAJOR=20
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list

  sudo apt-get update -y && sudo apt-get install -y nodejs httpie
  sudo corepack enable
  sudo npm i -g dockly directus
}

start_containers() {
  cd quantum-bank || exit
  docker-compose up -d
}

update_and_configure
install_ubuntu_reqs
start_containers
