import express from "express";
import WebSocket from "ws";
import http from "http";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app); //app.listen does not have access to the server but creating a server using http makes the user to have an access to server.

/*
 * Initializing websocket server in the same server as http connection.
 * NOT required to put ({server}) if you don't want to establish http or ws on the same server.
 */
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anonymous";
    console.log("Connected to Browser ✅");
    socket.on("close", () => {
        console.log("Disonnected from the Browser ❌");
    });
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);

        switch (message.type) {
            case "new_message":
                sockets.forEach((aSocket) =>
                    aSocket.send(
                        `${socket.nickname}: ${message.payload.toString()}`
                    )
                );
            case "nickname":
                socket["nickname"] = message.payload;
        }
    });
});

server.listen(3000, handleListen);
