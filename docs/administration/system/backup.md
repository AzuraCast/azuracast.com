---
title: Backing Up and Restoring
---

# Backing Up and Restoring

## Backing Up

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

You can also pass the `--exclude-media` flag to back up just the database and statistics, but not the media itself, which significantly reduces the backup file size (but you should make sure to back your media up elsewhere):

```bash
cd /var/azuracast
./docker.sh backup --exclude-media path-to-backup.zip
```

Both `.zip` and `.tar.gz` formats are supported for backups. The correct format will automatically be determined by the extension of the filename you specify for the backup file.

## Restoring a Backup

To restore the backup later, run the following command:

```bash
cd /var/azuracast
./docker.sh restore path-to-backup.zip
```
