const socket = io();

const myFace = document.getElementById("myFace");
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");

let myStream;
let muted = false;
let cameraOff = false;

async function getMedia() {
    try {
        myStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        myFace.srcObject = myStream;
    } catch (e) {
        console.log(e);
    }
}

getMedia();
function handleMuteClick() {
    if (!muted) {
        muteBtn.innerText = "Unmute";
        muted = true;
    } else {
        muteBtn.innerText = "Mute";
        muted = false;
    }
}

function handleCameraClick() {
    if (cameraOff) {
        cameraBtn.innerText = "Turn Camera Off";
        cameraOff = false;
    } else {
        cameraBtn.innerText = "Turn Camera On";
        cameraOff = true;
    }
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);

/* Chat feature
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

socket.on("welcome", (user, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room: ${roomName} (${newCount})`;
    addMessage(`A new user, ${user} joined the room!`);
});

socket.on("bye", (user, newCount) => {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room: ${roomName}`;
    addMessage(`${user} just left the room! (${newCount})`);
});

socket.on("new_message", addMessage);

socket.on("room_change", (rooms) => {
    const roomList = welcome.querySelector("ul");
    roomList.innerHTML = "";

    if (rooms.length === 0) {
        roomList.innerHTML = "";
        return;
    }

    rooms.forEach((room) => {
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    });
});
*/
