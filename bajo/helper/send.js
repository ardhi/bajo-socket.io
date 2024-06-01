async function send ({ msg, from, to, subject = 'message' } = {}) {
  const { error } = this.bajo.helper
  const { addressSplit } = this.bajoEmitter.helper
  const { find } = this.bajo.helper._
  const { connection, transport } = addressSplit(to)
  if (transport !== 'bajoWebSocketIo') return
  const name = connection
  const conn = find(this.bajoWebSocketIo.connections, { name })
  if (!conn) throw error('No such connection \'%s\'', name)
  this.bajoWebSocketIo.instance.to(conn.room).emit(subject, msg, from)
}

export default send
