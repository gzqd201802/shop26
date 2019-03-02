<template>
  <view class="search">
    <view class="search-in">
      <icon type="search" size="16"> </icon>
      <text>搜索</text>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style>
.search{
    background-color: #eb4450;
    padding: 20rpx;
  }

  .search-in{
    height: 60rpx;
    border-radius:10rpx;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color:#666;
    font-size:30rpx;
  }
  .search-in icon{
      margin-right: 10rpx;
  }
</style>
