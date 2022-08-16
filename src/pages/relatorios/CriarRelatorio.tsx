import { AuthContext } from "@app/contexts/Auth/AuthContext"
import { useApi } from "@app/hooks/useApi"
import { Player } from "@lottiefiles/react-lottie-player"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { toast } from "react-toastify"

const CriarRelatorio = () => {
    const [oficiais, setOficiais] = useState<any>([])
    const [hoje, setHoje] = useState('')
    const [patentes, setPatentes] = useState<any>([])
    const [treinos, setTreinos] = useState<any>([])
    const api = useApi()
    const logged = useContext(AuthContext)
    const [showExcluir, setShowVer] = useState(true)

    //Relatorio
    const [ofcResp, setOficialResp] = useState<any>('')
    const [treinador, setTreinador] = useState<any>({ nome: '', patente: '' })
    const [treinados, setTreinados] = useState('')
    const [treinamento, setTreinamento] = useState<any>({ nome: '', sala: '' })
    const [fraseDeInicio, setFraseDeInicio] = useState<any>({ horaInicio: '', treinamento: '', fim: '0' })
    const [fraseFinal, setFraseFinal] = useState<any>({ horaFinal: '', treinamento: '', fim: '0' })
    const [reprovados, setReprovados] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [aprovados, setAprovados] = useState('')
    const [patenteTreinados, setPatenteTreinados] = useState('')
    const [txtBtn, setTxtBtn] = useState('Aguarde...')

    const [loading, setLoading] = useState(false)
    const [semAprovados, setSemAprovados] = useState(false)
    const [comAprovados, setComAprovados] = useState(false)



    const enviarRel = async () => {
        setLoading(true)
        var ofcRespVer = (ofcResp ? ofcResp : oficiais[0].oficial)
        var treinadorVer = (treinador.patente ? treinador.patente : patentes[0].nome_sem_estrela)
        var treinamentoVer = (treinamento.nome ? treinamento.nome : treinos[0].nome)
        var fraseTreino = (treinamentoVer ? treinamentoVer : fraseDeInicio.treinamento)
        var fraseFinalVer = (treinamentoVer ? treinamentoVer : fraseFinal.treinamento)

        var canSubmit = false;

        if (fraseDeInicio.horaInicio && fraseDeInicio.fim !== '' && fraseFinal.fim !== '' && fraseFinal.horaFinal && treinador.nome && treinamento.sala) {
            canSubmit = true;
        }

        const res = await axios.get('https://geolocation-db.com/json/')


        if (res.data.IPv4) {
            var ip = res.data.IPv4
            if (canSubmit) {
                var dadosRel = {
                    ofcRespo: ofcRespVer,
                    dataEnvio: hoje,
                    treinadorEnvio: {
                        nome: treinador.nome,
                        patente: treinadorVer
                    },
                    treinamentoEnvio: {
                        nome: treinamentoVer,
                        sala: treinamento.sala
                    },
                    nomeDosTreinados: treinados,
                    fraseDeInicioEnvio: {
                        horaInicio: fraseDeInicio.horaInicio,
                        treinamento: fraseTreino,
                        fim: fraseDeInicio.fim
                    },
                    fraseFinalEnvio: {
                        horaFinal: fraseFinal.horaFinal,
                        treinamento: fraseFinalVer,
                        fim: fraseFinal.fim
                    },
                    reprovadosEnvio: reprovados,
                    observacoesEnvio: observacoes,
                    idUsuario: logged.user?.id,
                    ip,
                    nomeDosAprovados: aprovados,
                    patenteTreinados: patenteTreinados
                }

                const response = await api.createRel(dadosRel)

                if (response.data.auth) {
                    toast.success(response.data.msg)
                    setOficialResp('')
                    setTreinador({ nome: '', patente: '' })
                    setTreinados('')
                    setTreinamento({ nome: '', sala: '' })
                    setFraseDeInicio({ horaInicio: '', treinamento: '', fim: '0' })
                    setFraseFinal({ horaFinal: '', treinamento: '', fim: '0' })
                    setReprovados('')
                    setObservacoes('')
                    setAprovados('')
                    setPatenteTreinados('')
                    setTxtBtn('Pronto!')
                    setLoading(false)
                } else {
                    toast.error(response.data.msg)
                    setLoading(false)
                }
            } else {
                setLoading(false)
                toast.error('Os campos precisam ser preenchidos corretamente.')
            }
        }

    }

    const handleCloseExcluir = () => setShowVer(false)

    useEffect(() => {

        const getOficiais = async () => {
            const result = await api.getUsuariosEPatentes()

            if (result.data.auth) {
                setOficiais(result.data.usuarioPat)
            }
        }

        const getPatentes = async () => {
            const res = await api.getTodasPatentes()

            if (res.data.auth) {
                setPatentes(res.data.patentes)
            }
        }

        const getTreinos = async () => {
            const result = await api.getTreinamentos()

            if (result.data.auth) {
                setTreinos(result.data.treinos)
            }
        }

        getTreinos()
        getPatentes()
        getOficiais()
        getHoje()
    }, [])


    const getHoje = () => {
        const data = new Date()
        const formatar = data.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
        setHoje(formatar)
    }

    const alterarCheckBox = () => {
        setSemAprovados(!semAprovados)
        console.log(semAprovados)
    }

    const aprovadosFunc = (e: any) => {
        setFraseFinal({ horaFinal: fraseFinal.horaFinal, treinamento: fraseFinal.treinamento, fim: e.target.value })
        var param = parseInt(e.target.value)
        if (param && param > 0) {
            setComAprovados(true)
        } else {
            setComAprovados(false)
        }
    }
    return (
        <div className="row">
            <div className="col-12">
                <div className="card card-warning">
                    <div className="card-header">
                        <h3 className="card-title"><img src="/img/icons/relatorios_icon.png" alt="relatorios" /> <b>Criar relatório</b></h3>
                    </div>

                    <div className="card-body">
                        <form onClick={(e) => e.preventDefault()}>
                            <div className="row">
                                <div className="col-sm-6">

                                    <div className="form-group">
                                        <label>Oficial Responsável</label>
                                        <select className="custom-select rounded-0" id="exampleSelectRounded0" onChange={(e) => setOficialResp(e.target.value)} required>
                                            {oficiais.map((oficial: any, i: number) => (<option key={i} value={oficial.oficial}>{oficial.oficial}</option>))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>Data</label>
                                        <input type="text" value={hoje} className="form-control" disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">

                                    <div className="form-group">
                                        <label>Treinador</label>
                                        <select className="custom-select rounded-0" id="exampleSelectRounded0" onChange={(e) => setTreinador({ nome: treinador.nome, patente: e.target.value })} required>
                                            {patentes.map((patente: any, i: number) => (<option key={i} value={patente.nome_sem_estrela}>{patente.nome_sem_estrela}</option>))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>&nbsp;</label>
                                        <input type="text" className="form-control" onChange={(e) => setTreinador({ nome: e.target.value, patente: treinador.patente })} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">

                                    <div className="form-group">
                                        <label>Treinamento: </label>
                                        <select className="custom-select rounded-0" id="exampleSelectRounded0" onChange={(e) => setTreinamento({ nome: e.target.value, sala: treinamento.sala })} required>
                                            {treinos.map((treino: any, i: number) => (<option key={i} value={treino.nome}>{treino.nome}</option>))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label>&nbsp;</label>
                                        <input type="number" className="form-control" onChange={(e) => setTreinamento({ nome: treinamento.nome, sala: e.target.value })} placeholder="Sala" required />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <label>Nome dos treinados: </label>
                                        <textarea className="form-control" onChange={(e) => setTreinados(e.target.value)} rows={3} placeholder="- Os nomes devem ter um hífem antes" required></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 d-flex" style={{ padding: 0 }}>
                                    <div className="col-12 col-sm-2 col-md-2 col-lg-2" >
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Às</span>
                                            </div>
                                            <input type="text" onChange={(e) => setFraseDeInicio({ horaInicio: e.target.value, treinamento: fraseDeInicio.treinamento, fim: fraseDeInicio.fim })} className="form-control" placeholder="00:00" required />
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">o</span>
                                            </div>
                                            <select className="custom-select rounded-0" id="exampleSelectRounded0" onChange={(e) => setFraseDeInicio({ horaInicio: fraseDeInicio.horaInicio, treinamento: e.target.value, fim: fraseDeInicio.fim })} required>
                                                {treinos.map((treino: any, i: number) => (<option key={i} value={treino.nome} selected={(treinamento ? (treinamento.nome === treino.nome ? true : false) : false)}>{treino.nome}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">iniciou, com</span>
                                            </div>
                                            <input type="number" className="form-control" placeholder="0" onChange={(e) => setFraseDeInicio({ horaInicio: fraseDeInicio.horaInicio, treinamento: fraseDeInicio.treinamento, fim: e.target.value })} required />
                                            <input type="text" className="form-control" onChange={(e) => setPatenteTreinados(e.target.value)} />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {semAprovados &&
                                <div className="row">
                                    <div className="col-sm-12">

                                        <div className="form-group">
                                            <label>Reprovações: </label>
                                            <textarea className="form-control" onChange={(e) => setReprovados(e.target.value)} rows={3} placeholder="- Os nomes devem ter um hífem antes"></textarea>
                                        </div>
                                    </div>
                                </div>
                            }

                            <div className="row mb-4">
                                <div className="col-sm-6">
                                    <div className="form-check">
                                        {semAprovados &&
                                            <input className="form-check-input" type="checkbox" onChange={() => { }} onClick={() => alterarCheckBox()} checked />
                                        }
                                        {!semAprovados &&
                                            <input className="form-check-input" type="checkbox" onChange={() => { }} onClick={() => alterarCheckBox()} />
                                        }
                                        <label className="form-check-label">Esse treinamento teve reprovados</label>
                                    </div>


                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-12 d-flex" style={{ padding: 0 }}>
                                    <div className="col-12 col-sm-2 col-md-2 col-lg-2" >
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">Às</span>
                                            </div>
                                            <input type="text" onChange={(e) => setFraseFinal({ horaFinal: e.target.value, treinamento: fraseFinal.treinamento, fim: fraseFinal.fim })} className="form-control" placeholder="00:00" required />
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">o</span>
                                            </div>
                                            <select className="custom-select rounded-0" id="exampleSelectRounded0" onChange={(e) => setFraseFinal({ horaFinal: fraseFinal.horaFinal, treinamento: e.target.value, fim: fraseFinal.fim })} required>
                                                {treinos.map((treino: any, i: number) => (<option key={i} value={treino.nome} selected={(treinamento ? (treinamento.nome === treino.nome ? true : false) : false)}>{treino.nome}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-4 col-md-4 col-lg-4">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">teve seu fim, com</span>
                                            </div>
                                            <input type="number" className="form-control" placeholder="0" onChange={(e) => aprovadosFunc(e)} required />
                                            <input type="text" className="form-control" value={(patenteTreinados ? patenteTreinados : '')} onChange={(e) => setPatenteTreinados(e.target.value)} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            {comAprovados &&

                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-group">
                                            <label>Nome dos aprovados: </label>
                                            <textarea className="form-control" onChange={(e) => setAprovados(e.target.value)} rows={3} placeholder="- Os nomes devem ter um hífem antes" required></textarea>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="row">
                                <div className="col-sm-12">
                                    <label>Observações</label>
                                    <textarea className="form-control" onChange={(e) => setObservacoes(e.target.value)} rows={3} placeholder="- Suas observações a cerca deste treinamento" required></textarea>
                                </div>
                            </div>

                            <button onClick={() => enviarRel()} className="btn btn-success btn-block mt-4">
                                {loading &&
                                    <Player
                                        autoplay
                                        loop
                                        src="https://assets2.lottiefiles.com/packages/lf20_ht6o1bdu.json"
                                        style={{ width: '40px' }}
                                    >

                                    </Player>
                                }
                                {(!loading ? 'Enviar' : null)}

                            </button>
                        </form>
                    </div>

                    <Modal centered show={loading} onHide={handleCloseExcluir}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Alerta
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row">
                                <div className="col-12">
                                    <h6>Estamos enviando seu relatório, por favor, não saia da página...</h6>
                                    <Player
                                        autoplay
                                        loop
                                        src="https://assets1.lottiefiles.com/packages/lf20_QJbPLt.json"
                                        style={{ width: '200px' }}
                                    >

                                    </Player>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button disabled={true} variant="success" onClick={handleCloseExcluir}>
                                {txtBtn}
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div >
        </div >
    )


}

export default CriarRelatorio

