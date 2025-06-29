---
title: Streaming Software
description: Examples and tutorials of software that can be used to stream to AzuraCast
published: true
date: 2021-02-09T03:22:55.259Z
tags: user guide
editor: markdown
dateCreated: 2021-02-08T00:05:33.501Z
---

:::caution
If you are using a reverse proxy service (like CloudFlare) in front of your installation, be aware that these services often prevent direct connections to the ports that broadcasters connect to. You should instruct your streamers to use the direct IP address of your server instead.
:::

## Mixxx

**Linux, MacOS, Windows; Free and Open-Source**

[Mixxx](https://www.mixxx.org) is free and open-source DJ software that also supports live broadcasting via Icecast and Shoutcast servers.

Live broadcasting settings can be found in the preferences menu (`Options` -> `Preferences`). It is recommended to use "Icecast 2" mode when broadcasting to AzuraCast. Out of the box, Mixxx does not include the LAME MP3 encoder (for licensing reasons), but it is not needed when connecting to AzuraCast; just set your broadcast format to 'Ogg Vorbis' and LiquidSoap will transcode the broadcast into the correct output format.

![Mixxx preferences menu](../images/streaming-software/mixx_1.png)

## BUTT

**Linux, MacOS, Windows; Free and Open-Source**

Cross-platform and available for free at [https://sourceforge.net/projects/butt/](https://sourceforge.net/projects/butt/). Streaming via both Icecast mode and Shoutcast mode are available.

### Icecast Mode

Use the exact information specified on the Streamer/DJ page's right sidebar. "Address" is "Server" and "Icecast mountpoint" is "Mount Name".

![BUTT Sample Icecast configuration](../images/streaming-software/butt_icecast.png)

### Shoutcast Mode

Use the given port specified in the "Shoutcast v1 Clients" section. Since Shoutcast v1 does not let you specify a username, specify your password as `dj_username:dj_password` (the username and password for the DJ separated by a colon).

![BUTT Sample Shoutcast configuration](../images/streaming-software/butt_shoutcast.png)

## SAM Cast

**Windows; Proprietary, Commercial**

[SAM Cast](https://spacial.com/sam-cast/) is commercial software sold by Spacial. It is compatible with AzuraCast by using the MP3 encoder and the "Icecast 2" server connection settings.

### Broadcasting Steps

From the main SAM Cast window, click "Encoders" at the bottom left.

![](../images/streaming-software/samcast_1.png)

In the Encoders window that pops up, click the plus sign button on the toolbar to add a new encoder.

![](../images/streaming-software/samcast_2.png)

You will be asked to select an encoder. It is recommended to select `MP3 (LAME_ENC)`, because this allows for the easiest constant bit rate (CBR) streaming, which causes the fewest issues when broadcasting.

Click "OK" at the bottom to continue to encoder details.

![](../images/streaming-software/samcast_3.png)

On the first tab of the encoder details, change your bitrate from the default 64kbps to your desired bitrate. This should likely match the highest bitrate that you broadcast out to your listeners. By default, it should at least be 128kbps.

![](../images/streaming-software/samcast_4.png)

Click the "Server Details" tab. On the "Server Type" selector, choose "Icecast", then choose "Icecast 2" in the secondary selector.

You can now populate the "Server Details" section with the connection information supplied to you via AzuraCast's "Streamers/DJs" page. You will want to use the connection information for "Icecast Clients", the first section on the page.

![](../images/streaming-software/samcast_5.png)

Click OK to return to the main Encoders pane, where you will now see a new encoder with "Idle" status.

Select the encoder, then click the play-button icon in the toolbar to begin broadcasting.

![](../images/streaming-software/samcast_6.png)

## RadioBOSS

**Windows; Proprietary, Commercial**

[RadioBOSS](https://www.djsoft.net/) is a commercial software sold by IP Kuzmitski D.V. at DJSoft.net.

Streaming via both Icecast mode and Shoutcast mode are available.

The Live broadcasting feature is possible in their Standard and Advanced edition (not in the Express edition).

Note that for ease of use we use the `Configuration Wizard`, you can also enter all connection details manually.

### Instructions

1. In the top menu bar, select `Settings` -> `Options`

2. In the `Settings` window, select `Broadcast` on the left

3. To add a new encoder, click the `+` button

![RadioBOSS Settings: Broadcast menu](../images/streaming-software/radioboss_1.jpg)

4. The Encoder-window will open, next click the button called `Configuration Wizard`.

![RadioBOSS Encoder window](../images/streaming-software/radioboss_2.jpg)

Follow the instructions for the server type you have set up your Azuracast station with:

### Icecast

- Select `Icecast 1 & 2` and click `Next >`

![RadioBOSS Encoder Configuration Wizard Icecast](../images/streaming-software/radioboss_3.jpg)

- Take over the corresponding credentials you can find in Azuracast:

![RadioBOSS Encoder Configuration Wizard Icecast Azuracast Example settings](../images/streaming-software/radioboss_4.jpg)

- Click `Finish`

### Shoutcast

The following settings are recommended for both Shoutcast v1 as v2 (DNAS 2)

Note 1: Use the given port specified in the "Shoutcast v1 Clients" section.

Note 2: Be sure to select `v1`, as v2 will append the Stream ID (SID), which won't work.

- Select `Shoutcast v1` and click `Next >`

![RadioBOSS Encoder Configuration Wizard Shoutcast](../images/streaming-software/radioboss_5.jpg)

- Take over the corresponding credentials you can find in Azuracast (see notes above):

![RadioBOSS Encoder Configuration Wizard Shoutcast Azuracast Example settings](../images/streaming-software/radioboss_6.jpg)

- Click `Finish`

6. Finish by changing the rest of the settings by preference:

- Connection

  - Sample Rate
  - Encoder
  - Bitrate
  - Channels

  - Station info

    If needed, here you can override the info that can be found in the main `Settings` (From step 1), under `Broadcasting` -> `Metadata`

1. Then finally click `OK` to save the Encoder.

2. In the Settings window, check the checkboxes for all encoders that you want to use.
   Remember to turn on the option `Broadcasting enabled` on top.

On succesful connection, the log report in the bottom-left corner of RadioBOSS will show the following message: "Connected to server! (Output N)". This means that listeners can now connect to the streaming server (either Icecast or Shoutcast).

If the logs show "[E40] Cannot start broadcast" in red, go over the above steps.

More information can be found in the RadioBOSS Help System. Press `Ctrl+F1` inside the RadioBOSS application, or in the top menu bar go to `Help` -> `Contents`.

The following articles in there are helpful:

- `Operation` -> `Broadcasting Internet radio`
- `Options` -> `Broadcast`
- `Options` -> `Broadcast` -> `Metadata`

## PlayIt Live

**Windows; Proprietary, Free**

[PlayIt Live](https://www.playitsoftware.com/Products/Live) is a free live-assist and automated radio playout system from PlayIt Software.

It allows streaming via **Icecast**, **Shoutcast v1** and **Shoutcast v2** via a plugin, that you can download for free [here](https://www.playitsoftware.com/Plugins/View/InternetBroadcast), after creating an account on their website. This plugin also allows you to record the stream, in MP3.

The installation steps for the plugin are relatively simple, so they're not covered in this guide.

***Note:** This software is only capable of streaming via MP3, due to plugin limitations.*

### Instructions

These instructions are valid and required for both streaming modes (Icecast and Shoutcast), so be sure to follow this part before proceeding any further.

1. After installing the Internet Broadcast plugin, select the menu **Plugins** menu, on the top menu bar and select the **Plugin Manager...** option.

![Plugins menu](../images/streaming-software/playitlive_1.png)

_Select the Plugins menu, then the Plugin Manager option_

2. A new window should appear, and within it the Internet Broadcast plugin.

![Plugin Manager](../images/streaming-software/playitlive_2.png)
_The Plugin Manager window_

3. Open the plugin settings, by double clicking on it's name. This window should appear.

![Plugin settings](../images/streaming-software/playitlive_3.png)
_Plugin Settings_

**There are a few settings that you can customize here:**

- In **Audio source to broadcast** you can define which input is going to be transmited to the server;
- **Auto start streams** let's you start streaming after opening the software.

**4.** Under **Streams**, click **Add** to add a new streaming server.

Now follow the specific instructions for your streaming server: **Icecast** or **Shoutcast**.

### Icecast

**1.** Using the connection details, available in your AzuraCast instance, under the **Streamers/DJ Accounts** page,

![Connection Details](../images/streaming-software/playitlive_4.png)

_Connection Information for Icecast_

... fill this form in the PlayIt Live software.

![Stream Details](../images/streaming-software/playitlive_5.png)

_Using the details above to fill the form_

**Don't forget to change these details with yours, this is just an example!**

**Notes:**

- The **Save audio to file** field can be left unchecked. Check it if you want to record the stream into a MP3 file.
- Under **Audio**, select the audio bitrate and the format (stereo or mono) that matches your station.

**2.** After filling the form fields, click **OK** to save the server details.

**3.** To start broadcasting, click on Start Streams here on in the main interface of the software.

![Starting the streams](../images/streaming-software/playitlive_6.png)

If the server is configured correctly, the **OFF AIR** text will change to **ON AIR**. If not, re-check your configuration.

### Shoutcast

**1.** Using the connection details, available in your AzuraCast instance, under the **Streamers/DJ Accounts** page, ...

![Shoutcast info](../images/streaming-software/playitlive_6a.png)

... fill this form in the PlayIt Live software.

![Shoutcast server info](../images/streaming-software/playitlive_7.png)
*Using the details above to fill the form*

**Don't forget to change these details with yours, this is just an example!**

**Notes:**

- In **Server Type**, select Shoutcast v1.
- The **Password** field must be in this format: `dj_username:dj_password`
- The **Save audio to file** field can be left unchecked. Check it if you want to record the stream into a MP3 file.
- Under **Audio**, select the audio bitrate and the format (stereo or mono) that matches your station.

**2.** After filling the form fields, click **OK** to save the server details.

**3.** To start broadcasting, click on Start Streams here on in the main interface of the software.

![Starting the streams](../images/streaming-software/playitlive_8.png)

If the server is configured correctly, the **OFF AIR** text will change to **ON AIR**. If not, re-check your configuration.

## Rocket Broadcaster

**Windows; Proprietary (Free & Pro editions)**

Rocket Broadcaster is a robust streaming encoder for Windows, designed for internet radio stations and professional broadcasting. It captures audio from various sources, including microphones, line-in devices, and other applications, and streams it to your station. Rocket Broadcaster supports both Icecast and Shoutcast servers.

### Instructions

1. **Configure Your Audio Input**

    - Go to **Options** > **Preferences**.
    - In the **Audio Input** tab, select your microphone or audio interface as the **Input device**. Set the **Sample rate**, typically to `44100 Hz`.
    - If you plan to broadcast audio from other applications, configure **System Audio Capture** in the same preferences window.
    - Click **OK**.
    - Return to the main window and ensure the **VU meters** move when audio is present.

2. **Configure Your Stream**

    - Go to **Broadcast** > **Streams....**
    - Click **Add** to create a new output stream.
    - Enter the connection details provided by your streaming server (Icecast or Shoutcast). This includes:
      - **Server Type:** Select `Icecast 2` or the appropriate `SHOUTcast` version.
      - **Hostname or IP**
      - **Port**
      - **Mountpoint** (for Icecast)
      - **Username** and **Password** (or `dj_username:dj_password` for some SHOUTcast v1 setups).
    - Under **Encoder Settings**, choose your desired **Codec** (e.g., MP3, Ogg Vorbis, AAC for Pro) and set the **Bitrate** and **Channels**.
    - Click **OK**.

3. **Test Your Stream**

    - In the main Rocket Broadcaster window, click **Start Broadcast**.
    - If successful, you'll see "On Air". If you encounter an error, double-check your stream settings for typos.

4. **Configure Metadata (Optional)**
    - To display song artist and title to your listeners, go to **Broadcast** > **Metadata Capture**.
    - Configure the capture method to automatically pull metadata from your radio automation system or media player.

See the official [Rocket Broadcaster documentation](https://www.rocketbroadcaster.com/docs/) for detailed instructions on how to set up and use the software.
