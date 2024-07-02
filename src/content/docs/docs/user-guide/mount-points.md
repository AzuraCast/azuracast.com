---
title: Mount Points
description: Managing how listeners connect and listen to your broadcasts with Mount Points
published: true
date: 2021-04-09T08:32:34.823Z
tags: user guide
editor: markdown
dateCreated: 2021-02-06T22:44:39.864Z
---

:::tip[Required Permissions]
To manage mount points, users must be in a role that has the "Manage Station Mount Points" permission for the given station.
:::

Mount Points are how listeners connect and listen to your broadcasts.

Each Station in AzuraCast represents one single broadcast (with one currently playing title, artist, etc.), but with multiple Mount Points you can output that broadcast in multiple formats (i.e. MP3, Ogg Vorbis) or bitrates (i.e. 128kbps or 64kbps).

Note that not all formats are compatible with all platforms. For instance, iOS users won't be able to listen to the Ogg format as it is not supported by Safari on iOS at the moment.
 [Checking formats compatibility](https://caniuse.com/) can help you decide which one will be better for your station.

## Advanced

### Mount Point URL

You can set a custom URL for streams that AzuraCast will use when referring to it in both the web UI and in [API responses](/docs/developers/now-playing-data/#standard-now-playing-api) (specifically, `station.listen_url` and `mounts.*.url`). Leaving the field empty uses the default value, generated in the format: `{HTTP/HTTPS}://{BASE_URL}.TLD/listen/{STATION_URL_STUB}/{MOUNT_POINT_URL}`.

### Custom Frontend Configuration

This is a good spot to define mount-specific settings such as an [intro file](/docs/administration/docker/#stream-intro-file) or [http headers](https://www.stream-meta.info/version_2_headers.html).
