---
title: List of Events
description: A list of events available for event listeners through the EventDispatcher
published: true
date: 2022-08-12T20:52:47.088Z
tags: development, plugin
editor: markdown
dateCreated: 2021-02-06T20:12:02.133Z
---

You can also find all Event classes of AzuraCast in [our GitHub repository](https://github.com/AzuraCast/AzuraCast/tree/master/src/Event).

# `\App\Event\BuildAdminMenu`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/BuildAdminMenu.php)

This event allows you to customize and extend the Administration page menu.

```php
$dispatcher->addListener(App\Event\BuildAdminMenu::class, function(App\Event\BuildAdminMenu $event) {
    $request = $event->getRequest();
    $router = $request->getRouter();

    $event->addItem('example', [
        'label' => __('Example'),
        'icon' => 'cast',
        'url' => $router->fromHere('example-plugin:admin:example:index'),
        'permission' => App\Enums\GlobalPermissions::View,
    ]);
});
```

For more examples take a look at the [admin menu definition in AzuraCast](https://github.com/AzuraCast/AzuraCast/blob/master/config/menus/admin.php).

# `\App\Event\BuildConsoleCommands`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/BuildConsoleCommands.php)

This event allows you to register your own CLI console commands, which appear when running the [AzuraCast CLI](http://www.azuracast.com/cli.html).

```php
$dispatcher->addListener(App\Event\BuildConsoleCommands::class, function (App\Event\BuildConsoleCommands $event) {
    $event->addAliases([
        'example:list-stations' => \Plugin\ExamplePlugin\Command\ListStations::class,
    ]);
}, -1);
```

# `\App\Event\BuildDoctrineMappingPaths`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/BuildDoctrineMappingPaths.php)

This event allows you to register custom doctrine mappings for your own database entities.

```php
$dispatcher->addListener(App\Event\BuildDoctrineMappingPaths::class, function (App\Event\BuildDoctrineMappingPaths $event) {
    $mappingClassesPaths = $event->getMappingClassesPaths();
    $baseDir = $event->getBaseDir();

    $mappingClassesPaths[] = $baseDir . '/plugins/ExamplePlugin/src/Entity';

    $event->setMappingClassesPaths($mappingClassesPaths);
});
```

# `\App\Event\BuildMigrationConfigurationArray`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/BuildMigrationConfigurationArray.php)

This event allows you to register your own Doctrine database migrations.

```php
$dispatcher->addListener(App\Event\BuildMigrationConfigurationArray::class, function (App\Event\BuildMigrationConfigurationArray $event) {
    $migrationConfigurations = $event->getMigrationConfigurations();
    $baseDir = $event->getBaseDir();

    $migrationConfigurations['migrations_paths']['Plugin\ExamplePlugin\Entity\Migration'] = $baseDir . '/plugins/ExamplePlugin/src/Entity/Migration';

    $event->setMigrationConfigurations($migrationConfigurations);
});
```

# `\App\Event\BuildPermissions`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/BuildPermissions.php)

This event allows you to register custom permissions for AzuraCasts ACL system.

It is adviced to create a separate constants file for your permissions so that you can use it at all places where you need to reference the same permission.

Example `Constants/AclConstants.php` file:

```php
<?php

declare(strict_types=1);

namespace Plugin\ExamplePlugin\Constants;

interface AclConstants
{
    public const STATION_EXAMPLE_PERMISSION = 'view station example';
}

```

Example event listener:

```php
$dispatcher->addListener(App\Event\BuildPermissions::class, function(App\Event\BuildPermissions $event) {
    $permissions = $event->getPermissions();

    $permissions['station'][AclConstants::STATION_EXAMPLE_PERMISSION] = __('View Station Example');

    $event->setPermissions($permissions);
});
```

# `\App\Event\BuildRoutes`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/BuildRoutes.php)

This event allows you to register custom routes to the HTTP Router. This allows you to create entirely new routes handled exclusively by your plugins.

```php
$dispatcher->addListener(App\Event\BuildRoutes::class, function(App\Event\BuildRoutes $event) {
    $app = $event->getApp();
    
    $app->group('/station/{station_id}', function (Slim\Routing\RouteCollectorProxy $group) {
        $group->get('/podcasts', \Plugin\ExamplePlugin\Controller\Stations\ExampleController::class)
            ->setName('example-plugin:stations:example:index');
    })
        ->add(App\Middleware\Module\Stations::class)
        ->add(new App\Middleware\Permissions(App\Acl::STATION_VIEW, true))
        ->add(new App\Middleware\Permissions(Plugin\ExamplePlugin\Constants\AclConstants::STATION_EXAMPLE_PERMISSION, true))
        ->add(App\Middleware\RequireStation::class)
        ->add(App\Middleware\GetStation::class)
        ->add(App\Middleware\EnableView::class)
        ->add(App\Middleware\RequireLogin::class);
});
```

Take a look at how [AzuraCasts own routes](https://github.com/AzuraCast/AzuraCast/tree/master/config/routes) are defined for more examples for admin, API, public and station routes.

# `\App\Event\BuildStationMenu`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/BuildStationMenu.php)

This event allows you to customize and extend the station sidebar menu.

```php
$dispatcher->addListener(App\Event\BuildStationMenu::class, function(App\Event\BuildStationMenu $event) {
    $request = $event->getRequest();
    $router = $request->getRouter();

    $event->addItem('example', [
        'label' => __('Example'),
        'icon' => 'cast',
        'url' => $router->fromHere('example-plugin:station:example:index'),
        'permission' => App\Enums\StationPermissions::View,
    ]);
});
```

For more examples take a look at the [station menu definition in AzuraCast](https://github.com/AzuraCast/AzuraCast/blob/master/config/menus/station.php).

# `\App\Event\BuildView`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/BuildView.php)

This event lets you inject custom data into the template renderer, or modify the existing data that's already injected. This includes the current user, current station, page title, etc.

```php
$dispatcher->addListener(App\Event\BuildView::class, function(App\Event\BuildView $event) {
    $event->getView()->addFolder('example-plugin', __DIR__.'/templates');
});
```

# `\App\Event\GetNotifications`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/GetNotifications.php)

This event let's you read and add notifications to AzuraCasts notification system.

```php
$dispatcher->addListener(App\Event\GetNotifications::class, function(App\Event\GetNotifications $event) {
    $notification = new App\Entity\Api\Notification();
    $notification->type = App\Session\Flash::INFO;

    $notification->title = 'Example Notification';
    $notification->body = 'This is an example notification';

    $notification->actionLabel = 'Example Action';
    $notification->actionUrl = 'https://example.com';

    $event->addNotification($notification);
});
```

Available notification types: `INFO`, `WARNING`, `ERROR`, `SUCCESS`

# `\App\Event\GetSyncTasks`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/GetSyncTasks.php)

This event allows you to register your own tasks to the [Sync Tasks](/docs/administration/sync-tasks) system of AzuraCast.

You should create a Sync Task for your plugin under `Task/ExampleTask.php`.

```php
<?php

declare(strict_types=1);

namespace Plugin\ExamplePlugin\Task;

use App\Entity;
use App\Event\GetSyncTasks;
use App\Sync\Task\AbstractTask;
use Doctrine\ORM\EntityManagerInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ExampleTask extends AbstractTask implements EventSubscriberInterface
{
    public function __construct(
        EntityManagerInterface $em,
        LoggerInterface $logger,
        Entity\Settings $settings
    ) {
        parent::__construct($em, $logger, $settings);
    }

    public static function getSubscribedEvents()
    {
        yield GetSyncTasks::class => ['checkSyncTask', -1];
    }

    public function checkSyncTask(GetSyncTasks $event): void
    {
        if (GetSyncTasks::SYNC_LONG === $event->getType()) {
            $event->addTask($this);
        }
    }

    public function run(bool $force = false): void
    {
        $stations = $this->em->getRepository(Entity\Station::class)
            ->findAll();

        foreach ($stations as $station) {
            /** @var Entity\Station $station */
            $this->processStation($station);
        }
    }

    public function processStation(Entity\Station $station): void
    {
        // DO STUFF
    }
}
```

Then register the task as a service subscriber in the `events.php` like this:

```php
$dispatcher->addServiceSubscriber(Plugin\ExamplePlugin\Task\ExampleTask::class);
```

# `\App\Event\Radio\AnnotateNextSong`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/Radio/AnnotateNextSong.php)

This event is triggered once the next song has been determined by the AzuraCast AutoDJ software and is being sent to Liquidsoap. Annotations allow you to customize fade-in, fade-out, cue-in and cue-out data, and the artist/title displayed for a song.

Create a new EventHandler in `EventHandler/ExampleAnnotationEventHandler.php`:

```php
<?php

declare(strict_types=1);

namespace Plugin\ExamplePlugin\EventHandler;

use App\Event;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ExampleAnnotationEventHandler implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            Event\Radio\AnnotateNextSong::class => [
                ['setExampleAnnotation', -20]
            ],
        ];
    }

    public function setExampleAnnotation(Event\Radio\AnnotateNextSong $event)
    {
        $title = $event->getMedia()->getTitle();

        $event->addAnnotations([
            'title' => strtoupper($title)
        ]);
    }
}
```

Then register the EventHandler as a service subscriber in the `events.php` like this:

```php
$dispatcher->addSubscriber(new \Plugin\ExamplePlugin\EventHandler\ExampleAnnotationEventHandler);
```

# `\App\Event\Radio\GenerateRawNowPlaying`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/Radio/GenerateRawNowPlaying.php)

This event is triggered when building the "Now Playing" data for a given station. This data is called "raw" because it has not been converted yet into the standardized API response format served by AzuraCast's API. By modifying the "raw" nowplaying response, you can change the currently playing song or modify the listener count.

Create a new EventHandler in `EventHandler/ExampleNowPlayingEventHandler.php`:

```php
<?php

declare(strict_types=1);

namespace Plugin\ExamplePlugin\EventHandler;

use App\Event;
use NowPlaying\Result\Result;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ExampleNowPlayingEventHandler implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            Event\Radio\GenerateRawNowPlaying::class => [
                ['setListenerCount', -20]
            ],
        ];
    }

    public function setListenerCount(Event\Radio\GenerateRawNowPlaying $event)
    {
        $np_raw = $event->getResult()->toArray();

        $np_raw['listeners']['current'] = mt_rand(5, 25);
        $np_raw['listeners']['unique'] = mt_rand(0, $np_raw['listeners']['current']);
        $np_raw['listeners']['total'] = $np_raw['listeners']['current'];

        $event->setResult(Result::fromArray($np_raw));
    }
}
```

Then register the EventHandler as a service subscriber in the `events.php` like this:

```php
$dispatcher->addSubscriber(new \Plugin\ExamplePlugin\EventHandler\ExampleNowPlayingEventHandler);
```

# `\App\Event\Radio\BuildQueue`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/Radio/BuildQueue.php)

This event is triggered as the AzuraCast AutoDJ is determining the next song to play for a given station. By default, ths checks for an existing "next song" record in the database, and if one isn't present, determines what should play next based on all available playlists and their scheduling status.

Create a new EventHandler in `EventHandler/ExampleBuildQueueEventHandler.php`:

```php
<?php

declare(strict_types=1);

namespace Plugin\ExamplePlugin\EventHandler;

use App\Event;
use NowPlaying\Result\Result;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ExampleBuildQueueEventHandler implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            Event\Radio\BuildQueue::class => [
                ['setNextSong', -20]
            ],
        ];
    }

    public function setNextSong(Event\Radio\BuildQueue $event)
    {   
        // You need to build your own logic for building the next song
        $nextSong = null;
    
        $event->setNextSong($nextSong);
    }
}
```

Then register the EventHandler as a service subscriber in the `events.php` like this:

```php
$dispatcher->addSubscriber(new \Plugin\ExamplePlugin\EventHandler\ExampleBuildQueueEventHandler);
```

# `\App\Event\Radio\WriteLiquidsoapConfiguration`

- [Class reference](https://github.com/AzuraCast/AzuraCast/blob/master/src/Event/Radio/WriteLiquidsoapConfiguration.php)

This event is triggered when changes to the Liquidsoap configuration are being written to disk. This process uses the Event Dispatcher because it is by far the most complex configuration file written by the system, and there are multiple points at which one may want to override the configuration written by AzuraCast itself. Users are already able to write custom configuration to one specific location (between the playlists being built and mixed with the live signal, and the signal being broadcast to local and remote sources), but overriding this event allows you to modify the configuration in any other location.

Create a new EventHandler in `EventHandler/ExampleWriteLiquidsoapConfigurationEventHandler.php`:

```php
<?php

declare(strict_types=1);

namespace Plugin\ExamplePlugin\EventHandler;

use App\Event;
use NowPlaying\Result\Result;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ExampleWriteLiquidsoapConfigurationEventHandler implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            Event\Radio\WriteLiquidsoapConfiguration::class => [
                ['addLiquidsoapConfiguration', -20]
            ],
        ];
    }

    public function addLiquidsoapConfiguration(Event\Radio\WriteLiquidsoapConfiguration $event)
    {   
        $event->appendBlock('');
    }
}
```

Then register the EventHandler as a service subscriber in the `events.php` like this:

```php
$dispatcher->addSubscriber(new \Plugin\ExamplePlugin\EventHandler\ExampleWriteLiquidsoapConfigurationEventHandler);
```
