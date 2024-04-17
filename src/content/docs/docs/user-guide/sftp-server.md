---
title: SFTP Server
description: The built-in SFTP server for Docker installations
published: true
date: 2023-08-16T21:04:45.633Z
tags: docker, user guide
editor: markdown
dateCreated: 2023-07-30T12:14:43.684Z
---

:::tip
The Built-in SFTP server is only available on the Docker installation.
:::

All AzuraCast Docker installations come with a built-in SFTP server that allows you to easily connect to your media directory, upload and move files using software of your choice.

## Creating SFTP Users

:::tip
You will only be able to connect to the SFTP server to manage your media if your station's storage location is a "Local" one to the server. If you're connecting to S3, Dropbox, etc. then you can instead use clients that can connect directly to the same storage location your station is using.
:::

Under the `Media` sidebar menu for a given station, you will see an entry labeled `SFTP Users`. Click this to view existing users and the connection details for connecting to your server via an SFTP client of your choice.

## Default Port

By default, the SFTP service listens externally on port 2022. If there is something else using this port or you want to change it for any other reason, you can edit the `.env` file on your host machine and add or modify this line:

```
AZURACAST_SFTP_PORT=2022
```

:::tip
Note, this is a file named `.env`, with no filename, and not the `azuracast.env` file
:::

## Connecting to SFTP

### SFTP clients
Here's a small list of FTP clients you can use that are known to work with AzuraCast's SFTP system.

- [Filezilla](https://filezilla-project.org/) - Windows, MacOS and Linux 32 bit & 64 bit
- [WinSCP](https://winscp.net/eng/download.php) - Windows only
- [Cyberduck](https://cyberduck.io/) - Windows and MacOS

A more exhaustive list can be found [here](https://en.wikipedia.org/wiki/Comparison_of_FTP_client_software).

### Mounting as a Directory on Your Computer

There are also numerous tools that let you create a virtual filesystem based on an SFTP connection, which then lets you drag and drop files to and from the filesystem using your OS's standard file explorer:

- [Mountain Duck](https://mountainduck.io/) - Windows and MacOS
- [ExpanDrive](https://www.expandrive.com/) - Windows, MacOS and Linux
- [SSHFS for Linux/MacOS](https://github.com/libfuse/sshfs)
- [SSHFS for Windows](https://github.com/winfsp/sshfs-win)

For more information on configuring SSHFS, see [this thread](https://github.com/AzuraCast/AzuraCast/discussions/6510).
