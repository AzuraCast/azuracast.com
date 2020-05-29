---
title: Docker
---

# Docker Self-Installation

AzuraCast is powered by Docker and uses pre-built images that contain every component of the software. Don't worry if you aren't very familiar with Docker; our easy installer tools will handle installing Docker and Docker Compose for you, and updates are very simple.

::: warning
Some hosting providers use OpenVZ or LXC, and sometimes these technologies are incompatible with Docker. If the Docker installation does not work on your host, you should consider using a different server for AzuraCast, or you can use the unsupported [Ansible installation method](/install/ansible.html).
:::

### System Requirements

- A 64-bit x86 (x86_64) CPU
- 2GB or greater of RAM
- 20GB or greater of hard drive space

For Linux hosts, the `sudo`, `curl` and `git` packages should be installed before installing AzuraCast. Most Linux distributions include these packages already.

::: tip
**You don't need to install Docker or Docker Compose yourself; the AzuraCast installer handles both for you.**

It's recommended to use AzuraCast's installer, as it will automatically install the latest version of Docker and Docker Compose, which may be newer than the version that ships with your host operating system. You **should not** use the Ubuntu Snap installer to install Docker or Docker Compose, as this causes unexpected issues and is not supported.
::: 

### Installing

Connect to the server or computer you want to install AzuraCast on via an SSH terminal. You should be an administrator user with either root access or the ability to use the `sudo` command.

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