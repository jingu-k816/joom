const socket = io();

const welcome = document.getElementById("welcome");
const room = document.getElementById("room");

const roomNameForm = welcome.querySelector("#roomName");
const nameForm = welcome.querySelector("#name");

room.hidden = true;

let roomName = "";

function handleMessageSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", input.value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    input.value = "";
}

function handleNameSave(event) {
    event.preventDefault();
    const input = welcome.querySelector("#name input");
    socket.emit("nickname", input.value);
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room: ${roomName}`;

    const messageForm = room.querySelector("#msg");

    messageForm.addEventListener("submit", handleMessageSubmit);
}

function addMessage(message) {
    const ul = room.querySelector("ul");
    const li = document.createElement("li");

    li.innerText = message;
    ul.appendChild(li);
}
function handleRoomSubmit(event) {
    event.preventDefault();

    const input = roomNameForm.querySelector("input");
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = "";
}
nameForm.addEventListener("submit", handleNameSave);
roomNameForm.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
    addMessage(`A new user, ${user} joined the room!`);
});

socket.on("bye", (user) => {
    addMessage(`${user} just left the room!`);
});

socket.on("new_message", addMessage);
