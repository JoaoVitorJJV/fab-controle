import axios from 'axios';

async function getUser() {
    return localStorage.getItem('authToken')
}

const api = axios.create({
    baseURL: 'https://fab-controle-api.herokuapp.com/',
    headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use(
    async config => {
        const verifyToken = localStorage.getItem('authToken')
        var send = false

        if (!verifyToken) {

            send = true
        }

        if (!send) {
            return getUser()
                .then(token => {
                    if (token) {
                        if(config.headers){
                            config.headers.Authorization = token
                        }
                    }
                    return Promise.resolve(config)
                })
                .catch(error => {

                    console.log(error)
                    return Promise.resolve(config)
                })
        } else {
            if(config.headers){
                config.headers.Authorization = ''
            }
            
            return Promise.resolve(config)
        }
    },
    error => {
        return Promise.reject(JSON.stringify(error))
    },
)

export default api