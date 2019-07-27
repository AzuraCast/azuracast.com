---
title: Now Playing Data
---

# Now Playing Data

The most important and frequently accessed pieces of information that AzuraCast stores are all served as part of a single group of data, which we refer to as the "Now Playing" data.

This data includes:
 - Basic information about the station, its mount points and remote relays;
 - Current listener counts, including total and unique listeners;
 - The currently playing song, including a timestamp of when it was started, and whether it came from a playlist, request, or live source;
 - Whether a live DJ is currently connected, and if so, what their name is; and
 - A truncated history of the most recent ~5 songs (this number is customizable) played on the station.

AzuraCast always serves this data in the exact same format, regardless of whether you're broadcasting locally or remotely, or whether you're using Icecast or SHOUTcast.

Because of how valuable this information is, we serve it in a number of ways depending on whether performance or flexibility is your main concern.

[[toc]]

## Standard Now Playing API (All Installation Types)

This is the "Now Playing" API endpoint listed as part of the [API documentation](https://www.azuracast.com/api/). On any installation, an array of now-playing data for all public stations is available at:

```
http://your-azuracast-site.example.com/api/nowplaying
```

The now-playing data for a specific station is available at:

```
http://your-azuracast-site.example.com/api/nowplaying/station_shortcode
```

...replacing `station_shortcode` with either the station's abbreviated name (i.e. `azuratest_radio` for "AzuraTest Radio") or the numeric ID of the station (visible in the URL when managing the station in AzuraCast).

#### Advantages

- This method is available on all installations and will always be available.
- If you have the "Prefer Browser URL" setting turned on in your installation, any URLs included in the API response (i.e. URLs for album art or listening to the station) will be updated to reflect the browser URL that was used to make the API request.
- The "elapsed" and "remaining" values on `current_song` are automatically updated to reflect their current values (in seconds) at the moment you make the API request.

#### Disadvantages

- Every request sent to this endpoint calls the entire Nginx/PHP-FPM stack, resulting in a very brief (under 100ms) but possibly significant performance penalty. If you have several hundred users checking this API every few seconds, the combined load can quickly overwhelm a server.

#### Example Implementation

Using the [jQuery](https://jquery.com/) JavaScript library, an example implementation might look like:

```javascript
var nowPlayingTimeout;
var nowPlaying;

function loadNowPlaying() {
    $.ajax({
        cache: false,
        dataType: "json",
        url: 'http://your-azuracast-site.example.com/api/nowplaying/station_shortcode',
        success: function(np) {
            // Do something with the Now Playing data.
            nowPlaying = np;

            nowPlayingTimeout = setTimeout(loadNowPlaying, 15000);
        }
    }).fail(function() {
        nowPlayingTimeout = setTimeout(loadNowPlaying, 30000);
    });
}

$(function() {
    loadNowPlaying();
});
```

Using the [Axios](https://github.com/axios/axios) HTTP client library, an example implementation might look like:

```javascript
var nowPlaying;
var nowPlayingTimeout;

function loadNowPlaying() {
    axios.get('http://your-azuracast-site.example.com/api/nowplaying/station_shortcode').then((response) => {
        // Do something with the Now Playing data.
        nowPlaying = response.data;
    }).catch((error) => {
        console.error(error);
    }).then(() => {
        clearTimeout(nowPlayingTimeout);
        nowPlayingTimeout = setTimeout(checkNowPlaying, 15000);
    });
}

loadNowPlaying();
```

If your application is written in PHP, you can use the Composer package manager to install our [PHP API Client](https://github.com/AzuraCast/php-api-client), which has full support for the Now Playing API endpoints.

## Static Now Playing JSON File (Docker Installations Only)

AzuraCast also writes its "Now Playing" API endpoint data to a static JSON file, which contains the same exact data as the standard API endpoint, but for a single station.

The Static Now Playing JSON file for a given station is available at:

```
http://your-azuracast-site.example.com/api/nowplaying_static/station_shortcode.json
```

...replacing `station_shortcode` with the station's abbreviated name (i.e. `azuratest_radio` for "AzuraTest Radio").

#### Advantages

- Because the file is static and is only changed every few seconds, Nginx, your browser, and any other reverse proxies (i.e. CloudFlare) can cache the output for a few seconds, resulting in significantly higher performance.
- Since this file's format is the same as the standard API, no code modifications or third-party libraries are needed to switch to this format.

#### Disadvantages

- Any URLs in the API responses will always use the "Base URL" of your AzuraCast installation.
- The "elapsed" and "remaining" durations will only be accurate as of when the file was written, not when it was downloaded by your client. You should instead compare the user's current UNIX timestamp against the `played_at` timestamp.

#### Example Implementation

Implementations of this method look exactly the same as for the Standard Now Playing API (above), except with the URL updated to the static URL for the station.

## Live Websocket/EventSource (Docker Installations Only)

This method uses the [Nchan](https://nchan.io/) plugin for Nginx to handle connections to browsers and relays a single update from AzuraCast immediately to a large number of recipients. Because it's an Nginx plugin, it's optimized for high performance and can handle many hundreds of thousands of concurrent users.

The Websocket/EventSource API URL for a given station is available at:

```
http://your-azuracast-site.example.com/api/live/nowplaying/station_id
```

...replacing `station_id` with the numeric ID of the station (visible in the URL when managing the station in AzuraCast).

#### Advantages

- This is the fastest way to receive updates when a song or other metadata changes. As soon as changes are detected by AzuraCast, they are immediately broadcast to all connected users within a fraction of a second.
- Because the Nchan plugin optimizes message delivery, this method results in the lowest load on your server per connected user.

#### Disadvantages

- Any URLs in the API responses will always use the "Base URL" of your AzuraCast installation.
- The "elapsed" and "remaining" durations will only be accurate as of when the file was written, not when it was downloaded by your client. You should instead compare the user's current UNIX timestamp against the `played_at` timestamp.
- Implementations require a small, open-source JavaScript file built to handle consuming Nchan messages.

#### Example Implementation

To use this API method on a web site, first make sure the [Nchan Subscriber JavaScript library](https://github.com/slact/nchan.js/blob/master/NchanSubscriber.js) is loaded. This library can also be loaded via the NPM package manager using the command `npm i nchan`.

An example implementation using the Nchan Subscriber library might look like:

```javascript
var sub = new NchanSubscriber('http://your-azuracast-site.example.com/api/live/nowplaying/station_id');
var nowPlaying;

sub.on("message", function(message, message_metadata) {
    // Do something with the Now Playing data.
    nowPlaying = JSON.parse(message);
});
sub.start();
```