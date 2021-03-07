const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

class Atendimentos {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5

        const validacoes = [
            {
                nome: data,
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)

        if (erros.length > 0) {
            res.status(400).json(erros)
            return
        }

        const atendimentoDatado = {...atendimento, dataCriacao, data}
        const sql = 'INSERT INTO atendimentos SET ?'

        conexao.query(sql, atendimentoDatado, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(resultado)
            }
        })
    }

    lista(res) {
        const sql = 'SELECT * FROM atendimentos'
        conexao.query(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }

    buscaPorId(id, res) {
        const sql = 'SELECT * FROM atendimentos WHERE id = ?'

        if(!id) {
            res.status(400).json('Favor informar um ID valido')
        }

        conexao.query(sql, id, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado[0])
            }
        })
    }

    altera(id, valores, res) {
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?'

        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }

        conexao.query(sql, [valores, id], (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado[0])
            }
        })
    }

    deleta(id, res) {
        const sql = 'DELETE FROM atendimentos WHERE id = ?'

        if(!id) {
            res.status(400).json('Favor informar um ID valido')
        }

        conexao.query(sql, id, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({ id })
            }
        })
    }
}

module.exports = new Atendimentos()