---
title: AzuraRelay
published: true
date: 2021-04-27T11:09:13.620Z
tags: user guide, docker, relay
editor: markdown
dateCreated: 2021-02-07T09:42:11.032Z
---

AzuraRelay is "relay in a box" containing a lightweight web application and Icecast servers that can connect to and relay an AzuraRelay parent instance.

If you want to offer your streams to users around the world or accept a large volume of incoming traffic, AzuraRelay is the perfect companion to AzuraCast.

## Parent Installation Requirements

Before installing AzuraRelay, make sure your "parent" AzuraCast installation:

- is updated to the latest version,
- has the direct radio ports (i.e. 8000, 8010) exposed (i.e. isn't behind a CloudFlare proxy)

## System Requirements

- A 64-bit x86 (x86_64) CPU (ARM devices, like the Raspberry Pi 3/4, are not supported.)
- 512MB or greater of RAM
- 20GB or greater of hard drive space

For Linux hosts, the `sudo`, `curl` and `git` packages should be installed before installing . Most Linux distributions include these packages already.

## Installing

AzuraRelay is powered by Docker and uses pre-built images that contain every component of the software. Don't worry if you aren't very familiar with Docker; our easy installer tools will handle installing Docker and Docker Compose for you, and updates are very simple.

Connect to the server or computer you want to install AzuraRelay on via an SSH terminal. You should be an administrator user with either root access or the ability to use the `sudo` command.

Pick a base directory on your host computer that AzuraRelay can use. If you're on Linux, you can follow the steps below to use the recommended directory:

```bash
mkdir -p /var/azurarelay
cd /var/azurarelay
```

Use these commands to download our Docker Utility Script, set it as executable and then run the Docker installation process:

```bash
curl -L https://raw.githubusercontent.com/AzuraCast/AzuraRelay/main/docker.sh > docker.sh
chmod a+x docker.sh
./docker.sh install
```

On-screen prompts will show you how the installation is progressing.

## Updating

Using the included Docker utility script, updating is as simple as running:

```bash
./docker.sh update-self
./docker.sh update
```
