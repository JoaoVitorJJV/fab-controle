import { AuthContext } from "@app/contexts/Auth/AuthContext"
import { useApi } from "@app/hooks/useApi"
import { Player } from "@lottiefiles/react-lottie-player"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"


const MeuPerfil = () => {
    const [patente, setPatente] = useState('')
    const logged = useContext(AuthContext)
    const [infoPerfil, setInfoPerfil] = useState({ rel: '0', ultimaPromo: '' })
    const [opnioes, setOpnioes] = useState([])
    const [qtdPosts, setQtdPosts] = useState('')
    const [posts, setPosts] = useState([])
    const [objVazio, setObjVazio] = useState(false)
    const [loader, setLoader] = useState(false)
    const [recarregarDOOM, setRecarregarDOOM] = useState(false)
    const [recarregarPostsNov, setRecarregarPostsNov] = useState(false)

    const api = useApi()

    useEffect(() => {
        setLoader(true)
        const getPatentePerfil = async () => {
            const pat = await api.getPatNome(logged.user?.pat_id)

            if (pat.data.auth) {
                setPatente(pat.data.pat_nome_sem)
            }
        }

        const getInfoPerfil = async () => {
            const resul = await api.getPerfil(logged.user?.nickname)

            if (resul.data.auth) {
                const dataPromocao = new Date(resul.data.ultimoAlistamento)
                const dataFormatada = dataPromocao.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
                setRecarregarPostsNov(true)
             
                setInfoPerfil({ rel: resul.data.relatorios, ultimaPromo: dataFormatada })
                setOpnioes(resul.data.opnioes)
                setQtdPosts(resul.data.qtdPosts)
                setPosts(resul.data.dados)
                setLoader(false)
            }
        }
        getInfoPerfil()
        getPatentePerfil()
    }, [])

    const recarregarPosts = async () => {
        const response = await api.getAllPosts()

        if (response.data.dados) {
            if (!response.data.dados) {
                setObjVazio(true)
            }

            setPosts(response.data.dados)
        }
    }

    useEffect(() => {
        if (recarregarPostsNov) {

            recarregarPosts()
        }

    }, [recarregarDOOM])

    const refreshDoom = () => {
        setRecarregarDOOM(!recarregarDOOM)
    }


    const handleExcluir = async (id: any) => {
        const response = await api.destruirPost(logged.user?.id, id)

        if (response.data.auth) {
            toast.success(response.data.msg)
            refreshDoom()
        } else {
            setRecarregarDOOM(!recarregarDOOM)
            refreshDoom()
        }
    }

    const handleLike = async (id: any) => {
        const response = await api.createOrDestoyLike(id, logged.user?.id)

        if (response.data.auth) {
            setRecarregarDOOM(!recarregarDOOM)
        }
    }

    return (

        <div className="row">
            <div className="col-md-3">


                <div className="card card-primary card-outline">
                    <div className="card-body box-profile">
                        <div className="text-center">
                            <div className="card darken-3" title="diogo_mello" style={{ width: "50px", height: "50px", background: `url(https://www.habbo.com.br/habbo-imaging/avatarimage?user=${logged.user?.nickname}&action=std&direction=3&head_direction=3&gesture=sml&size=m&gesture=spk) no-repeat -8px -15px`, borderRadius: "50px", marginLeft: "-12px", marginBottom: "-7px", marginRight: '5px', display: "inline-block", float: "left" }}></div>
                        </div>

                        <h3 className="profile-username text-center">{logged.user?.nickname}</h3>

                        <p className="text-muted text-center">{patente}</p>

                        <ul className="list-group list-group-unbordered mb-3">
                            <li className="list-group-item">
                                <b>Relatórios criados</b> <a href="#" className="float-right">
                                    {infoPerfil &&

                                        infoPerfil.rel
                                    }
                                </a>
                            </li>
                            <li className="list-group-item">
                                <b>Posts no fórum</b> <a href="#" className="float-right">{qtdPosts}</a>
                            </li>
                            <li className="list-group-item">
                                <b>Última promoção</b> <a href="#" className="float-right">
                                    {infoPerfil &&

                                        infoPerfil.ultimaPromo
                                    }
                                </a>
                            </li>
                        </ul>

                        <a href="#" className="btn btn-primary btn-block"><b>Ver perfil no site</b></a>
                    </div>

                </div>



                <div className="card card-primary">
                    <div className="card-header">
                        <h3 className="card-title">Opnião dos Oficiais</h3>
                    </div>

                    <div className="card-body">

                        {opnioes.length > 0 &&

                            <>
                                {opnioes.map((opniao: any) => (
                                    <div className="opnioes">
                                        <div className="d-flex align-items-center">
                                            <div className="card darken-3" style={{ width: "50px", height: "50px", background: `url(https://www.habbo.com.br/habbo-imaging/avatarimage?user=${opniao.nome_oficial}&action=std&direction=3&head_direction=3&gesture=sml&size=m&gesture=spk) no-repeat -8px -15px, url(https://exbrhbofc.net/arquivos/2021/02/loading_character.png) no-repeat -8px -15px`, borderRadius: "50px", marginLeft: "-12px", marginBottom: "-7px", marginRight: '5px', display: "inline-block", float: "left" }}></div>
                                            &nbsp;&nbsp;
                                            <strong>{opniao.nome_oficial}</strong>
                                        </div>


                                        <p className="text-muted mt-2">
                                            {opniao.texto}
                                        </p>

                                        <hr />
                                    </div>
                                ))}
                            </>
                        }

                        {opnioes.length === 0 &&
                            <h5 className="text-muted">Esse usuário não possui opniões de oficiais</h5>
                        }

                    </div>

                </div>

            </div>

            <div className="col-md-9">
                <div className="card">
                    <div className="card-header p-2">
                        Últimos posts no fórum
                    </div>
                    <div className="card-body">
                        <div className="col-12">
                            {loader &&
                                <Player
                                    autoplay
                                    loop
                                    src="https://assets2.lottiefiles.com/packages/lf20_iilq3soe.json"
                                    style={{ width: '120px' }}
                                >      </Player>
                            }

                            {!loader && !objVazio &&

                                <>

                                    {posts.map((post: any) => {

                                        var hora = new Date(post.datetime)
                                        var horaFormada = hora.toLocaleTimeString('pt-BR', { hour: 'numeric', minute: '2-digit', hourCycle: "h24" })

                                        var verBtnExcluir = false

                                        if (logged.user)
                                            if (post.nome_usuario === logged.user?.nickname || logged.user?.pat_id > 9) {
                                                verBtnExcluir = true
                                            }

                                        return (
                                            <div key={post.id} className="card card-widget">
                                                <div className="card-header">
                                                    <div className="user-block">
                                                        <div className="card darken-3" title="diogo_mello" style={{ width: "50px", height: "50px", background: `url(https://www.habbo.com.br/habbo-imaging/avatarimage?user=${post.nome_usuario}&action=std&direction=2&head_direction=2&gesture=sml&size=m&gesture=spk) no-repeat -8px -15px`, borderRadius: "50px", marginLeft: "-12px", marginBottom: "-7px", marginRight: '5px', display: "inline-block", float: "left" }}></div>
                                                        <span className="username"><a href="#">{post.nome_usuario}</a></span>
                                                        <span className="description">{post.patente} - às {horaFormada}</span>
                                                    </div>
                                                </div>

                                                <div className="card-body">

                                                    <p>{post.texto}</p>
                                                    {verBtnExcluir && <button type="button" onClick={() => handleExcluir(post.id)} className="btn btn-danger btn-sm"><i className="fas fa-trash"></i> Excluir publicação</button>}
                                                    &nbsp;&nbsp;
                                                    <button type="button" onClick={() => handleLike(post.id)} className="btn btn-default btn-sm"><i className="far fa-thumbs-up"></i> Like</button>
                                                    <span className="float-right text-muted">{post.likes} like{(post.likes > 0 || post.likes === 0 ? 's' : '')} - {post.comentariosQTD} comentário{(post.comentariosQTD > 0 || post.comentariosQTD === 0 ? 's' : '')}</span>
                                                </div>
                                                                                                

                                            </div>
                                        )
                                    })}

                                </>

                            }
                        </div>

                        
                    </div>
                    {/*  */}
                </div>
                {/* */}
            </div>
        </div>
    )
}

export default MeuPerfil