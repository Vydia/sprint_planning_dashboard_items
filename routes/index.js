export default function routes(app) {
  app.get('/', (req, res) => {
    res.redirect('/atlassian-connect.json')
  })

  app.get('/sprint-capacity-bar', (req, res) => {
    const view  = req.params
    console.log(req)
    debugger
    res.render('SprintCapacityBar', {
      view: view
    })
  })

  app.get('/atlassian-connect.json', (req, res) => {
    res.json(req.atlassianconnect)
  })

  app.post('/installed', (req, res) => {
    res.send("ok")
  })
}
