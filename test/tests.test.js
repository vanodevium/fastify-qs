'use strict'

const get = require('simple-get')
const test = require('tap').test
const Fastify = require('fastify')
const plugin = require('../');

[
  { options: {}, querystring: 'a[]=1&a[]=2', expected: { a: ['1', '2'] } },
  { options: { disabled: true }, querystring: 'a[]=1&a[]=2', expected: { 'a[]': ['1', '2'] } },
  { options: null, querystring: 'a[b][c]=1&a[b][d]=2', expected: { a: { b: { c: '1', d: '2' } } } },
  { options: null, querystring: 'a=1#hash', expected: { a: '1' } },
  { options: null, querystring: '???a?=1', expected: { 'a?': '1' } },
  { options: { ignoreQueryPrefix: true }, querystring: '???a', expected: { a: '' } },
  { options: { disabled: true }, querystring: 'a=1#hash', expected: { a: '1' } },
  { options: null, querystring: 'a[]=1&a[]=&a[]=3', expected: { a: ['1', '', '3'] } },
  { options: null, querystring: null, expected: {} }
].forEach(function (testData) {
  test('parses querystring with qs: ' + testData.querystring, (t) => {
    t.plan(1)
    const fastify = Fastify()

    fastify
      .register(plugin, testData.options)
      .after((err) => {
        if (err) t.error(err)
      })

    fastify.get('/*', (req, reply) => {
      const query = req.query
      reply.send({ query })
    })

    fastify.listen(0, (err) => {
      fastify.server.unref()
      if (err) t.threw(err)

      const port = fastify.server.address().port

      get.concat({
        url: `http://127.0.0.1:${port}/${testData.querystring ? '?' + testData.querystring : ''}`,
        json: true
      }, function (err, res, data) {
        if (err) {
          t.error(err)
        }
        t.same(data.query, testData.expected)
      })
    })

    t.tearDown(() => fastify.close())
  })
})
