# SAM Cast

[SAM Cast](https://spacial.com/sam-cast/) is commercial software sold by Spacial. It is compatible with AzuraCast by using the MP3 encoder and the "IceCast 2" server connection settings.

## Broadcasting Steps

From the main SAM Cast window, click "Encoders" at the bottom left.

![](https://i.imgur.com/iATcfjj.png)

In the Encoders window that pops up, click the plus sign button on the toolbar to add a new encoder.

![](https://i.imgur.com/Hdw15XU.png)

You will be asked to select an encoder. It is recommended to select `MP3 (LAME_ENC)`, because this allows for the easiest constant bit rate (CBR) streaming, which causes the fewest issues when broadcasting.

Click "OK" at the bottom to continue to encoder details.

![](https://i.imgur.com/WCbI6xH.png)

On the first tab of the encoder details, change your bitrate from the default 64kbps to your desired bitrate. This should likely match the highest bitrate that you broadcast out to your listeners. By default, it should at least be 128kbps.

![](https://i.imgur.com/JqjMvyu.png)

Click the "Server Details" tab. On the "Server Type" selector, choose "IceCast", then choose "IceCast 2" in the secondary selector.

You can now populate the "Server Details" section with the connection information supplied to you via AzuraCast's "Streamers/DJs" page. You will want to use the connection information for "IceCast Clients", the first section on the page.

![](https://i.imgur.com/mMJfqYI.png)

Click OK to return to the main Encoders pane, where you will now see a new encoder with "Idle" status.

Select the encoder, then click the play-button icon in the toolbar to begin broadcasting.

![](https://i.imgur.com/O4BynSY.png)