/**
 * 建立了新的socket连接后，记录相应socketId
 */
function addSocketId (users, info) {
  const { tokenId, userId, socketId } = info
  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    if (user.tokenId === tokenId) {
      if (user.socketIds.indexOf(socketId) === -1) {
        user.socketIds.push(socketId)
      }
      return
    }
  }
  users.push({
    userId,
    tokenId,
    socketIds: [socketId]
  })
}

/**
 * 通过给定的tokenId获取socketId
 */
function getSocketId (users, tokenId) {
  // 同一用户会打开多个页面，存在多个socketId
  for (let user of users) {
    if (user.tokenId === tokenId) {
      return user.socketIds
    }
  }
}

/**
 * 关闭页面后，删除对应的socketId
 */
function deleteSocketId (users, socketId) {
  for (let i = 0; i < users.length; i++) {
    const user = users[i]
    let sidIdx = user.socketIds.indexOf(socketId)
    if (sidIdx > -1) {
      user.socketIds.splice(sidIdx, 1)
      if (user.socketIds.length === 0) {
        users.splice(i, 1)
        break
      }
    }
  }
}

module.exports = {
  getSocketId,
  addSocketId,
  deleteSocketId
}
