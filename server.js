const express = require("express");
const cors = require("cors");
const app = express();

const bodyParser = require("body-parser");
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
app.get("/", (req, res) => {
    res.send("What´s up?");
});
app.get("/conversations", (req, res) => {
    res.json([
        {
            id: '1',
            firstName: 'Eva',
            lastName: 'Martin',
            photoUser:
                'https://hips.hearstapps.com/ellees.h-cdn.co/assets/15/37/original/original-573cdd52ba3fpareja-sexo-mente-ok-tu-rostro-habla-por-ti-12718540-1-esl-es-tu-rostro-habla-por-ti-jpg.jpg',
            previewMsg: 'I’m wondering what you think test',
            time: '2:34PM',
            notification: true,
            url: '123456'
        },
        {
            id: '2',
            firstName: 'Shakira',
            lastName: 'Mebarak',
            photoUser:
                'https://i.pinimg.com/originals/79/9d/8e/799d8e84c3a3e80f3ef2ed94269f28e7.jpg',
            previewMsg: 'That’s a great idea!',
            time: 'Wed',
            url: ''
        },
        {
            id: '123456789',
            firstName: 'Example name group',
            lastName: '',
            photoUser:
                'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/users5.png',
            previewMsg: 'That’s a great idea!',
            time: 'Wed',
            url: 'group/123'
        }
    ]);
});

app.get("/conversation/:id", (req, res) => {
    res.json(
        {
            id: '1',
            date: '9:47 A.M',
            firstName: 'Eva',
            lastName: 'Martin',
            ocupation: 'Copywriter at InfoTech',
            segment: 'Staff',
            photoUser:
                'https://hips.hearstapps.com/ellees.h-cdn.co/assets/15/37/original/original-573cdd52ba3fpareja-sexo-mente-ok-tu-rostro-habla-por-ti-12718540-1-esl-es-tu-rostro-habla-por-ti-jpg.jpg',
            conversations: [
                {
                    id: '1',
                    date: '9:47 A.M',
                    firstName: 'Eva',
                    lastName: 'Martin',
                    ocupation: 'Copywriter at InfoTech',
                    segment: 'Staff',
                    photoUser:
                        'https://hips.hearstapps.com/ellees.h-cdn.co/assets/15/37/original/original-573cdd52ba3fpareja-sexo-mente-ok-tu-rostro-habla-por-ti-12718540-1-esl-es-tu-rostro-habla-por-ti-jpg.jpg',
                    messages: 'Hi Marcos! Thank you for attending our event.'
                },
                {
                    id: '2',
                    date: '10:02 A.M',
                    firstName: 'Marcos',
                    lastName: 'Ortiz',
                    photoUser:
                        'https://source.unsplash.com/random/800x600?category/people',
                    messages: 'Hi Eva, I had a great time and met many people.'
                },
                {
                    id: '3',
                    date: '10:16 A.M',
                    firstName: 'Marcos',
                    lastName: 'Ortiz',
                    photoUser:
                        'https://source.unsplash.com/random/800x600?category/people',
                    messages:
                        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam eius aut molestiae architecto consequuntur. Impedit laboriosam voluptatem omnis unde doloremque, suscipit dignissimos minus assumenda! Delectus laudantiu  '
                }
            ]
        }
    );
});

app.get("/conversation/group/:id", (req, res) => {
    res.json(
        {
            id: '1',
            groupName: 'Example name group',
            quantityPeople: 4,
            photoUserGroup:
                'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/users5.png',
            conversations: [
                {
                    id: '1',
                    date: '9:47 A.M',
                    firstName: 'Salma',
                    lastName: 'Hayek',
                    ocupation: 'Copywriter at InfoTech',
                    segment: 'Staff',
                    photoUser:
                        'https://caracoltv.brightspotcdn.com/dims4/default/6396f83/2147483647/strip/true/crop/650x650+0+0/resize/650x650!/quality/90/?url=https%3A%2F%2Fcaracol-brightspot.s3-us-west-2.amazonaws.com%2Fassets%2Fcaracoltv%2F0b4b892b537fc5fb23ca28d053eb3c10.jpg',
                    messages: 'Hi Marcos! Thank you for attending our event.'
                },
                {
                    id: '2',
                    date: '10:02 A.M',
                    firstName: 'Anne',
                    lastName: 'Anne',
                    photoUser:
                        'https://mymodernmet.com/wp/wp-content/uploads/2021/01/morphy-me-celebrity-face-mashups-22.jpg',
                    messages: 'Hi Eva, I had a great time and met many people.'
                },
                {
                    id: '3',
                    date: '10:16 A.M',
                    firstName: 'Keanu',
                    lastName: 'Reeves',
                    photoUser:
                        'https://mymodernmet.com/wp/wp-content/uploads/2021/01/morphy-me-celebrity-face-mashups-24.jpg',
                    messages:
                        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam eius aut molestiae architecto consequuntur. Impedit laboriosam voluptatem omnis unde doloremque, suscipit dignissimos minus assumenda! Delectus laudantiu  '
                },
                {
                    id: '4',
                    date: '10:20 A.M',
                    firstName: 'Cristiano',
                    lastName: 'Ronaldo',
                    photoUser:
                        'https://phantom-marca.unidadeditorial.es/3c2a0a07848a766589ba1447ca8d4e22/resize/1320/f/jpg/assets/multimedia/imagenes/2022/06/03/16542508902355.jpg',
                    messages:
                        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam eius aut molestiae architecto consequuntur. Impedit laboriosam voluptatem omnis unde doloremque, suscipit dignissimos minus assumenda! Delectus laudantiu  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam eius aut molestiae architecto consequuntur. Impedit laboriosam voluptatem omnis unde doloremque, suscipit dignissimos minus assumenda! Delectus laudantiu  '
                }
            ]
        }
    );
});

const server = app.listen(port, () => {
    console.log(`app listening at ws://localhost:${port}`);
});

const io = require("socket.io").listen(server);
io.set("transports", ["websocket"]);
io.on("connection", function (socket) {
    console.log("A user connected");

    // event for a user to join his own channel
    socket.on("user.join", function (user_id) {
        socket.join(`organization.${user_id}.room`);
        console.log(`user ${user_id} joined`);
    });


    // event for a user to leave his own channel
    socket.on("user.leave", function (user_id) {
        socket.leave(`user.${user_id}.room`);
        console.log(`user ${user_id} left`);
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
