---
title: About AzuraCast
sidebar: auto
---

# About AzuraCast

[[toc]]

## What is AzuraCast?

**AzuraCast** is a self-hosted, all-in-one web radio management suite. Using its easy installer and powerful but intuitive web interface, you can start up a fully working web radio station in a few quick minutes. 

AzuraCast works for web radio stations of all types and sizes, and is built to run on even the most affordable VPS web hosts. AzuraCast's mascot is [Azura Ruisselante](./mascot.html), created by [Tyson Tan](https://tysontan.deviantart.com/).

**AzuraCast is currently in beta.** Many web radio stations already run AzuraCast, but keeping your server up-to-date with the latest code from the GitHub repository is strongly recommended for security, bug fixes and new feature releases. It's unlikely, but updates may result in unexpected issues or data loss, so always make sure to keep your station's media files backed up in a second location.

To install AzuraCast, you should have a basic understanding of the Linux shell terminal. Once installed, every aspect of your radio station can be managed via AzuraCast's web interface.

## Screenshots

![](/img/ScreenshotTour.gif)

[More Screenshots](./screenshots.html)

## Features

#### For Radio Stations

- **Rich Media Management:** Upload songs, edit metadata, preview songs and organize music into folders from your browser.
- **Playlists:** Add music to standard-rotation playlists (in sequential or shuffled playback order) or schedule a playlist to play at a scheduled time, or once per x songs/minutes/etc.
- **Live DJs:** Set up individual DJ/streamer accounts and see who's currently streaming from your station's profile page.
- **Web DJ:** Broadcast live directly from your browser, with no extra software needed, with AzuraCast's built-in Web DJ tool.
- **Public Pages:** AzuraCast includes embeddable public pages that you can integrate into your existing web page or use as the basis for your own customized player.
- **Listener Requests:** Let your listeners request specific songs from your playlists, both via an API and a simple public-facing listener page.
- **Remote Relays:** Broadcast your radio signal (including live DJs) to any remote server running Icecast or SHOUTcast.
- **Web Hooks:** Integrate your station with Slack, Discord, TuneIn, Twitter and more by setting up web hooks that connect to third-party services.
- **Detailed Analytics and Reports:** Keep track of every aspect of your station's listeners over time. View reports of each song's impact on your listener count. You can also generate a report that's compatible with SoundExchange for US web radio royalties.

#### For Server Administrators

- **Role-based User Management:** Assign global and per-station permissions to a role, then add users to those roles to control access.
- **Custom Branding:** Modify every aspect of both the internal and public-facing AzuraCast pages by supplying your own custom CSS and JavaScript. 
- **Authenticated RESTful API:** Individual users in the system can create API keys which have the same permissions they have in the system. The AzuraCast API is a powerful and [well-documented](https://www.azuracast.com/api/index.html) tool for interacting with installations. 
- **Web Log Viewing:** Quickly diagnose problems affecting any part of the AzuraCast system through the system-wide web log viewer.
- **Automatic Radio Proxies:** Many users can't connect directly to radio station ports (i.e. 8000) by default, so AzuraCast includes an automatic nginx proxy that lets listeners connect via the http (80) and https (443) ports. These proxies are also compatible with services like CloudFlare.

### What's Included

Whether you're using the Bare-metal installer or Docker containers, AzuraCast will automatically retrieve and install these components for you:

#### Radio Software

* **[Liquidsoap](https://www.liquidsoap.info/)** as the always-playing "AutoDJ"
* **[Icecast 2.4](https://icecast.org/)** as a radio broadcasting frontend (Icecast-KH installed on supported platforms)
* **[SHOUTcast 2 DNAS](http://wiki.shoutcast.com/wiki/SHOUTcast_DNAS_Server_2)** as an alternative radio frontend (x86/x64 only)

#### Supporting Software

* **[NGINX](https://www.nginx.com)** for serving web pages and the radio proxy
* **[MariaDB](https://mariadb.org/)** as the primary database
* **[PHP 7.2](https://secure.php.net/)** powering the web application
* **[Redis](https://redis.io/)** for sessions, database and general caching 

## Live Demo

Want to see AzuraCast for yourself?

We have a demo site with a small AzuraCast installation and a single radio station, where you can see the basics of the AzuraCast web interface in action.

Visit our demo site at [demo.azuracast.com](https://demo.azuracast.com/):

* Username: `demo@azuracast.com`
* Password: `demo`

::: tip Note
The AzuraCast demo instance automatically resets at the top of every hour to a fresh copy. If you try to access the demo site at exactly the top of the hour, you may be automatically redirected back to this page; just try again in a minute or two.
:::

## Installing

Installing AzuraCast on your own server is very easy and only requires a basic understanding of the Linux terminal shell. Check out our [full installation instructions](https://www.azuracast.com/install/).

## License

AzuraCast is licensed under the [Apache license, version 2.0](https://github.com/AzuraCast/AzuraCast/blob/master/LICENSE.txt). This project is free and open-source software, and pull requests are always welcome.

## Questions? Comments? Feedback?

AzuraCast is a volunteer project, and we depend on your support and feedback to keep growing. Issues for this codebase are tracked using [GitHub Issues](https://github.com/AzuraCast/AzuraCast/issues/new). Anyone can create a new issue for the project, and if you have any problems with your installation or ideas for new features to add, you are encouraged to do so.

## Friends of AzuraCast

We would like to thank the following organizations for their support of AzuraCast's ongoing development:

- [DigitalOcean](https://m.do.co/c/21612b90440f) for generously providing the server resources we use for our demonstration instance, our staging and testing environments, and more
- [JetBrains](https://www.jetbrains.com/) for making our development faster, easier and more productive with tools like PhpStorm
- [CrowdIn](https://crowdin.com/) for giving us a simple and powerful tool to help translate our application for users around the world
- [Sentry](https://sentry.io/) for providing a great way to aggregate errors being reported from AzuraCast installations around the web
- [Netlify](https://www.netlify.com/) for supporting open-source software like ours and for serving as the host of this web site!

- The creators and maintainers of the many free and open-source tools that AzuraCast is built on, who have done so much to help move FOSS forward
