const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  ws.on("message", msg => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msg);
      }
    });
  });
});

app.get("/", (req, res) => res.send("WebSocket chat server up!"));

const PORT = process.env.PORT || 10000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
