import { useApi } from "@app/hooks/useApi"
import { useEffect, useState } from "react"
import { Button, Table } from "react-bootstrap"
import { useNavigate } from "react-router-dom"



const AvisosSite = () => {
    const api = useApi()
    const navigate = useNavigate()
    const [avisos, setAvisos] = useState([])
    const [verTabela, setVerTabela] = useState(false)


    useEffect(() => {

        const getDados = async () => {
            const res = await api.getAvisos()

            if (res.data.auth) {
                setAvisos(res.data.avisos)
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

                                        <th>Titulo</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {avisos &&
                                        <>
                                            {
                                                avisos.map((aviso: any) => (
                                                    <tr>


                                                        <td>{aviso.nome}</td>
                                                        <td>{aviso.texto}</td>
                                                        <td>{aviso.tipo}</td>
                                                        <td>{aviso.titulo}</td>
                                                        <td>
                                                            <Button variant="warning" onClick={() => navigate(`/oficiais/avisos/editar/${aviso.id}`)} size="sm">
                                                                <i className="fa fa-pen"></i>
                                                            </Button>&nbsp;&nbsp;
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </>
                                    }
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