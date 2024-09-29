import { type Route, route, serveDir } from "@std/http";

const routes: Route[] = [
  {
    pattern: new URLPattern({ pathname: "/" }),
    handler: () =>
      new Response(Deno.readTextFileSync("./index.html"), {
        headers: { "content-type": "text/html" },
      }),
  },
  {
    pattern: new URLPattern({ pathname: "/static/*" }),
    handler: (req) => serveDir(req),
  },
];

function defaultHandler(_req: Request) {
  return new Response("Not found", { status: 404 });
}

const handler = route(routes, defaultHandler);

export default {
  fetch(req) {
    return handler(req);
  },
} satisfies Deno.ServeDefaultExport;
