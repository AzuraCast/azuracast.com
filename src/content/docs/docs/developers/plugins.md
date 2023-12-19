---
title: Plugins
published: true
date: 2022-02-16T16:59:11.437Z
tags: development, plugin
editor: markdown
dateCreated: 2021-02-06T20:06:57.052Z
---

AzuraCast contains a plugin system that can be used to extend AzuraCast without having to modifying AzuraCasts code. When you need to modify AzuraCasts behavior you should use the plugin system so that you can still easily update your AzuraCast installation without loosing any modifications.

## Example Plugin

We have built an example plugin that you should use as the base for your own plugin. You can find the git repository at: 

https://github.com/AzuraCast/example-plugin

## Including Plugins

Plugins are automatically discovered if they're located in the `/plugins` directory relative to the main AzuraCast installation. Plugins are ignored by the parent AzuraCast instance, so you can update your instance any time you like without worrying about your plugins being removed.

You can clone the plugin directory anywhere you want on the host machine, then create a `docker-compose.override.yml` in your `/var/azuracast` directory to mount the plugin as a volume in the correct location, like so:

```yaml
services:
  web:
    environment:
      AZURACAST_PLUGIN_MODE: true
    volumes:
      - ./path_to_plugin:/var/azuracast/www/plugins/example-plugin:ro
```

Make sure to update and restart the Docker containers afterwards (using `./docker.sh update`).

## Additional Information

Details about how to build plugins, what events are available, etc. are included in the documentation of the [Example Plugin](https://github.com/AzuraCast/example-plugin).
