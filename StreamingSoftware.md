In order to help ensure a uniform streaming experience across multiple broadcasting technologies, AzuraCast harnesses LiquidSoap (the AutoDJ software)'s built in DJ support system. Accounts for streamers/DJs can be added directly inside the AzuraCast web panel, and the streamers will immediately have access to send a live broadcast as soon as they are added.

* [BUTT (Broadcast Using This Tool)](#butt-broadcast-using-this-tool)
* [Mixxx](#mixxx)

# BUTT (Broadcast Using This Tool)

Cross-platform and available for free at https://sourceforge.net/projects/butt/. Streaming via both IceCast mode and ShoutCast mode are available.

### IceCast Mode

Use the exact information specified on the Streamer/DJ page's right sidebar. "Address" is "Server" and "Icecast mountpoint" is "Mount Name".

![BUTT Sample IceCast configuration](https://i.imgur.com/52jaBR8.png)

### ShoutCast Mode

BUTT will automatically add 1 to the port number you specify if used in ShoutCast mode, so use the port specified in the "IceCast Clients" section. Since ShoutCast v1 does not let you specify a username, specify your password as `dj_username:dj_password` (the username and password for the DJ separated by a colon).

![BUTT Sample ShoutCast configuration](https://i.imgur.com/Iv9G4v6.png)

# Mixxx

[Mixxx](https://www.mixxx.org) is free and open-source DJ software that also supports live broadcasting via IceCast and ShoutCast servers.

Live broadcasting settings can be found in the preferences menu (`Options` -> `Preferences`). It is recommended to use "Icecast 2" mode when broadcasting to AzuraCast. Out of the box, Mixxx does not include the LAME MP3 encoder (for licensing reasons), but it is not needed when connecting to AzuraCast; just set your broadcast format to 'Ogg Vorbis' and LiquidSoap will transcode the broadcast into the correct output format.

![Mixxx preferences menu](https://i.imgur.com/42Aop0k.png)