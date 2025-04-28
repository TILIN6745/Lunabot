// main.js

// === CONFIGURACIONES BASE ===
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './config.js'
import './plugins/_content.js'

import fs, { existsSync, mkdirSync } from 'fs'
import path, { join } from 'path'
import { fileURLToPath } from 'url'
import { platform } from 'process'
import { createRequire } from 'module'
import { Low, JSONFile } from 'lowdb'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import { useMultiFileAuthState, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, DisconnectReason } from '@whiskeysockets/baileys'
import readline from 'readline'
import lodash from 'lodash'
import chalk from 'chalk'
import pino from 'pino'
import { Boom } from '@hapi/boom'
import NodeCache from 'node-cache'

// === FUNCIONES GLOBALES ===
global.__filename = (pathURL = import.meta.url) => platform !== 'win32' ? fileURLToPath(pathURL) : pathURL
global.__dirname = (pathURL) => path.dirname(global.__filename(pathURL))
global.__require = createRequire(import.meta.url)

// === VARIABLES GLOBALES ===
const __dirname = global.__dirname(import.meta.url)
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000
global.opts = Object.fromEntries(new URLSearchParams(process.argv.slice(2).join('&')))
global.prefix = new RegExp('^[' + (opts.prefix || '*/#.!?~$&%+\\-=|<>@').replace(/[|\\{}()[\]^$+*.\-]/g, '\\$&') + ']')

// === BASES DE DATOS ===
global.db = new Low(new JSONFile('database.json'))
global.loadDatabase = async () => {
  if (global.db.data) return
  global.db.data = { users: {}, chats: {}, settings: {}, ...await global.db.read().catch(() => ({})) }
  global.db.chain = lodash.chain(global.db.data)
}
await loadDatabase()

global.chatgpt = new Low(new JSONFile(path.join(__dirname, '/db/chatgpt.json')))
global.loadChatgptDB = async () => {
  if (global.chatgpt.data) return
  global.chatgpt.data = { users: {}, ...await global.chatgpt.read().catch(() => ({})) }
  global.chatgpt.chain = lodash.chain(global.chatgpt.data)
}
await loadChatgptDB()

// === SISTEMA DE AUTENTICACIÓN ===
global.authFile = 'LunaBotSession'
global.rutaBot = join(__dirname, global.authFile)
if (!existsSync(global.rutaBot)) mkdirSync(global.rutaBot)

const { state, saveCreds } = await useMultiFileAuthState(global.authFile)
const { version } = await fetchLatestBaileysVersion()
const msgRetryCounterCache = new NodeCache()

// === CONSOLA DE PREGUNTAS ===
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
})
const question = (text) => new Promise(resolve => rl.question(text, ans => resolve(ans.trim())))

// === OPCIÓN DE CONEXIÓN ===
let opcion = process.argv.includes('qr') ? '1' : '2'

// === CREACIÓN DE SOCKET ===
protoType()
serialize()

const connectionOptions = {
  version,
  logger: pino({ level: 'silent' }),
  printQRInTerminal: opcion === '1',
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' })),
  },
  msgRetryCounterCache,
  markOnlineOnConnect: true,
  syncFullHistory: false,
  generateHighQualityLinkPreview: true,
}
global.conn = makeWASocket(connectionOptions)

// === FUNCIONES DE CONEXIÓN ===
async function connectionUpdate(update) {
  const { connection, lastDisconnect } = update
  const reason = new Boom(lastDisconnect?.error)?.output?.statusCode

  if (connection === 'open') {
    console.log(chalk.greenBright('✅ Bot conectado exitosamente!'))
  }

  if (connection === 'close') {
    if (reason === DisconnectReason.badSession) {
      console.log(chalk.red('❌ Sesión inválida, elimine la carpeta y vuelva a autenticar.'))
    } else if (reason === DisconnectReason.connectionClosed) {
      console.log(chalk.yellow('⚠️ Conexión cerrada, intentando reconectar...'))
      await global.reloadHandler(true)
    } else if (reason === DisconnectReason.connectionLost) {
      console.log(chalk.yellow('⚠️ Conexión perdida, intentando reconectar...'))
      await global.reloadHandler(true)
    } else if (reason === DisconnectReason.loggedOut) {
      console.log(chalk.red('❌ Bot desconectado. Elimine la sesión y vuelva a escanear QR.'))
      process.exit(1)
    } else {
      console.log(chalk.red(`❌ Conexión cerrada: Código ${reason}`))
      process.exit(1)
    }
  }
}

global.conn.ev.on('connection.update', connectionUpdate)
global.conn.ev.on('creds.update', saveCreds)

// === RELOAD DEL HANDLER ===
let handler = await import('./handler.js')
global.reloadHandler = async (restartConn = false) => {
  try {
    let newHandler = await import(`./handler.js?update=${Date.now()}`)
    if (Object.keys(newHandler).length) handler = newHandler
  } catch (e) {
    console.error(e)
  }
  if (restartConn) {
    global.conn = makeWASocket(connectionOptions)
    global.conn.ev.on('connection.update', connectionUpdate)
    global.conn.ev.on('creds.update', saveCreds)
  }
}

// === GUARDADO AUTOMÁTICO ===
if (!opts.test) {
  setInterval(async () => {
    if (global.db.data) await global.db.write()
    if (global.chatgpt.data) await global.chatgpt.write()
  }, 30_000)
}

// === SERVIDOR WEB (opcional) ===
if (opts.server) {
  const server = await import('./server.js')
  server.default(global.conn, PORT)
}

// === ERRORES NO CONTROLADOS ===
process.on('uncaughtException', console.error)
