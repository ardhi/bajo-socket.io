import { Server } from 'socket.io'
import handleEvents from '../lib/handle-events.js'
import handleMiddleware from '../lib/handle-middleware.js'

const boot = {
  level: 5,
  handler: async function () {
    const { getServerOptions } = this.bajoWebSocketIo.helper
    const options = getServerOptions()
    const instance = new Server(this.bajoWeb.instance.server, options)
    this.bajoWebSocketIo.instance = instance
    await handleEvents.call(this)
    await handleMiddleware.call(this)
  }
}

export default boot
