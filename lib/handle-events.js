const events = {
  engine: ['initial_headers', 'headers', 'connection_error'],
  server: ['connect', 'new_namespace']
}

async function handleEvents () {
  const { emit } = this.bajoEmitter.helper
  const { camelCase, get } = this.bajo.helper._
  for (const type of ['engine', 'server']) {
    for (const event of events[type]) {
      const instance = get(this.bajoWebSocketIo, type === 'engine' ? 'instance.engine' : 'instance')
      instance.on(event, async function (...args) {
        emit(`bajoWebSocketIo.${camelCase(`${type} ${event}`)}`, ...args)
      })
    }
  }
}

export default handleEvents
