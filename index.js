const serverless = require('serverless-http')
const express = require('express')
const app = express()
const AWS = require('aws-sdk')
const cors = require('cors')

app.use(cors())

const PLAYERS_TABLE = process.env.PLAYERS_TABLE
const IS_OFFLINE = process.env.IS_OFFLINE

let dynamoDb
if (IS_OFFLINE === 'true') {
  dynamoDb = new AWS.DynamoDB.DocumentClient({
    region: 'localhost',
    endpoint: 'http://localhost:8000'
  })
} else {
  dynamoDb = new AWS.DynamoDB.DocumentClient()
}

app.get('/players', function (req, res) {
  const params = {
    TableName: PLAYERS_TABLE,
  }

  dynamoDb.scan(params, (error, data) => {
    if (error) {
      console.log(error)
      res.send(404).json({ error: 'Could not get player table' })
    } else {
      res.json({ data: data.Items })
    }
  })
})

app.post('/players/:playerName', (req, res) => {
  const { playerName } = req.params
  if (typeof playerName !== 'string') {
    res.status(400).json({ error: 'playerName must be a string' })
  }

  const score = 0
  const params = {
    TableName: PLAYERS_TABLE,
    Item: {
      playerName,
      score
    },
    ConditionExpression: 'attribute_not_exists(playerName)'
  }

  dynamoDb.put(params, error => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not create player' })
    } else {
      console.log('created player: ' + playerName)
      res.json({ playerName, score })
    }
  })
})

app.delete('/players/:playerName', (req, res) => {
  const { playerName } = req.params
  const params = {
    TableName: PLAYERS_TABLE,
    Key: {
      playerName
    },
    ConditionExpression: 'attribute_exists(playerName)',
    ReturnValues: 'ALL_OLD'
  }

  dynamoDb.delete(params, (error, data) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: 'Could not delete player ' + playerName })
    } else {
      console.log('deleted' + playerName)
      res.json(data.Attributes)
    }
  })
})

app.post('/recordWin/:playerName', (req, res) => {
  const { playerName } = req.params
  const params = {
    TableName: PLAYERS_TABLE,
    Key: {
      playerName
    },
    UpdateExpression: 'set score = score + :val',
    ExpressionAttributeValues: {
      ':val': 1
    },
    ReturnValues: 'ALL_NEW'
  }

  dynamoDb.update(params, (error, data) => {
    if (error) {
      console.log(error)
      return res.status(400).json({ error: 'Could not update player score' })
    } else {
      console.log('updated score for: ' + playerName)
      res.json(data.Attributes)
    }
  })
})

module.exports.handler = serverless(app);