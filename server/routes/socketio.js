var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)
const { getSocketId, addSocketId, deleteSocketId } = require('../utils')

global.io = io
const users = [] // 记录下登录用户的tokenId, socketId
io.on('connection', function (socket) {
  socket.on('disconnect', function () {
    // console.log('user disconnected   ', socket.id)
    deleteSocketId(users, socket.id)
    // console.log(users)
  })
  socket.on('login', function (obj) {
    const tokenId = obj.tokens
    const socketId = socket.id
    const userId = obj.account
    addSocketId(users, { tokenId, socketId, userId })
    socket.emit('relogin', {
      msg: `账号${obj.account}已登录`,
      code: 200
    })
    // console.log(users)
  })
  socket.on('deattend', function (obj) {
    const tokens = obj.tokens
    tokens.forEach(tokenId => {
      const socketIds = getSocketId(users, tokenId)
      // 当后端post了一个消息时，通知client进行处理
      socketIds.forEach(function (socketId) {
        // io.sockets.to(socketId).emit('redeattend', {
        //   msg: `签到${obj.name}已删除`,
        //   code: 200
        // })
        console.log(socketId)
      })
    })
  })
  socket.on('attend', function (obj) {
    socket.emit('reattend', {
      msg: `已创建签到${obj.name}`,
      code: 200
    })
  })
  socket.on('attendsuccess', function (obj) {
    socket.emit('reattendsuccess', {
      msg: `在${obj.geo}的签到已签到成功`,
      code: 200
    })
  })
  socket.on('attendrecord', function (obj) {
    socket.emit('reattendrecord', {
      msg: `${obj.account}已批准假期`,
      code: 200
    })
  })
  socket.on('needrecord', function (obj) {
    const tokenId = obj.tokens
    const socketId = getSocketId(users, tokenId)
    // 当后端post了一个消息时，通知client进行处理
    io.sockets.to(socketId).emit('redeattend', {
      msg: `${obj.account}需要批假`,
      code: 200
    })
    console.log(tokenId, socketId)
  })
})
console.log(users)
http.listen(5000, function () {
  console.log('socket: 5000')
})
