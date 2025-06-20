---
title: Scaling AzuraCast
description: Expectations on what resources are required to host an AzuraCast instance, and tips on how to scale up as your station grows.
published: true
date: 2021-10-09T02:48:30.612Z
tags: 
editor: markdown
dateCreated: 2021-10-08T23:42:49.762Z
---

One of the most common questions we get from our users is:

> "How many stations/listeners/etc. can my server/VPS handle if running AzuraCast?"

Unfortunately, there's no universal answer to this question, as every web host (and indeed, every computer) has slightly different performance characteristics.

From our experiences, we can draw some broad conclusions that can help you in scaling AzuraCast to meet your needs.

## Resource Constraints

### CPU

If you're using the Liquidsoap AutoDJ, there will be a relatively stable but constant CPU load for every single broadcast destination you have on every station.

In this case, a "broadcast destination" is either:
 - a local mount point, or
 - a remote relay where the main AzuraCast server transcodes the audio and "pushes" it to the remote server.
 
Remote relays that pull the local broadcast and duplicate it (i.e. AzuraRelay) don't count toward this limit.

As a very broad guideline, think of the equation for this CPU load as:
 **10% of one CPU per broadcast destination**.

This means if you have one station broadcasting to 10 mount points, you can expect that single station to take up *about* 100% of a single CPU core. Conversely, if you have 10 stations broadcasting only one mount point each, the CPU load is still 100% of a single CPU core.

The CPU impact of listeners connecting to your station is generally *much lower* than the impact of transcoding different stations. The broadcasting frontends (both Icecast and Shoutcast) can handle hundreds or even thousands of listeners before the CPU load of serving those listeners impacts your total CPU in the same way that media transcoding does.

#### A Note on Throttling

Some cloud hosting providers (including our own partners at DigitalOcean) offer "Shared CPU" plans where your instance shares processor time with other instances hosted on the same server.

They are generally able to offer those services affordably by ensuring that none of the instances use near 100% of their CPU load, allowing some extra load to be shared by other customers.

Because media transcoding is a constant CPU load on the server at all hours of the day, there's no way for the hosting provider to share that resource with other customers; as a result, if your load exceeds about 60% on a constant basis, they will often "throttle" your instance, giving it far fewer total CPU resources than before.

If you're running AzuraCast, you will absolutely notice this "throttling" as it will grind your system to a halt and stop most station operations. Sometimes, the only way to recover from this is to completely power down the server and restart it; other times, the throttling is permanent and requires setting up a new server.

There are two long-term solutions to this throttling:
 - Always "overprovision" your server so it never sees a constant CPU load of more than 50% of its total capacity, ensuring it likely won't be throttled, or
 - Invest in the hosting provider's "Dedicated CPU" plans, which, while they are likely to be more expensive, will not encounter this issue at all.

### RAM

AzuraCast depends on a number of third-party software to operate, and one of the biggest consumers of RAM in our setup is our database engine, MariaDB (a community-maintained fork of MySQL).

Between MariaDB and the main PHP processes, you should allocate at least 512MB, and preferably over 1GB of RAM to any AzuraCast server.

In our experience with AzuraCast, the amount of RAM being used does not scale linearly with the number of stations you operate. Almost every process in AzuraCast has a maximum RAM limit that it will reach, after which processes start to take more *time* instead of more *memory*.

### Storage

A typical AzuraCast installation, whether on Docker or Ansible, requires about 2GB of available space to store its own internal software images. You should have at least 5GB of free space available on the server to allow for upgrades to run without any issues.

The amount of storage you need is largely determined by the size of your stations' media libraries. Many stations upload lossless versions of their media, but if your listeners are only connecting at standard web radio bitrates (128kbps MP3, for example), this may not always be necessary. It can be helpful to transcode media to a lower bitrate before uploading.

#### A Note on Backups

If you're backing up your AzuraCast installation and including media in the backup, you should have the same amount of available space as your current media collection. You can exclude media from your regular backups to save space on the server if necessary.

## Tips for Overcoming Limits

### Expanding Listener Capacity

One of the easiest ways to expand your listener capacity with very little modification needed is to install [AzuraRelay](https://github.com/AzuraCast/AzuraRelay) on a second server. AzuraRelay connects to your main AzuraCast listeners, relays its streams in a way that doesn't consume extra CPU on the main server, and reports its statistics back to AzuraCast automatically.

This second server can be located anywhere in the world, so it can also be used to create a relay that's closer to some listeners than your main server.

### Expanding Storage

Some virtual hosting providers offer "block storage" that lets you add a separate block of storage space to your virtual environment. You can then follow our [instructions](/docs/administration/docker#storing-your-station-data-on-the-host-machine) for mounting this additional storage space to your station's media directory.

Alternatively, if you need large volumes of storage, or want to store things like backups remotely, you can take advantage of S3-compatible storage options. If you're using S3 storage for your station media library, it is strongly recommended to use a service with no egress fees, like [Wasabi](https://wasabi.com/) or [CloudFlare R2](https://blog.cloudflare.com/introducing-r2-object-storage/).
