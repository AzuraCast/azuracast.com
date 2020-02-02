# AzuraCast Documentation and Public Page Repository

This repository is home to both the supporting documentation and the public-facing homepage of the [AzuraCast web radio management suite](https://azuracast.com/).

Pull requests are welcomed for any changes that are needed to any of the Markdown files contained within.

### Building Locally

Local development takes advantage of Docker Compose.

#### Run Development Server

```bash
docker-compose up --build -d
```

(Note: This will serve the page as it existed when launched, but won't update automatically on Windows.)

#### Run One-time Build

```bash
docker-compose build vuepress
docker-compose run --rm vuepress npm run build
```

#### Interactive Shell

```bash
docker-compose build vuepress
docker-compose run --rm vuepress bash
```