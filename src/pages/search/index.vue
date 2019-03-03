<template>
  <view>
    <view class="search-wrapper">
      <view class="search-input">
        <icon type="search" size="16"></icon>
        <input type="text" :value="keyword" placeholder="请输入想要的内容..." />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data(){
    return{
      keyword:""
    }
  },
  onLoad(options){
    this.keyword = options.keyword;
  }
}
</script>

<style lang="scss">
.search-wrapper{
    background: #eee;
    padding:20rpx;
    display: flex;

    .search-input{
        background: #fff;
        display: flex;
        align-items: center;
        height: 60rpx;
        flex:1;

        icon{
            margin:0 10px;
        }

        input{
            flex:1;
            font-size: 14px;
            padding-right:20rpx;
        }
    }

    .cancel{
        width:160rpx;
        height:60rpx;
        padding:0;
        line-height: 58rpx;
        margin-left:20rpx;
    }
}

.history-title{
    padding:20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.list{
    padding:10rpx;
    span{
        display: inline-block;
        padding:0 20rpx;
        line-height: 2;
        background:#eee;
        margin:10rpx;
    }
}

</style>
