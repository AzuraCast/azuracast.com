---
title: Playlists
description: Managing playlists in AzuraCast
published: true
date: 2021-02-09T03:18:19.790Z
tags: user guide
editor: markdown
dateCreated: 2021-02-06T01:57:04.425Z
---

:::tip[Required Permissions]
To manage playlists, users must be in a role that has the "Manage Station Media" permission for the given station.
:::

Playlists are collections of media that are played by the AutoDJ according to certain rules. For example, you can have one or more playlists that are considered "General Rotation" and will play throughout the day, or playlists that only play every few songs, or every few minutes.

Any playlists types can also be scheduled to play in one or more specific time blocks, or to play between a certain date range.

## Playlist Priorities

In newer versions of AzuraCast (released after September 1, 2024), you can specify the priority of individual playlists. If two playlists are both eligible to be played at the same time, the higher priority playlist will always be selected. This allows you to "stack" playlists in the same schedule slot, letting the priority system determine the actual playback order. You can also specify the priority of incoming listener requests (if they're enabled) to prevent them from always taking priority over general playlists.

### Default Priorities

If you don't manually specify the priority of playlists, or if you're on an earlier version of AzuraCast, playlists follow this priority system by default:

| Item Type | Priority
| - | -
| Song Requests | Always top priority
| Once Per X Hour Playlists, Scheduled | 7
| Once Per X Hour Playlists, Unscheduled | 6
| Once Per X Songs Playlists, Scheduled | 5
| Once Per X Songs Playlists, Unscheduled | 4
| Once Per X Minutes Playlists, Scheduled | 3
| Once Per X Minutes Playlists, Unscheduled | 2
| General Rotation Playlists | 0

## Advanced Playlists

### What are Advanced Playlists?

If you create a new playlist in AzuraCast, you will notice one possible option for the playlist type called "Advanced Playlist". This article will explain what an advanced playlist is, and what benefits it can offer to power users.

To summarize, **an advanced playlist is a feature intended for "power users" who want to write the entire configuration for their playlist on Liquidsoap by hand, but still take advantage of AzuraCast for managing the contents of the playlist.**

If you use an advanced playlist, AzuraCast will still manage what songs are on the playlist, and let you add/remove songs via the web interface, but it won't try to automatically insert the corresponding configuration into Liquidsoap for you, like it would with any of the other playlist types.

This allows you to use far more complex custom rules for when a playlist plays than AzuraCast's web interface would otherwise allow. The example below demonstrates one use case for this feature (and is, in fact, the exact reason it exists in the software).

### Case Study: Side-by-side Playlists

One AzuraCast user wanted to ensure that two playlists always played immediately one-after-the-other, every few songs. While AzuraCast itself has an "every x songs" option, it doesn't have any way to force that songs or music clips from two playlists always play right next to each other. This is possible, however, with more advanced Liquidsoap configuration. Thus, the "Advanced Playlist" was born.

Let's say you create two playlists named "Commercials" and "Bumpers". AzuraCast will automatically insert variables for these playlists inside the station's `liquidsoap.liq` file, with the names being prefixed by "playlist_", with all characters converted to lower case and spaces replaced with underscores. For example, the corresponding variable names in this case are "playlist_commercials" and "playlist_bumpers", respectively.

When you're using Liquidsoap as your AutoDJ software, on a station's primary management page under "Broadcasting" in the sidebar you will see a section named "Edit Liquidsoap Configuration". This page allows you to input raw code into the `liquidsoap.liq` file that will be used when the AutoDJ runs your station.

In this case, the following rule was added to the custom configuration to produce the side-by-side playlist result:

```
radio = rotate(weights=[1,1,5], [playlist_commercials, playlist_bumpers, radio])
```

The variable radio is already defined in the Liquidsoap configuration, and represents the entire composed radio stream as it will broadcast out to listeners. The playlist names were defined using the rules described above. The rotate function is internal to Liquidsoap and follows a specific pattern of playback order, which is exactly what we want in this case.

Note: By default, playlists are considered "fallible" in Liquidsoap terminology; that is, they can contain invalid files or otherwise aren't guaranteed to supply reliable output. More information about fallible sources is available on the [Liquidsoap documentation](http://liquidsoap.info/doc-dev/quick_start.html). Liquidsoap always requires an "infallible" source of audio to fall back to if the fallible sources don't produce a valid output. In the example above, the infallible source is the existing radio variable, but if you are completely overriding the output signal, you should make sure to have at least one "safe" playlist; that is, one playlist wrapped with the mksafe function, like:

```
radio = rotate(weights=[1,1,5], [mksafe(playlist_jingles), playlist_commercials, playlist_music])
```

Liquidsoap is itself a very powerful piece of software, and has a robust [API](http://savonet.sourceforge.net/doc-svn/reference.html) that you can use when adding your own advanced configuration options. Feel free to experiment with advanced configuration options on a test instance of AzuraCast, because if something doesn't work quite right, you can always just remove the customization, restart the station and be back up and running.
