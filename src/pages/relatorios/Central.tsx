import { useApi } from '@app/hooks/useApi';
import { Player } from '@lottiefiles/react-lottie-player';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useWebSocket } from 'react-use-websocket/dist/lib/use-websocket';

function Central() {
    const api = useApi()
    const [relMontado, setRelMontado] = useState<any>([])
    const [showVer, setShowVer] = useState(false)
    const [verNotf, setVerNotf] = useState(false)
    const [relatoriosContagem, setRelatorioContagem] = useState(0)
    const [ticking, setTicking] = useState(true),
        [count, setCount] = useState(0)
    const { lastJsonMessage, sendMessage } = useWebSocket('ws://fab-websocket.herokuapp.com/', {
        onMessage: (message) => {

        },
        onError: (event) => { console.error(event); },
        shouldReconnect: (closeEvent) => true,
        reconnectInterval: 3000
    });

    const montarRel = (relatorio: any) => {
        const str = relatorio.hora_inicio;
        const str2 = str.substring(0, str.length - 3);
        const str3 = relatorio.hora_final;
        const str4 = str3.substring(0, str.length - 3);
        relatorio.hora_inicio = str2
        relatorio.hora_final = str4

        setRelMontado(relatorio)
        setShowVer(true)
    }

    const handleCloseVer = () => {
        setShowVer(false)
    }

    const aceitar = async (id: any) => {
        const res = await api.aceitarRel(id)

        if (res.data.auth) {
            toast.success('Relatório aceito com sucesso!')
        } else {
            toast.error(res.data.msg)
        }
    }

    useEffect(() => {

        const verificarNotf = async () => {
            if (Notification.permission !== 'granted') {
                Notification.requestPermission();
            }
        }
        verificarNotf()

    }, [])

    useEffect(() => {

        if (lastJsonMessage) {
            var contagem = 0;
            lastJsonMessage.map((rel: any) => {
                if (rel.status === 'Aguardando Correção') {
                    contagem++;

                }
            })
            setRelatorioContagem(contagem)
            if (relatoriosContagem > 0) {
                setVerNotf(true)

            }
        }
    }, [lastJsonMessage])

    useEffect(() => {
        const timer = setTimeout(() => ticking && setCount(count + 1), 15000)
        if (verNotf && relatoriosContagem > 0) {
            criarNotf(relatoriosContagem)
            setVerNotf(false)
            setRelatorioContagem(0)
        }
        return () => clearTimeout(timer)
    }, [count, ticking])

    const criarNotf = (qtd: any) => {

        if (Notification.permission !== 'granted')
            Notification.requestPermission();
        else {
            var notification = new Notification('Central - Treinamentos pendentes', {
                icon: '/img/relatorio.png',
                body: `Há ${qtd} relatórios aguardando correção`,
            });
            notification.onclick = function () {
                window.open('http://stackoverflow.com/a/13328397/1269037');
            };
        }

    }

    return (
        <>
            {!lastJsonMessage &&
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Player
                        autoplay
                        loop
                        src="https://assets9.lottiefiles.com/private_files/lf30_fup2uejx.json"

                    >
                    </Player>
                </div>
            }
            {lastJsonMessage &&
                <>
                    {lastJsonMessage.map((rel: any) => {
                        const data = new Date(rel.data_hora_envio)

                        const diaEnvio = data.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
                        const horaEnvio = data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })

                        return (
                            <div className="card" key={(rel.id + 1)}>
                                <div className="card-header">
                                    <strong>Relatório de Treinamento</strong>
                                    <div className="card-body">
                                        <div>
                                            <span className="float-right">
                                                <small>{diaEnvio}&nbsp;&nbsp;
                                                    <i className="fas fa-clock" aria-hidden="true"></i>&nbsp;&nbsp;
                                                    {horaEnvio}
                                                </small>
                                            </span>
                                            <button className={`btn btn-sm btn-squared-default btn-${(rel.treino === 'Instrução Básica Militar' ? 'success' : (rel.treino === 'Instrução Intermediária Militar' ? 'danger' : (rel.treino === 'Instrução Avançada Militar' ? 'warning' : 'info')))}`}><strong>{(rel.treino === 'Instrução Básica Militar' ? 'IBM' : (rel.treino === 'Instrução Intermediária Militar' ? 'IIM' : (rel.treino === 'Instrução Avançada Militar' ? 'IAM' : '')))}</strong></button>
                                            <strong>&nbsp;&nbsp;(ID: #{rel.id}) {rel.treino} - Sala {rel.sala}</strong><br />T: {rel.trei_nome}<br />
                                            <span className="float-right">
                                                Responsável: &nbsp;&nbsp;
                                                <strong>
                                                    {rel.resp_nome}
                                                </strong>
                                            </span>

                                            {rel.sem_aprovados === 1 && !rel.aprovados &&
                                                <i>Sem aprovados</i>
                                            }

                                            {rel.sem_aprovados === 0 && rel.aprovados &&
                                                <span>Aprovados: {rel.aprovados}</span>
                                            }

                                            <br />
                                            {rel.status === 'Corrigido' &&
                                                <>
                                                    <button className="btn btn-sm btn-squared-default btn-success">
                                                        <i className="fas fa-thumbs-up" aria-hidden="true"></i>
                                                    </button>

                                                    <strong className="text-black">&nbsp;&nbsp;Relatório verificado por {rel.oficial_verificou}</strong>
                                                </>
                                            }
                                            {rel.status === 'Aguardando Correção' &&

                                                <>

                                                    <button className="btn btn-sm btn-squared-default btn-warning">
                                                        <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                                                    </button>

                                                    <strong className="text-black">&nbsp;&nbsp;Aguardando correção...</strong>
                                                </>


                                            }


                                        </div>

                                        <div className="d-flex justify-content-between mt-3">
                                            {rel.status === 'Aguardando Correção' &&

                                                <div>
                                                    <button type="button" className="btn btn-success pull-right" onClick={() => aceitar(rel.id)}>Aceitar</button>
                                                </div>
                                            }

                                            <div>
                                                <button type="button" className="btn btn-primary" onClick={() => montarRel(rel)}>
                                                    Ver Relatório
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        )
                    })}

                    <Modal centered show={showVer} onHide={handleCloseVer}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Relatório de treinamento ID: {relMontado.id}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-12">
                                    <form>
                                        <div className="text-black text-bold">
                                            <img src="/img/icons/relatorios_icon.png" width="30" alt="Relatório" />
                                            Relatório de Treinamento de {relMontado.data_envio}
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-4">
                                                Oficial Responsável: {relMontado.resp_nome}
                                            </div>
                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-12">
                                                Treinador: {`${relMontado.trei_patente}, ${relMontado.trei_nome}`}
                                            </div>

                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-12">
                                                Treinamento: {`${relMontado.treino}, Sala: ${relMontado.sala}`}
                                            </div>

                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-12">
                                                <label>Nome dos treinados:</label>
                                            </div>
                                            <div className="col-12">
                                                {relMontado.inicio_nomes}
                                            </div>

                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-12 d-flex">
                                                <label>Às {(relMontado.hora_inicio)} a {relMontado.treino} iniciou, com {relMontado.inicio_qtd} {relMontado.pat_treinados}</label>&nbsp;
                                            </div>

                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-12">
                                                <label>Reprovados:</label>
                                            </div>
                                            <div className="col-12">
                                                {relMontado.reprovados}
                                            </div>

                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-12 d-flex">
                                                <label>Às {relMontado.hora_final} a {relMontado.treino} teve seu fim, com {relMontado.final_qtd} {relMontado.pat_treinados}</label>&nbsp;
                                            </div>

                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-12">
                                                <label>Nome dos aprovados:</label>
                                            </div>
                                            <div className="col-12">
                                                {relMontado.aprovados}
                                            </div>

                                        </div>

                                        <div className="row mt-3">
                                            <div className="col-12">
                                                <label>Observações:</label>
                                            </div>
                                            <div className="col-12">
                                                {relMontado.observacoes}
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseVer}>
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>

            }
        </>
    );
}

export default Central;
