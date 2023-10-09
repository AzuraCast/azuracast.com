---
title: Installing AzuraCast on a Synology NAS
published: true
date: 2021-07-26T04:07:37.407Z
tags: docker
editor: markdown
dateCreated: 2021-07-26T04:06:17.767Z
---

## Configure Environment

### 1. Install Docker

Install Docker from the Synology package center.

### 2. Enable SSH

To enable SSH on Synology, open control panel and go to `Terminal & SNMP`. Check `Enable SSH service`. The default port is 22. You may change the port to something else if desired.

After enabling SSH, connect to the NAS from a remote machine with a supported SSH terminal.

### 3. OPTIONAL: Enable Home Folder for User

As a convenience factor, you can set up home folders for users on the Synology NAS 

To enable user home folder on Synology DSM, open control panel and go to `User`->`Advanced`. Scroll down and enable user home service.

(Note: If you enable both SSH and home folder service, you can drop your SSH key into your home folder at `~/.ssh/authorized_keys`. Just make sure that folder and its children are `chmod`ded to 755, i.e. `chmod 755 /var/services/homes/my-nas-user`)

### 4. OPTIONAL: Add User to Docker Group

Note: This will effectively give the user account "root" level access (via Docker volumes), so only do this if you are comfortable with that arrangement.

```bash
sudo synogroup --add docker username
```

If you decide not to do this, just add `sudo` to the beginning of any commands that appear after this.

## Install AzuraCast

### 1. Create AzuraCast Folder

By default, Docker prefers that its relevant files be located in `/volume1/docker`. This doesn't necessarily mean that your media files have to be located on this directory, but the core AzuraCast installation should live within that folder. In this example, we will install AzuraCast into `/volume1/docker/azuracast`.

```bash
mkdir -p /volume1/docker/azuracast
cd /volume1/docker/azuracast

curl -fsSL https://raw.githubusercontent.com/AzuraCast/AzuraCast/main/docker.sh > docker.sh
chmod a+x docker.sh
```

Before running the initial installation, you'll want to configure the ports that AzuraCast uses, as the Synology NAS by default will occupy ports 80 and 443. If you want AzuraCast to occupy those ports, you'll have to modify the configuration of the existing software to accomplish this.

For this example, we'll run AzuraCast on port 2080 and 2443.

Run the script below to configure the relevant environment variables:

```bash
sudo ./docker.sh setup-ports
```

Enter the custom ports when prompted. You can also specify a custom port for SFTP connections, but the default (2022) should be available.

```bash
sudo ./docker.sh install
```

AzuraCast should then be immediately available on the specified ports.

### 2. OPTIONAL: Specify Media directory for Station

Given the setup of a Synology NAS, it's likely that you won't necessarily want to host your station's media inside the internal volume managed by Docker but rather elsewhere on your system. 

For this example, I have created a station named "AzuraTest Radio" inside AzuraCast and created a separate shared folder, on Volume 2, labeled "azuracast_media".

In the Docker directory, `/volume1/docker/azuracast`, create a new file named `docker-compose.override.yml` with contents like those below:

```yml
services:
    web:
        volumes:
          - /volume2/azuracast_media:/var/azuracast/stations/azuratest_radio/media

    stations:
        volumes:
          - /volume2/azuracast_media:/var/azuracast/stations/azuratest_radio/media
```

By default, the user inside the Docker container runs as UID/GID 1000, the default UID for the first created user in an Ubuntu installation. It is very likely, however, that your Synology user account is not running with this UID/GID.

You should also update the UID/GID of the account running inside Docker to match yours.

First, find your UID by running:

```bash
id -u
id -g
```

Edit `/volume1/docker/azuracast/.env` (this file is hidden by default, but if you type it into a command like `vim /volume1/docker/azuracast/.env` you will see it) and add or modify the following rows:

```
AZURACAST_PUID=your_user_uid
AZURACAST_PGID=your_user_gid
```

With both the `docker-compose.override.yml` file and the UID/GID set, you can now restart your Docker containers by running:

```bash
sudo docker-compose down
sudo docker-compose up -d
```
