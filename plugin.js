'use strict'

const packageJson = require('./package.json')
const fp = require('fastify-plugin')
const qs = require('qs')

const plugin = (fastify, options, next) => {
  fastify.addHook('onRequest', (request, reply, done) => {
    if (options && options.disabled) {
      return done()
    }
    const url = request.raw.url.replace(/\?{2,}/, '?')
    const querySymbolIndex = url.indexOf('?')
    const query = querySymbolIndex !== -1 ? url.slice(querySymbolIndex + 1) : ''
    request.query = qs.parse(query, options)
    done()
  })
  next()
}

module.exports = fp(plugin, {
  fastify: '>= 1.0.0',
  name: packageJson.name
})
