---
title: Release Channels
---

# Release Channels

[[toc]]

For Docker installations, AzuraCast offers two different release channels:

 - A "**Stable**" channel that only updates every few weeks or months and consists of changes that have been running on many installations without any issue for quite some time. These releases are tagged with version numbers (i.e. 0.10.3, 0.10.4).

 - A "**Rolling Release**" channel that updates every time changes are made to the AzuraCast codebase, which can sometimes be as frequent as multiple times in a single day. This channel is useful if you're testing new features, running a non-production environment, or need a bug fix that's only recently been made available.

By default, our one-click installers for web hosts are set to prefer stable release builds. When installing yourself, you'll be prompted with the question of whether to prefer stable releases during the initial installation process.

## Switching Release Channels

::: tip
Note: Regardless of which direction you are switching, it is strongly recommended when switching channels to take a backup of your station's data beforehand to more easily recover from any issues that may arise.
:::

If you want to switch release channels on an existing installation, note the rules below before proceeding:

### Switching from "Stable" to "Rolling Release"

You can switch from the "Stable" channel to the "Rolling Release" channel at any time, because the Rolling Release channel will always be the same as, or newer than, the stable channel.

### Switching from "Rolling Release" to "Stable"

You should **only** switch from "Rolling Release" to "Stable" when your rolling-release version is _older than or the exact same version as_ the current stable version. In other words:

 - If your rolling release version is dated October 2, 2020 and the stable version was released on October 5, you can switch channels and update without any issue, BUT
 - If your rolling release version is dated October 7, 2020 and the stable version was released on October 5, you **should not** switch channels and should instead wait until the next stable release.

The reason this can be a problem is because of database migrations: new features implemented in the "Rolling Release" channel can include corresponding database changes, and an update to a "Stable" release that's older than your current one would require that you roll back database migrations; however, to the "Stable" version those migrations don't exist (since it is frozen in time from before they were created), causing your database to fall into an incorrect state.

As an important note, though, if you have mistakenly switched to the "Stable" channel and it has caused your database to go out-of-sync, it is highly likely that just switching back to the "Rolling Release" channel will resolve your issues and return your installation to normal. You can then wait until the next tagged "Stable" release to switch channels again.

### Setting AzuraCast to Use a Different Channel

You can switch release channels by logging in to your host computer (the server running AzuraCast) via SSH and executing:

```bash
cd /var/azuracast
./docker.sh update-self
./docker.sh setup-release
```

You will be prompted whether to prefer stable release builds. If you answer "N", you will be placed on the "Rolling Release" channel.

You can then run the update script (`./docker.sh update`) and your installation will switch its active release channel.