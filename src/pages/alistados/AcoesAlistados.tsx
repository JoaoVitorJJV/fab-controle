import { AuthContext } from "@app/contexts/Auth/AuthContext";
import { useApi } from "@app/hooks/useApi";
import React, { useContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { Player } from '@lottiefiles/react-lottie-player';
import { PatentesType } from "@app/types/Patentes";


const AcoesAlistados = () => {
    const logged = useContext(AuthContext)
    const [patentes, setPatentes] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [alistado, setAlistado] = useState('')
    const [ofcResp, setOfcResp] = useState(logged.user?.nickname)
    const [pat, setPat] = useState('1')
    const [status, setStatus] = useState('Ativo')
    const [loading, setLoading] = useState(false)

    const api = useApi()


    useEffect(() => {
        const getPatentes = async () => {
            const res = await api.getPatentes('fab', logged.user?.pat_id)
            setPatentes(res.data.patentes)
        }

        const getUsuarios = async () => {
            const res = await api.getUsuariosEPatentes()

            setUsuarios(res.data.usuarioPat)
        }
        getPatentes()
        getUsuarios()
    }, [])

    const submitForm = async () => {
        setLoading(true)
        if (alistado) {
            const res = await api.setAlistados(alistado, pat, status, ofcResp)
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
                            <h3 className="card-title">Alistados</h3>
                        </div>
                        <form onClick={(e) => e.preventDefault()}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Nickname dos alistados</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1" onChange={(e) => setAlistado(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Oficial responsável</label>
                                    <select className="custom-select" onChange={(e) => setOfcResp(e.target.value)} required>
                                        {usuarios.map((usuario: any, i: number) => (<option key={i} value={usuario.nome} selected={(usuario.nome === logged.user?.nickname ? true : false)}>{usuario.oficial}</option>))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputFile">Patente</label>
                                    <select className="custom-select" onChange={(e) => setPat(e.target.value)} required>
                                        {patentes.map((patente: PatentesType) => (<option key={patente.id} value={patente.id}>{patente.pat_nome}</option>))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputFile">Status</label>
                                    <select className="custom-select" onChange={(e) => setStatus(e.target.value)} required>
                                        <option selected value="Ativo">Ativo</option>
                                        <option value="Demitido - Auto-Demissão">Demitido - Auto-Demissão</option>
                                        <option value="Demitido - Traição">Demitido - Traição</option>
                                        <option value="Demitido - Mau Comportamento">Demitido - Mau Comportamento</option>
                                        <option value="Demitido - Sem volta">Demitido - Sem volta</option>
                                        <option value="Afastado">Afastado</option>
                                        <option value="Aposentado">Aposentado</option>
                                    </select>
                                </div>
                                <label>Em caso de demissão, não se esqueça de fornecer a patente correta do Militar.</label>
                            </div>

                            <div className="card-footer">
                                <button type="button" disabled={(loading ? true : false)} onClick={() => submitForm()} className="btn btn-primary d-flex">Salvar

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

export default AcoesAlistados

