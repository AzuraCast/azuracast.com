---
title: Promoting Your Station
description: Tools for helping listeners discover your station.
published: true
date: 2023-08-31T04:17:40.683Z
tags: 
editor: markdown
dateCreated: 2023-08-31T03:30:06.364Z
---

There are many directories around the Web where users can find new radio stations to listen to. This page documents how to integrate your AzuraCast station with these directories.

## Webhook-Based Directories

These directories support any broadcast technology and receive "Now Playing" metadata updates via a custom API, which we implement in AzuraCast via our Web Hooks feature.

### TuneIn AIR

AzuraCast supports sending automatic metadata updates to TuneIn's [AIR broadcasting API](https://tunein.com/broadcasters/api/) via a Web Hook.

You will first need a station ID from TuneIn. Contact them directly for more information about signing up for an API account.

Once you have a station ID, you can create a new web hook via the `Web Hooks` station sidebar menu inside AzuraCast.

### Radio.de

AzuraCast supports sending automatic metadata updates to [Radio.de's Metadata Push API](https://corporate.radio.de/sender/) as of Version 0.19.1.

You should first contact the Radio.de team directly to gain access to the API. Once you have the necessary credentials, you can create a new web hook via the `Web Hooks` station sidebar inside AzuraCast.

### GetMeRadio

AzuraCast supprots sending automatic metadata updates to [GetMeRadio](https://my.getmeradio.com) as of Version 0.19.2.

Contact the GetMeRadio team first to gain access to their API. Once you have the necessary credentials, you can create a new web hook via the `Web Hooks` station sidebar inside AzuraCast.

## YellowPages Directories

These directories use Icecast's built-in YellowPages (YP) discovery mechanism to submit routine updates. They require using Icecast to broadcast rather than Shoutcast or HLS.

:::tip
Adding YellowPages directories requires that the "Enable Advanced Settings" system setting is enabled in AzuraCast. An installation administrator can enable this setting at any time from the web interface.
:::

:::tip
By default, all mount points on a station will be advertised to any Yellow Pages directory. To limit which mount points are visible,you can edit a mount point and uncheck the `Publish to "Yellow Pages" Directories` setting.
:::

### Xiph Icecast Directory

Xiph, the maintainers of Icecast, also maintain a public directory of stations at [dir.xiph.org](https://dir.xiph.org/).

To add your station to the directory, edit your station's profile, then under the "Broadcasting" tab, you will find "Custom Configuration" at the bottom of the page.

You can add the following entry to broadcast to the Xiph directory:

```xml
<directory>
  <yp-url-timeout>15</yp-url-timeout>
  <yp-url>http://dir.xiph.org/cgi-bin/yp-cgi</yp-url>
</directory>
```

### Internet-radio.com

The station directory at [internet-radio.com](https://www.internet-radio.com/) supports and recommends using Icecast's YellowPages directory to manage your station listing on their web site. Their forum includes [specific instructions for Icecast](https://www.internet-radio.com/community/threads/icecast-server-yp-directory-settings.22223/).

To integrate the custom directory code into AzuraCast, edit your station's profile, then under the "Broadcasting" tab, you will find "Custom Configuration" at the bottom of the page.

You can add the following entry:

```xml
<directory>
  <yp-url-timeout>15</yp-url-timeout>
  <yp-url>http://dir.xiph.org/cgi-bin/yp-cgi</yp-url>
</directory>
```

## Icecast Header Directories

These directories receive metadata updates via custom headers provided directly in your Icecast stream. They require using Icecast to broadcast rather than Shoutcast or HLS.

:::tip
Adding custom Icecast headers requires that the "Enable Advanced Settings" system setting is enabled in AzuraCast. An installation administrator can enable this setting at any time from the web interface.
:::

### radio-browser.info

First, review the [Station owner instructions](https://www.radio-browser.info/owners) on the directory web site.

To add custom headers to a station, open the `Broadcasting` sidebar menu, then click `Mount Points`. Click `Edit` on a mount point, and supply the custom headers in the advanced configuration for the mount point:

```xml
<http-headers>
  <header name="icy-index-metadata" value="1" />
  <header name="icy-logo" value="https://example.com/besticon.png" />
  <header name="icy-country-code" value="at" />
  <header name="icy-country-subdivision-code" value="at-1" />
  <header name="icy-language-codes" value="en,de" />
  <header name="icy-main-stream-url" value="http://example.com:8000/teststream" />
  <header name="icy-geo-lat-long" value="12.345,-23.456" />
</http-headers>
```
