---
title: Docker
---

# Docker Self-Installation

AzuraCast is powered by Docker and uses pre-built images that contain every component of the software. Don't worry if you aren't very familiar with Docker; our easy installer tools will handle installing Docker and Docker Compose for you, and updates are very simple.

### System Requirements

- A 64-bit x86 (x86_64) CPU
- 2GB or greater of RAM
- 20GB or greater of hard drive space
- A computer/server capable of running Docker

For Linux hosts, the `sudo`, `curl` and `git` packages should be installed before installing AzuraCast. Most Linux distributions include these packages already.

::: tip
**On Linux, you don't need to install Docker or Docker Compose yourself; the AzuraCast installer handles both for you.**

It's recommended to use AzuraCast's installer, as it will automatically install the latest version of Docker and Docker Compose, which may be newer than the version that ships with your host operating system. You **should not** use the Ubuntu Snap installer to install Docker or Docker Compose, as this causes unexpected issues and is not supported.

If you're developing on Windows or Mac, you should install the Docker Desktop client before continuing.
::: 

### Choosing an Operating System

::: tip
**Regardless of which OS you choose, to avoid any compatibility or permissions issues you should install AzuraCast on a fresh minimal installation without Docker or Docker Compose installed.**
::: 

We strongly recommend one of the following distributions and versions for your AzuraCast installation:

 - **Ubuntu 20.04 LTS** (Recommended)
 - Ubuntu 18.04 LTS
 - Ubuntu 16.04 LTS (Compatible, but updating is recommended)
 - Debian 10 "Buster"
 - Debian 9 "Stretch"

#### Known Incompatibilities

 - **OpenVZ or LXC-based Web Hosts**: Some hosting providers use OpenVZ or LXC, and sometimes these technologies are incompatible with Docker. If the Docker installation does not work on your host, you should consider using a different server for AzuraCast, or you can use the unsupported [Ansible installation method](/install/ansible.html).

 - **CentOS**: Recent versions of CentOS are moving away from supporting Docker and instead supporting Podman, a different container-based solution. AzuraCast does not currently support being deployed on Podman. If you are selecting a Linux OS for your server, the LTS distributions of Ubuntu and Debian are strongly recommended.

### Installing

Connect to the server or computer you want to install AzuraCast on via an SSH terminal. You should be an administrator user with either root access or the ability to use the `sudo` command. If you are not the `root` user, you may need to run `sudo su -` before executing the commands below.

Pick a base directory on your host computer that AzuraCast can use. If you're on Linux, you can follow the steps below to use the recommended directory:

```bash
mkdir -p /var/azuracast
cd /var/azuracast
```

Use these commands to download our Docker Utility Script, set it as executable and then run the Docker installation process:

```bash
curl -fsSL https://raw.githubusercontent.com/AzuraCast/AzuraCast/master/docker.sh > docker.sh
chmod a+x docker.sh
./docker.sh install
```

On-screen prompts will show you how the installation is progressing.

Once installation has completed, be sure to follow the post-installation steps. You can also [set up LetsEncrypt](/developers/docker-sh.html#available-commands) or make other changes to your installation using the [Docker Utility Script](/developers/docker-sh.html#download-the-utility-script) that you've just downloaded.

### Post-Installation Tasks

Our administration guide has several pages dedicated to tasks you should complete once your installation is finished:

- [Post-installation Setup](/administration/system/initial-setup)
- [Updating](/administration/system/updating)
- [Backup & Restore](/administration/system/backup)
- [Enable Advanced Features](/extending/advanced-features)
