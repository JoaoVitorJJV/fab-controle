import { useApi } from "@app/hooks/useApi"
import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"



const AvisosSite = () => {
    const api = useApi()
    const navigate = useNavigate()
    const [avisos, setAvisos] = useState({
        global: {
            id: '',
            nome: '',
            texto: '',
            tipo: '',
        },
        novidades: {
            id: '',
            nome: '',
            texto: '',
            tipo: '',
        }
    })
    const [verTabela, setVerTabela] = useState(false)


    useEffect(() => {

        const getDados = async () => {
            const res = await api.getAvisos()

            if (res.data.auth) {
                const helperGlobal = res.data.dados.global
                const helperNovidades = res.data.dados.novidades

                var dadosState = {
                    global: {
                        id: helperGlobal.id,
                        nome: helperGlobal.nome,
                        texto: helperGlobal.texto,
                        tipo: helperGlobal.tipo
                    },
                    novidades: {
                        id: helperGlobal.id,
                        nome: helperNovidades.nome,
                        texto: helperNovidades.texto,
                        tipo: helperNovidades.tipo
                    }
                }

                setAvisos(dadosState)
                setVerTabela(true)
            }
        }

        getDados()
    }, [])


    return (
        <div className="row">

            <div className="col-12">
                <div className="add mt-2 mb-2">
                    <Button variant="success" onClick={() => navigate('/oficiais/avisos/criar')}>
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>&nbsp;
                        Novo
                    </Button>
                </div>

                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title"><img alt="estrela" src="/img/icons/estrela.png" />&nbsp;Avisos site</h3>
                    </div>
                    <div className="card-body">
                        {verTabela &&
                            <Table striped bordered hover size="lg">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Texto</th>
                                        <th>Tipo</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{avisos.global.nome}</td>
                                        <td>{avisos.global.texto}</td>
                                        <td>
                                            {avisos.global.tipo}
                                        </td>
                                        <td>
                                            <Button variant="warning" onClick={() => navigate(`/oficiais/avisos/editar/${avisos.global.id}`)} size="sm">
                                                <i className="fa fa-pen"></i>
                                            </Button>&nbsp;&nbsp;
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>{avisos.novidades.nome}</td>
                                        <td>{avisos.novidades.texto}</td>
                                        <td>
                                            {avisos.novidades.tipo}
                                        </td>
                                        <td>
                                            <Button variant="warning" onClick={() => navigate(`/oficiais/destaque/editar/${avisos.novidades.id}`)} size="sm">
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

export default AvisosSite