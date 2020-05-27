---
title: Enabling Advanced Features
---

# Enabling Advanced Features

In new installations of AzuraCast, we turn off some of the more "dangerous" features which can have unintended consequences if misused by users who are unfamiliar with them.

Advanced features hidden by default include:

- Station custom port assignments (which are not cleared through the firewall by default in new Docker installations),
- Providing a custom media base directory (because only certain paths are mounted into the Docker filesystem),
- Customizing Icecast or Liquidsoap configuration (as errors caused by custom configuration are not caused by AzuraCast itself), and
- Advanced playlist settings (because they bypass AzuraCast's AutoDJ).

These features can be re-enabled by editing `azuracast.env` on your host computer and modifying the line below:

```
ENABLE_ADVANCED_FEATURES=false
```

...to read:

```
ENABLE_ADVANCED_FEATURES=true
```

::: warning 
**Only enable Advanced Features if you know what you are doing!**

The primary reason we hide these features by default is because new users stumble upon them without realizing that they can have unintended consequences. These users then inadvertently break their AzuraCast installations and either create GitHub issues or declare AzuraCast "broken" as a result, and we've had enough of that to last a lifetime.

If you modify an advanced feature and it breaks something, your best recourse is to revert the changes you made. If you make custom configuration to Liquidsoap or Icecast and those changes don't work, you should use the Log Viewer utility to view the logs of those respective tools; the issue may be with either your code or a bug in those pieces of software.
::: 
