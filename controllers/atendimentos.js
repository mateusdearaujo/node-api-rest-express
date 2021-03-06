const Atendimentos = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        res.send('Voce esta na rota de atendimentos - GET')
    })

    app.post('/atendimentos', (req, res) => {
        Atendimentos.adiciona(req.body)
        res.send('Voce esta na rota de atendimentos - POST')
    })
}