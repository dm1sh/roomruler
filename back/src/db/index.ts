import { Connection, createConnection } from "typeorm";
import fs from "fs";

import { Room } from "./model";
import { config } from "./config";

export const connect = () =>
  createConnection({
    ...config,
    type: "cockroachdb",
    port: 26257,
    ssl: {
      ca: fs.readFileSync("certs/cc-ca.crt").toString(),
    },
    synchronize: true,
    logging: false,
    entities: [Room],
  });

export const getRoomList = (connection: Connection) => {
  return connection.manager.find(Room);
};

export { Room };
