---
title: About AzuraCast
description: Learn about AzuraCast
published: 1
date: 2023-02-14T01:24:12.352Z
tags: 
editor: markdown
dateCreated: 2022-10-04T18:49:39.855Z
---

:::tip[AzuraCast is currently in beta!]
Many web radio stations already run AzuraCast, but keeping your server up-to-date with the latest code from the GitHub repository is strongly recommended for security, bug fixes and new feature releases. It's unlikely, but updates may result in unexpected issues or data loss, so always make sure to keep your station's media files backed up in a second location.

To install AzuraCast, you should have a basic understanding of the Linux shell terminal. Once installed, every aspect of your radio station can be managed via AzuraCast's web interface.
:::

![](https://img.shields.io/packagist/v/azuracast/azuracast.svg?label=latest+stable+version&style=for-the-badge)

**AzuraCast** is a self-hosted, all-in-one web radio management suite. Using its easy installer and powerful but intuitive web interface, you can start up a fully working web radio station in a few quick minutes.

AzuraCast works for web radio stations of all types and sizes, and is built to run on even the most affordable VPS web hosts.

## Core Features

### For Radio Stations

- **Rich Media Management:** Upload songs, edit metadata, preview songs and organize music into folders from your browser.
- **Playlists:** Add music to standard-rotation playlists (in sequential or shuffled playback order) or schedule a playlist to play at a scheduled time, or once per x songs/minutes/etc.
- **Live DJs:** Set up individual DJ/streamer accounts and see who's currently streaming from your station's profile page.
- **Web DJ:** Broadcast live directly from your browser, with no extra software needed, with AzuraCast's built-in Web DJ tool.
- **Public Pages:** AzuraCast includes embeddable public pages that you can integrate into your existing web page or use as the basis for your own customized player.
- **Listener Requests:** Let your listeners request specific songs from your playlists, both via an API and a simple public-facing listener page.
- **Remote Relays:** Broadcast your radio signal (including live DJs) to any remote server running Icecast or SHOUTcast.
- **Web Hooks:** Integrate your station with Slack, Discord, TuneIn, Twitter and more by setting up web hooks that connect to third-party services.
- **Detailed Analytics and Reports:** Keep track of every aspect of your station's listeners over time. View reports of each song's impact on your listener count. You can also generate a report that's compatible with SoundExchange for US web radio royalties.

### For Server Administrators

- **Role-based User Management:** Assign global and per-station permissions to a role, then add users to those roles to control access.
- **Custom Branding:** Modify every aspect of both the internal and public-facing AzuraCast pages by supplying your own custom CSS and JavaScript.
- **Authenticated RESTful API:** Individual users in the system can create API keys which have the same permissions they have in the system. The AzuraCast API is a powerful and [well-documented](https://www.azuracast.com/api/index.html) tool for interacting with installations.
- **Web Log Viewing:** Quickly diagnose problems affecting any part of the AzuraCast system through the system-wide web  log viewer.
- **Automatic Radio Proxies:** Many users can't connect directly to radio station ports (i.e. 8000) by default, so  AzuraCast includes an automatic nginx proxy that lets listeners connect via the http (80) and https (443) ports. These proxies are also compatible with services like CloudFlare.
- **Storage Location Management:** Station media, live recordings and backups can be stored localy or on an S3 compatible storage provider.

## What's Included

AzuraCast will automatically retrieve and install these components for you:

### Radio Software

* **[Liquidsoap](https://www.liquidsoap.info/)** as the always-playing "AutoDJ"
* **[Icecast-KH](https://icecast.org/)** as a radio broadcasting frontend

For x86/x64 installations, [SHOUTcast 2 DNAS](http://wiki.shoutcast.com/wiki/SHOUTcast_DNAS_Server_2) can also be used as a broadcasting frontend. SHOUTcast is non-free software and does not come bundled with AzuraCast, but can be installed via the administration panel after AzuraCast has been installed.

### Supporting Software

* **[NGINX](https://www.nginx.com)** for serving web pages and the radio proxy
* **[MariaDB](https://mariadb.org/)** as the primary database
* **[PHP](https://secure.php.net/)** powering the web application
* **[Redis](https://redis.io/)** for sessions, message queue storage, database and general caching
* **[Centrifugo](https://centrifugal.dev/)** for high-performance "Now Playing" data feeds

## AzuraCast API

Once installed and running, AzuraCast exposes a REST API that allows you to monitor and interact with your stations. Documentation about this API and its endpoints are available on the [AzuraCast API Documentation](https://www.azuracast.com/api/index.html).

All of AzuraCast's frontend actions are performed through the API, so through API calls, you can manage your station(s) entirely via the API.

## License
AzuraCast is licensed under the [Affero GNU General Public License (GPL), version 3.0](https://github.com/AzuraCast/AzuraCast/blob/main/LICENSE.md). This project is free and open-source software, and pull requests are always welcome

## Friends of AzuraCast
We would like to thank the following organizations for their support of AzuraCast's ongoing development:

- [DigitalOcean](https://m.do.co/c/21612b90440f) For generously providing the server resources we use for our demonstration instance, our staging and testing environments, and more
- [JetBrains](https://www.jetbrains.com/) For making our development faster, easier and more productive with tools like PhpStorm
- [CrowdIn](https://crowdin.com/) For giving us a simple and powerful tool to help translate our application for users around the world
- [Netlify](https://www.netlify.com/) For supporting open-source software like ours and for serving as the host of our web site!
- [BrowserStack](https://www.browserstack.com/) For providing us a tool that allows us to test across multiple browsers in one place
- [Depot](https://depot.dev/?utm_source=AzuraCast) for powering our Docker image builds.

...and the creators and maintainers of the many free and open-source tools that AzuraCast is built on, who have done so much to help move FOSS forward!
