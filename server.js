const express = require('express')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.json())

const PORT = process.env.PORT || 9999
let rooms = []

app.get('/rooms/:id', (req, res) => {
    const room = rooms.find(room => room.id == req.params.id)
    if (room) {
        res.json({users: room.users, messages: room.messages})
    } else {
        res.json({})
    }
})

app.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body
    const room = rooms.find(room => room.id == roomId)
    if (room) {
        if (room.users.find(user => user.name == userName)) {
            res.json({status: 'error'})
            return
        }
    } else {
        rooms.push({id: roomId, users: [], messages: []})
    }
    res.json({status: 'ok'})
})

io.on('connection', (socket) => {
    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        socket.join(roomId);
        const users = rooms.find(room => room.id == roomId).users
        users.push({name: userName, id: socket.id})
        socket.to(roomId).broadcast.emit('ROOM:SET_USERS', users)
    })
    socket.on('ROOM:NEW_MESSAGE', ({roomId, userName, text}) => {
        let room = rooms.find(room => room.id == roomId)
        room.messages.push({text, userName: userName})
        socket.to(roomId).broadcast.emit('ROOM:NEW_MESSAGE', {text, userName: userName})
    })
    socket.on('disconnect', () => {
        for (let room of rooms) {
            const el = room.users.find(user => user.id == socket.id)
            if (el) {
                const index = room.users.indexOf(el)
                room.users.splice(index, 1)
                socket.to(room.id).broadcast.emit('ROOM:SET_USERS', room.users)
                break
            }
        }
    })
    // console.log('user connected', socket.id);
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../build'))
}


async function start() {
    try {
        // await mongoose.connect(db, {
        //     useNewUrlParser: true,
        //     useFindAndModify: false,
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // })
        server.listen(PORT, (err) => {
            if (err) {
                throw Error(err);
            }
            console.log(`server has been started at ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

start()
