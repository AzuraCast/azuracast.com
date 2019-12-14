---
title: Using CloudFlare
---

# Using CloudFlare

[CloudFlare](https://cloudflare.com/) is a leading provider of reverse proxying and CDN services for the web. Their free tier offers huge benefits in performance and protection that you can take advantage of while using AzuraCast, with a few important caveats. This document details how to use CloudFlare with AzuraCast.

[[toc]]

## Enabling CloudFlare with AzuraCast

AzuraCast has full support for using CloudFlare's protection in front of your radio server.

Enabling CloudFlare support from the CloudFlare control panel is as simple as ensuring the little "cloud" next to your radio server's domain (or subdomain) is orange, indicating protection is enabled.

![](/img/cloudflare_enable.png)

The default settings for CloudFlare will suffice, though you can also switch from "Flexible" to "Full" SSL mode if you like (since AzuraCast itself supports HTTPS). "Strict" SSL mode isn't recommended, as this requires that you maintain an up-to-date SSL certificate on AzuraCast itself (which is possible, but not necessary).

Once you've enabled CloudFlare support for your domain (or radio station's subdomain) from the CloudFlare control panel, you only need to enable one feature inside AzuraCast to enable listeners to connect:

### Enabling the Web Proxy for Radio Broadcasts

One major limitation imposed by CloudFlare is that they do not forward incoming connections to your server that don't come from the traditional web ports (that is, 80 and 443). By default, AzuraCast serves each radio station on its own distinct port in a range from 8000 to 9000. This means your listeners wouldn't normally be able to connect.

![](/img/cloudflare_proxy.png)

Fortunately, we've already built a solution to this problem! In AzuraCast's system administration, on the "System Settings" page, we have a checkbox labeled "Use Web Proxy for Radio". Enable this checkbox and all of the station playback URLs across the system will be updated to automatically use the web port proxy links, which are fully accessible even when CloudFlare protection is enabled.

## Important Notes

### Bandwidth Savings

The nature of streaming radio means it's all but impossible for a service like CloudFlare to cache the radio signal itself using its servers; instead, it passes all of this traffic through to your server directly. This means that CloudFlare will not help you avoid hitting hosting provider bandwidth quotas for your radio service itself.

However, this doesn't mean that you won't see _any_ bandwidth reduction by using CloudFlare; if you use the AzuraCast public pages or its "Now Playing" API, CloudFlare caches both very well and offers significant reductions in the bandwidth needed to serve those pages.

### Incoming DJ Connections

Because CloudFlare blocks any incoming connections that aren't on the standard web ports, it also blocks the incoming connections that your streamers/DJs would use to broadcast to your station. Unlike the experience we offer listeners through our radio proxy, we can't proxy the incoming broadcast in the same way for technical reasons.

We recommend instructing your streamers/DJs to connect to your server using its IP address rather than its CloudFlare-protected domain name. This will allow them to connect without any issue, and without exposing your origin IP to your regular listener base.

### AzuraRelay Instances

If you use AzuraRelay instances that should relay a CloudFlare-protected installation, you should use the IP address of the installation as the base URL for the relay (in a format like `http://127.0.0.1`), rather than the public-facing CloudFlare-protected address. Otherwise, no changes are needed.