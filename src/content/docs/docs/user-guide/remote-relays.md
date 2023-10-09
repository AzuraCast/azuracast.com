---
title: Remote Relays
description: Adding and using remote stream relays with AzuraCast and AzuraRelay
published: true
date: 2021-02-09T03:20:11.244Z
tags: user guide
editor: markdown
dateCreated: 2021-02-06T22:46:31.290Z
---

:::tip[Required Permissions]
To manage remote relays, users must be in a role that has the "Manage Station Media" permission for the given station.
:::

When you want to broadcast the radio signal created on your AzuraCast installation to a remote source, you should create a remote relay.

There are two primary types of remote relay:

- **Statistics Only:** You can add a relay, but not instruct the AutoDJ to connect to it; this is useful if the remote relay already connects to your main station and relays the broadcast itself. The relay's statistics will be included with your other station statistics automatically.

- **Full Relay:** In this type of relay, your AzuraCast installation's AutoDJ broadcasts its signal to the remote relay directly, and AzuraCast then includes the remote relay's statistics along with your other station statistics.

## AzuraRelay

If you're serving radio traffic to a large volume of listeners and want to add redundant relays in the easiest way possible, we offer a separate project called [AzuraRelay](https://github.com/AzuraCast/AzuraRelay) that is the perfect complement to AzuraCast itself.

Install AzuraRelay on a VPS of your choice, configure it to refer to the base AzuraCast installation, and it will automatically pull a list of available streams and relay them, while sending listener statistics back to the main installation.

You can add as many AzuraRelay instances as you want, and they will have very little performance impact on the main installation, because the relays are configured to pull the transcoded signal from AzuraCast's mount points and relay it directly.

Take a look at our [documentation of the AzuraRelay](/docs/administration/azurarelay) for installation instructions.
