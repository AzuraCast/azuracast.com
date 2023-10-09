---
title: Media Management
description: Managing and uploading media files in AzuraCast
published: true
date: 2021-02-09T03:17:33.498Z
tags: user guide
editor: markdown
dateCreated: 2021-02-06T01:46:50.643Z
---

Media management is at the core of AzuraCast's built-in AutoDJ. By uploading media and assigning it to a playlist, the AutoDJ will automatically compose a live stream broadcast 24 hours a day, 7 days a week.

:::tip
For your AutoDJ to detect any files in your Media Manager, they must be added to at least one playlist. You can have media files in your station's media directory that aren't associated with any playlist, but they won't be played automatically.
:::

## Uploading Media

### Web Uploader

You can upload media directly via your web browser, by either selecting files or clicking and dragging them into a section at the top of the Media Manager.

### SFTP (Docker Only)

For Docker installations, AzuraCast offers a built-in SFTP server which allows you to easily manage your media in bulk. Visit the [SFTP Server](/docs/user-guide/sftp-server) guide for more information.

### S3 Compatible

Stations can utilize S3 compatible services (Backblaze, Digital Ocean Spaces, Linode Storage and S3) to manage it's media remotely, view our [S3 configuration](/docs/user-guide/storage-locations/s3-configuration) guide for more details.

## Auto-Assigning Folders to Playlists

From the media manager, you can select a folder, select "Set Playlists" and assign the folder to a playlist.

Once assigned to a playlist, any files added to the folder will automatically be added to those same playlists. The system won't remove any additional playlists that the media is in, but it will add the missing ones from the folder.

## Required Permissions

To manage media, users must be in a role that has the "Manage Station Media" permission for the given station.
