import "reflect-metadata";
import { Server, OPEN } from "ws";
import { connect, getRoomList, updateFree } from "./db";
import {
  composeMessage,
  isMessage,
  isUpdateMessage,
  ListMessage,
} from "@roomruler/messages";
import { logger as log } from "@roomruler/logger";

const main = async () => {
  const connection = await connect();

  const wss = new Server(
    {
      port: Number.parseInt(process.env.PORT || "") || 8081,
    },
    () => log(`Started server on ${process.env.PORT || 8081}`)
  );

  wss.on("connection", async (wsc, req) => {
    log("New user connected from " + req.socket.remoteAddress);
    wsc.send(
      JSON.stringify(
        composeMessage<ListMessage>("list", await getRoomList(connection))
      )
    );

    wsc.on("message", async (data) => {
      log("Got message from " + req.socket.remoteAddress);
      try {
        const message: unknown = JSON.parse(data.toString());
        if (!isMessage(message)) throw new Error("Message corrupted");

        if (isUpdateMessage(message)) {
          log(
            `\nProcessing message of \"${message.type}\" type from ${req.socket.remoteAddress}\n`,
            message.args
          );

          const { id, value } = message.args;
          await updateFree(connection, id, value);

          wss.clients.forEach((client) => {
            if (client.readyState === OPEN)
              client.send(JSON.stringify(message));
          });
        }
      } catch (err) {
        log("Error processing message", err);
      }
    });
  });
};

main();
