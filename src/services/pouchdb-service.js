import { EventEmitter } from 'events'
import PouchDB from 'pouchdb'
import PouchDBAdapterWebSQL from 'pouchdb-adapter-websql'
import PouchDBFind from 'pouchdb-find'
import uuid from 'uuid'
PouchDB.plugin(PouchDBFind)
PouchDB.plugin(PouchDBAdapterWebSQL)

export default class PouchDBService extends EventEmitter {
  constructor (syncURL, token) {
    super()

    this.pouchDB = new PouchDB('default', {adapter: 'websql'})
    this.pouchDB
      .sync(syncURL, {
        live: true,
        retry: true,
        ajax: {
          withCredentials: false,
          timeout: 30000
        },
      })
      .on('change', info => this.emit('changed', info.change.docs))
      .on('paused', info => this.emit('paused'))
      .on('active', info => this.emit('activated'))
      .on('complete', info => this.emit('completed'))
      .on('error', error => this.emit('error', error))

    this.getFiles = this.getFiles.bind(this)
  }

  getFiles(isAttachment) {
    return this.pouchDB
      .find({selector: {isAttachment: isAttachment}})
  }
}
