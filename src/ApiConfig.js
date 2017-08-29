// 'development' or 'production'
const env = 'production'

// development and production host
const hosts = {
    development: 'http://localhost:8000',
    production: ''
}

// apis
const api = {
    user: {
        login: { method: 'POST', url: '/wechat/login' }
    }
}

module.exports = {
    env,
    api: disposeUrl(api, hosts[env])
}

function disposeUrl(obj, prefix) {
    Object.keys(obj).forEach(v => {
        if (obj[v].url) {
            obj[v].url = prefix + obj[v].url
        } else {
            obj[v] = disposeUrl(obj[v], prefix)
        }
    })
    return obj
}