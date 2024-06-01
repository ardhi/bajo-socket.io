async function handler ({ item, options }) {
  const { error } = this.bajo.helper
  const { isString, has } = this.bajo.helper._
  if (isString(item)) item = { name: item }
  if (!has(item, 'room')) throw error('Connection must have a \'room\' name')
  item.anonymous = item.anonymous ?? false
}

async function init () {
  const { buildCollections } = this.bajo.helper
  this.bajoWebSocketIo.connections = await buildCollections({ handler, useDefaultName: false, dupChecks: ['name', 'room'] })
}

export default init
