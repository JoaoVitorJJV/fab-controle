import { AuthContext } from "@app/contexts/Auth/AuthContext"
import { useApi } from "@app/hooks/useApi"
import { Player } from "@lottiefiles/react-lottie-player"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

const Praca = () => {
    const logged = useContext(AuthContext)
    const [posts, setPosts] = useState<any>([])
    const [loaderPosts, setLoaderPosts] = useState<Boolean>(false)
    const [txtPost, setTxtPost] = useState('')
    const [objVazio, setObjVazio] = useState(false)
    const [loader, setLoader] = useState(false)
    const [recarregarPostsNov, setRecarregarPosts] = useState(false)
    const [recarregarDOOM, setRecarregarDOOM] = useState(false)
    const [comentario, setComentario] = useState('')
    const api = useApi()


    useEffect(() => {
        const getAllPostss = async () => {
            setLoaderPosts(true)
            const response = await api.getAllPosts()

            if (response.data.auth) {
                setLoaderPosts(false)
                setRecarregarPosts(true)
                if (!response.data.dados) {
                    setObjVazio(true)
                }
                setPosts(response.data.dados)

            }


        }

        getAllPostss()
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

    const handleSubmitForm = async () => {
        setLoader(true)

        if (txtPost) {
            const res = await api.createPost(logged.user?.id, txtPost)

            if (res.data.auth) {
                setLoader(false)
                setRecarregarDOOM(!recarregarDOOM)

            } else {
                setLoader(false)
            }


        }
    }

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

    const handleComentarios = async (key: string, id: number) => {
        if (key === "Enter") {
            if (comentario) {
                const res = await api.createComentarios(logged.user?.id, id, comentario)

                if (res.data.auth) {
                    refreshDoom()
                    setComentario('')
                }
            }

        }
    }
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card card-widget">
                        <div className="card-header">
                            <div className="user-block">
                                <img src="https://2.bp.blogspot.com/-ad4TszfrO90/XK0oYh_d2-I/AAAAAAABOsg/otAengL86qI4i-yopQIdqosI8G6rgq8kgCKgBGAs/s1600/Image%2B1418.png" alt="" />
                                <span className="username"><a href="#">Escreva uma publicação</a></span>
                                {!loaderPosts &&
                                    <span className="description">{(posts.length > 0 ? `Última pulicação por ${(posts[0].nome_usuario)} - às ${(new Date(posts[0].datetime).toLocaleString('pt-BR', { hour: 'numeric', minute: '2-digit' }))}` : 'Sem publicações')}</span>
                                }

                            </div>
                        </div>

                        <div className="card-body">
                            <form action="#" method="post">
                                <div className="img-push d-flex align-items-center" >
                                    <div className="card darken-3" title="diogo_mello" style={{ width: "55px", height: "55px", background: `url(https://www.habbo.com.br/habbo-imaging/avatarimage?user=${logged.user?.nickname}&action=std&direction=2&head_direction=2&gesture=sml&size=m&gesture=sml) no-repeat -8px -15px`, borderRadius: "50px", marginLeft: "-12px", marginRight: '5px', display: "inline-block", float: "left" }}></div>

                                    <textarea className="form-control form-control-sm" onChange={(e) => setTxtPost(e.target.value)} placeholder="No que você está pensando?" rows={2}></textarea>
                                </div>
                            </form>

                        </div>


                        <div className="card-footer ">

                            <button type="button" disabled={(loader ? true : false)} onClick={() => handleSubmitForm()} className="btn btn-block bg-gradient-success">Postar</button>
                        </div>

                    </div>

                </div>
            </div>
            <div className="row">
                <div className="col-12">

                    {loaderPosts &&
                        <Player
                            autoplay
                            loop
                            src="https://assets2.lottiefiles.com/packages/lf20_iilq3soe.json"
                            style={{ width: '120px' }}
                        >      </Player>
                    }



                    {!loaderPosts && !objVazio &&

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

                                        <div className="card-footer card-comments">
                                            {post.comentarios.length > 0 &&

                                                <>

                                                    {post.comentarios.map((comentario: any) => {

                                                        var hora = new Date(comentario.datetime)

                                                        var horaFormatada = hora.toLocaleTimeString('pt-BR', {hour: 'numeric', minute: '2-digit'})
                                                        return (
                                                            <div className="card-comment">

                                                                <div className="card darken-3" title="diogo_mello" style={{ width: "50px", height: "50px", background: `url(https://www.habbo.com.br/habbo-imaging/avatarimage?user=${comentario.nome_usuario}&action=std&direction=2&head_direction=2&gesture=sml&size=m&gesture=spk) no-repeat -8px -15px`, borderRadius: "50px", marginLeft: "-12px", marginRight: '5px', marginTop: "-5px", display: "inline-block", float: "left" }}></div>
                                                                <div className="comment-text">
                                                                    <span className="username">
                                                                        {comentario.nome_usuario}
                                                                        <span className="text-muted float-right">às {horaFormatada}</span>
                                                                    </span>
                                                                    {comentario.texto}
                                                                </div>

                                                            </div>
                                                        )
                                                    })}
                                                </>
                                            }




                                        </div>

                                        <div className="card-footer ">

                                            <div className="img-push d-flex align-items-center" >
                                                <div className="card darken-3" title="diogo_mello" style={{ width: "55px", height: "55px", background: `url(https://www.habbo.com.br/habbo-imaging/avatarimage?user=${logged.user?.nickname}&action=std&direction=2&head_direction=2&gesture=sml&size=m&gesture=sml) no-repeat -8px -15px`, borderRadius: "50px", marginLeft: "-12px", marginRight: '5px', display: "inline-block", float: "left" }}></div>
                                                <input type="text" className="form-control form-control-sm" onChange={(e) => setComentario(e.target.value)} onKeyDown={(e) => handleComentarios(e.key, post.id)} placeholder="Comente sobre essa publicação.." />
                                            </div>

                                        </div>

                                    </div>
                                )
                            })}

                        </>

                    }


                </div>
            </div>
        </>
    )
}

export default Praca