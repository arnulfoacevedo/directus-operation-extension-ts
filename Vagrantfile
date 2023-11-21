# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.

  config.vagrant.plugins = %w(vagrant-docker-compose vagrant-hostmanager vagrant-disksize vagrant-share)
  config.vm.box = "generic/ubuntu2204"
  config.disksize.size = '20GB'

  config.hostmanager.enabled = true
  config.hostmanager.manage_host = true
  config.hostmanager.manage_guest = true
  config.hostmanager.ignore_private_ip = false
  config.hostmanager.include_offline = true

  config.vm.provider :virtualbox do |vb|
    vb.memory = '4096'
  end

  config.vm.provision :docker
  config.vm.provision :docker_compose, compose_version: '1.27.2'

  config.vm.define 'quantum-bank-directus' do |machine|
    machine.vm.hostname = 'local-directus.quantum-bank.world'
    machine.vm.network :private_network, ip: '192.168.61.124'
    machine.vm.network :forwarded_port, guest: 5432, host: 5432
    machine.vm.network :forwarded_port, guest: 3306, host: 3309
    machine.vm.network :forwarded_port, guest: 8055, host: 8055
    machine.vm.synced_folder './', '/home/vagrant/quantum-bank'
    machine.vm.provision :shell,
                         path: './scripts/provision.sh',
                         privileged: false
  end
end
