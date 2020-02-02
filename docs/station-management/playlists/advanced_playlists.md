---
title: Advanced Playlists
---

# Advanced Playlists

[[toc]]

## What are Advanced Playlists?

If you create a new playlist in AzuraCast, you will notice one possible option for the playlist type called "Advanced Playlist". This article will explain what an advanced playlist is, and what benefits it can offer to power users.

To summarize, **an advanced playlist is a feature intended for "power users" who want to write the entire configuration for their playlist on Liquidsoap by hand, but still take advantage of AzuraCast for managing the contents of the playlist.**

If you use an advanced playlist, AzuraCast will still manage what songs are on the playlist, and let you add/remove songs via the web interface, but it won't try to automatically insert the corresponding configuration into Liquidsoap for you, like it would with any of the other playlist types.

This allows you to use far more complex custom rules for when a playlist plays than AzuraCast's web interface would otherwise allow. The example below demonstrates one use case for this feature (and is, in fact, the exact reason it exists in the software).

## Case Study: Side-by-side Playlists

One AzuraCast user wanted to ensure that two playlists always played immediately one-after-the-other, every few songs. While AzuraCast itself has an "every _x_ songs" option, it doesn't have any way to force that songs or music clips from two playlists always play right next to each other. This is possible, however, with more advanced Liquidsoap configuration. Thus, the "Advanced Playlist" was born.

Let's say you create two playlists named "Commercials" and "Bumpers". AzuraCast will automatically insert variables for these playlists inside the station's `liquidsoap.liq` file, with the names being prefixed by "playlist_", with all characters converted to lower case and spaces replaced with underscores. For example, the corresponding variable names in this case are "playlist_commercials" and "playlist_bumpers", respectively.

If you edit a station's profile and you're using Liquidsoap as your AutoDJ software, you will see a section near the bottom of the profile named "Advanced: Custom Configuration". This section allows you to input raw code into the `liquidsoap.liq` file that will be used when the AutoDJ runs your station.

In this case, the following rule was added to the custom configuration to produce the side-by-side playlist result:

```
radio = rotate(weights=[1,1,5], [playlist_commercials, playlist_bumpers, radio])
```

The variable `radio` is already defined in the Liquidsoap configuration, and represents the entire composed radio stream as it will broadcast out to listeners. The playlist names were defined using the rules described above. The `rotate` function is internal to Liquidsoap and follows a specific pattern of playback order, which is exactly what we want in this case.

**Note:** By default, playlists are considered "fallible" in Liquidsoap terminology; that is, they can contain invalid files or otherwise aren't guaranteed to supply reliable output. More information about fallible sources is available on the [Liquidsoap documentation](http://liquidsoap.info/doc-dev/quick_start.html). Liquidsoap always requires an "infallible" source of audio to fall back to if the fallible sources don't produce a valid output. In the example above, the infallible source is the existing `radio` variable, but if you are completely overriding the output signal, you should make sure to have at least one "safe" playlist; that is, one playlist wrapped with the `mksafe` function, like:

```
radio = rotate(weights=[1,1,5], [mksafe(playlist_jingles), playlist_commercials, playlist_music])
```

Liquidsoap is itself a very powerful piece of software, and has a robust [API](http://savonet.sourceforge.net/doc-svn/reference.html) that you can use when adding your own advanced configuration options. Feel free to experiment with advanced configuration options on a test instance of AzuraCast, because if something doesn't work quite right, you can always just remove the customization, restart the station and be back up and running.