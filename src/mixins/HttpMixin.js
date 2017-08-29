import wepy from 'wepy'
import {login} from './LoginMinx'

export default class LoginMixin extends wepy.mixin {

    async request(options) {
        if (!options.header) options.header = {}
        options.header['Authorization'] = wepy.getStorageSync('token')

        let response = await wepy.request(options)

        switch (response.statusCode) {
            case 401:
            case 403:
                login()
                return await this.request(options)
                break
            case 500:
                wepy.showModal({
                    title: '提示',
                    content: `服务器错误，请截图本提示，并联系slowrookie。${response.data.errmsg}`
                })
                break
            default:
                return response
                break
        }

    }

}