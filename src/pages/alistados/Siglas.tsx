import { AuthContext } from "@app/contexts/Auth/AuthContext";
import { useApi } from "@app/hooks/useApi";
import React, { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Player } from '@lottiefiles/react-lottie-player';
import { PatentesType } from "@app/types/Patentes";


const Siglas = () => {
    const logged = useContext(AuthContext)
    const [alistado, setAlistado] = useState('')
    const [loading, setLoading] = useState(false)
    const [siglas, setSigla] = useState<any>([])
    const [novaSigla, setNovaSigla] = useState('')
    const [removerSigla, setRemoverSigla] = useState('Nenhuma')

    const api = useApi()


    useEffect(() => {
       
        const getSiglas = async () => {
            const res = await api.getSiglas()

            setSigla(res.data.siglas)
        }
        getSiglas()
    }, [])

    const submitForm = async () => {
       
        if (alistado) {
            setLoading(true)
            const res = await api.setSigla(alistado, (novaSigla ? novaSigla : siglas[0].id))
            if (res.data.auth) {
                toast.success(res.data.msg)
                setLoading(false)
            } else {
                toast.error(res.data.msg)
                setLoading(false)
            }
        }else{
            toast.error('Os campos precisam estar preenchidos!')
        }
    }

    const submitFormDestroy = async () => {
       
        if (alistado && removerSigla !== 'Nenhuma') {
            setLoading(true)
            const res = await api.destroySigla(alistado, removerSigla)
            if (res.data.auth) {
                toast.success(res.data.msg)
                setLoading(false)
            } else {
                toast.error(res.data.msg)
                setLoading(false)
            }
        }else{
            toast.error('Os campos precisam estar preenchidos!')
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-12">

                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Atribuir Siglas</h3>
                        </div>
                        <form onClick={(e) => e.preventDefault()}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Nickname dos alistados</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" onChange={(e) => setAlistado(e.target.value)} required />
                                </div>                               
                                <div className="form-group">
                                    <label htmlFor="exampleInputFile">Sigla</label>
                                    <select className="custom-select" onChange={(e) => setNovaSigla(e.target.value)} required>                                      
                                        {siglas.map((sigla: any) => (<option key={(sigla.id + 1)} value={sigla.id}>{sigla.nome}</option>))}
                                    </select>
                                </div>                               
                            </div>

                            <div className="card-footer">
                                <button type="button" disabled={(loading ? true : false)} onClick={() => submitForm()} className="btn btn-primary d-flex">Salvar

                                </button>
                            </div>

                        </form>

                    </div>

                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Remover Sigla</h3>
                        </div>
                        <form onClick={(e) => e.preventDefault()}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Nickname dos alistados</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" onChange={(e) => setAlistado(e.target.value)} required />
                                </div>                               
                                <div className="form-group">
                                    <label htmlFor="exampleInputFile">Sigla</label>
                                    <select className="custom-select" onChange={(e) => setRemoverSigla(e.target.value)} required>   
                                        <option>Nenhuma</option>                                  
                                        {siglas.map((sigla: any) => (<option key={(sigla.id + 1)} value={sigla.id}>{sigla.nome}</option>))}
                                    </select>
                                </div>                               
                            </div>

                            <div className="card-footer">
                                <button type="button" disabled={(loading ? true : false)} onClick={() => submitFormDestroy()} className="btn btn-primary d-flex">Salvar

                                </button>
                            </div>

                        </form>

                    </div>
                    {loading &&
                        <Player
                            autoplay
                            loop
                            src="https://assets2.lottiefiles.com/packages/lf20_ht6o1bdu.json"
                            style={{ width: '120px' }}
                        >

                        </Player>
                    }

                </div>
            </div>
        </>
    )
}

export default Siglas

