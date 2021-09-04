import "reflect-metadata";
import { Server, OPEN } from "ws";
import { connect, getRoomList, updateFree } from "./db";
import { isMessage, isUpdateMessage } from "./types";

const main = async () => {
  const connection = await connect();

  const wss = new Server({
    port: Number.parseInt(process.env.PORT || "") || 8081,
  });

  wss.on("connection", async (ws) => {
    ws.send(JSON.stringify(await getRoomList(connection)));

    ws.on("message", async (data) => {
      try {
        const message: unknown = JSON.parse(data.toString());
        if (!isMessage(message)) throw new Error("Message corrupted");

        if (isUpdateMessage(message)) {
          const { id, value } = message.args;
          await updateFree(connection, id, value);

          wss.clients.forEach((client) => {
            if (client.readyState === OPEN)
              client.send(JSON.stringify(message));
          });
        }
      } catch (err) {
        console.log("Error processing message", err);
      }
    });
  });
};

main();
