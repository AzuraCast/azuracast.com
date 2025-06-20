---
title: Station Management
description: Managing your AzuraCast station and station profile
published: true
date: 2021-02-11T02:50:43.396Z
tags: user guide
editor: markdown
dateCreated: 2021-02-06T01:36:06.013Z
---

:::tip[Required Permissions]
To view a station's administration section, users must be in a role that has the "View Station Page" permission for the specified station.
:::

Each "Station" in AzuraCast is a separate entity with its own media, playlists, DJs, mount points, remote relays and statistics.

You can create any number of stations in a single AzuraCast installation, limited only by the total resources available on the server; for example, by default, only the ports for the first 50 stations are exposed.

Each station has a main "Profile" page that offers an overview of that station's currently playing status, the status of its AutoDJ and main broadcasting software, and a list of all of its available mount points and remote relays.

If a user has the appropriate permissions, they will also see additional management options along the left sidebar of the Station Management page.

## AutoDJ (Backend) vs Broadcasting Software (Frontend)

Every station has two essential components that are always running and which generate a broadcasted signal for the station:

- The **AutoDJ** (also occasionally known as the "Broadcasting Backend") is a piece of software (in AzuraCast's case, Liquidsoap) that compiles media from various sources, different playlists and live input, and assembles that input into a single composited output stream, which it then transcodes into any number of various formats. Listeners don't connect directly to the AutoDJ to listen to the station, as it is optimized for producing the broadcast rather than serving it to a larger audience.

- The **Broadcasting Software** (or the "Broadcasting Frontend") is the lightweight piece of software (Icecast, Shoutcast, or RSAS) whose primary job is to take the signal created by the AutoDJ and broadcast it out to potentially hundreds or thousands of listeners. This software is specifically optimized to support very many concurrent incoming connections with very little impact on system performance.

Part of AzuraCast's function is to ensure both of these processes are properly configured, automatically started and kept running behind the scenes. When running an AzuraCast installation, you don't have to directly start either of these services for any station, and (with the exception of some specific changes, which require a brief restart) don't need to modify them directly for configuration changes in AzuraCast to take effect.

### Shoutcast

#### Installing Shoutcast

1. Download the Linux x64 binary from the [Shoutcast Radio Manager](https://radiomanager.shoutcast.com/register/serverSoftwareFreemium). The file name should look like: `sc_serv2_linux_x64-latest.tar.gz`
2. Upload the Binary to AzuraCast: In your AzuraCast administration panel, navigate to the "Install Shoutcast" page (under the "Stations" header). Here, you can upload the `.tar.gz` file you downloaded. AzuraCast will automatically extract it to the correct location.

#### Adding a License Key

- Visit the `Station Profile`
- Click `Edit Profile`
- Switch to the `Broadcasting` tab
- Put the following in the `Custom Configuration` section:

```json
{ "licenceid": "YOUR_LICENSE_ID", "userid": "YOUR_USER_ID" }
```

### Rocket Streaming Audio Server (RSAS)

AzuraCast supports [Rocket Streaming Audio Server (RSAS)](https://www.rocketbroadcaster.com/streaming-audio-server/), a closed-source alternative to Icecast for broadcasting your station. While AzuraCast cannot distribute RSAS directly due to its proprietary nature, you can easily install it and use it with your stations. 

#### Installing RSAS

1. Download the RSAS Binary: Visit the official [RSAS download page](https://www.rocketbroadcaster.com/streaming-audio-server/download/) and get the correct statically linked binary for your server's platform. The file name should look like: `rsas-1.x.x-linux-(amd64/aarch64).tar.gz`
2. Upload the Binary to AzuraCast: In your AzuraCast administration panel, navigate to the "Install RSAS" page (under the "Stations" header). Here, you can upload the `.tar.gz` file you downloaded. AzuraCast will automatically extract it to the correct location.
3. Upload Your License Key (if applicable): If you're using the paid version of RSAS, you'll also receive a license key file. Upload this `.key` file separately on the same "Install RSAS" page.
