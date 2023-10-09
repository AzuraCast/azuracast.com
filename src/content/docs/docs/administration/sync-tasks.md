---
title: Synchronized Tasks
description: All about the AzuraCast automatic processing tasks
published: true
date: 2021-04-17T10:52:27.198Z
tags: administration
editor: markdown
dateCreated: 2021-02-06T04:53:24.798Z
---

AzuraCast has some background tasks that are regularly triggered to run internal processing jobs that are neccessary for the operation of your stations.

On this page you will find an overview of all the `Sync Tasks` that AzuraCast depends on.

## Increasing Execution Timeout

If you are regularly running into timeouts while a sync task is processing you can manually increase the time that the sync tasks are allowed to run via the `azuracast.env` in `/var/azuracast/`.

In the `azuracast.env` look for the following entries and increase the specified time in seconds to your needs.

```
# The maximum execution time (and lock timeout) for the 15-second, 1-minute and 5-minute synchronization tasks.
# SYNC_SHORT_EXECUTION_TIME=600

# The maximum execution time (and lock timeout) for the 1-hour synchronization task.
# SYNC_LONG_EXECUTION_TIME=1800
```

This is how these lines should look like after changing (the values are just for demonstration):

```
# The maximum execution time (and lock timeout) for the 15-second, 1-minute and 5-minute synchronization tasks.
SYNC_SHORT_EXECUTION_TIME=900

# The maximum execution time (and lock timeout) for the 1-hour synchronization task.
SYNC_LONG_EXECUTION_TIME=2200
```

After changing these entries restart your AzuraCast installation via:

```
docker-compose down
docker-compose up -d
```

## Synchronized Tasks

### ReactivateStreamer

When manually disconnecting a live DJ you can let AzuraCast disable their account for a set amount of time. This task is responsible for re-activating the DJ accounts after the time has passed.

### CheckRequests

This task is responsible for sending user requested songs to the Liquidsoap AutoDJ to play.

### RunBackup

This task is responsible for checking if a scheduled backup needs to be run.

### CleanupRelays

This task is responsible for the automatic cleanup of relay data.

### CheckMedia

This task is responsible for scanning the media storage location for newly added or modified media files that AzuraCast needs to process.

### CheckFolderPlaylists

This task is responsible for automatically assigning the media of a folder to the playlist that the folder is assigned to.

### CheckUpdates

This task is responsible to check if there are updates available for your AzuraCast installation

### RunAnalytics

This task is responsible for updating daily listener data and analytics that can take time to calculate.

### CleanupHistory

This task is responsible for cleaning up old listener and song history data according to the system settings.

### CleanupStorage

This task is responsible for clearing the temporary data directory as well as checking the media storage locations for files that need to be removed.

### RotateLogs

This task is responsible for rotating logs and backup of the AzuraCast installation.

### UpdateGeoLite

This task is responisble for automatically updating your GeoLite database for IP-address geolocation if you have supplied an API key.
