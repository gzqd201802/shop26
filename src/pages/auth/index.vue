<template>
  <view>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">授权登录</button>
  </view>
</template>

<script>
import {getToken} from "@/api";
export default {
  methods: {
//   点击获取用户信息
    onGotUserInfo(e) {
      // console.log(e);
      let { encryptedData, iv, rawData, signature } = e.mp.detail;
      console.log(encryptedData, iv, rawData, signature);
        wx.login({
            success(res) {
                if (res.code) {
                    // 发起网络请求
                    console.log(res.code);
                    // 向自己的服务器发送请求，换取 token
                    getToken({
                      code:res.code,
                      encryptedData,
                      iv,
                      rawData,
                      signature
                    }).then(res=>{
                      let {token} = res.data.message;
                      if(token){
                        // 获取token 保存到本地
                        wx.setStorageSync('token',token);
                        // 跳转返回上一页
                        wx.navigateBack({
                          delta: 1
                        })
                      }
                    });
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })

    }
  }
};
</script>

<style>
</style>
