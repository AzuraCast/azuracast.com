---
title: Managing Your Files
---

# Ansible vs Docker

## Ansible

On Ansible your files are kept in `/var/azuracast/`, ultimately any non-web methods for uploading and maintaining files is up to you as per [our policy on ansible](/installation/ansible).

## Docker

On docker, your files are stored inside of docker volumes, which are managed by the docker runtime. The best way to access these files is via the [Built-in FTP Server](ftp).
