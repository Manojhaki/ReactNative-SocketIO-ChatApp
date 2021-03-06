const io = require('socket.io')();
const messageHandler = require('./handlers/message.handler');

const users = {};
let currentUserId = 2;

function createUserAvatarUrl() {
    const rand1 = Math.round(Math.random() * 200 + 100);
    const rand2 = Math.round(Math.random() * 200 + 100);
    return 'https://placeimg.com/{rand1}/{rand2}/any';

};
io.on("connection", socket => {

    console.log("user connected");
    console.log(socket.id);
    users[socket.id] = { userId: currentUserId++ };
    socket.on("join", userName => {

        users[socket.id].userName = userName;
        users[socket.id].avatar = createUserAvatarUrl();
    });
    messageHandler.handleMessage(socket, users);
})


io.listen(3001);
