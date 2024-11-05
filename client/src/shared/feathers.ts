import io from 'socket.io-client'
import { feathers as feathersDefault } from '@feathersjs/feathers'
import authentication from '@feathersjs/authentication-client'
import socketio from '@feathersjs/socketio-client'

const socket = io('http://localhost:3030')
export const feathers = feathersDefault()

feathers.configure(socketio(socket))
feathers.configure(authentication())
