const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimentos {
    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const atendimentoDatado = {...atendimento, dataCriacao, data}
        const sql = 'INSERT INTO atendimentos SET ?'

        conexao.query(sql, atendimentoDatado, (erro, resultado) => {
            if(erro) {
                console.log(erro)
            } else {
                console.log(resultado)
            }
        })
    }
}

module.exports = new Atendimentos()