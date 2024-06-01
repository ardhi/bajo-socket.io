function getServerOptions () {
  const { getConfig } = this.bajo.helper
  const { cloneDeep } = this.bajo.helper._
  const cfg = getConfig('bajoWebSocketIo', { full: true })
  const options = cloneDeep(cfg.options)
  options.path = `/${cfg.alias}/`
  return options
}

export default getServerOptions
