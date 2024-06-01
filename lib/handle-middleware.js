async function handleMiddleware () {
  const { eachPlugins, importModule } = this.bajo.helper
  const { orderBy } = this.bajo.helper._
  for (const item of ['server', 'client']) {
    if (!this.bajoWebSocketIo[`${item}Middlewares`]) this.bajoWebSocketIo[`${item}Middlewares`] = []
    let mws = []
    await eachPlugins(async function ({ file, plugin }) {
      mws.push(await importModule(file, { asHandler: true }))
    }, { glob: `middleware/${item}/*.js` })
    mws = orderBy(mws, ['level'], ['asc'])
    this.bajoWebSocketIo[`${item}Middlewares`] = mws
  }
  for (const m of this.bajoWebSocketIo.serverMiddlewares) {
    this.bajoWebSocketIo.instance.use(async (socket, next) => {
      try {
        await m.handler.call(this, socket)
        next()
      } catch (err) {
        next(err)
      }
    })
  }
}

export default handleMiddleware
