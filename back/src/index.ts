import "reflect-metadata";
import { Server } from "ws";
import { connect, getRoomList } from "./db";
import { isIdMessage, isMessage } from "./types";

(async () => {
  const connection = await connect();

  const wss = new Server({
    port: Number.parseInt(process.env.PORT || "") || 8081,
  });

  wss.on("connection", async (ws) => {
    ws.send(JSON.stringify(await getRoomList(connection)));

    ws.on("message", (data) => {
      const message: unknown = JSON.parse(data.toString());
      if (!isMessage(message)) throw new Error("Message corrupted");

      if (isIdMessage(message))
        updateFree(message.args.id, message.type === "freed");
    });
  });
})();
