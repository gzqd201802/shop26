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
          @input="inputHandle"
         />
      </view>
      <button class="cancel" size="mini" @tap="cancelInput" v-show="inputVal">取消</button>
    </view>
    <!-- 历史搜索标题 -->
    <view class="history-title">
      <view class="title-txt">历史搜索</view>
      <icon type="clear" size="14" @tap="clearHistroy"></icon>
    </view>
    <!-- 搜索历史列表 -->
    <view class="list">
      <block v-for="(item,index) in historyList" :key="index">
        <view class="list-item">
          {{ item }}
        </view>
      </block>
    </view>
    <!-- 搜索提示 -->
    <scroll-view scroll-y class="search-tips" v-show="inputVal">
      <block v-for="(item,index) in tips" :key="index">
        <view class="search-tips-item" v-if="index < 5 ">
          {{ item.goods_name }}
        </view>
      </block>
    </scroll-view>
  </view>
</template>

<script>
import {getTips} from "@/api";
export default {
  data(){
    return{
      inputVal: "",
      historyList: [],
      tips:[]
    }
  },
  onLoad(options){
    // this.keyword = options.keyword;
    this.inputVal = options.keyword;
  },
  onShow(){
      this.historyList = wx.getStorageSync('historyList') || [];
  },
  methods: {
    // 获取键盘输入事件
    inputHandle(){
      // console.log(this.inputVal);
      getTips({
        query:this.inputVal
      }).then(res=>{
        this.tips = res.data.message;
      })
    },
    //   清空搜索历史
    clearHistroy(){
        this.historyList = [];
        wx.removeStorageSync('historyList');
    },
    //   输入框点击完成
    confirmInput(){
      // 1. 把输入框的内容，添加到搜索历史数组中
      this.historyList.unshift(this.inputVal);
      // 2. ES6 数组去重
      this.historyList = [...new Set(this.historyList)];
        //   3. 把搜索历史存储到本地
        wx.setStorageSync('historyList', this.historyList);
        //  4. 跳转到商品列表页
        wx.navigateTo({ url: '/pages/goods_list/main?keyword='+ this.inputVal });
    },
    cancelInput(){
        this.inputVal = "";
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
.search-tips{
  position: fixed;
  left:0;
  right:0;
  top:98rpx;
  bottom:0;
  background-color: #eee;
    &-item{
      border-bottom:1rpx solid #ccc;
      padding: 20rpx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
}
</style>
