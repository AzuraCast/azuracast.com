---
title: Requirements
description: This page tells you what is required to run AzuraCast
published: true
date: 2022-05-20T14:32:58.323Z
tags: getting started
editor: markdown
dateCreated: 2021-02-05T18:58:13.221Z
---

AzuraCast ships as a series of prebuilt container images that contain every component of the software already installed and configured to work together. On your server, these container images can run either through Docker or Podman, two widely available container runtimes.

Don't worry if you aren't familiar with Docker or Podman; our easy installer tools will automate the process of downloading and installing Docker and setting things up. Updates are also simple via our web-based update mechanism.

:::caution[A general disclaimer...]
AzuraCast does not ensure, and is not liable for, music licenses and royalties paid to creators. Copyright and royalty laws vary widely from country to country around the world, and you will need to follow the appropriate laws for your location. If in doubt, consult with an attorney.
:::

## 🖥️ System Requirements

### Minimum Requirements

- A 64-bit x86 (x86_64/amd64) or ARM64 CPU
- at least 2GB of RAM
- 20GB or greater of hard drive space
- A computer/server capable of running Docker or Podman

For Linux hosts, the `sudo`, `curl` and `git` packages should be installed before installing AzuraCast. Most Linux distributions include these packages already. 

Note that these are the bare minimum requirements to run a functional AzuraCast instance; the needs of the software scale up with the number of radio stations (and audio streams) you operate.

### Recommended Requirements

- 4 CPU cores
- 4GB of ram
- 40 GB or greater of hard drive space
- A computer/server capable of running Docker or Podman

Recommeneded Requirements should allow  you to run a few stations with ease, this is aimed for hobby usage (5 to 10 stations). [If you wish to increase the memory even further, consult this guide on Swap Space](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-20-04)

## 📀 Operating System

:::tip
Regardless of which OS you choose, to avoid any compatibility or permissions issues you should install AzuraCast on a fresh minimal installation without Docker or Docker Compose installed.
:::

Many operating systems can serve as the host OS for AzuraCast as long as they can run Docker or Podman.

If you don't have an OS preference, we recommend using the latest long-term support (LTS) distributions of Ubuntu or Debian for an easy installation process. See [Ubuntu's release cycle documentation](https://ubuntu.com/about/release-cycle) and [Debian's releases page](https://www.debian.org/releases/) for the latest LTS release of each OS respectively.

You can also run AzuraCast via Docker Desktop on your own PC, though we only recommend doing this for development or hobby stations and not production installations. Current versions of MacOS and Windows 11 (WSL) are supported via [Docker Desktop](https://www.docker.com/products/docker-desktop/).

Since we don't control the host operating system of your server, you are responsible for ensuring it stays up-to-date and patched with security patches. We do, however, work to keep the AzuraCast container images up-to-date at all times with the latest patched versions of the OS and software we use.

## ⚠️ Known Incompatibilities

- **OpenVZ or LXC-based Web Hosts:**

  - Some hosting providers use OpenVZ or LXC, and sometimes these technologies are incompatible with Docker. If the Docker installation does not work on your host, you should consider using a different server for AzuraCast, or you can use the unsupported Ansible installation method.
  
## 📊 Resource Usage

On the Administration page you can find a basic `Server Status` section that shows you the `CPU Load`, `Memory` and `Disk Space` usage of your server.

### Icecast

For Icecast you can find some benchmarks for the following topics at https://icecast.org/loadtest/

- [Testing the maximum numbers of connected listeners](https://icecast.org/loadtest/1/)
- [Testing the maximum numbers of connected sources](https://icecast.org/loadtest/2/)
- [Icecast/Shoutcast comparsion](https://icecast.org/loadtest/3/)
