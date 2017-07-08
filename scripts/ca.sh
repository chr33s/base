#!/bin/sh -eux

# System

export USER=vagrant
export DEBIAN_FRONTEND=noninteractive

sudo dpkg-reconfigure tzdata
sudo dpkg-reconfigure -plow unattended-upgrades

sudo apt-get update || true

# OpenSSL

sudo apt-get install -y checkinstall build-essential git || true
echo "LC_CTYPE='en_US.UTF-8'" | sudo tee -a /etc/default/locale
source /etc/default/locale
git clone https://github.com/openssl/openssl.git /tmp/openssl
cd /tmp/openssl
git checkout OpenSSL_1_1_0-stable
./config -Wl,--enable-new-dtags,-rpath,'$(LIBRPATH)' && make && make test && sudo make install
sudo mv /usr/bin/c_rehash /usr/bin/c_rehash.bak
sudo mv /usr/bin/openssl /usr/bin/openssl.bak
sudo ln -s /usr/local/bin/c_rehash /usr/bin/c_rehash
sudo ln -s /usr/local/bin/openssl /usr/bin/openssl
openssl version

sudo apt-get -y remove build-essential git

# Cleanup

sudo apt-get -y autoremove
sudo apt-get -y autoclean
