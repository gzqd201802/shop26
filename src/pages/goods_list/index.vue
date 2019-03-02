<template>
  <view>
    商品列表页 {{ keyword }}
  </view>
</template>

<script>
export default {
  data(){
    return{
      keyword:''
    }
  },
  onLoad(options){
    console.log("A页面加载onLoad",options);
    this.keyword = options.keyword;
  },
  onShow(){
    console.log("B页面加载onShow");
  },
  onReady(){
    console.log("C页面加载onReady");
  },
  onHide(){
    console.log("页面隐藏onHide");
  },
  onUnload(){
    console.log("页面卸载onUnload");
  }

}
</script>

<style>

</style>
