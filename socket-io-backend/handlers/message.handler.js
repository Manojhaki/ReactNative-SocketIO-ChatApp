
function createMessage(user, messageText) {
    return {

        _id: currentMessageId++,
        text: messageText,
        createdAt: new Date(),
        user: {
            _id: user.userId,
            name: user.userName,
            avatar: user.avatar,
        }

    };
}

function handleMessage(socket, users) {

    socket.on("message", messageText => {
        console.log(messageText);

        const user = users[socket.id];
        const message = createMessage(user, messageText);
        socket.broadcast.emit("message: ", message);
    })
}

module.exports = { handleMessage };