import { AuthContext } from "@app/contexts/Auth/AuthContext"
import { useApi } from "@app/hooks/useApi"
import { Player } from "@lottiefiles/react-lottie-player"
import { useContext, useEffect, useState } from "react"
import { Accordion, Button, Card } from "react-bootstrap"


const MeusRelatorios = () => {
    const [relatorios, setRelatorios] = useState([])
    const [loading, setLoading] = useState<Boolean>(false)
    const [relVazio, setRelVazio] = useState<Boolean>(false)
    const api = useApi()
    const logged = useContext(AuthContext)


    useEffect(() => {

        const getRelatorios = async () => {

            const result = await api.getAllRelatorioUsuario(logged.user?.id)

            if (result.data.auth) {
                setLoading(false)
                if (result.data.relatorios.length < 1) {
                    setRelVazio(true)
                }
                setRelatorios(result.data.relatorios)

            } else {
                setLoading(false)
            }

        }

        getRelatorios()

    }, [])

    return (
        <div className="row">
            <div className="col-12">
                {loading &&
                    <Player
                        autoplay
                        loop
                        src="https://assets2.lottiefiles.com/packages/lf20_ht6o1bdu.json"
                        style={{ width: '120px' }}
                    >      </Player>
                }

                {relVazio &&
                    <Card>
                        <Card.Header>
                            <img alt="jornal" src="/img/icons/error.png" />&nbsp;&nbsp;Ops..
                        </Card.Header>

                        <Card.Body>
                            Você não possui nenhum relatório de treinamento.
                        </Card.Body>
                    </Card>
                }


                {!loading && !relVazio &&
                    <Accordion>

                        {relatorios.map((relatorio: any) => {
                            var hora = relatorio.hora_inicio.slice(0, - 3)
                            var horaFinal = relatorio.hora_final.slice(0, - 3)

                            var verificado = false;

                            if (relatorio.status === 'Corrigido') {
                                verificado = true
                            }

                            return <Card>

                                <Card.Header>
                                    <div key={relatorio.id} className="col-12 d-flex">
                                        <Accordion.Toggle as={Button} variant="link" eventKey={relatorio.id}>
                                            <Button size="lg" variant={(relatorio.treino === "Instrução Básica Militar" ? 'success' : (relatorio.treino === "Instrução Intermediária Militar" ? 'info' : (relatorio.treino === "Instrução Avançada Militar" ? 'warning' : '')))}>
                                                <b>{(relatorio.treino === "Instrução Básica Militar" ? 'IBM' : (relatorio.treino === "Instrução Intermediária Militar" ? 'IIM' : (relatorio.treino === "Instrução Avançada Militar" ? 'IAM' : '')))}</b>
                                            </Button>
                                        </Accordion.Toggle>


                                        <div className="content col-11 ">
                                            <div className="col-11 d-flex justify-content-between">
                                                <h4>{relatorio.treino}</h4>
                                                <div className="timer">
                                                    <img alt="timer" src="/img/icons/timer.png" />&nbsp;&nbsp;
                                                    {hora}
                                                </div>

                                            </div>

                                            <div className="col-11 d-flex flex-wrap">
                                                <b>Responsável: </b>&nbsp;&nbsp;{relatorio.resp_nome}
                                                {verificado &&
                                                    <>
                                                        &nbsp;&nbsp;
                                                        <img alt="lapis" src="/img/icons/joinha_estrelado.png" />
                                                        &nbsp;&nbsp;
                                                        <b>Registrado por {relatorio.resp_nome}.</b>
                                                    </>
                                                }

                                                {!verificado &&
                                                    <>
                                                        &nbsp;&nbsp;

                                                        &nbsp;&nbsp;
                                                        <b>Aguardando correção...</b>
                                                    </>

                                                }
                                            </div>
                                        </div>
                                    </div>

                                </Card.Header>
                                <Accordion.Collapse eventKey={relatorio.id}>
                                    <Card.Body>

                                        <div className="row">
                                            <div className="col-12">
                                                <form>
                                                    <div className="text-black text-bold">
                                                        <img src="/img/icons/relatorios_icon.png" width="30" alt="Relatório" />
                                                        Relatório de Treinamento de {relatorio.data_envio}
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-4">
                                                            Oficial Responsável: {relatorio.resp_nome}
                                                        </div>
                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-12">
                                                            Treinador: {`${relatorio.trei_patente}, ${relatorio.trei_nome}`}
                                                        </div>

                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-12">
                                                            Treinamento: {`${relatorio.treino}, Sala: ${relatorio.sala}`}
                                                        </div>

                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-12">
                                                            <label>Nome dos treinados:</label>
                                                        </div>
                                                        <div className="col-12">
                                                            {relatorio.inicio_nomes}
                                                        </div>

                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-12 d-flex">
                                                            <label>- Às {hora} o {relatorio.treino} iniciou, com {relatorio.inicio_qtd} {relatorio.pat_treinados}.</label>&nbsp;
                                                        </div>

                                                    </div>

                                                    {relatorio.sem_aprovados === 1 &&

                                                        <div className="row mt-3">
                                                            <div className="col-12">
                                                                <label>Reprovados:</label>
                                                            </div>
                                                            <div className="col-12">
                                                               {relatorio.reprovados}
                                                            </div>

                                                        </div>
                                                    }


                                                    <div className="row mt-3">
                                                        <div className="col-12 d-flex">
                                                        <label>- Às {horaFinal} o {relatorio.treino} teve seu fim, com {relatorio.final_qtd} {relatorio.pat_treinados}.</label>&nbsp;
                                                        </div>

                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-12">
                                                            <label>Nome dos aprovados:</label>
                                                        </div>
                                                        <div className="col-12">
                                                            {relatorio.aprovados}
                                                        </div>

                                                    </div>

                                                    <div className="row mt-3">
                                                        <div className="col-12">
                                                            <label>Observações:</label>
                                                        </div>
                                                        <div className="col-12">
                                                            {relatorio.observacoes}
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        }


                        )}

                    </Accordion>
                }

            </div>
        </div>
    )

}

export default MeusRelatorios