"use strict";

const fp = require("fastify-plugin");
const qs = require("qs");

const plugin = (fastify, options, next) => {
  options = Object.assign({}, options);

  fastify.addHook("onRequest", (request, reply, done) => {
    if (options.disabled) {
      return done();
    }

    const rawUrl = request.raw.url;
    const url = options.disablePrefixTrim
      ? rawUrl
      : rawUrl.replace(/\?{2,}/, "?");

    const position = 1 + url.indexOf("?");
    request.query = qs.parse(position ? url.slice(position) : "", options);

    done();
  });
  next();
};

module.exports = fp(plugin, {
  fastify: "^5.0.0",
  name: "fastify-qs",
});
