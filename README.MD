# fastify-qs

[![Build Status](https://travis-ci.org/webdevium/fastify-qs.svg?branch=master)](https://travis-ci.org/webdevium/fastify-qs)
[![GitHub issues](https://img.shields.io/github/issues/webdevium/fastify-qs)](https://github.com/webdevium/fastify-qs/issues)
[![GitHub license](https://img.shields.io/github/license/webdevium/fastify-qs)](https://github.com/webdevium/fastify-qs/blob/master/LICENSE.MD)
[![npm](https://img.shields.io/npm/v/fastify-qs)](https://www.npmjs.com/package/fastify-qs)

A plugin for [Fastify](https://fastify.io/) that adds support for parsing URL query parameters with [qs](https://www.npmjs.com/package/qs).

Plugin accepts any options from [qs.parse](https://www.npmjs.com/package/qs#parsing-objects) method

## Install
```
npm i fastify-qs
```

## Example

```js
const fastify = require('fastify')()

fastify.register(require('fastify-qs'), {})

fastify.get('/*', (req, reply) => {
  req.query // -> { a: ['1', '2'] }
  reply.send('')
})

// GET: 'http://127.0.0.1/?a[]=1&a[]=2
```

> If you want temporary disable qs parsing, pass `disabled: true` to plugin options:
> ```
> fastify.register(require('fastify-qs'), { disabled: true })
> ```

## License

[MIT](./LICENSE.MD) © [Vano Devium](https://www.devium.me/)
