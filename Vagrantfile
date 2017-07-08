# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.require_version ">= 1.8.0"

Vagrant.configure("2") do |config|
  config.vm.define :ca do |c|
    c.vm.synced_folder "./", "/vagrant", :nfs => true
    c.vm.network :private_network, type: :dhcp
    c.vm.box = "ubuntu/trusty64"
    c.vm.hostname = "ca.micro"

    c.vm.provider :virtualbox do |vb|
      vb.memory = 512
      vb.cpus = 1
    end

    c.vm.provision :shell, privileged: false, path: "./scripts/ca.sh"
  end
end
