---
title: Mount Points
---

# Mount Points

Mount Points are how listeners connect and listen to your broadcasts.

Each Station in AzuraCast represents one single broadcast (with one currently playing title, artist, etc.), but with multiple Mount Points you can output that broadcast in multiple formats (i.e. MP3, Ogg Vorbis) or bitrates (i.e. 128kbps or 64kbps).

## Required Permissions

To manage mount points, users must be in a role that has the "Manage Station Mount Points" permission for the given station.

## Adding a intro file
:::warning
This guide is for Docker installations only.
:::

You can add an .mp3 file that is playing when someone connects to your station by mounting your .mp3 file via a `docker-compose.override.yml` into the stations container. What you have to do there is basically creating a file called `docker-compose.override.yml` in the same directory as your `docker.sh` and `docker-compose.yml` with the following content.
This needs to be placed within the `/var/azuracast` directory.  

```
version: '2.2'

services:
    stations:
        volumes:
            - /path/to/your/file.mp3:/usr/local/share/icecast/web/intro.mp3
```
You can place your .mp3 file anywhere on your host machine. You just have to specify the path to it by replacing this part: `/path/to/your/file.mp3`
Now restart AzuraCast via `docker-compose down && docker-compose up -d`

After you've done that you need to go to your mountpoint configuration in AzuraCast and add <intro>/intro.mp3</intro> to the Advanced Custom Frontend Configuration

You might run into format mismatch errors as the intro file has to match what the mountpoint is configured to broadcast. From the Icecast docs: Make sure the format of the file specified matches the streaming format. For more information, you can view the [IceCast documentation here.](https://www.icecast.org/docs/)

