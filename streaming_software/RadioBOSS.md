# RadioBOSS

[RadioBOSS](https://www.djsoft.net/) is a commercial software sold by IP Kuzmitski D.V. at DJSoft.net.

Streaming via both IceCast mode and ShoutCast mode are available.

The Live broadcasting feature is possible in their Standard and Advanced edition (not in the Express edition).

Note that for ease of use we use the `Configuration Wizard`, you can also enter all connection details manually.

## Instructions

1. In the top menu bar, select `Settings` -> `Options`

2. In the `Settings` window, select `Broadcast` on the left

3. To add a new encoder, click the `+` button

  ![RadioBOSS Settings: Broadcast menu](https://i.imgur.com/vjt6vA4.jpg)
  
4. The Encoder-window will open, next click the button called `Configuration Wizard`.

  ![RadioBOSS Encoder window](https://i.imgur.com/fZfVKUp.jpg)
  
5. Follow the instructions for the server type you have set up your Azuracast station with:
  - [Icecast](#icecast)
  - [SHOUTcast](#shoutcast)

---

### Icecast

- Select `Icecast 1 & 2` and click `Next >`
  
![RadioBOSS Encoder Configuration Wizard IceCast](https://i.imgur.com/v87ZqfU.jpg)

- Take over the corresponding credentials you can find in Azuracast:

![RadioBOSS Encoder Configuration Wizard IceCast Azuracast Example settings](https://i.imgur.com/bG0WzC3.jpg)

- Click `Finish`

---

### SHOUTcast

The following settings are recommended for both ShoutCast v1 as v2 (DNAS 2)

Note 1: You should use the given port, and subtract 1. (`8006` -> `8005`)

Note 2: Be sure to select `v1`, as v2 will append the Stream ID (SID), which won't work.
  
- Select `SHOUTcast v1` and click `Next >`

![RadioBOSS Encoder Configuration Wizard SHOUTcast](https://i.imgur.com/cF1MM7D.jpg)

- Take over the corresponding credentials you can find in Azuracast (see notes above):

![RadioBOSS Encoder Configuration Wizard SHOUTcast Azuracast Example settings](https://i.imgur.com/XNJdqWZ.jpg)

- Click `Finish`

---

6. Finish by changing the rest of the settings by preference:

  - Connection
    - Sample Rate
    - Encoder
    - Bitrate
    - Channels
  
  - Station info
  
    If needed, here you can override the info that can be found in the main `Settings` (From step 1), under `Broadcasting` -> `Metadata`

7. Then finally click `OK` to save the Encoder.

8. In the Settings window, check the checkboxes for all encoders that you want to use.
Remember to turn on the option `Broadcasting enabled` on top.

---

On succesful connection, the log report in the bottom-left corner of RadioBOSS will show the following message: "Connected to server! (Output N)".
This means that listeners can now connect to the streaming server (either IceCast or ShoutCast).

If the logs show "[E40] Cannot start broadcast" in red, go over the above steps.

More information can be found in the RadioBOSS Help System

Press `Ctrl+F1` inside the RadioBOSS application, or in the top menu bar go to `Help` -> `Contents`

The following articles in there are helpful:
- `Operation` -> `Broadcasting Internet radio`
- `Options` -> `Broadcast`
- `Options` -> `Broadcast` -> `Metadata`
