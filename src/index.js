import { WebSocketServer } from "ws";

const PORT = 5000;
const wss = new WebSocketServer({ port: PORT });

wss.on("connection", async (ws, req) => {
  if (!req.url) {
    console.log("No URL provided, closing connection.");
    ws.close();
    return;
  }

  const url = new URL(req.url, `https://${req.headers.host}`);
  const pathname = url.pathname;

  if (pathname !== "/") {
    console.log(`Invalid pathname: "${pathname}"`);
    ws.close();
    return;
  }


  // Relay: OpenAI Realtime API Event -> Browser Event


  // Relay: Browser Event -> OpenAI Realtime API Event
  // We need to queue data waiting for the OpenAI connection
  const messageHandler = (data) => {
    try {
      console.log(`"${data}"`);
    } catch (e) {
      console.error(e.message);
      console.log(`Error parsing event from client: ${data}`);
    }
  };
  ws.on("message", (data) => {
    messageHandler(data);
  });

  // Connect to OpenAI Realtime API
});

console.log(`Websocket server listening on port ${PORT}`);
