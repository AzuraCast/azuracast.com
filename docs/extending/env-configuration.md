---
title: Env Configuration
---

# Customising the azuracast.env variables
This page will show you all the variables within the `azuracast.env` file and the ones that you can change. This list is in ascending order and will go from top to bottom. Some users may have slightly different `azuracast.env` variables which do not include some fields. 

::: warning
Customising the `azuracast.env` variables should only be done by experienced users who are running into some issues or power users to looking to adjust the variables. The information in this page was collected through the `sample-azuracast.env`, it can be found on [Github](https://github.com/AzuraCast/AzuraCast/blob/master/azuracast.sample.env).
:::

```bash
# Valid options: production, development, testing
APPLICATION_ENV=production
```
There is three options as listed, production is for every day stations. Development is for developing purposes only, this option comes with extra debugging features. Testing is for testing new features and is used by developers to test. 

```bash
# Valid options: true, false
ENABLE_ADVANCED_FEATURES=false
```
Advanced Features includes advanced playlist configurations, station port assignments, base media directories and other functions. The only valid options are `true` or `false`.

```bash
COMPOSER_PLUGIN_MODE=false
```
This option is mainly aimed towards developers on `development` or `testing` builds who are trying out new features. Experienced users may wish to try this can turn it to `true`. This may cause performence implications however. 

```bash
AUTO_ASSIGN_PORT_MIN=8000

AUTO_ASSIGN_PORT_MAX=8499
```
By default, this matches the first forwarded port on the "stations" container, you can modify this variable if your station port range is different. Make sure to forward the necessary ports via `docker-compose.yml` and nginx if you wish to use the built in proxy. The PORT_MAX field is the highest port AzuraCast will allow, so for example `8499` is the highest port a station can have. 

## MySQL variables

```bash
# The host to connect to. Leave this as the default value unless you're connecting
#   to an external database server.
# Default: mariadb
MYSQL_HOST=mariadb

# The port to connect to. Leave this as the default value unless you're connecting
#   to an external database server.
# Default: 3306
MYSQL_PORT=3306

# The username AzuraCast will use to connect to the database.
# Default: azuracast
MYSQL_USER=azuracast

# The password AzuraCast will use to connect to the database.
# By default, the database is not exposed to the Internet at all and this is only
#   an internal password used by the service itself.
# Default: azur4c457
MYSQL_PASSWORD=azur4c457

# The name of the AzuraCast database.
# Default: azuracast
MYSQL_DATABASE=azuracast

# Automatically generate a random root password upon the first database spin-up.
#   This password will be visible in the mariadb container's logs.
# Default: yes
MYSQL_RANDOM_ROOT_PASSWORD=yes

# Log slower queries for the purpose of diagnosing issues. Only turn this on when
#   you need to, by uncommenting this and switching it to 1.
# To read the slow query log once enabled, run:
#   docker-compose exec mariadb slow_queries
# Default: 0
MYSQL_SLOW_QUERY_LOG=0

# Set the amount of allowed connections to the database. This value should be increased
# if you are seeing the `Too many connections` error in the logs.
# Default: 100
MYSQL_MAX_CONNECTIONS=100```

If you wish to use a external database server, you'll need to configure this area and restart AzuraCast.


## Redis Variables

```bash
# Name of the Redis host.
# Default: redis
# REDIS_HOST=redis

# Port to connect to on the Redis host.
# Default: 6379
# REDIS_PORT=6379

# Database index to use on the Redis host.
# Default: 1
# REDIS_DB=1
```

If your using a third party Redis host you'll need to modify these fields and uncomment them, after this you'll need to restart AzuraCast. 


## Advanced Configuration
```bash
# Override the IP/hostname to use when negotiating inbound FTP Passive Mode (PASV) connections.
# The system will attempt to automatically detect this, so you often don't need to change it.
# FTP_PASV_IP=localhost
```
Information is required here. 

```bash
# PHP's maximum POST body size and max upload filesize.
# PHP_MAX_FILE_SIZE=25M
```
If you run into issues with maximum file sizes you can change this parameter to the desired maximum file size.
```bash
# PHP_MEMORY_LIMIT=128M
```
If your installation is running into errors such as `PHP Fatal error:  Allowed memory size of % bytes exhausted (Tried to allocate % bytes)` it's advised to alter your PHP Memory Limit to a higher value, make sure your installation has enough ram to support it. 

```bash 
# PHP's maximum script execution time (in seconds).
# PHP_MAX_EXECUTION_TIME=30
```

```bash 
# SYNC_SHORT_EXECUTION_TIME=600
```
If your installation is running into timeouts for the above tasks, consider upping the sync execution time, it may resolve the issue. If this does not resolve the issue, investigate your system resources, mainly CPU and Memory usage, `top` is a good Unix task manager that displays information about CPU and memory utilization 

```bash
# SYNC_LONG_EXECUTION_TIME=1800
```
Should your installation run into timeouts for the long synchronization tasks you can change the maximum execution time in this variable. 
```bash
# Maximum number of PHP-FPM worker processes to spawn.
# PHP_FPM_MAX_CHILDREN=5
```
INFORMATION REQUIRED

```bash # Default: 0
# ADDITIONAL_MEDIA_SYNC_WORKER_COUNT=0
```
If you have a lot of media that's currently trying to `process` through the media sync system and it's taking too long, you can up the worker count in this field. Additional workers *may* require slightly more server resources. 


