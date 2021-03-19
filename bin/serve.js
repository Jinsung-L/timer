#!/usr/bin/env node

const handler = require('serve-handler')
const getPort = require('get-port')
const http = require('http')
const path = require('path')
const open = require('open')

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: path.join(__dirname, '../build'),
    rewrites: [{ source: '**', destination: 'index.html' }],
  })
})

;(async () => {
  const port = await getPort({ port: getPort.makeRange(4000, 4100) })
  const url = `http://localhost:${port}`

  server.listen(port, () => {
    console.log(`Running timer app at ${url}`)
    open(url)
  })
})()
