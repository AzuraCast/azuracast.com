---
title: Install AzuraCast
---

# Install AzuraCast

[[toc]]

AzuraCast is flexible and works on a broad number of environments, from inexpensive VPSes and servers to your own home computer running Windows, MacOS or Linux. There are two ways to install AzuraCast that differ significantly.

## Recommended Installation Method

We strongly recommend installing and using AzuraCast's Docker version. All of the necessary software packages are built by our automated tools, so installation is as easy as just pulling down the pre-compiled images. There's no need to worry about compatibility with your host operating system, so any host (including Windows and MacOS) will work great out of the box.

### System Requirements

- A CPU with x86/x64 architecture (ARM/ARMHF platforms, like the Raspberry Pi, are not currently supported. Follow [this issue](https://github.com/AzuraCast/AzuraCast/issues/332) for updates.)
- 512MB or greater of RAM
- 20GB or greater of hard drive space

For Linux hosts, the `sudo`, `cURL` and `git` packages should be installed before installing AzuraCast. Most Linux distributions include these packages already.

### Installing

You can use the AzuraCast Docker utility script to check for (and install, if necessary) the latest version of Docker and Docker Compose, then pull the necessary files and get your instance running.

```bash
curl -L https://raw.githubusercontent.com/AzuraCast/AzuraCast/master/docker.sh > docker.sh
chmod a+x docker.sh
./docker.sh install
```

Once installation has completed, be sure to follow the [post-installation steps](#post-installation-setup). You can also [set up LetsEncrypt](/docker_sh.html#set-up-letsencrypt) or make other changes to your installation using the [Docker Utility Script](/docker_sh.html) that you've just downloaded.

::: tip
Want to further customize your Docker installation? Check out our [support guide](https://github.com/AzuraCast/AzuraCast/blob/master/SUPPORT.md) for some common examples, including custom port mappings and setting up SFTP access.
:::

### Updating

Using the included Docker utility script, updating is as simple as running:

```bash
./docker.sh update-self
./docker.sh update
```

### Post-Installation Setup

Once installation is complete, you should immediately visit your server's public web address. This may be the IP of the server, a domain name (if you've registered one and pointed it at the server), or `localhost` if you're running AzuraCast on your personal computer.

The initial web setup consists of the following steps:
1. Creating a "Super Administrator" account with system-wide administratration permissions
2. Creating the first radio station that the system will manage
3. Customizing important AzuraCast settings, like the site's base URL and HTTPS settings

Don't worry if you aren't sure of these items yet; you can always make changes to any of the items after setup is complete.

## Other Installation Methods

### Ubuntu Bare-metal Installation

The Ubuntu bare-metal installation method (also known as the "traditional" installation method) is an advanced option available for those who want more complex customization options or are running on very limited hardware that can't handle the minor overhead of the Docker installation method.

Note that the installation and update process for bare-metal installations often takes significantly longer than Docker installations because software components are compiled from source on your server. If you are installing AzuraCast alongside other software on the same server, this may cause errors that are not supported by our team. We highly recommend using the Docker installation above whenever possible.

- [Ubuntu Bare-metal ("Traditional") Installation](/install_traditional.html)

### DigitalOcean

Our friends at DigitalOcean offer fast, affordable, scalable hosting that is perfect for services like AzuraCast. Thanks to their support for custom installation metadata, you can spin up a new droplet and have a running AzuraCast instance without leaving your browser. 

- [Installing AzuraCast on DigitalOcean](/install_do.html)

### Linode

If you are hosting your installation with Linode, you can take advantage of these community-maintained scripts to automate the installation process. These scripts can also be found from the Linode manager's "Community StackScripts" section:

- [Linode Docker Installer StackScript](https://www.linode.com/stackscripts/view/352549)
- [Linode Bare-metal Installer StackScript](https://www.linode.com/stackscripts/view/352555)
