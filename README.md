# FreeCodeCamp Manchester Pool Leaderboard API

## Description
An API to track players pool victories.  You can add a player, delete a player and increment a named player's score.

## Example API Usage

```
GET https://fccmcr.club/api/test/pool-leaderboard/players/ - lists all players and scores
POST https://fccmcr.club/api/test/pool-leaderboard/players/john - adds player with name john
DELETE https://fccmcr.club/api/test/pool-leaderboard/players/john - deletes player with name john
POST https://fccmcr.club/api/test/pool-leaderboard/recordWin/john - increases john's score by 1

```

## Run locally
```
npm install -g serverless
npm install
serverless offline start 
```

## What's Serverless?
[Serverless](https://serverless.com) is a framework that we use to automate deployment to an AWS stack.

## Pull Requests?
Yes!
