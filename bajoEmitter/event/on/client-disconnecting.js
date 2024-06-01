async function onClientDisconnect (...args) {
  const [socket] = args
  const { log } = this.bajo.helper
  log.trace('Client \'%s\' disconnecting', socket.id)
}

export default onClientDisconnect
