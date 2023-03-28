# fastify-qs

![Build Status](https://img.shields.io/github/actions/workflow/status/vanodevium/fastify-qs/ci.yaml)
[![GitHub issues](https://img.shields.io/github/issues/vanodevium/fastify-qs)](https://github.com/vanodevium/fastify-qs/issues)
[![GitHub license](https://img.shields.io/github/license/vanodevium/fastify-qs)](https://github.com/vanodevium/fastify-qs/blob/master/LICENSE.MD)
[![npm](https://img.shields.io/npm/v/fastify-qs)](https://www.npmjs.com/package/fastify-qs)

A plugin for [Fastify](https://fastify.io/) that adds support for parsing URL query parameters with [qs](https://www.npmjs.com/package/qs).

Plugin accepts any options from [qs.parse](https://www.npmjs.com/package/qs#parsing-objects) method

## Install
```
npm i fastify-qs
```

### Plugin specific options
- `disabled`: set **true** if you want to disable **qs** parsing
- `disablePrefixTrim`: this plugin removes all unnecessary **?** from the beginning of the query string,
  set **true** if you want to disable

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

###

> If you want temporary disable qs parsing, pass `disabled: true` to plugin options:
> ```
> fastify.register(require('fastify-qs'), { disabled: true })
> ```

## License

[MIT](./LICENSE.MD) © [Vano Devium](https://www.devium.me/)
