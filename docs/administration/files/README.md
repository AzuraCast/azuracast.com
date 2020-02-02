---
title: Managing Your Files
---

# Managing Your Files

## Docker Installations

On docker, your files are stored inside of docker volumes, which are managed by the docker runtime. The best way to access these files is via the [Built-in SFTP Server](sftp).

## Ansible Installations

On Ansible your files are kept in `/var/azuracast/`.

Because Ansible installs directly to your server, you are responsible for managing the files on your host machine. Ansible installations are typically unsupported and we don't offer any automated file management tools for this installation type.