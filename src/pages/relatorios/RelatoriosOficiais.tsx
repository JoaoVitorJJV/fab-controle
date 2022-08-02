import { useApi } from "@app/hooks/useApi"
import { useContext, useEffect, useState } from "react"
import DataTable from "react-data-table-component"
import { Button, Modal } from "react-bootstrap"
import { AuthContext } from "@app/contexts/Auth/AuthContext"
import { toast } from "react-toastify"

const RelatoriosOficiais = () => {

    const api = useApi()
    const [columns, setColumns] = useState<any>([])
    const [data, setData] = useState<any>([])
    const [relMontado, setRelMontado] = useState<any>({})
    const [patentes, setPatentes] = useState<any>([])
    const [show, setShow] = useState(false);
    const [showVer, setShowVer] = useState(false);
    const [showExcluir, setShowExcluir] = useState(false);
    const [treinos, setTreinos] = useState([])

    //Relatório
    const [podeEditarTreino, setPodeEditarTreino] = useState(false)
    const [treinador, setTreinador] = useState<any>({ nome: '', patente: '' })
    const [treinados, setTreinados] = useState('')
    const [treinamento, setTreinamento] = useState<any>({ nome: '', sala: '' })
    const [podeEditarTreinamento, setPodeEditarTreinamento] = useState(false)
    const [fraseDeInicio, setFraseDeInicio] = useState<any>({ horaInicio: '', treinamento: '', fim: '0' })
    const [podeEditarIni, setPodeEditarIni] = useState(false)
    const [podeEditarTreinamentoIni, setPodeEditarTreinamentoIni] = useState(false)
    const [editarFimIni, setEditarFimIni] = useState(false)
    const [fraseFinal, setFraseFinal] = useState<any>({ horaFinal: '', treinamento: '', fim: '0' })
    const [podeEditarFim, setPodeEditarFim] = useState(false)
    const [podeEditarTreinamentoFim, setPodeEditarTreinamentoFim] = useState(false)
    const [editarFim, setEditarFim] = useState(false)
    const [reprovados, setReprovados] = useState('')
    const [observacoes, setObservacoes] = useState('')
    const [aprovados, setAprovados] = useState('')
    const [patenteTreinados, setPatenteTreinados] = useState('')
    const [editarPatTreinados, setEditarPatTreinados] = useState(false)

    const [relExcluirID, setRelExcluirID] = useState('')

    const logged = useContext(AuthContext)
    const [atualizarDOOm, setAtualizarDOOm] = useState(false)

    const handleClose = () => {
        setShow(false)

        setPodeEditarIni(false)
        setPodeEditarTreinamentoIni(false)
        setPodeEditarTreinamento(false)
        setPodeEditarTreino(false)
        setEditarFim(false)
        setPodeEditarTreinamentoFim(false)
        setEditarFimIni(false)
        setPodeEditarFim(false)
        setEditarPatTreinados(false)

    };

    const handleCloseVer = () => {
        setShowVer(false)

    };

    const handleCloseExcluir = () => setShowExcluir(false)
    const handleShowExcluir = (data: any) => {
        setRelExcluirID(data)
        setShowExcluir(true)
    
    }



    const handleShow = (data: any) => {
        setRelMontado(data)

        setShow(true);
    }

    const handleShowVer = (data: any) => {
        setRelMontado(data)

        setShowVer(true);
    }


    const handlerTreinadorNome = (e: any) => {
        setPodeEditarTreino(true)
        setTreinador({ nome: e.target.value, patente: treinador.patente })
    }



    const handlerSala = (e: any) => {
        setPodeEditarTreinamento(true)
        setTreinamento({ nome: treinamento.nome, sala: e.target.value })
    }

    //Frase inicio
    const handlerFraseIniHora = (e: any) => {
        setPodeEditarIni(true)

        setFraseDeInicio({ horaInicio: e.target.value, treinamento: fraseDeInicio.treinamento, fim: fraseDeInicio.fim })

    }

    const handlerTreiIni = (e: any) => {
        setPodeEditarTreinamentoIni(true)
        setFraseDeInicio({ horaInicio: fraseDeInicio.horaInicio, treinamento: e.target.value, fim: fraseDeInicio.fim })

    }

    const handlerQtdFimIni = (e: any) => {
        setEditarFimIni(true)

        setFraseDeInicio({ horaInicio: fraseDeInicio.horaInicio, treinamento: fraseDeInicio.treinamento, fim: e.target.value })
    }

    const handlerPatTreinados = (e: any) => {
        setEditarPatTreinados(true)

        setPatenteTreinados(e.target.value)
    }

    const enviarForm = async (rel: any) => {
        setAtualizarDOOm(false)
        var dadosRel = {
            treinadorEnvio: {
                nome: (treinador.nome ? treinador.nome : rel.treiNome),
                patente: (treinador.patente ? treinador.patente : rel.treiPatente)
            },
            treinamentoEnvio: {
                nome: (treinamento.nome ? treinamento.nome : rel.treino),
                sala: (treinamento.sala ? treinamento.sala : rel.sala)
            },
            nomeDosTreinados: (treinados ? treinados : rel.inicioNomes),
            fraseDeInicioEnvio: {
                horaInicio: (fraseDeInicio.horaInicio !== '0' ? fraseDeInicio.horaInicio : rel.horaInicio),
                treinamento: (fraseDeInicio.treinamento ? fraseDeInicio.treinamento : rel.treino),
                fim: (fraseDeInicio.fim ? fraseDeInicio.fim : rel.inicioQtd)
            },
            fraseFinalEnvio: {
                horaFinal: (fraseFinal.horaFinal ? fraseFinal.horaFinal : rel.horaFinal),
                treinamento: (fraseFinal.treinamento ? fraseFinal.treinamento : rel.treino),
                fim: (fraseFinal.fim !== '0' ? fraseFinal.fim : rel.fimQtd)
            },
            reprovadosEnvio: (reprovados ? reprovados : rel.reprovados),
            observacoesEnvio: (observacoes ? observacoes : rel.observacoes),
            nomeDosAprovados: (aprovados ? aprovados : rel.aprovados),
            patenteTreinados: (patenteTreinados ? patenteTreinados : rel.patentesTreinados),
            id: rel.id,
            idUsuario: logged.user?.id,
            aprovados: (aprovados ? aprovados : rel.aprovados)
        }

        const resp = await api.editarRelatorio(dadosRel)
        if (resp.data.auth) {
            setAtualizarDOOm(true)
            toast.success(resp.data.msg)

        } else {
            setAtualizarDOOm(true)
            toast.error(resp.data.msg)
        }


    }


    //Frase Final
    const handlerFraseFimHora = (e: any) => {
        setPodeEditarFim(true)

        setFraseFinal({ horaFinal: e.target.value, treinamento: fraseFinal.treinamento, fim: fraseFinal.fim })

    }

    const handlerTreiFim = (e: any) => {
        setPodeEditarTreinamentoFim(true)
        setFraseFinal({ horaFinal: fraseFinal.horaFinal, treinamento: e.target.value, fim: fraseFinal.fim })

    }

    const handlerQtdFim = (e: any) => {
        setEditarFim(true)

        setFraseFinal({ horaFinal: fraseFinal.horaFinal, treinamento: fraseFinal.treinamento, fim: e.target.value })
    }

    const handlerDelete = async () => {
        const res = await api.deleteRel(relExcluirID, logged.user?.id)

        if(res.data.auth){
            toast.success(res.data.msg)
            setAtualizarDOOm(!atualizarDOOm)
            handleCloseExcluir()
        }else{
            setAtualizarDOOm(!atualizarDOOm)
            toast.error(res.data.msg)
            handleCloseExcluir()
        }
    }


    useEffect(() => {
        const getTreinos = async () => {
            const result = await api.getTreinamentos()

            if (result.data.auth) {
                setTreinos(result.data.treinos)
            }
        }

        const getPatentes = async () => {
            const res = await api.getTodasPatentes()

            if (res.data.auth) {
                setPatentes(res.data.patentes)
            }
        }
        const getRelatorios = async () => {
            const response = await api.getAllRelatorios()

            if (response.data.auth) {

                if (response.data.relatorios.length > 0) {
                    var relArray: any = []

                    const relatorios = response.data.relatorios
                    relatorios.map((relatorio: any, i: number) => {
                        var formatarData = new Date(relatorio.data_hora_envio)
                        var dataFormatada = formatarData.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' })
                        var dataFormatadaHoras = formatarData.toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })

                        var relMontado = {
                            id: relatorio.id,
                            data: relatorio.data_envio,
                            status: relatorio.status,
                            respNome: relatorio.resp_nome,
                            treiNome: relatorio.trei_nome,
                            treiPatente: relatorio.trei_patente,
                            treino: relatorio.treino,
                            sala: relatorio.sala,
                            horaInicio: relatorio.hora_inicio,
                            horaFinal: relatorio.hora_final,
                            inicioQtd: relatorio.inicio_qtd,
                            inicioNomes: relatorio.inicio_nomes,
                            observacoes: relatorio.observacoes,
                            oficialVerificou: relatorio.oficial_verificou,
                            aprovados: relatorio.aprovados,
                            reprovados: relatorio.reprovados,
                            fimQtd: relatorio.final_qtd,
                            patentesTreinados: relatorio.pat_treinados
                        }

                        relArray[i] = {
                            id: i,
                            data: <span>{dataFormatada}
                                <br />
                                às
                                <br />
                                {dataFormatadaHoras}
                            </span>,
                            treino: relatorio.treino,
                            sala: relatorio.sala,
                            status: relatorio.status,
                            treinador: relatorio.trei_patente + ' ' + relatorio.trei_nome,
                            relatorio: <div>
                                <button type="button" title="Ver" onClick={() => handleShowVer(relMontado)} className="btn btn-sm btn-info"><i className="fa fa-eye"></i></button>
                            </div>,
                            acoes: <div>
                                <button type="button" title="Apagar" onClick={() => handleShowExcluir(relMontado.id)} className='btn btn-sm btn-danger'><i className="fa fa-trash"></i></button>&nbsp;
                                <button type="button" title="Editar" onClick={() => handleShow(relMontado)} className="btn btn-sm btn-warning"><i className="fa fa-pen"></i></button>
                            </div>
                        }
                    })
                    setData(relArray)
                }
            }
        }


        console.log('ola')
        const colunas = [
            {
                cell: () => (<img alt="relatorios" src="/img/icons/relatorios_icon.png" />),
                width: '56px', // custom width for icon button
                style: {
                    borderBottom: '1px solid #FFFFFF',
                    marginBottom: '-1px',
                },
            },
            {
                id: 'Data',
                name: 'Data',
                selector: (row: { data: any; }) => row.data,
                sortable: true,
                left: true,
                reorder: true,
                style: {
                    fontWeight: 'bold'
                }
            },
            {
                id: 'Treino',
                name: 'Treino',
                selector: (row: { treino: any; }) => row.treino,
                sortable: true,
                left: true,
                reorder: true,
            },
            {
                id: 'Sala',
                name: 'Sala',
                selector: (row: { sala: any; }) => row.sala,
                sortable: true,
                left: true,
                reorder: true,
            },
            {
                id: 'Status',
                name: 'Status',
                selector: (row: { status: any; }) => row.status,
                sortable: true,
                left: true,
                reorder: true,
            },
            {
                id: 'Treinador',
                name: 'Treinador',
                selector: (row: { treinador: any; }) => row.treinador,
                sortable: true,
                left: true,
                reorder: true,
            },
            {
                id: 'Relatório',
                name: 'Relatório',
                selector: (row: { relatorio: any; }) => row.relatorio,
                sortable: true,
                left: true,
                reorder: true,
            },
            {
                id: 'Ações',
                name: 'Ações',
                selector: (row: { acoes: any; }) => row.acoes,
                sortable: true,
                left: true,
                reorder: true,
            },
        ];
        getTreinos()
        getPatentes()
        getRelatorios()
        setColumns(colunas)
    }, [atualizarDOOm])

    const customStyles = {
        headRow: {
            style: {
                border: 'none',
            },
        },
        headCells: {
            style: {
                color: '#202124',
                fontSize: '16px',
                fontWeight: 'bold'
            },
        },
        rows: {
            highlightOnHoverStyle: {
                backgroundColor: 'rgb(230, 244, 244)',
                borderBottomColor: '#FFFFFF',
                borderRadius: '25px',
                outline: '1px solid #FFFFFF',
            },
        }
    }
    const paginationComponentOptions = {
        rowsPerPageText: 'Relatórios por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };



    return (
        <div className="row">
            <div className="col-12">
                <DataTable
                    title="Relatórios Central"
                    columns={columns}
                    data={data}
                    highlightOnHover
                    pagination
                    fixedHeader
                    paginationComponentOptions={paginationComponentOptions}
                    customStyles={customStyles}
                    noDataComponent="Nenhum relatório encontrado"
                />
            </div>
            <Modal centered show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Editar relatório ID: {relMontado.id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12">
                            <form>
                                <div className="text-black text-bold">
                                    <img src="/img/icons/relatorios_icon.png" width="30" alt="Relatório" />
                                    Relatório de Treinamento de {relMontado.data}
                                </div>
                                <div className="row mt-3">
                                    <div className="col-4">
                                        Oficial Responsável:
                                    </div>
                                    <div className="col-8">
                                        <input type="text" className="form-control form-control-sm" value={relMontado.respNome} />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-2">
                                        Treinador:
                                    </div>
                                    <div className="col-5">
                                        <select className="custom-select rounded-0" id="exampleSelectRounded0" onChange={(e) => setTreinador({ nome: treinador.nome, patente: e.target.value })} required>
                                            {patentes.map((patente: any, i: number) => (<option key={i} value={patente.nome_sem_estrela} selected={(patente.nome_sem_estrela === relMontado.treiPatente ? true : false)}>{patente.nome_sem_estrela}</option>))}
                                        </select>
                                    </div>
                                    <div className="col-5">
                                        <input type="text" className="form-control form-control-sm" value={(!podeEditarTreino ? relMontado.treiNome : treinador.nome)} onChange={(e) => handlerTreinadorNome(e)} />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-3">
                                        Treinamento:
                                    </div>
                                    <div className="col-6">
                                        <select className="custom-select rounded-0" id="exampleSelectRounded0" onChange={(e) => setTreinamento({ nome: e.target.value, sala: treinamento.sala })} required>
                                            {treinos.map((treino: any, i: number) => (<option key={i} value={treino.nome} selected={(treino.nome === relMontado.treino ? true : false)}>{treino.nome}</option>))}
                                        </select>
                                    </div>
                                    <div className="col-3">
                                        <input type="text" className="form-control form-control-sm" value={(!podeEditarTreinamento ? relMontado.sala : treinamento.sala)} onChange={(e) => handlerSala(e)} />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label>Nome dos treinados:</label>
                                        <textarea className="form-control" onChange={(e) => setTreinados(e.target.value)} rows={3}>{(!treinados ? relMontado.inicioNomes : treinados)}</textarea>
                                    </div>

                                </div>

                                <div className="row mt-3">
                                    <div className="col-12 d-flex">
                                        <label>Às</label>&nbsp;
                                        <input type="text" style={{ width: "60px" }} className="form-control form-control-sm" value={(!podeEditarIni ? relMontado.horaInicio : fraseDeInicio.horaInicio)} onChange={(e) => handlerFraseIniHora(e)} />&nbsp;
                                        <label>o</label>  &nbsp; <input type="text" style={{ width: "200px" }} className="form-control form-control-sm" value={(!podeEditarTreinamentoIni ? relMontado.treino : fraseDeInicio.treinamento)} onChange={(e) => handlerTreiIni(e)} />&nbsp;
                                        <label style={{ fontSize: '13px' }}>iniciou, com</label>
                                        <input type="text" style={{ width: "60px" }} className="form-control form-control-sm" value={(!editarFimIni ? relMontado.inicioQtd : fraseDeInicio.fim)} onChange={(e) => handlerQtdFimIni(e)} />&nbsp;
                                        <input type="text" style={{ width: "80px" }} className="form-control form-control-sm" value={!editarPatTreinados ? relMontado.patentesTreinados : patenteTreinados} onChange={(e) => handlerPatTreinados(e)} />
                                    </div>

                                </div>

                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label>Reprovados:</label>
                                        <textarea className="form-control" onChange={(e) => setReprovados(e.target.value)} rows={3}>{relMontado.reprovados}</textarea>
                                    </div>

                                </div>

                                <div className="row mt-3">
                                    <div className="col-12 d-flex">
                                        <label>Às</label>&nbsp;
                                        <input type="text" style={{ width: "60px" }} className="form-control form-control-sm" value={(!podeEditarFim ? relMontado.horaFinal : fraseFinal.horaFinal)} onChange={(e) => handlerFraseFimHora(e)} />&nbsp;
                                        <label>o</label>  &nbsp; <input type="text" style={{ width: "200px" }} className="form-control form-control-sm" value={(!podeEditarTreinamentoFim ? relMontado.treino : fraseFinal.treinamento)} onChange={(e) => handlerTreiFim(e)} />&nbsp;
                                        <label style={{ fontSize: '13px' }}>teve seu fim, com</label>
                                        <input type="text" style={{ width: "60px" }} className="form-control form-control-sm" value={(!editarFim ? relMontado.fimQtd : fraseFinal.fim)} onChange={(e) => handlerQtdFim(e)} />&nbsp;
                                        <input type="text" style={{ width: "80px" }} className="form-control form-control-sm" value={!patenteTreinados ? relMontado.patentesTreinados : patenteTreinados} />
                                    </div>

                                </div>

                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label>Nome dos aprovados:</label>
                                        <textarea className="form-control" onChange={(e) => setAprovados(e.target.value)} rows={3}>{relMontado.aprovados}</textarea>
                                    </div>

                                </div>

                                <div className="row mt-3">
                                    <div className="col-12">
                                        <label>Observações:</label>
                                        <textarea className="form-control" onChange={(e) => setObservacoes(e.target.value)} rows={1}>{relMontado.observacoes}</textarea>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={() => enviarForm(relMontado)}>
                        Editar
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

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
                                    Relatório de Treinamento de {relMontado.data}
                                </div>
                                <div className="row mt-3">
                                    <div className="col-4">
                                        Oficial Responsável: {relMontado.respNome}
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="col-12">
                                        Treinador: {`${relMontado.treiPatente}, ${relMontado.treiNome}`}
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
                                        {relMontado.inicioNomes}
                                    </div>

                                </div>

                                <div className="row mt-3">
                                    <div className="col-12 d-flex">
                                        <label>Às {relMontado.horaInicio} o {relMontado.treino} iniciou, com {relMontado.inicioQtd} {relMontado.patentesTreinados}</label>&nbsp;
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
                                        <label>Às {relMontado.horaFinal} o {relMontado.treino} teve seu fim, com {relMontado.fimQtd} {relMontado.patentesTreinados}</label>&nbsp;
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

            <Modal centered show={showExcluir} onHide={handleCloseExcluir}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Excluir relatório ID: {relExcluirID}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12">
                            <h3>Você tem certeza que deseja apagar esse relatório?</h3>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handlerDelete}>
                        Sim
                    </Button>
                    <Button variant="success" onClick={handleCloseExcluir}>
                        Cancelar
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>


    )

}


export default RelatoriosOficiais