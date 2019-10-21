# fastify-qs

A plugin for [Fastify](https://fastify.io/) that adds support for parsing URL query parameters with [qs](https://www.npmjs.com/package/qs).

Plugin accept any options from [qs.parse](https://www.npmjs.com/package/qs#parsing-objects) method

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

Licensed under [MIT](./LICENSE.MD)
