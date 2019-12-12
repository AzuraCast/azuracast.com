--- 
title: Raspberry Pi
--- 
 
# ARM64/Raspberry Pi 3+ Installation

AzuraCast is compatible with any device or server capable of running the ARM64 platform, including the Raspberry Pi 3 and 4.

Because several ARM-based computers operate with limited system resources, currently the ideal installation method for AzuraCast is the Ansible (formerly known as "Bare-metal" or "Traditional") installation. While this installation method isn't supported for most web servers, in the case of ARM devices the Ansible installation method is currently the only fully working solution.

We have [an ongoing GitHub issue](https://github.com/AzuraCast/AzuraCast/issues/332) for bringing full Docker support to ARM64 devices.

## Installing Ubuntu 18.04

If using a web host that offers ARM-based hosts (such as Scaleway), select an ARM64 device and choose the Ubuntu 18.04 (Bionic Beaver) operating system. This will allow for the fastest installation method.

If you are running a Raspberry Pi, visit the [Ubuntu Wiki page for the Raspberry Pi](https://wiki.ubuntu.com/ARM/RaspberryPi). On this page, you will see links to download Ubuntu "classic"; make sure to choose the ARM64 image. The `.xz` image file can be written to a MicroSD card with an application like [Etcher](https://www.balena.io/etcher/).

## Running the Ansible Installation

Once the operating system is booted up and you have connected to the device either via SSH or by directly accessing the terminal, you can run the standard [Ansible installation instructions](ansible) without any changes.