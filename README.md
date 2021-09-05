# roomruler

<p align="center">
  <img src="https://github.com/dm1sh/roomruler/raw/main/logo.svg" alt="roomruler logo" width="150px">
</p>

## Overview

Web application for distribution of free classrooms

## Deploy

Clone repo

```bash
git clone https://github.com/dm1sh/roomruler.git
cd roomruler
```

Put [CockroachDB](https://www.cockroachlabs.com) certificate to `apps/back/certs`. Copy `apps/back/.env.example` and fill it in. So do with `apps/back/src/db/config.example.ts`

```bash
mkdir apps/back/certs/
cp ../cc-ca.crt apps/back/certs/

cp apps/back/.env.example apps/back/.env
$EDITOR apps/back/.env

cp apps/back/src/db/config.example.ts apps/back/src/db/config.ts
$EDITOR apps/back/src/db/config.ts
```

Install dependencies, build and run

```bash
npx pnpm i
npx pnpm build
npx pnpm start
```
