import { fastifyPlugin } from "fastify-plugin";
import { parse } from "qs";

const plugin = (fastify, options, next) => {
  fastify.addHook("onRequest", (request, reply, done) => {
    if (options && options.disabled) {
      return done();
    }
    const rawUrl = request.raw.url;
    let url = rawUrl;
    if (!(options && options.disablePrefixTrim)) {
      url = rawUrl.replace(/\?{2,}/, "?");
    }
    const querySymbolIndex = url.indexOf("?");
    const query =
      querySymbolIndex !== -1 ? url.slice(querySymbolIndex + 1) : "";
    request.query = parse(query, options);
    done();
  });
  next();
};

export default fastifyPlugin(plugin, {
  fastify: "^5.0.0",
  name: "fastify-qs",
});
