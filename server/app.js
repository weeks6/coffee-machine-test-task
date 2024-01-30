import Fastify from 'fastify'
import config from './config.js'
import serveStatic from 'serve-static'
import path from 'node:path'
import cors from '@fastify/cors'
import fastifyStatic from '@fastify/static'

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fastify = Fastify({
})

await fastify.register(cors, {
})

await fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'public'),
    prefix: '/public/',
    constraints: {}
})

fastify.get('/config', function (request, reply) {
    reply.send(config)
})

fastify.listen({ port: 3000 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})