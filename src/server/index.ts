import ws from "ws";
import { getConfig } from "@app/conf";
import { getLogger, initLogger } from "@report/logger";

const args = getConfig();
initLogger(args);

const server = new ws.Server({ port: args.port });
getLogger().info(args, "starting server");

let id = 0;
server.on("connection", (socket) => {
    getLogger().info("new connection");
    // @ts-ignore
    socket.MY_ID = ++id;
    //runner(socket);
});


server.on("listening", () => {
    getLogger().info("listening on", args.port);
    console.log("listening on", args.port);
});

server.on("error", (err) => {
    getLogger().error({ err }, "cannot start server");
    console.error("cannot start server", err);
});
