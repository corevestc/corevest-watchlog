import { Controller, Get, Res } from "@nestjs/common";
import type { Response } from "express";
import { openApiDocument } from "../openapi/watchlog-openapi.js";

const swaggerHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>WatchLog API</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui.css" />
    <style>
      body { margin: 0; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.17.14/swagger-ui-bundle.js"></script>
    <script>
      window.ui = SwaggerUIBundle({
        url: "/openapi.json",
        dom_id: "#swagger-ui",
        presets: [SwaggerUIBundle.presets.apis],
        layout: "BaseLayout",
        deepLinking: true
      });
    </script>
  </body>
</html>
`;

@Controller()
export class DocsController {
  @Get("openapi.json")
  document() {
    return openApiDocument;
  }

  @Get(["docs", "swagger"])
  ui(@Res() res: Response): void {
    res.type("html").send(swaggerHtml);
  }
}
