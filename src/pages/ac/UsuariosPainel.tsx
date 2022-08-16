import { AuthContext } from "@app/contexts/Auth/AuthContext"
import { useApi } from "@app/hooks/useApi"
import { customStyles } from "@app/styles/datatable"
import { useContext, useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import DataTable from "react-data-table-component"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


const UsuariosPainel = () => {
    const [colunas, setColunas] = useState<any>([])
    const [dados, setDados] = useState([])
    const [atualizarDOOM, setAtualizarDOOM] = useState(false)
    const [showExcluir, setShowExcluir] = useState(false)
    const [usuarioExcluir, setUsuarioExcluir] = useState<any>('')

    const api = useApi()
    const navigation = useNavigate()
    const logged = useContext(AuthContext)

    const editarUsuarioScreean = (nome: string) => {
        navigation(`/oficiais/ac/editar-usuario/${nome}`)

    }

    const handleDelete = async (usuario: string) => {
        const res = await api.deleteUsuario(usuario)

        if(res.data.auth){
            toast.success(res.data.msg)
            setAtualizarDOOM(!atualizarDOOM)
            handleCloseExcluir()
        }else{
            toast.error(res.data.msg)
        }
    }

    const handleCloseExcluir = () => setShowExcluir(false)

    const handleShowExcluir = (usuario: String) => {
        setUsuarioExcluir(usuario)
        setShowExcluir(true)
    }

    const bloquearUsuario = async (nome: string) => {
        const result = await api.bloquearUsuario(nome, logged.user?.id)

        if (result.data.auth) {
            toast.success(result.data.msg)
            setAtualizarDOOM(!atualizarDOOM)
        } else {
            toast.error(result.data.msg)
        }

    }

    useEffect(() => {
        const getUsuariosAc = async () => {
            const response = await api.getUsuarios()
            if (response.data.auth && response.data.usuarios.length > 0) {
                const res = response.data.usuarios
                var podeExcluir = false
                var arrayDados: any = []
                if(logged.user?.nickname === 'Alberto-Dumont'){
                    podeExcluir = true
                }

                res.map((usuario: any, i: number) => {
                    var imgURL = `https://www.habbo.com.br/habbo-imaging/avatarimage?img_format=png&user=${usuario.nome}&direction=3&head_direction=3&size=m&headonly=1`
                    arrayDados[i] = {
                        id: i,
                        userImage: <img src={imgURL} alt="user" />,
                        nome: usuario.nome,
                        patente: usuario.patente,
                        acoes:
                            <div>
                                <button type="button" onClick={() => bloquearUsuario(usuario.nome)} title={(usuario.status === 0 ? 'Desativar painel' : 'Ativar painel')} className={(usuario.status === 0 ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-success')}><i className={(usuario.status === 0 ? 'fa fa-lock' : 'fa fa-unlock')}></i></button>&nbsp;
                                <button type="button" title="Editar" onClick={() => editarUsuarioScreean(usuario.nome)} className="btn btn-sm btn-warning"><i className="fa fa-pen"></i></button>&nbsp;
                                {podeExcluir ? (<button type="button" title="Apagar" onClick={() => handleShowExcluir(usuario.nome)} className='btn btn-sm btn-danger'><i className="fa fa-trash"></i></button>) : ''}
                                
                            </div>

                    }
                })

                setDados(arrayDados)

                const colunas = [
                    {
                        selector: (row: { userImage: any }) => row.userImage,
                        width: '80px', // custom width for icon button
                        style: {
                            borderBottom: '1px solid #FFFFFF',
                            marginBottom: '-1px',
                        },
                    },
                    {
                        id: 'nome',
                        name: 'Nome',
                        selector: (row: { nome: any; }) => row.nome,
                        sortable: true,
                        left: true,
                        reorder: true,
                        style: {
                            fontWeight: 'bold'
                        }
                    },
                    {
                        id: 'patente',
                        name: 'Patente',
                        selector: (row: { patente: any; }) => row.patente,
                        sortable: true,
                        left: true,
                        reorder: true,
                    },
                    {
                        id: 'acoes',
                        name: 'Ações',
                        selector: (row: { acoes: any; }) => row.acoes,
                        sortable: true,
                        left: true,
                        reorder: true,
                    },
                ];

                setColunas(colunas)
            }

        }

        getUsuariosAc()

    }, [atualizarDOOM])

    const paginationComponentOptions = {
        rowsPerPageText: 'Usuários por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    return (
        <div className="row">
            <div className="col-12">
                <DataTable
                    title="Usuários"
                    columns={colunas}
                    data={dados}
                    highlightOnHover
                    pagination
                    fixedHeader
                    paginationComponentOptions={paginationComponentOptions}
                    customStyles={customStyles}
                    noDataComponent="Nenhum registro encontrado"
                />
            </div>

            <Modal centered show={showExcluir} onHide={handleCloseExcluir}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Excluir o usuário: {usuarioExcluir}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12">
                            <h3>Você tem certeza que deseja excluir esse usuário? Essa ação é IRREVERSÍVEL.</h3>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => handleDelete(usuarioExcluir)}>
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


export default UsuariosPainel