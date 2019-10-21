'use strict'

const fp = require('fastify-plugin')
const qs = require('qs')

function plugin (fastify, options, next) {
  fastify.addHook('onRequest', (request, reply, done) => {
    if (options && options.disabled) {
      return done()
    }
    const queryExists = request.raw.url.lastIndexOf('?')
    const query = queryExists > -1 ? request.raw.url.slice(queryExists + 1) : ''
    request.query = qs.parse(query, options)
    done()
  })
  next()
}

module.exports = fp(plugin, {
  fastify: '>= 1.0.0',
  name: 'fastify-qs'
})
