---
title: Plugins
published: true
date: 2022-02-16T16:59:11.437Z
tags: development, plugin
editor: markdown
dateCreated: 2021-02-06T20:06:57.052Z
---

AzuraCast contains a plugin system that can be used to extend AzuraCast without having to modifying AzuraCasts code. When you need to modify AzuraCasts behavior you should use the plugin system so that you can still easily update your AzuraCast installation without loosing any modifications.

# Example Plugin

We have built an example plugin that you should use as the base for your own plugin. You can find the git repository at: 

https://github.com/AzuraCast/example-plugin

# Including Plugins

Plugins are automatically discovered if they're located in the `/plugins` directory relative to the main AzuraCast installation. Plugins are ignored by the parent AzuraCast instance, so you can update your instance any time you like without worrying about your plugins being removed.

<br>

## Docker Installations

You can clone the plugin directory anywhere you want on the host machine, then create a `docker-compose.override.yml` in your `/var/azuracast` directory to mount the plugin as a volume in the correct location, like so:

```yaml
services:
  web:
    volumes:
      - ./path_to_plugin:/var/azuracast/www/plugins/example-plugin:ro
```

Make sure to update and restart the Docker containers afterwards (using `./docker.sh update`).

<br>

## Ansible Installations

You should clone the repository for your plugin directly into the `plugins` directory, like so:

```bash
mkdir -p /var/azuracast/www/plugins/example-plugin
cd /var/azuracast/www/plugins/example-plugin
git clone https://github.com/AzuraCast/example-plugin.git .
```

# Naming Convention

<br>

## Autoloaded Files

The following files are automatically loaded along with the relevant section of code:

 - `/services.php`: Register or extend services with the application's Dependency Injection (DI) container.
 - `/events.php`: Register listeners for the Event Dispatcher.

<br>

## Classes

AzuraCast autoloads PHP files inside `/plugins/(plugin_name)/src` as long as they are in the appropriate namespace.

The function used to convert from the plugin folder name into the PHP class name is:

```php
<?php
return str_replace([' ', '_', '-'], '', ucwords($word, ' _-'));
```

For example, `/plugins/example-plugin/src` will autoload classes in the `\Plugin\ExamplePlugin` namespace.

# Event Dispatcher

Most of the extensibility of plugins comes from events that use the [SlimCallableEventDispatcher](https://github.com/AzuraCast/slim-callable-eventdispatcher) in AzuraCast. Both classes from inside AzuraCast and plugins are registered as "listeners" to common events that are dispatched by the system, so you can override or modify the core application's responses simply by adding your own listeners in the right order.

Here is an example of a basic `events.php` file for handling an event:

```php
<?php
return function (\Azura\SlimCallableEventDispatcher\SlimCallableEventDispatcher $dispatcher)
{
    $dispatcher->addListener(\App\Event\BuildRoutes::class, function(\App\Event\BuildRoutes $event) {
        $app = $event->getApp();

        // Modify the app's routes here
    }, -5);
};
```

As you can see, each event listener that you register has to provide the event that it listens to as a callable to the `addListener` method's first parameter, and each event listener receives an instance of that event class complete with relevant metadata already attached. Listeners also have a priority (the last argument in the function call); this number can be positive or negative, with the default handler tending to be around zero. Higher numbers are dispatched before lower numbers.

You can find a listing of the events that can be overridden by plugins on this page:

- [List of Events](/docs/developers/list-of-events)
{.links-list}
