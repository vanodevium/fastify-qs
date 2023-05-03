"use strict";

const client = require("phin");
const test = require("tap").test;
const Fastify = require("fastify");
const plugin = require("../");

[
  { options: {}, querystring: "a[]=1&a[]=2", expected: { a: ["1", "2"] } },
  {
    options: { disabled: true },
    querystring: "a[]=1&a[]=2",
    expected: { "a[]": ["1", "2"] },
  },
  {
    options: null,
    querystring: "a[b][c]=1&a[b][d]=2",
    expected: { a: { b: { c: "1", d: "2" } } },
  },
  { options: null, querystring: "a=1#hash", expected: { a: "1" } },
  { options: null, querystring: "???a?=1", expected: { "a?": "1" } },
  { options: null, querystring: "???a??=1", expected: { "a??": "1" } },
  {
    options: { disabled: true },
    querystring: "a=1#hash",
    expected: { a: "1" },
  },
  {
    options: null,
    querystring: "a[]=1&a[]=&a[]=3",
    expected: { a: ["1", "", "3"] },
  },
  { options: null, querystring: null, expected: {} },
  {
    options: { disablePrefixTrim: true },
    querystring: "???a",
    expected: { "???a": "" },
  },
  {
    options: { disablePrefixTrim: true, ignoreQueryPrefix: true },
    querystring: "???a",
    expected: { "??a": "" },
  },
  {
    options: { disablePrefixTrim: false },
    querystring: "???a",
    expected: { a: "" },
  },
  {
    options: { disablePrefixTrim: false, ignoreQueryPrefix: true },
    querystring: "???a",
    expected: { a: "" },
  },
].forEach((testData) => {
  test("parses querystring with qs: " + testData.querystring, (t) => {
    t.plan(1);
    const fastify = Fastify();

    fastify.register(plugin, testData.options).after((err) => {
      if (err) t.error(err);
    });

    fastify.get("/*", (req, reply) => {
      const query = req.query;
      reply.send({ query });
    });

    fastify.listen({ port: 0, host: "::" }, async (err, address) => {
      fastify.server.unref();
      if (err) t.threw(err);

      const queryString = testData.querystring
        ? "?" + testData.querystring
        : "";

      const res = await client({
        url: address + `/${queryString}`,
        parse: "json",
      });
      t.same(res.body.query, testData.expected);
    });

    t.teardown(() => fastify.close());
  });
});
