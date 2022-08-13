import api from "@app/services/api";

export const useApi= () => ({
    validateToken: async (token: string) => {
        const response = await api.post('/validate', {token})

        return response.data
    },
    valiteee: async (token: string) => {
        const response = await api.post('/validateToken2', {token})

        return response.data
    },

    validateJWT: async () => {
        const response = await api.post('/validateJWT')

        return response
    },
    signin: async (nick: string, password: string) => {
        const response = await api.post('/login', {
            nome: nick,
            senha: password
        })

        return response.data
    },
    logout: async (user: any, token: any) => {
        const response = await api.post('/signout', {user, token})

        return response
    },
    changeSenha: async (novaSenha: string, senhaAntiga: string) => {
        const response = await api.post('/alterar-senha', {
            novaSenha,
            senhaAntiga
        })

        return response
    },
    getRegistro: async (user: any) => {
        const response = await api.get(`/alistados/registro?nome=${user}`)
        return response
    },

    getPatNome: async (id: any) => {
        const response = await api.get(`/alistados/patente?pat_id=${id}`)
        return response
    },
    getPatentes: async (ex: any, pat: any) => {
        const response = await api.get(`/patentes?ex=${ex}&pat=${pat}`)

        return response
    },
    getUsuariosEPatentes: async () => {
        const response = await api.get('/fab/usuarios-e-patentes')

        return response
    },
    setAlistados: async (alistado: string, patente: string, status: string, oficial: any) => {
        const response = await api.post('/inserir-alistado', {
            nome: alistado,
            pat: patente,
            ofc: oficial,
            status    
        })

        return response
    },
    getAlistados: async () => {
        const response = await api.get('/alistados')

        return response
    },
    getAllRelatorios: async () => {
        const response = await api.get('/fab/relatorios')
        return response
    },
    createUsuario: async (nickname: string, senha: string, pat: any, usuario_id: number, tipo: any) => {
        const response = await api.post('/oficiais/ac/criar-usuario', {
            nickname,
            senha,
            pat,
            usuario_id,
            tipo
        })

        return response
    },
    getLogs: async () => {
        const response = await api.get('/logs')

        return response
    },
    getUsuarios: async () => {
        const response = await api.get('/usuarios')

        return response
    },
    getUsuarioNome: async (nome: any) => {
        const response = await api.get(`/usuario/editar?nome=${nome}`)

        return response
    },
    updateUsuario: async (nome: string, pat: any, senha: string, patUsuario: any, nomeUsuario: any) => {
        const response = await api.post('/editar-usuario', {
            nome,
            pat,
            senha,
            patUsuario,
            nomeUsuario
        })

        return response
    },
    bloquearUsuario: async (nome: any, usuarioID: any) => {
        const response = await api.post('/bloquear', {
            nome,
            usuarioID
        })

        return response
    },
    getPatentesPraca: async () => {
        const response = await api.get('/patentes-praca')

        return response
    },
    getTodasPatentes: async () => {
        const response = await api.get('/patentes/todas')

        return response
    },
    getTreinamentos: async() => {
        const response = await api.get('/treinos')

        return response
    },
    createRel: async (dados:any) => {
        const response = await api.post('/fazer-relatorio', {
            dados
        })

        return response
    },
    editarRelatorio: async (dados: any) => {
        const response = await api.post('/editar-relatorio', {
            dados
        })

        return response
    },
    deleteRel: async (id: any, idUser:any) => {
        const response = await api.post('/exluir-relatorio', {
            id,
            idUser
        })

        return response
    },
    getAllRelatorioUsuario: async (userID: any) => {
        const response = await api.get(`/relatorio/usuario?userID=${userID}`)

        return response
    },
    getPerfil: async (nome: any) => {
        const response = await api.get(`/usuario?nome=${nome}`)

        return response
    },
    setOpniao: async (oficial: any, nomeUsuario: string, opniao: string) => {
        const response = await api.post('/opniao', {
            oficial, 
            nomeUsuario,
            opniao
        })

        return response
    },
    getMetas: async () => {
        const response = await api.get('/metas')

        return response
    },
    createDestaqueSite: async (nome: string, nomeOficial: any, datetime: string, tipo: string, texto: string) => {
        const response = await api.post('/definir-destaques', {
            nomePraca: nome, 
            nomeOficial,
            datetime,
            tipo,
            texto
        })

        return response
    },
    editDestaque: async (id: any, nome: string, nomeOficial: any, datetime: string, tipo: string, texto: string) => {
        const response = await api.post('/editar-destaques', {
            id,
            nomePraca: nome, 
            nomeOficial,
            datetime,
            tipo,
            texto
        })

        return response
    },
    getDestaques: async () => {
        const response = await api.get('/destaques')

        return response
    },
    getDestaqueNome: async (nome: any) => {
        const response = await api.get(`/destaque?nome=${nome}`)

        return response
    },
    createPost: async (idUser: any, txt: string) => {
        const response = await api.post('/posts/criar', {
            idUser,
            txt
        })

        return response
    },
    destruirPost: async (idUser: any, postID: any) => {
        const response = await api.post('/posts/excluir', {
            idUser,
            postID
        })

        return response
    },
    getAllPosts: async () => {
        const response = await api.get('/posts')

        return response
    },
    getPostUser: async (idUser: any) => {
        const response = await api.get(`/post?idUser=${idUser}`)

        return response
    },
    createOrDestoyLike: async(idPost: any, idUsuario: any) => {
        const response = await api.get(`/posts/like?idPost=${idPost}&idUsuario=${idUsuario}`)

        return response
    },
    getAllLikesPerPost: async (idPost: any) => {
        const response = await api.get(`/posts/likes?idPost=${idPost}`)

        return response
    },
    createComentarios: async (idUser: any, idPost: any, txt: any) => {
        const response = await api.post('/post/comentar', {
            idUser,
            idPost, 
            txt
        })

        return response
    },
    createAviso: async (nome: string, txt: string, tipo: string) => {
        const response = await api.post('/criar-aviso', {
            nome, 
            txt, 
            tipo
        })

        return response
    },
    getAvisos: async () => {
        const response = await api.get('/avisos')

        return response
    },
    getAvisoId: async (id: any) => {
        const response = await api.get(`/aviso?id=${id}`)

        return response
    },
    editAviso: async (id: any, nome: string, txt: string, tipo: string) => {
        const response = await api.post('/editar-aviso', {
            id,
            nome,
            txt, 
            tipo
        })

        return response
    },
    getSiglas: async () => {
        const response = await api.get('/siglas')

        return response
    },
    setSigla: async (nome: string, sigla: string) => {
        const response = await api.post('/siglas/inserir', {
            nome, sigla
        })

        return response
    },
    destroySigla: async (nome: string, sigla: string) => {
        const response = await api.post('/siglas/remover', {
            nome, sigla
        })

        return response
    },
    aceitarRel: async (idRel: any) => {
        const response = await api.post('/central/aceitar', {
            idRel
        })

        return response
    }
})