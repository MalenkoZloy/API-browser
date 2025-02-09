const wsUri = "wss://echo.websocket.org/";

const infoOutput = document.querySelector(".info_output");
const chatOutput = document.querySelector(".chat_output");
const input = document.querySelector("input");
const sendBtn = document.querySelector(".btn_send");
const btnSendGeo = document.querySelector(".btn_send-geo");

let socket = new WebSocket(wsUri);

socket.onopen = () => {
  infoOutput.innerText = "Соединение установлено";
};

socket.onmessage = (event) => {
  writeToChat(event.data, true);
};

socket.onerror = () => {
  infoOutput.innerText = "При передаче данных произошла ошибка";
};

socket.onclose = () => {
  infoOutput.innerText = "Соединение закрыто";
};

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
  if (!input.value) return;
  socket.send(input.value);
  writeToChat(input.value, false);
  input.value = "";
}

function writeToChat(message, isReceived) {
  let messageHTML = `<div class="${isReceived ? "received" : "sent"}">${message}</div>`;
  chatOutput.innerHTML += messageHTML;
}

btnSendGeo.addEventListener("click", sendGeoLocation);

function sendGeoLocation() {
  if (!navigator.geolocation) {
    infoOutput.innerText = "Геолокация не поддерживается вашим браузером";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      socket.send(geoLink);
      writeToChat(
        `<a href="${geoLink}" target="_blank">Моя геолокация</a>`,
        false,
      );
    },
    (error) => {
      infoOutput.innerText = "Ошибка получения геолокации: " + error.message;
    },
  );
}
