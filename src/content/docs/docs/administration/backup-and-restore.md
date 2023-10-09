---
title: Backup & Restore
description: Creating backups and restoring your AzuraCast installation from them
published: true
date: 2021-10-06T01:34:36.917Z
tags: administration
editor: markdown
dateCreated: 2021-02-06T07:01:08.655Z
---

AzuraCast includes a built-in utility for backing up your installation, including your database, all stations and their settings, and optionally the local media tied with the station(s).

## Ways to Backup

### Via the Web Interface

The "System Administration" section of your AzuraCast web interface has a dedicated "Backup" page, where you can configure periodic automated backups, run a one-time backup and download existing backup files.

Backups run through the web panel do not interrupt your broadcasts or disconnect your listeners.

### Via the Command Line

If you want more control over where your backup files are going, or want to take advantage of pre-existing tools (like cron tasks) to handle the backup, you can use the Docker Utility Tool to generate backups as well.

The most basic version of this command is:

```bash
cd /var/azuracast
./docker.sh backup path-to-backup.zip
```

You can also pass the --exclude-media flag to back up just the database and statistics, but not the media itself, which significantly reduces the backup file size (but you should make sure to back your media up elsewhere):

```bash
cd /var/azuracast
./docker.sh backup path-to-backup.zip --exclude-media
```

Both .zip and .tar.gz formats are supported for backups. The correct format will automatically be determined by the extension of the filename you specify for the backup file.

## Restoring a Backup

These are the general steps for restoring a backup of AzuraCast:

:::caution[This may take a while...]
Large backups (100GB+) can take a considerably long time to fully restore onto the server and *may use* large amounts of CPU and or Memory.
:::

1. Install AzuraCast ([see our guide](/docs/getting-started/installation))
    - If you have an older backup file and encounter issues with restoring, install AzuraCast on `stable` by answering `Y` to the question "Prefer stable release versions of AzuraCast?"
2. After the installation is finished, run the restore command:
    - `./docker.sh restore path-to-backup.zip`
3. If you have used the `stable` installation due to an older backup file you should now switch back to the `rolling-release` via the following command and answer `N` to the question if you want to use the stable version:
    - `./docker.sh setup-release`
4. Finally run the following command to update the installation to the current rolling-release version:
    - `./docker.sh update`
