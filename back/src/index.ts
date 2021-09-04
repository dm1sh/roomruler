import "reflect-metadata";
import { Server } from "ws";

(async () => {
  const wss = new Server({
    port: Number.parseInt(process.env.PORT || "") || 8081,
  });

  wss.on("connection", async (ws) => {
    ws.send("hello");
  });
})();
