---
title: Update AzuraCast
description: How to update your AzuraCast installation
published: true
date: 2022-04-05T03:51:15.752Z
tags: ansible, docker, getting started, debugging
editor: markdown
dateCreated: 2021-02-05T20:11:10.517Z
---

Updating AzuraCast will update both the web app itself and all of its dependencies, so you will be on the latest version of all of the supporting software.

During the update process, your stations will be briefly offline to listeners, so you should set aside a time to update and notify listeners if necessary.

:::tip[Always back up first!]
The AzuraCast team is not responsible for any downtime or loss of data of your production installations of AzuraCast if you run into any errors while updating. Especially if you are updating a production installation with a lot of stations on a single server.
:::

## For Docker Installations

### Before Updating: Update Docker & Docker Compose

If it's been quite some time since you last updated, your version of Docker and Docker Compose may be out of date, and updates may trigger errors as a result.

You can update Docker and Docker Compose using the utility script by running:

```bash
cd /var/azuracast
./docker.sh update-self
./docker.sh install-docker
./docker.sh install-docker-compose
```

### Interactive Updates (Recommended)

Using the included Docker utility script, updating is as simple as running:

```bash
cd /var/azuracast
./docker.sh update-self
./docker.sh update
```

### Automated Updates

By default, the updater will prompt you to update your `docker-compose.yml` file. If you aren't making any changes to this file and want to automate the update process, you can use the command below to automatically answer "yes" to this question:

```bash
cd /var/azuracast
./docker.sh update-self
yes "" | ./docker.sh update
```

## For Ansible Installations

AzuraCast also includes a handy updater script for Ansible installations that pulls down the latest copy of the codebase from Git, flushes the site caches and makes any necessary database updates. Run these commands as any user with `sudo` permissions:

```bash
cd /var/azuracast/www
 
sudo chmod a+x update.sh
sudo ./update.sh
```

### Force a Full Update

Normally, the Ansible installer's update script only updates the portion of the system that have been modified since your last update. If an update was interrupted or otherwise is causing trouble, you can force the update script to process all components, which can often fix any issues:

```bash
./update.sh --full
```

## Switching Update Release Channels

AzuraCast ships two different release channels ("Stable" and "Rolling Release"), which you can switch between per installation. For more information, see our [Release Channels](/docs/getting-started/updates/release-channels) page.
