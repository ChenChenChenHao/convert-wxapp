import wepy from 'wepy'
import { api } from '../ApiConfig'

export default class LoginMixin extends wepy.mixin {

    async login() {
        // 登录code
        let loginData = await wepy.login()
        // 用户信息
        let userInfo = await wepy.getUserInfo()

        console.log(loginData)
        console.log(userInfo)

        try {
            token = await wepy.request({
                url: api.user.login.url,
                method: api.user.login.method,
                dataType: 'application/json',
                data: {
                    code: loginData.code,
                    encryptedData: userInfo.encryptedData,
                    iv: userInfo.iv,
                    rawData: userInfo.rawData
                }
            })

            await wepy.setStorage({
                key: 'token',
                data: token
            })
        } catch (e) {
            wepy.showModal({
                title: '提示',
                content: `获取用户信息失败，请关闭重新进入。${e.message}`
            })
        }

    }

}