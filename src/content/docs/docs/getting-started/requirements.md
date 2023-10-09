---
title: Requirements
description: This page tells you what is required to run AzuraCast
published: true
date: 2022-05-20T14:32:58.323Z
tags: getting started
editor: markdown
dateCreated: 2021-02-05T18:58:13.221Z
---

AzuraCast is powered by Docker and uses pre-built images that contain every component of the software. Don't worry if you aren't very familiar with Docker; our easy installer tools will handle installing Docker and Docker Compose for you, and updates are very simple.

:::caution[A general disclaimer...]
AzuraCast does not ensure, and is not liable for, music licenses and royalties paid to creators. Copyright and royalty laws vary widely from country to country around the world, and you will need to follow the appropriate laws for your location. If in doubt, consult with an attorney.
:::

## 🖥️ System Requirements

### Minimum Requirements
- A 64-bit x86 (x86_64/amd64) or ARM64 CPU
- at least 2GB of RAM
- 20GB or greater of hard drive space
- A computer/server capable of running Docker

For Linux hosts, the `sudo`, `curl` and `git` packages should be installed before installing AzuraCast. Most Linux distributions include these packages already. This is the barest of minimum to run AzuraCast, there's no guarantees it will run perfectly. 

### Recommended Requirements
- 4 CPU cores
- 4GB of ram. 
- 40 GB or greater of hard drive space 
- A computer/server capable of running Docker

Recommeneded Requirements should allow  you to run a few stations with ease, this is aimed for hobby usage (5 to 10 stations). [If you wish to increase the memory even further, consult this guide on Swap Space](https://www.digitalocean.com/community/tutorials/how-to-add-swap-space-on-ubuntu-20-04)

## 📀 Operating System

:::tip
Regardless of which OS you choose, to avoid any compatibility or permissions issues you should install AzuraCast on a fresh minimal installation without Docker or Docker Compose installed.
:::

We strongly recommend one of the following distributions and versions for your AzuraCast installation:

- Ubuntu 22.04 LTS (Docker only)
- Ubuntu 20.04 LTS (Ansible / Docker)
- Ubuntu 18.04 LTS (Docker only) 
- Debian 10 "Buster" (Ansible / Docker)
- Debian 9 "Stretch" (Ansible / Docker)
- MacOS - Using Docker Desktop

- Windows 10 - Using Docker Desktop + WSL2
- Windows 11 - Using Docker Desktop + WSL2

## ⚠️ Known Incompatibilities

- **OpenVZ or LXC-based Web Hosts:**

  - Some hosting providers use OpenVZ or LXC, and sometimes these technologies are incompatible with Docker. If the Docker installation does not work on your host, you should consider using a different server for AzuraCast, or you can use the unsupported Ansible installation method.

- **CentOS:**
  - Recent versions of CentOS are moving away from supporting Docker and instead supporting Podman, a different container-based solution. AzuraCast does not currently support being deployed on Podman. If you are selecting a Linux OS for your server, the LTS distributions of Ubuntu and Debian are strongly recommended.
  
- **MacOS incompatabilities with M1 CPUs:**
  - Apple's flagship chip, the M1, is not fully compatable with AzuraCast and the Docker Desktop due to incompatabilities with  processor architecture. We'll review this in the future to see if there's any workarounds.
  
## 📊 Resource Usage

On the Administration page you can find a basic `Server Status` section that shows you the `CPU Load`, `Memory` and `Disk Space` usage of your server.

### IceCast

For IceCast you can find some benchmarks for the following topics at https://icecast.org/loadtest/

- [Testing the maximum numbers of connected listeners](https://icecast.org/loadtest/1/)
- [Testing the maximum numbers of connected sources](https://icecast.org/loadtest/2/)
- [Icecast/Shoutcast comparsion](https://icecast.org/loadtest/3/)
