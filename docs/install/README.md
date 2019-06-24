---
title: Install AzuraCast
sidebar: auto
---

# Install AzuraCast

[[toc]]

AzuraCast is flexible and works on a broad number of environments, from inexpensive VPSes and servers to your own home computer running Windows, MacOS or Linux.

## Managed Hosting with AzuraCast Reseller Partners

We've partnered with a number of managed web radio hosting providers to offer you easy, cloud-hosted instances of AzuraCast without the hassle of server management. If you're looking for the easiest way to get started with AzuraCast, visit one of our reseller partners below:

### [Comcities](https://www.comcities.com)

> We provide low-cost, high quality web hosting and streaming solutions to small, medium and large businesses. Our plans have been created to provide any business. Our goal is to provide you with the best service possible.

---

Want to become a reseller partner? Visit our [reseller guide](/about/resellers.html)!

## Self-Hosted Installation

AzuraCast is powered by Docker and uses pre-built images that contain every component of the software. Don't worry if you aren't very familiar with Docker; our easy installer tools will handle installing Docker and Docker Compose for you, and updates are very simple.

::: warning
Some hosting providers use OpenVZ or LXC, and sometimes these technologies are incompatible with Docker. If the Docker installation does not work on your host, you should consider using a different server for AzuraCast, or you can use the unsupported [Ansible installation method](./install_ansible.html).
:::

### System Requirements

- A CPU with x86/x64 architecture (ARM/ARMHF platforms, like the Raspberry Pi, are [not currently supported](https://github.com/AzuraCast/AzuraCast/issues/332).)
- 512MB or greater of RAM
- 20GB or greater of hard drive space

For Linux hosts, the `sudo`, `curl` and `git` packages should be installed before installing AzuraCast. Most Linux distributions include these packages already.

### Installing

Connect to the server or computer you want to install AzuraCast on via an SSH terminal. You should be an administrator user with either root access or the ability to use the `sudo` command.

Pick a base directory on your host computer that AzuraCast can use. If you're on Linux, you can follow the steps below to use the recommended directory:

```bash
mkdir -p /var/azuracast
cd /var/azuracast
```

Use these commands to download our Docker Utility Script, set it as executable and then run the Docker installation process:

```bash
curl -L https://raw.githubusercontent.com/AzuraCast/AzuraCast/master/docker.sh > docker.sh
chmod a+x docker.sh
./docker.sh install
```

On-screen prompts will show you how the installation is progressing.

Once installation has completed, be sure to follow the [post-installation steps](#post-installation-setup). You can also [set up LetsEncrypt](/docker_sh.html#set-up-letsencrypt) or make other changes to your installation using the [Docker Utility Script](/docker_sh.html) that you've just downloaded.

::: tip
Want to further customize your installation? Check out our [support guide](/help/faq_docker.html) for some common examples, including custom port mappings and setting up SFTP access.
:::

### Post-Installation Setup

Once installation is complete, you should immediately visit your server's public web address. This may be the IP of the server, a domain name (if you've registered one and pointed it at the server), or `localhost` if you're running AzuraCast on your personal computer.

The initial web setup consists of the following steps:
1. Creating a "Super Administrator" account with system-wide administratration permissions
2. Creating the first radio station that the system will manage
3. Customizing important AzuraCast settings, like the site's base URL and HTTPS settings

Don't worry if you aren't sure of these items yet; you can always make changes to any of the items after setup is complete.

### Updating

Using the included Docker utility script, updating is as simple as running:

```bash
./docker.sh update-self
./docker.sh update
```

By default, the updater will prompt you to update your `docker-compose.yml` file. If you aren't making any changes to this file and want to automate the update process, you can use the command below to automatically answer "yes" to this question:

```bash
./docker.sh update-self && echo "y" | ./docker.sh update
```

## Host-Specific Installation Guides

### DigitalOcean

Our friends at DigitalOcean offer fast, affordable, scalable hosting that is perfect for services like AzuraCast. Thanks to their support for custom installation metadata, you can spin up a new droplet and have a running AzuraCast instance without leaving your browser.

- [Installing AzuraCast on DigitalOcean](./install_do.html)

### Linode

If you are hosting your installation with Linode, you can take advantage of these community-maintained scripts to automate the installation process. These scripts can also be found from the Linode manager's "Community StackScripts" section:

- [Linode Docker Installer StackScript](https://www.linode.com/stackscripts/view/352549)
