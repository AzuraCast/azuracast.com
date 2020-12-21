--- 
title: Ansible
--- 
 
# Ubuntu Installation with Ansible 
 
::: danger 
**This method is no longer officially supported.** 
 
**Why?** This is an advanced installation option for seasoned Linux server administrators. The software we install can often conflict with other software installed on your server and cause problems which are difficult to diagnose and support. We do not provide support if you install AzuraCast on a server through the Ansible method.  

Even if you aren't familiar with Docker, our Docker installation is still by far the easier way of installing and maintaining AzuraCast. We include helpful scripts that will install Docker and Docker Compose for you, so it's all just one command. Updates are much faster and things are much less likely to break.
 
If you want an easier, faster installation process that is supported by our team directly, **please follow our [recommended installation instructions](/install/).** 
::: 
 
[[toc]] 
 
The Ubuntu Ansible installation method (formerly known as the "bare-metal" or "traditional" installation) is an advanced option available for those who want more complex customization options or are running on very limited hardware that can't handle the minor overhead of the Docker installation method. 
 
Currently, the following operating systems are supported: 
 
- Ubuntu 16.04 "Xenial" LTS 
- Ubuntu 18.04 "Bionic" LTS 
- Ubuntu 20.04 "Focal" LTS

::: tip 
Some web hosts offer custom versions of Ubuntu that include different software repositories. These may cause compatibility issues with AzuraCast. Many VPS providers are known to work out of the box with AzuraCast (OVH, DigitalOcean, Vultr, etc), and are thus highly recommended if you plan to use the Bare-metal installer. 
::: 
 
AzuraCast is optimized for speed and performance, and can run on very inexpensive hardware, from the Raspberry Pi 3 to the lowest-level VPSes offered by most providers. 
 
Since AzuraCast installs its own radio tools, databases and web servers, you should always install AzuraCast on a "clean" server instance with no other web or radio software installed previously. 
 
## Installing 
 
Execute these commands **as a user with sudo permissions (or root)** to set up your AzuraCast server: 
 
```bash 
sudo apt-get update 
sudo apt-get install -q -y git 
 
sudo mkdir -p /var/azuracast/www 
cd /var/azuracast/www 
sudo git clone https://github.com/AzuraCast/AzuraCast.git . 

# Want only stable "release" builds? Run this code here:
# git checkout -q -f stable
 
sudo chmod a+x install.sh 
./install.sh 
``` 
 
The installation process will take between 5 and 15 minutes, depending on your Internet connection. 

Once the terminal-based installation is complete, follow the [initial setup instructions](/administration/system/initial-setup).

## Updating 
 
To update your AzuraCast installation, follow our [update instructions](/administration/system/updating)