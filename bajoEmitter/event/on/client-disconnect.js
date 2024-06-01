async function onClientDisconnect (...args) {
  const [socket] = args
  const { log } = this.bajo.helper
  log.debug('Client \'%s\' disconnected', socket.id)
}

export default onClientDisconnect
