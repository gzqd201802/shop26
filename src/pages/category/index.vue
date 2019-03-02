<template>
    <div>
      <!-- 3. 使用组件 -->
      <search></search>
      <view class="cate">
        <scroll-view scroll-y class="cate-left">
          <block v-for="(item,index) in cateList" :key="index">
            <view class="cate-left-item">
              {{ item.cat_name }}
            </view>
          </block>
        </scroll-view>
        <view class="cate-right">
          右边
        </view>
      </view>
    </div>
</template>

<script>
// 1. 导入
import Search from "@/components/search";
import { getCateList } from "@/api";
export default {
  data(){
    return{
      cateList: []
    }
  },
  components: {
    // 2. 注册
    Search
  },
  mounted () {
    getCateList().then(res=>{
      this.cateList = res.data.message;
    })
  }
}
</script>

<style>
  .cate{
    display: flex;
    background-color: pink;
    /* 定位盒子拉伸 */
    position: fixed;
    left: 0;
    right: 0;
    top:98rpx;
    bottom:0;

  }

  .cate-left{
    width: 200rpx;
    height: 100%;
    /* overflow-y:auto; */
  }
  .cate-left-item{
    line-height: 100rpx;
    text-align: center;
    background-color: #f4f4f4;
  }
  .cate-right{
    flex: 1;
  }
</style>
