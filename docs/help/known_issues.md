---
title: Known Issues
---

# Known Issues

[[toc]]

## The same song (or artist) repeats too frequently.

We often get issues reporting that songs or artists are repeating too closely to one another. We investigate these reports thoroughly, and in a vast majority of cases, the cause is one of the issues below. If you create a new issue and are redirected to this thread, please read the tips below before replying.

These are all things that can cause songs to repeat too closely to one another:

- **Setting playlists to "random" instead of "shuffled"**

  The "random" order for playlists is just as it says: truly random, with a new song picked out of the playlist with no context for the songs that were previously picked. As with other random things, this can produce repetition and still be statistically random.

  The "shuffled" playlist order, on the other hand, performs a one-time shuffle of the entire playlist, then plays through it from beginning to end. This prevents duplicate playback within the same playthrough. This is similar to how most "shuffle" modes on audio players work.

- **The same song is in multiple albums or folders**

  If you're uploading bulk media libraries, you may upload the same song (or a similar remix) more than once into a single playlist, under a different album or in a different folder. Both of these songs will be shuffled into the playback, as our system cannot tell if you intended to do this or not.

  AzuraCast has a built-in report to help with resolving this issue: the "Duplicate Songs" report, which checks for textually similar songs in your media library. Removing the duplicate songs often helps to resolve the issue.

- **Frequent playlist changes or station restarts**

  Changing the songs that are part of a playlist or restarting the station altogether will both lead to the "shuffle cache" being reset. This shouldn't cause problems in the long term, but for the immediate period after the playlist is reshuffled, you may hear songs that were just played in the previous shuffle arrangement.

- **Mis-weighted playlists**

  The "weight" of a given playlist indicates how likely it is to be selected when a new song is needed and that playlist is eligible to be played at that moment. All eligible playlists of the same type are added into a pool, with their likelihood of being selected determined by their weight (higher weights meaning a higher likelihood of playing).

  If you have a playlist with only a handful of songs on it, but its weight is such that it is likely to be played every third or fourth song, then you will hear it repeating the same songs often. This is by design, and can be beneficial for some types of stations.

  To counteract this, in most cases you should be sure to assign higher weights to larger playlists and lower weights to smaller ones.

## The first song from a streamer or a newly restarted station has blank metadata.

We are aware of this issue and continue to work on resolutions for individual situations wherever possible, but this issue is often caused by the streaming software itself and is thus out of our control.

Follow [issue #867](https://github.com/AzuraCast/AzuraCast/issues/867) for more information.

## Scheduled playlists don't play at the scheduled time.

We are aware of issues where the following situation occurs with certain stations:

 - A playlist is scheduled to play once per hour or at a scheduled time during the day
 - When this scheduled time arrives, either only a part of the playlist plays or none of the playlist plays.

We are aware of this issue and are working with the Liquidsoap team to resolve it. We expect the resolution to appear in a subsequent update of the Liquidsoap software, which we will apply to all AzuraCast users as soon as possible.

In the meantime, we are aware of at least two mitigations you can apply to increase the likelihood of songs playing during their scheduled block:

- Expand the scheduled time to include a longer length of time (i.e. instead of playing at exactly 2:30, play from 2:30 to 2:45)
- Check the box labeled "Interrupt other songs", which will cause Liquidsoap to play your scheduled playlist at its exact scheduled time regardless of what's currently playing.

Follow [issue #1564](https://github.com/AzuraCast/AzuraCast/issues/1564) for updates on this issue.