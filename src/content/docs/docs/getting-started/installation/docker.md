---
title: Install AzuraCast with Docker
published: true
date: 2023-09-04T15:54:14.387Z
tags: docker, getting started
dateCreated: 2023-07-30T12:16:02.778Z
---

AzuraCast is powered by Docker and uses pre-built images that contain every component of the software. Don't worry if you aren't very familiar with Docker; our easy installer tools will handle installing Docker and Docker Compose for you, and updates are very simple.

## System Requirements

Please check the page with the [AzuraCast system requirements](/docs/getting-started/requirements) before installing to make sure your server meets the minimum requirements.

## Installing

Connect to the server or computer you want to install AzuraCast on via an SSH terminal. You should be an administrator user with either root access or the ability to use the `sudo` command. If you are not the root user, you may need to run `sudo su -` before executing the commands below.

Pick a base directory on your host computer that AzuraCast can use. If you're on Linux, you can follow the steps below to use the recommended directory:

```bash
mkdir -p /var/azuracast
cd /var/azuracast
```

Use these commands to download our Docker Utility Script, set it as executable and then run the Docker installation process:

```bash
curl -fsSL https://raw.githubusercontent.com/AzuraCast/AzuraCast/main/docker.sh > docker.sh
chmod a+x docker.sh
./docker.sh install
```

On-screen prompts will show you how the installation is progressing.

:::tip[You're almost ready...]
Once installation has completed, be sure to open the URL to your AzuraCast installation in your browser to create your super administrator account and finish the initial setup.
:::

### Troubleshooting

Some Virtual Private Server (VPS) providers sometimes ship a old version of Docker or Docker-Compose with their systems and the version isn't fully compatible with our installation script. This can be resolved by running these commands then attempting the installation process again: 

```bash
cd /var/azuracast
./docker.sh install-docker
./docker.sh install-docker-compose
./docker.sh install
```

## Unattended Installation

To automate the installation process for AzuraCast, you can run the following commands or place them into a `cloud-init` script:

```bash
mkdir -p /var/azuracast
cd /var/azuracast
curl -fsSL https://raw.githubusercontent.com/AzuraCast/AzuraCast/main/docker.sh > docker.sh
chmod a+x docker.sh

# To install the "Stable" release channel instead of "Rolling Release", uncomment this line:
# yes 'Y' | ./docker.sh setup-release

yes '' | ./docker.sh install
```
