#!/usr/bin/env node

const handler = require('serve-handler')
const getPort = require('get-port')
const http = require('http')
const path = require('path')
const open = require('open')
const arg = require('arg')
const camelcase = require('camelcase')

function toCamelCase(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [camelcase(key), value])
  )
}

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: path.join(__dirname, '../build'),
    rewrites: [{ source: '**', destination: 'index.html' }],
  })
})

async function main({ port: defaultPort, _: positionalArgs }) {
  const times = positionalArgs
    .filter((arg) => arg.match(/^([0-9]+:){0,3}[0-9]+$/i))
    .map((str) => {
      const unit = [24 * 3600, 3600, 60, 1]
      const parts = str.split(':').map(Number)

      return parts.reduce(
        (sum, value, index) =>
          sum + value * unit[index + (unit.length - parts.length)],
        0
      )
    })

  const params = new URLSearchParams({
    times: times.join(','),
  })

  const port = await getPort({
    port: getPort.makeRange(defaultPort, defaultPort + 100),
  })
  const url = `http://localhost:${port}?${params.toString()}`

  server.listen(port, () => {
    console.log(`Running timer app at ${url}`)
    open(url)
  })
}

const defaultArgs = { port: 4000 }
const args = toCamelCase(
  arg({
    '--port': Number,
    '-p': '--port',
  })
)

main({
  ...defaultArgs,
  ...args,
})
