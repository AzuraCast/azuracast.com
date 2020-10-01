---
title: Install AzuraCast
---

# Install AzuraCast

AzuraCast is server-based software that is installed on a VPS, dedicated server or other computer and serves both your station broadcasts and its own web interface through the server's network connection.

## One-Click Installers

The easiest way to get started with AzuraCast is to create a new VPS with one of our supported partners via the options below.

 - **DigitalOcean:** Create a new droplet based on our one-click installer from [the AzuraCast listing on the DigitalOcean Marketplace](https://marketplace.digitalocean.com/apps/azuracast).

 - **Linode:** Deploy a new Linode instance with the [AzuraCast one-click installer in the Linode Marketplace](https://www.linode.com/marketplace/apps/linode/azuracast/).

## Self-Installation

You can also install AzuraCast yourself on most server hardware and many computers running Linux.

Installing AzuraCast yourself requires a basic understanding of the Linux shell/terminal environment, as well as root (or "sudo") access to the computer you're installing AzuraCast on.

### Docker Installation (Recommended)

For a majority of users, our Docker installation method is the preferred way of installing and using AzuraCast:

 - [Self-Installation with Docker](docker)

### Other Installation Methods

Most servers and hosting providers support Docker without any issues. If your provider does not, or if you are using unique hardware, see the other guides below:

 - [Self-Installation for Raspberry Pi 3B/4](raspberry-pi)
 - [Self-Installation using Ansible](ansible)