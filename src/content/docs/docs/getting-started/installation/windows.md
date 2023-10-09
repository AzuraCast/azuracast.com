---
title: Installing AzuraCast on Windows
published: true
date: 2021-12-14T07:32:54.423Z
tags: 
editor: markdown
dateCreated: 2021-12-14T07:32:52.563Z
---


Installing AzuraCast on newer editions of Windows 10 (and Windows 11) is quite simple, thanks to the recent addition of the Windows Subsystem for Linux (WSL) version 2.

## Installing with WSL2

:::tip
Version 2 of the Windows Subsystem for Linux (WSL) will work on any edition of Windows, including Home editions.
:::

### Install Docker Desktop for Windows

The first step is to install WSL2 on your computer. One of the easiest ways to do this is to [download Docker Desktop for Windows](https://www.docker.com/products/docker-desktop).

When running the installer, you will be prompted to automatically set up your Windows installation to work with WSL2. Make sure this option remains checked, and it will direct you to the necessary steps to get WSL2 running for your installation.

### Set WSL2 as the Default Version

Once WSL2 is installed and configured, and Docker Desktop is up and running, open a terminal window and type the following command:

```
wsl --set-default-version 2
```

This ensures that any new Linux distributions will use version 2 of WSL by default, which is the desired behavior.

### Install a Linux Distribution from the Windows Store

Now you should install a Linux distribution that will serve as the host of your AzuraCast instance. Per our [requirements](/docs/getting-started/requirements), you can select from several operating systems as your host OS, but the one with the best compatibility and support is the latest LTS build of Ubuntu, which you can install from the link below:

- [Ubuntu on the Microsoft Store](https://www.microsoft.com/en-us/p/ubuntu/9nblggh4msv6?activetab=pivot:overviewtab)

### Select That Distribution as Default

For convenience, you can set the newly installed distribution as your "default" WSL2 distribution, which means it automatically gets integration with Docker Desktop for Windows.

You can list the names of all installed WSL2 distributions by running:

```
wsl --list
```

To set one as your default, enter its name in the command below. If you followed the recommendations here and used Ubuntu, you can run this command:

```
wsl --set-default Ubuntu
```

### Open a Linux Shell

Your newly installed Linux distribution should be listed on the Start menu. Clicking the name of the distribution will open a terminal window with access to that distribution. If you're using Windows Terminal, you should also see a new option when creating a new tab to open a shell that connects to your installed Linux distribution.

### Follow the Standard AzuraCast Installation Instructions

Inside the Linux shell window, you can follow our standard Linux Docker installation instructions. You don't need to make any changes to this process for it to work in this environment.

- [Docker Installation](/docs/getting-started/installation/docker)

### Installation Complete

Once your installation is complete, by default, you will be able to access AzuraCast from your host Windows operating system by visiting `http://localhost`.
