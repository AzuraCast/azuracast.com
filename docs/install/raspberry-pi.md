--- 
title: Raspberry Pi
--- 
 
# ARM64/Raspberry Pi 3+ Installation

AzuraCast is compatible with any device or server capable of running the ARM64 platform, including the Raspberry Pi 3, 3B, 4 and newer models.

Because several ARM-based computers operate with limited system resources, currently the ideal installation method for AzuraCast is the Ansible (formerly known as "Bare-metal" or "Traditional") installation. While this installation method isn't supported for most web servers, in the case of ARM devices the Ansible installation method is currently the only fully working solution.

We have [an ongoing GitHub issue](https://github.com/AzuraCast/AzuraCast/issues/332) for bringing full Docker support to ARM64 devices.

## Installing Ubuntu

If using a web host that offers ARM-based hosts (such as Scaleway), select an ARM64 device and choose the Ubuntu 20.04 (Focal Fossa) or 18.04 (Bionic Beaver) operating system. This will allow for the fastest installation method.

If you are running a Raspberry Pi, download the [Ubuntu 20.04 ARM64 image for Raspberry Pi](http://cdimage.ubuntu.com/ubuntu/releases/20.04/release/ubuntu-20.04.1-preinstalled-server-arm64+raspi.img.xz), then write the image to a MicroSD card (this is made very easy with a tool like [Etcher](https://www.balena.io/etcher/)).

## Running the Ansible Installation

Once the operating system is booted up and you have connected to the device either via SSH or by directly accessing the terminal, you can run the standard [Ansible installation instructions](./ansible.html) without any changes.