<template>
    <div>
      <!-- 3. 使用组件 -->
      <search></search>
      <view class="cate">
        <view class="cate-left">
          <block v-for="(item,index) in [1,2,3,4,5,5,6,6,6,6,6,6,6,1,6,6,6,6]" :key="index">
            <view class="cate-left-item">
              大家电{{index}}
            </view>
          </block>
        </view>
        <view class="cate-right">
          右边
        </view>
      </view>
    </div>
</template>

<script>
// 1. 导入
import Search from "@/components/search"
export default {
  components: {
    // 2. 注册
    Search
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
  }
  .cate-left-item{
    height: 100rpx;
    background-color: #f4f4f4;
  }
  .cate-right{
    flex: 1;
  }
</style>
