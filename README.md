# FreeCodeCamp Manchester Pool Leaderboard API

## Description
An API to track players pool victories.  You can add a player, delete a player and increment a named player's score.

## Example API Usage

```
GET https://fccmcr.club/api/test/pool-leaderboard/players/
```
returns all players
```
[
  {"playerName":"Adam","score":0},
  {"playerName":"peter","score":1}
]

```
```
POST https://fccmcr.club/api/test/pool-leaderboard/players/john - adds player with name john
DELETE https://fccmcr.club/api/test/pool-leaderboard/players/john - deletes player with name john
POST https://fccmcr.club/api/test/pool-leaderboard/recordWin/john - increases john's score by 1

```

## How does it work?
Its an AWS Lamda written in nodejs connected to an AWS DynamoDb database.

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
