# Intro
Simple auth with JWT


## Tech Stack

**Server:** Express.js 5, 
**Database:** Mysql
**ORM:** Prisama

## Installation 

You can fork or clone this project

```
npm install
cp .env.example .env <-- edit db config, access and refresh token secret
docker-compose.yml edit free, up to you
docker-compose up
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```