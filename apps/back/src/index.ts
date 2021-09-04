import "reflect-metadata";
import { Server, OPEN } from "ws";
import { connect, getRoomList, updateFree } from "./db";
import {
  composeMessage,
  isMessage,
  isUpdateMessage,
  ListMessage,
} from "@roomruler/messages";

const main = async () => {
  const connection = await connect();

  const wss = new Server(
    {
      port: Number.parseInt(process.env.PORT || "") || 8081,
    },
    () => console.log(`Started server on ${process.env.PORT || 8081}`)
  );

  wss.on("connection", async (wsc, req) => {
    console.log("New user connected from " + req.socket.remoteAddress);
    wsc.send(
      JSON.stringify(
        composeMessage<ListMessage>("list", await getRoomList(connection))
      )
    );

    wsc.on("message", async (data) => {
      console.log("Got message from " + req.socket.remoteAddress);
      try {
        const message: unknown = JSON.parse(data.toString());
        if (!isMessage(message)) throw new Error("Message corrupted");

        if (isUpdateMessage(message)) {
          console.log(
            `Processing message of \"${message.type}\" type from ${req.socket.remoteAddress}`
          );

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
