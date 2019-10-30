import express from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import http from 'http'
import path from 'path'
import morgan from 'morgan'
import JiraClient from 'jira-connector'
import routes from './routes'
import credentials from './credentials.json'
import atlassianConnect from './atlassian-connect'
import ReactViews from 'express-react-views'

const app = express()

const jira = new JiraClient({
  host: credentials["jiraHost"],
  basic_auth: {
    username: credentials["username"],
    password: credentials["password"]
  }
})

app.use((req,res,next) => {
    req.jira = jira
    req.atlassianconnect = atlassianConnect
    next()
})

const port = 3000
app.set('port', port)
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(compression())

app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', ReactViews.createEngine())

routes(app)

http.createServer(app).listen(port, () => {
  console.log('App server running')
});
