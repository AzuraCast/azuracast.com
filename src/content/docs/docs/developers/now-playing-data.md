---
title: Now Playing Data APIs
published: 1
date: 2022-12-02T15:43:48.633Z
tags: api, development
editor: markdown
dateCreated: 2022-10-04T18:55:13.622Z

sidebar:
  order: 2
---

The most important and frequently accessed pieces of information that AzuraCast stores are all served as part of a single group of data, which we refer to as the "Now Playing" data.

This data includes:

 - Basic information about the station, its mount points and remote relays;
 - Current listener counts, including total and unique listeners;
 - The currently playing song, including a timestamp of when it was started, and whether it came from a playlist, request, or live source;
 - Whether a live DJ is currently connected, and if so, what their name is; and
 - A truncated history of the most recent ~5 songs (this number is customizable) played on the station.

Here's a [real-world example of the Now Playing API's return data](https://demo.azuracast.com/api/nowplaying_static/azuratest_radio.json) from the AzuraCast demo page.

AzuraCast always serves this data in the exact same format, regardless of whether you're broadcasting locally or remotely, or whether you're using Icecast or Shoutcast.

Because of how valuable this information is, we serve it in a number of ways depending on whether performance or flexibility is your main concern.

## Standard Now Playing API

This is the "Now Playing" API endpoint listed as part of the [API documentation](https://www.azuracast.com/api/). On any installation, an array of now-playing data for all public stations is available at:

```
http://your-azuracast-site.example.com/api/nowplaying
```

The now-playing data for a specific station is available at:

```
http://your-azuracast-site.example.com/api/nowplaying/station_shortcode
```

For a more performance-optimized (but slightly more delayed) static version of the now-playing data, use this URL format instead:

```
http://your-azuracast-site.example.com/api/nowplaying_static/station_shortcode.json
```

...replacing `station_shortcode` with either the station's abbreviated name (i.e. `azuratest_radio` for "AzuraTest Radio") or the numeric ID of the station (visible in the URL when managing the station in AzuraCast).

### Elapsed/Remaining Time

For performance reasons, AzuraCast caches the Now Playing API endpoint's responses for a few seconds after the first uncached request is made. This allows our web server (nginx) to serve subsequent requests, substantially improving throughput and allowing installations to serve many more listeners.

Because of this, the `elapsed` and `remaining` time on the current playing track may not be accurate as of the exact time you're making the API request. In order to ensure their accuracy, it is recommended to calculate these values client-side in your calling code.

You can compare this to the calling client's UNIX timestamp, but it may be a little different than the AzuraCast installation's server clock time. To ensure better accuracy, we recommend infrequently calling the `time` API endpoint to retrieve the server's current UNIX timestamp:

```
http://your-azuracast-site.example.com/api/time
```

Our example implementation code below includes this functionality.

### Example Implementation

Using the [jQuery](https://jquery.com/) JavaScript library, an example implementation might look like:

```javascript
let nowPlayingTimeout = null;
let nowPlaying = {};
let checkTimeTimeout = null;
let currentTimestamp = Math.floor(Date.now() / 1000);

function checkTime() {
    $.ajax({
        cache: false,
        dataType: "json",
        url: "http://your-azuracast-site.example.com/api/time",
        success: function(data) {
            currentTimestamp = data.timestamp;
            checkTimeTimeout = setTimeout(checkTime, 600000);
        },
    }).fail(function() {
        currentTimestamp = Math.floor(Date.now() / 1000);
        checkTimeTimeout = setTimeout(checkTime, 1200000);
    });
}

function loadNowPlaying() {
    $.ajax({
        cache: false,
        dataType: "json",
        url: 'http://your-azuracast-site.example.com/api/nowplaying/station_shortcode',
        success: function(np) {
            // Update the elapsed/remaining time.
            const currentTrackPlayedAt = np.now_playing?.played_at ?? 0;
            const currentTrackDuration = np.now_playing?.duration ?? 0;

            if (currentTrackPlayedAt !== 0) {
                let elapsed = currentTimestamp - currentTrackPlayedAt;

                if (elapsed < 0) {
                    elapsed = 0;
                } else if (elapsed >= currentTrackDuration) {
                    elapsed = currentTrackDuration;
                }

                np.now_playing.elapsed = elapsed;
                np.now_playing.remaining = currentTrackDuration - elapsed;
            }

            // Do something with the Now Playing data.
            nowPlaying = np;

            nowPlayingTimeout = setTimeout(loadNowPlaying, 15000);
        }
    }).fail(function() {
        nowPlayingTimeout = setTimeout(loadNowPlaying, 30000);
    });
}

$(function() {
    checkTime();
    loadNowPlaying();

    setInterval(
        () => {
            currentTimestamp += 1;
        },
        1000
  );
});
```

Using the [Axios](https://github.com/axios/axios) HTTP client library, an example implementation might look like:

```javascript
let nowPlayingTimeout = null;
let nowPlaying = {};
let checkTimeTimeout = null;
let currentTimestamp = Math.floor(Date.now() / 1000);

function checkTime() {
    axios.get('http://your-azuracast-site.example.com/api/time').then((response) => {
        // Do something with the Now Playing data.
        currentTimestamp = response.data.timestamp;
    }).catch((error) => {
        console.error(error);
    }).then(() => {
        clearTimeout(checkTimeTimeout);
        checkTimeTimeout = setTimeout(checkTime, 600000);
    });
}

function loadNowPlaying() {
    axios.get('http://your-azuracast-site.example.com/api/nowplaying/station_shortcode').then((response) => {
        let np = response.data;

        // Update the elapsed/remaining time.
        const currentTrackPlayedAt = np.now_playing?.played_at ?? 0;
        const currentTrackDuration = np.now_playing?.duration ?? 0;

        if (currentTrackPlayedAt !== 0) {
            let elapsed = currentTimestamp - currentTrackPlayedAt;

            if (elapsed < 0) {
                elapsed = 0;
            } else if (elapsed >= currentTrackDuration) {
                elapsed = currentTrackDuration;
            }

            np.now_playing.elapsed = elapsed;
            np.now_playing.remaining = currentTrackDuration - elapsed;
        }

        // Do something with the Now Playing data.
        nowPlaying = np;
    }).catch((error) => {
        console.error(error);
    }).then(() => {
        clearTimeout(nowPlayingTimeout);
        nowPlayingTimeout = setTimeout(checkNowPlaying, 15000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    checkTime();
    loadNowPlaying();

    setInterval(
        () => {
            currentTimestamp += 1;
        },
        1000
  );
});
```

If your application is written in PHP, you can use the Composer package manager to install our [PHP API Client](https://github.com/AzuraCast/php-api-client), which has full support for the Now Playing API endpoints.

## Simple Text File

AzuraCast also generates a simple text file containing `Artist - Title` for each station. This can be useful if you need to fetch the current playing track for display or in automation tools.

The URL of the text file follows the format:

```
http://your-azuracast-site.example.com/api/nowplaying_static/station_shortcode.txt
```

...replacing `station_shortcode` with the station's abbreviated name (i.e. `azuratest_radio` for "AzuraTest Radio").

## High-Performance Updates

We deliver a high-performance (low-latency and low server CPU burden) Now Playing feed thanks to a realtime messaging library called [Centrifugo](https://centrifugal.dev/). Using this connection method, each listener gets immediate track updates while only maintaining a single lightweight HTTP connection.

Now Playing updates are delivered as unidirectional messages via Websocket, Server-Sent Events (SSE) or Long Polling web streams. 

### Websockets

The URL for websocket connections is:

```
wss://your-azuracast-url/api/live/nowplaying/websocket
```

Upon connection, you should send a connection string in the form of a JSON request:

```json
{ "subs": { "station:your_station_name": {} }}
```

Replacing `your_station_name` with your station's URL stub or short name.

You will start to receive a feed of empty pings (`{}`) and Now Playing updates. You can identify Now Playing updates as they will have, in their parsed JSON, `pub.data.np`.

An example JavaScript implementation is below:

```javascript
let socket = new WebSocket("wss://your-azuracast-url/api/live/nowplaying/websocket");

socket.onopen = function(e) {
  socket.send(JSON.stringify({
    "subs": {
      "station:azuratest_radio": {"recover": true}
    } 
  }));
};

let nowplaying = {};
let currentTime = 0;

// Handle a now-playing event from a station. Update your now-playing data accordingly.
function handleSseData(ssePayload, useTime = true) {
  const jsonData = ssePayload.data;

  if (useTime && 'current_time' in jsonData) {
    currentTime = jsonData.current_time;
  }

  nowplaying = jsonData.np;
}

socket.onmessage = function(e) {
  const jsonData = JSON.parse(e.data);

  if ('connect' in jsonData) {
    const connectData = jsonData.connect;

    if ('data' in connectData) {
      // Legacy SSE data
      connectData.data.forEach(
        (initialRow) => handleSseData(initialRow)
      );
    } else {
      // New Centrifugo time format
      if ('time' in connectData) {
        currentTime = Math.floor(connectData.time / 1000);
      }

      // New Centrifugo cached NowPlaying initial push.
      for (const subName in connectData.subs) {
        const sub = connectData.subs[subName];
        if ('publications' in sub && sub.publications.length > 0) {
          sub.publications.forEach((initialRow) => handleSseData(initialRow, false));
        }
      }
    }
  } else if ('pub' in jsonData) {
    handleSseData(jsonData.pub);
  }
};
```

### Server-Sent Events (SSE/EventSource)

The URL for SSE connections is:

```
https://your-azuracast-url/api/live/nowplaying/sse?cf_connect=TOKEN
```

Where the `cf_connect` URL parameter is the same connection token as the first message in the Websocket example.

An example JavaScript implementation is below:

```javascript
const sseBaseUri = "https://your-azuracast-url/api/live/nowplaying/sse";
const sseUriParams = new URLSearchParams({
  "cf_connect": JSON.stringify({
    "subs": {
      "station:azuratest_radio": {"recover": true}
    }
  })
});
const sseUri = sseBaseUri+"?"+sseUriParams.toString();
const sse = new EventSource(sseUri);

let nowplaying = {};
let currentTime = 0;

// This is a now-playing event from a station. Update your now-playing data accordingly.
function handleSseData(ssePayload, useTime = true) {
  const jsonData = ssePayload.data;

  if (useTime && 'current_time' in jsonData) {
    currentTime = jsonData.current_time;
  }

  nowplaying = jsonData.np;
}

sse.onmessage = (e) => {
  const jsonData = JSON.parse(e.data);

  if ('connect' in jsonData) {
    const connectData = jsonData.connect;

    if ('data' in connectData) {
      // Legacy SSE data
      connectData.data.forEach(
        (initialRow) => handleSseData(initialRow)
      );
    } else {
      // New Centrifugo time format
      if ('time' in connectData) {
        currentTime = Math.floor(connectData.time / 1000);
      }

      // New Centrifugo cached NowPlaying initial push.
      for (const subName in connectData.subs) {
        const sub = connectData.subs[subName];
        if ('publications' in sub && sub.publications.length > 0) {
          sub.publications.forEach((initialRow) => handleSseData(initialRow, false));
        }
      }
    }
  } else if ('pub' in jsonData) {
    handleSseData(jsonData.pub);
  }
};
```
