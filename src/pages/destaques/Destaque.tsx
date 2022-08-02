import { useApi } from "@app/hooks/useApi"
import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const Destaques = () => {
    const navigate = useNavigate()
    const [destaques, setDestaques] = useState<any>({
        oficial: {
            nome: '',
            data: '',
            motivo: '',
            patente: '',
            tipo: ''
        },
        praca: {
            nome: '',
            data: '',
            motivo: '',
            patente: '',
            tipo: ''
        }
    })
    const [verTabela, setVerTabela] = useState(false)
    const api = useApi()

    useEffect(() => {
    
        const getDestaque = async () => {
            const response = await api.getDestaques()

            if (response.data.auth) {
                const helperOficial = response.data.dados.oficial
                const helperPraca = response.data.dados.praca

                var dataOficial = new Date(helperOficial.data)
                var dataPraca = new Date(helperPraca.data)
                var dataFormatadaOficialDia = dataOficial.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
            
                var dataFormatadaPracaDia = dataPraca.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
                

                var dadosState = {
                    oficial: {
                        nome: helperOficial.nome,
                        data: dataFormatadaOficialDia,
                        motivo: helperOficial.motivo,
                        patente: helperOficial.patente,
                        tipo: helperOficial.tipo
                    },
                    praca: {
                        nome: helperPraca.nome,
                        data: dataFormatadaPracaDia,
                        motivo: helperPraca.motivo,
                        patente: helperPraca.patente,
                        tipo: helperPraca.tipo
                    }
                }

                setVerTabela(true)

                setDestaques(dadosState)
            }

          
        }

        getDestaque()
    }, [])

    return (
        <div className="row">

            <div className="col-12">
                <div className="add mt-2 mb-2">
                    <Button variant="success" onClick={() => navigate('/oficiais/destaque/criar')}>
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;
                        Novo
                    </Button>
                </div>

                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title"><img alt="estrela" src="/img/icons/estrela.png" />&nbsp;Destaques</h3>
                    </div>
                    <div className="card-body">
                        {verTabela &&
                            <Table striped bordered hover size="lg">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Data</th>
                                        <th>Texto</th>
                                        <th>Tipo</th>
                                        <th>Patente</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{(destaques.oficial.nome ? destaques.oficial.nome : '')}</td>
                                        <td>{(destaques.oficial.data ? destaques.oficial.data : '')}</td>
                                        <td>{(destaques.oficial.motivo ? destaques.oficial.motivo : '')}</td>
                                        <td>{(destaques.oficial.tipo ? destaques.oficial.tipo : '')}</td>
                                        <td>{(destaques.oficial.patente ? destaques.oficial.patente : '')}</td>
                                        <td>
                                            <Button variant="warning" onClick={() => navigate(`/oficiais/destaque/editar/${(destaques.oficial.nome ? destaques.oficial.nome : '')}`)} size="sm">
                                                <i className="fa fa-pen"></i>
                                            </Button>&nbsp;&nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{(destaques.praca.nome ? destaques.praca.nome : '')}</td>
                                        <td>{(destaques.praca.data ? destaques.praca.data : '')}</td>
                                        <td>{(destaques.praca.motivo ? destaques.praca.motivo : '')}</td>
                                        <td>{(destaques.praca.tipo ? destaques.praca.tipo : '')}</td>
                                        <td>{(destaques.praca.patente ? destaques.praca.patente : '')}</td>
                                        <td>
                                            <Button variant="warning" onClick={() => navigate(`/oficiais/destaque/editar/${(destaques.praca.nome ? destaques.praca.nome : '')}`)} size="sm">
                                                <i className="fa fa-pen"></i>
                                            </Button>&nbsp;&nbsp;
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        }

                    </div>
                </div>

            </div>
        </div>

    )
}

export default Destaques