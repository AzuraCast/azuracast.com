---
title: Install AzuraCast
---

AzuraCast is flexible and works on a broad number of environments, from inexpensive VPSes and servers to your own home computer running Windows, MacOS or Linux. There are two ways to install AzuraCast that differ significantly.

[[toc]]

## Using Docker (Recommended)

We strongly recommend installing and using AzuraCast via Docker. All of the necessary software packages are built by our automated tools, so installation is as easy as just pulling down the pre-compiled images. There's no need to worry about compatibility with your host operating system, so any host (including Windows and MacOS) will work great out of the box.

You can use the AzuraCast Docker utility script to check for (and install, if necessary) the latest version of Docker and Docker Compose, then pull the necessary files and get your instance running.

If you're on a Linux server, you will need `sudo` and `curl` installed, if they aren't already, before running the installer scripts.

```bash
curl -L https://raw.githubusercontent.com/AzuraCast/AzuraCast/master/docker.sh > docker.sh
chmod a+x docker.sh
./docker.sh install
```

### Updating

Using the Docker utility script:

```bash
./docker.sh update
```

To manually update, from inside the base directory where AzuraCast is copied, run the following commands:

```bash
docker-compose down
docker-compose pull
docker-compose run --rm cli azuracast_update
docker-compose up -d
```

### Setting up HTTPS with LetsEncrypt:

AzuraCast now supports full encryption with LetsEncrypt. LetsEncrypt offers free SSL certificates with easy validation and renewal.

First, make sure your AzuraCast instance is set up and serving from the domain you want to use. 

Using the Docker utility script, you can run:

```bash
./docker.sh letsencrypt-create
```

Otherwise, you can use the following manual commands:

```bash
docker-compose run --rm letsencrypt certonly --webroot -w /var/www/letsencrypt
docker-compose run --rm nginx letsencrypt_connect YOURDOMAIN.example.com
docker-compose kill -s SIGHUP nginx
``` 

Your LetsEncrypt certificate is valid for 3 months. To renew the certificates using the Docker utility script, run:

```bash
./docker.sh letsencrypt-renew
```

Or manually run this command:

```bash
docker-compose run --rm letsencrypt renew --webroot -w /var/www/letsencrypt
```

### Backup and Restore

Using the Docker utility script, you can backup and restore your Docker volumes to a .tar.gz file. You can also restore from an existing .tar.gz backup file:

```bash
# Back up the current volumes
./docker.sh backup /path/to/backup.tar.gz

# Restore from an existing backup
./docker.sh restore /path/to/backup.tar.gz
```

::: warning
Restoring from a backup will remove any existing AzuraCast database or media that exists inside the Docker volumes.
:::

## Traditional Installation

The traditional installation is an advanced option available for those who want more complex customization options or are running on very limited hardware that can't handle the minor overhead of the Docker installation method.

Currently, the following operating systems are supported:

- Ubuntu 16.04 "Xenial" LTS
- Ubuntu 18.04 "Bionic" LTS

::: tip
Some web hosts offer custom versions of Ubuntu that include different software repositories. These may cause compatibility issues with AzuraCast. Many VPS providers are known to work out of the box with AzuraCast (OVH, DigitalOcean, Vultr, etc), and are thus highly recommended if you plan to use the traditional installer.
:::

AzuraCast is optimized for speed and performance, and can run on very inexpensive hardware, from the Raspberry Pi 3 to the lowest-level VPSes offered by most providers.

Since AzuraCast installs its own radio tools, databases and web servers, you should always install AzuraCast on a "clean" server instance with no other web or radio software installed previously.

Execute these commands **as a user with sudo permissions (or root)** to set up your AzuraCast server:

```bash
sudo apt-get update
sudo apt-get install -q -y git

sudo mkdir -p /var/azuracast/www
cd /var/azuracast/www
sudo git clone https://github.com/AzuraCast/AzuraCast.git .

sudo chmod a+x install.sh
./install.sh
```

The installation process will take between 5 and 15 minutes, depending on your Internet connection. If you encounter an error, let us know in the [Issues section](https://github.com/AzuraCast/AzuraCast/issues).

Once the terminal-based installation is complete, you can visit your server's public IP address (`http://ip.of.your.server/`) to finish the web-based setup.

#### Updating

AzuraCast also includes a handy updater script that pulls down the latest copy of the codebase from Git, flushes the site caches and makes any necessary database updates. Run these commands as any user with `sudo` permissions:

```bash
cd /var/azuracast/www

sudo chmod a+x update.sh
sudo ./update.sh
```

## Post-Installation Setup

Once installation is complete, you should immediately visit your server's public web address. This may be the IP of the server, a domain name (if you've registered one and pointed it at the server), or `localhost` if you're running AzuraCast on your personal computer.

The initial web setup consists of the following steps:
1. Creating a "Super Administrator" account with system-wide administratration permissions
2. Creating the first radio station that the system will manage
3. Customizing important AzuraCast settings, like the site's base URL and HTTPS settings

Don't worry if you aren't sure of these items yet; you can always make changes to any of the items after setup is complete.