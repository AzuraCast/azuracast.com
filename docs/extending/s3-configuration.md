---
title: S3 configuration
---
# Setting up S3 configurations

[[toc]] 

::: warning 
Before you read, an important note: 

Media processing performence varies depending on the provider your using (Backblaze, Digital Ocean, Linode, S3, etc) so don't panic if it's taking some time. 

It could take up to a hour for the files to fully process 100 files for example. If it takes more than a few hours, contact us through our support methods. 
:::

## Introduction

This guide is aimed for smaller installations that have small storage disk sizes. Our guides will guide you through collecting the Access / Secret Keys. 
You'll require the following to use the S3 compatible service: `Access Key ID`, `Secret Key`, `Endpoint`, `Region`, `Bucket Name` and `API version` (API version should always be `latest`).

To configure a station to use an S3 compatible service, you'll need to go to `yourdomain.com/admin/storage_locations`, click on `edit` and then tick the `Remote: S3 Compatible` instead of `Local Filesystem`. 

It'll look like this: 

![](/img/Storage_Locations.png)

### Amazon Simple Storage Service (S3) 
[Amazon Simple Storage Service](https://aws.amazon.com/s3/), otherwise known as (S3) is an object storage service. [S3's pricing](https://aws.amazon.com/s3/pricing/) is more complex than the others, instead of offering a 'base' fee, it charges for what you use.  You can use our small guide listed below or use Amazon's official documentation
You can use our small guide to create a bucket and collect key's or use [Amazon's documentation](https://docs.aws.amazon.com/s3/index.html)
- With Amazon's S3 system, you'll need to sign into the [S3 console](https://console.aws.amazon.com/s3/) and click `Create Bucket`
- You'll be able to pick the bucket's name (Must be unique across all S3, be 3 and 63 characters long. 
- Pick a region after you've made a bucket's name. 
- You can find your access and security key within the `My Security Credentials`

### Backblaze
[Backblaze B2 Cloud Storage](https://www.backblaze.com/b2/cloud-storage.html) is an S3-compatible service. It has a similar price plan to Amazon's S3 service but it has a [pricing calculator](https://www.backblaze.com/b2/cloud-storage-pricing.html). 
You can use our small guide or use [Backblaze's extensive documentation](https://help.backblaze.com/hc/en-us/categories/202640068-Backblaze-B2-Cloud-Storage) on B2 Cloud Storage. 
- With Backblaze you'll need to sign in and go to your Buckets page. 
- From there you can collect the S3 endpoint (Important Note: Buckets created prior to the 4th of May 2020 are not S3 compatible, if a bucket isn't compatible, create a new one) 
- You can create the Application Key ID and Application Key in the App Keys page. (Important Note: Application Key ID = Access Key | Application Key = Secret Key)

### Digital Ocean Spaces
[Digital Ocean Spaces](https://www.digitalocean.com/products/spaces/) is an a S3-compatible object storage service. The [basic plan](https://www.digitalocean.com/docs/spaces/#plans-and-pricing) costs $5 for 250GB with 1 TB outbound transfer. 
You can use our guide listed below or use [Digital Ocean's documentation on Spaces](https://www.digitalocean.com/docs/spaces/) 
- To create the Spaces storage service you'll need to create an account through Digital Ocean, if you have one, you can skip this step.  
- You can create a `Spaces` from the `Create` menu and it'll take you to the page. You'll need to pick a datacenter region and enable or disable the CDN (optional). 
- Finally you can choose a unique name for the Space, it has to be unique as it'll serve as your `Endpoint`.
- You'll need to create a Access/Secret Key by following [this guide](https://www.digitalocean.com/docs/spaces/how-to/manage-access/) from Digital Ocean.

### Linode Object Storage (S3) 

[Linode Object Storage](https://www.linode.com/products/object-storage/) is a storage service offered by Linode and the [basic plan](https://www.linode.com/pricing/#row--storage) starts at $5 for 250 GB with 1 TB outbound transfer. 
You can use our small guide listed below or use [Linode's documentation on Object Storage](https://www.linode.com/docs/guides/how-to-use-object-storage/) 
- Fist of all you'll need to grab the access and secret key from the [Cloud Manager](https://cloud.linode.com/), and click on `Object Storage`
- If this is the first bucket you've created with Linode, you'll need to confirm the Object Storage. (Skip this part if you have a bucket)
- After that you'll be able to generate a Access and Secret key. 
