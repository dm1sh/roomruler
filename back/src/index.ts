import "reflect-metadata";
import { Server } from "ws";
import { connect, getRoomList } from "./db";

(async () => {
  const connection = await connect();

  const wss = new Server({
    port: Number.parseInt(process.env.PORT || "") || 8081,
  });

  wss.on("connection", async (ws) => {
    ws.send(JSON.stringify(await getRoomList(connection)));
  });
})();
