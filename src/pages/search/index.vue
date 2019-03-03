<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-wrapper">
      <view class="search-input">
        <icon type="search" size="16"></icon>
        <input type="text"
          placeholder="请输入想要的内容..."
          v-model="inputVal"
          @confirm="confirmInput"
         />
      </view>
      <button class="cancel" size="mini">取消</button>
    </view>
    <!-- 历史搜索标题 -->
    <view class="history-title">
      <view class="title-txt">历史搜索</view>
      <icon type="clear" size="14"></icon>
    </view>
    <!-- 搜索历史列表 -->
    <view class="list">
      <block v-for="(item,index) in historyList" :key="index">
        <view class="list-item">
          {{ item }}
        </view>
      </block>
    </view>
  </view>
</template>

<script>
export default {
  data(){
    return{
      inputVal: "",
      historyList: []
    }
  },
  onLoad(options){
    // this.keyword = options.keyword;
    this.inputVal = options.keyword;
  },
  methods: {
    confirmInput(){
      // 1. 把输入框的内容，添加到搜索历史数组中
      this.historyList.unshift(this.inputVal);

      // ES6 数组去重
      this.historyList = [...new Set(this.historyList)];

    }
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
    &-item{
        display: inline-block;
        padding:0 20rpx;
        line-height: 2;
        background:#eee;
        margin:10rpx;
    }
}
</style>
