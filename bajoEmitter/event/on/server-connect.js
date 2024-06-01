const clientEvents = ['disconnecting', 'disconnect']

async function handler (...args) {
  const { log } = this.bajo.helper
  const { emit, broadcast } = this.bajoEmitter.helper
  const { camelCase } = this.bajo.helper._
  const [socket] = args
  log.debug('Client \'%s\' connected', socket.id)
  for (const m of this.bajoWebSocketIo.clientMiddlewares) {
    socket.use(async ([event, ...params], next) => {
      try {
        await m.handler.call(this, event, ...params)
        next()
      } catch (err) {
        next(err)
      }
    })
  }
  for (const event of clientEvents) {
    socket.on(event, async function (...params) {
      emit(`bajoWebSocketIo.${camelCase(`client ${event}`)}`, socket, ...params)
    })
  }
  // catchall
  socket.onAny((event, ...args) => {
    const [subject, room] = event.split('@')
    const [msg] = args
    if (room) {
      const conns = this.bajoWebSocketIo.connections.filter(c => c.room === room)
      for (const c of conns) {
        broadcast({ from: `${c.name}@bajoWebSocketIo`, msg, subject })
      }
    } else emit(`bajoWebSocketIo.${camelCase(subject)}`, socket, ...args)
  })
  // room connections
  for (const conn of this.bajoWebSocketIo.connections) {
    if (!conn.anonymous || !socket.session) return
    socket.join(conn.room)
    log.trace('Client \'%s\' join to room \'%s\'', socket.id, conn.room)
  }
}

export default {
  level: 0,
  handler
}
