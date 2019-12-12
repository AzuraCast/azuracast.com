---
title: FTP
---

# Built-in FTP Server

::: tip Note
The Built-in FTP server is _only available on the Docker installation_.
:::

To enable the built-in FTP server you must check the "Enable Built-in FTP Server" from the System Settings page.

## Logging In To Your FTP Server

Connect to your AzuraCast instance directly either via hostname or IP address on port 21, you will be prompted to accept a certificate, accept it and log in using your AzuraCast credentails.

## Ports Used For FTP

The FTP server is configured to use passive mode only, and is assigned ports between 30000-30009, for a total of 5 concurrent users.