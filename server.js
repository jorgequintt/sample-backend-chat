const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");
const { uuid } = require("uuidv4");
const port = 5000;

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/api/v0/", (req, res) => {
    res.send("What´s up?");
});

function genDateMinus(days = 0, hours = 0, minutes = 0) {
    let d = new Date();
    d.setDate(d.getDate() - days);
    d.setDate(d.getHours() - hours);
    d.setDate(d.getMinutes() - minutes);
    return d
}

app.post("/api/v0/conversations", (req, res) => {
    const { members, message } = req.body

    if (!members || members.length === 0) return res.json({ error: "Error on 'members' property. Cannot be empty" })
    if (!message) return res.status(400).json({ error: "Error on 'message' property. Cannot be empty" })

    return res.status(200).json({
        conversationId: uuid(),
        membersIds: [uuid()],
        lastRead: genDateMinus(1),
        blockedDate: null,
        lastMessage: {
            messageId: uuid(),
            message: message,
            senderId: '09763fda-5907-4968-b4a0-5b74240cca46',
            creationDate: genDateMinus()
        },
    })
});

app.post("/api/v0/conversations/:conversationId/messages", (req, res) => {
    const { message } = req.body
    if (!message) return res.status(400).json({ error: "Error on 'message' property. Cannot be empty" })

    res.status(200).json({})
});

app.get("/api/v0/conversations", (req, res) => {
    res.status(200).json([
        {
            conversationId: uuid(),
            membersIds: [uuid()],
            lastRead: genDateMinus(1, 1),
            blockedDate: null,
            lastMessage: {
                messageId: uuid(),
                message: "Last message received!",
                senderId: '102cdf96-d71e-4085-8647-f3e749e51295',
                creationDate: genDateMinus(1)
            },
        },
        {
            conversationId: 'ab5d394a-8314-4587-8894-46724d08e0d3',
            membersIds: [uuid()],
            lastRead: genDateMinus(1),
            blockedDate: null,
            lastMessage: {
                messageId: 'ab5d394a-8314-4587-8394-46724d08e0d9',
                message: "Hola",
                senderId: '09763fda-5907-4968-b4a0-5b74240cca46',
                creationDate: genDateMinus(1)
            },
        },
        {
            conversationId: uuid(),
            membersIds: [uuid()],
            lastRead: genDateMinus(),
            blockedDate: genDateMinus(0),
            lastMessage: {
                messageId: uuid(),
                message: "Last message received!",
                senderId: 'ab5d394a-8314-4587-8894-46724d08e0d9',
                creationDate: genDateMinus(0, 2)
            },
        },
        {
            conversationId: uuid(),
            membersIds: [uuid()],
            lastRead: genDateMinus(),
            blockedDate: null,
            lastMessage: {
                messageId: uuid(),
                message: "Last message received!",
                senderId: '26c7b19a-9136-40cc-8e42-110bb286039f',
                creationDate: genDateMinus(0, 3)
            },
        },
    ])
});

app.get("/api/v0/conversations/:conversationId/messages", (req, res) => {
    res.status(200).json([
        {
            messageId: 'ab5d394a-8314-4587-8394-46724d08e0d9',
            message: "Alo",
            senderId: '09763fda-5907-4968-b4a0-5b74240cca46',
            creationDate: genDateMinus(1, 4)
        },
        {
            messageId: 'ab5d394a-8314-4587-8394-46724d08e0d9',
            message: "Prueba",
            senderId: '09763fda-5907-4968-b4a0-5b74240cca46',
            creationDate: genDateMinus(1, 3)
        },
        {
            messageId: 'ab5d394a-8314-4587-8394-46724d08e0d9',
            message: "Prueba 2",
            senderId: '09763fda-5907-4968-b4a0-5b74240cca46',
            creationDate: genDateMinus(1, 2)
        },
        {
            messageId: 'ab5d394a-8314-4587-8394-46724d08e0d9',
            message: "Prueba 3",
            senderId: '09763fda-5907-4968-b4a0-5b74240cca46',
            creationDate: genDateMinus(1, 1)
        },
        {
            messageId: 'ab5d394a-8314-4587-8394-46724d08e0d9',
            message: "Hola",
            senderId: '09763fda-5907-4968-b4a0-5b74240cca46',
            creationDate: genDateMinus(1)
        },
    ])
});
app.post("/api/v0/conversations/:conversationId/read", (req, res) => { res.status(200).json({}) });
app.post("/api/v0/conversations/:conversationId/block", (req, res) => { res.status(200).json({}) });
app.post("/api/v0/conversations/:conversationId/unblock", (req, res) => { res.status(200).json({}) });
app.post("/api/v0/conversations/:conversationId/messages/:messageId/report", (req, res) => {
    const { options } = req.body
    if (!options || options.length === 0) return res.json({ error: "Error on 'options' property. Cannot be empty" })
    res.status(200).json({})
});


const server = app.listen(port, () => {
    console.log(`app listening at ws://localhost:${port}`);
});

const io = require("socket.io").listen(server);
io.set("transports", ["websocket"]);
io.on("connection", function (socket) {
    console.log("A user connected");

    // event for a user to join his own channel
    socket.on("join-room", function ({ type, payload }) {
        socket.join(`${type}.${payload}.room`);
        console.log(`${type}.${payload} joined`);
    });


    // event for a user to leave his own channel
    socket.on("leave-room", function ({ type, payload }) {
        socket.leave(`${type}.${payload}.room`);
        console.log(`${type}.${payload} left`);
    });

    // event to notify new message to the recipient´s channel
    socket.on("chat-message", function (data) {
        const {
            from,
            to,
            message
        } = data;

        // send message to the recipient channel
        io.to(`user.${to.id}.room`)
            .emit("chat-message", {
                from,
                message
            });
    });


    // event to notify new message to the recipient´s channel
    socket.on("test-message", function (data) {
        const {
            recipient_id,
            message = 'Hey!, this is a test message from the server'
        } = data;

        // send message to the recipient channel
        io.to(`user.${recipient_id}.room`)
            .emit("test-message", message);
    });

    //Whenever someone disconnects this piece of code executed
    socket.on("disconnect", function () {
        console.log("A user disconnected");
    });
});
