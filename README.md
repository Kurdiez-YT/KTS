# Kurdiez Trading System

❗ This repository will stay read-only until the codebase matures a bit.

Welcome to Kurdiez's algorithmic trading system git repository! This trading system is an open-source project that focuses on risk management and live strategy performance monitoring. It is designed to serve as the overall platform for running multiple strategies. I am Kurdiez, the project's author, and I regularly share updates on the project's progress on [this YouTube channel](https://www.youtube.com/channel/UCvXDoMh9qCc5VcNzzx1X-eg) with vlog videos. If you are interested in learning more about the system's architectural design, you can watch [this video](https://www.youtube.com/watch?v=lVA2zGCNSwc). I hope you find this trading system helpful and informative as you explore the world of algorithmic trading.

## Getting Started

1. From the `project root` folder, run `yarn`.
1. Update environment variables appropriately in `docker-compose.yml` and run `docker-compose up -d`
1. From the `apps/server` folder, run `cp .env.example .env` to create the `.env` file. Update the `.env` file according to the values in `docker-compose.yml` file above.
1. From the `apps/server` folder, run `yarn start:dev` to run the server in dev mode

## Seeding the DB

During the infant stage of the codebase, there will be no DB migrations. When the server starts up, all the ORM entities will be scanned and DB schema will be modified automatically.

To reset the DB with seed data:

1. Shut down the KTS server
1. Remove the DB docker container along with its volume
1. From the `apps/server` folder, run `yarn cmd seed-data`
