async function afterCommonScriptCollect (scripts) {
  const { trimEnd } = this.bajo.helper._
  const { getServerOptions } = this.bajoWebSocketIo.helper
  const options = getServerOptions()
  if (options.serveClient) scripts.push(`${trimEnd(options.path, '/')}/socket.io.min.js`)
}

export default afterCommonScriptCollect
