module.exports = function (server, restify, restifyValidator,cors){
    server.use(restify.plugins.acceptParser(server.acceptable))
    server.use(restify.plugins.queryParser())
    server.use(restify.plugins.bodyParser())
    server.use(restifyValidator)
    server.use(cors())
}