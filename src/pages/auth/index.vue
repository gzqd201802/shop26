<template>
  <view>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="onGotUserInfo">授权登录</button>
  </view>
</template>

<script>
import { getToken } from "@/api";
export default {
  methods: {
    //   点击获取用户信息
    onGotUserInfo(e) {
      // 获取用户关键信息，用于登录
      let { encryptedData, iv, rawData, signature } = e.mp.detail;
      // 调用 wx.login 获取 code，用于登录
      wx.login({
        // 获取成功的回调函数
        success: res => {
          if (res.code) {
            // 发起网络请求
            // 向后端服务器发送请求，换取 token
            getToken({
              code: res.code,
              encryptedData,
              iv,
              rawData,
              signature
            }).then(res => {
              // 换取成功后会返回 token
              let { token } = res.data.message;
              // 如果获取到 token 值，把 token 保存到本地
              if (token) {
                // 获取 token 保存到本地
                wx.setStorageSync("token", token);
                // 跳转返回上一页
                wx.navigateBack({
                  delta: 1
                });
              }else{
                console.log("token获取失败");
              }
            });
          } else {
            console.log("登录失败！" + res.errMsg);
          }
        }
      });
    }
  }
};
</script>

<style>
</style>
