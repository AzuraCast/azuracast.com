---
title: Advanced Features
description: What are Advanced Features and how to enable them
published: true
date: 2021-02-08T05:35:52.480Z
tags: advanced feature, administration
editor: markdown
dateCreated: 2021-02-06T23:08:02.099Z
---

:::caution[Power users only!]
The primary reason we hide these features by default is because new users stumble upon them without realizing that they can have unintended consequences. These features give you enough power to break your station or installation, so they should be used with caution.

If you modify an advanced feature and it breaks something, your best recourse is to revert the changes you made. If you make custom configuration to Liquidsoap or Icecast and those changes don't work, you should use the Log Viewer utility to view the logs of those respective tools; the issue may be with either your code or a bug in those pieces of software.
:::

## Enabling Advanced Features

In new installations of AzuraCast, we turn off some of the more "dangerous" features which can have unintended consequences if misused by users who are unfamiliar with them.

Advanced features hidden by default include:

- Station custom port assignments (which are not cleared through the firewall by default in new Docker installations),
- Providing a custom media base directory (because only certain paths are mounted into the Docker filesystem),
- Customizing Icecast or Liquidsoap configuration (as errors caused by custom configuration are not caused by AzuraCast itself), and
- Advanced playlist settings (because they bypass AzuraCast's AutoDJ).

These features can be re-enabled via the `Administration` -> `System Settings` page in the `Settings` tab.

By checking the `Enable Advanced Features` checkbox and saving your settings you can enable the advanced features of AzuraCast.

### Broadcasting

#### Custom Configuration

A common use case of the station-wide Icecast config is to publish your station's mount points to [YellowPage directories](/docs/user-guide/promoting-your-station/#yellowpages-directories).

Additionally, you can overwrite some values such as `<location>` and the `<admin>` email address.
