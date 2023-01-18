import express from "express";
import { Server } from "socket.io";
import http from "http";
import { instrument } from "@socket.io/admin-ui";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);

/* Chat feature

const httpServer = http.createServer(app); //app.listen does not have access to the server but creating a server using http makes the user to have an access to server.
const wsServer = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true,
    },
});

instrument(wsServer, { 
    auth: false,
});

*/
/*
 * Initializing websocket server in the same server as http connection.
 * NOT required to put ({server}) if you don't want to establish http or ws on the same server.
 */
//const wss = new WebSocket.Server({ server });

// const sockets = [];

/*
// wss.on("connection", (socket) => {
//     sockets.push(socket);
//     socket["nickname"] = "Anonymous";
//     console.log("Connected to Browser ✅");
//     socket.on("close", () => {
//         console.log("Disonnected from the Browser ❌");
//     });
//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg);

//         switch (message.type) {
//             case "new_message":
//                 sockets.forEach((aSocket) =>
//                     aSocket.send(
//                         `${socket.nickname}: ${message.payload.toString()}`
//                     )
//                 );
//             case "nickname":
//                 socket["nickname"] = message.payload;
//         }
//     });
// });

function publicRooms() {
    const {
        sockets: {
            adapter: { sids, rooms },
        },
    } = wsServer;

    const publicRooms = [];

    rooms.forEach((_, key) => {
        if (sids.get(key) === undefined) {
            publicRooms.push(key);
        }
    });
    return publicRooms;
}

function countRooms() {
    return wsServer.sockets.adapter.rooms.get(roomName)?.size;
}

wsServer.on("connection", (socket) => {
    socket["nickname"] = "Anonymous";
    socket.onAny((event) => {
        console.log(wsServer.sockets.adapter);
        console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket
            .to(roomName)
            .emit("welcome", socket.nickname, countRooms(roomName));
        wsServer.sockets.emit("room_change", publicRooms());
    });

    socket.on("disconnecting", () => {
        socket.rooms.forEach((room) =>
            socket.to(room).emit("bye", socket.nickname, countRooms(room) - 1)
        );
    });

    socket.on("disconnect", () => {
        wsServer.sockets.emit("room_change", publicRooms());
    });

    socket.on("new_message", (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    });

    socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
});
*/
