#!/bin/sh
set -e

# update and upgrade system :
sudo apt update
sudo apt upgrade -y

# install nodejs repo and nodejs from the repo
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

sudo apt install nodejs jq curl -y

# deploy app :

# identifying the repo name, service file location, and downloading the release 
repo_name="Hadeel404/GSG_Express_Js_AWS_Training"
service_file_location="ExpressJs/Book_management_app/infrastructure/app.service"
download_url=$(curl "https://api.github.com/repos/$repo_name/releases/latest" | jq --raw-output '.assets[0].browser_download_url')

# downloading the service file (for systemd)
curl -O "https://raw.githubusercontent.com/$repo_name/master/$service_file_location"

# running file on systemd :
sudo mv app.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable app.service

# creating and downloading the application to a directory then runing it with npm being installed 
sudo -u hadeel sh -c "mkdir -p /home/hadeel/app && cd /home/hadeel/app && curl -LO $download_url  && tar xzvf app.tar.gz  && npm install --omit=dev"

sudo reboot