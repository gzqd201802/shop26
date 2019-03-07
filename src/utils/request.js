// 封装请求方法

function request(url, method = "GET", data = {}, header = {}) {
  // Promise 构造函数创建的对象，可以直接 then 运行回调函数
  // resolve 就是 then 运行的回调函数
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header,
      success: res => {
        resolve(res);
      },
      fail: res => {
        reject(res);
      }
    });
  });
}

request.baseURL = "https://autumnfish.cn/wx/api/public/v1/";

request.get = (url, data) => {
  return request(request.baseURL + url, "GET", data);
};

request.post = (url, data) => {
  return request(request.baseURL + url, "POST", data);
};

// 封装授权接口
request.auth = (url, data) => {
  // 获取本地的token值
  let token = wx.getStorageSync("token");
  if (token) {
    return request(request.baseURL + url, "POST", data, {
      Authorization: token
    });
  } else {
    // 如果没有 token 就跳转到授权页
    wx.navigateTo({ url: "/pages/auth/main" });
    // 返回一个空 Promise 对象，防止在回调函数中报错
    return new Promise(() => {});
  }
};

// 封装授权接口
request.auth.get = (url, data) => {
  // 获取本地的token值
  let token = wx.getStorageSync("token");
  if (token) {
    return request(request.baseURL + url, "GET", data, {
      Authorization: token
    });
  } else {
    // 如果没有 token 就跳转到授权页
    wx.navigateTo({ url: "/pages/auth/main" });
    // 返回一个空 Promise 对象，防止在回调函数中报错
    return new Promise(() => {});
  }
};

// 导出，暴露 request 函数
// 如果导出的是 export default 命令，
// 导入的使用用 import request fprm "路径";
export default request;
