<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-wrapper" @tap="gotoSearch">
      <view class="search-input">
        <icon type="search" size="16"></icon> {{ keyword }}
      </view>
    </view>
    <!-- Tab栏 -->
    <view class="tab">
      <block v-for="(item,index) in tabs" :key="index">
        <div class="tab-item" :class="{ active : index == tabIndex }" @tap="changeTab(index)">
          {{ item }}
        </div>
      </block>
    </view>
    <!-- 商品列表 -->
    <view class="goods-list">
      <block v-for="(item,index) in goodsList" :key="index">
        <view class="goods-item">
          <image :src="item.goods_small_logo"></image>
          <view class="goods-right">
            <view class="goods-title">{{ item.goods_name }}</view>
            <view class="price">￥{{ item.goods_price }}</view>
          </view>
        </view>
      </block>
    </view>
    <!-- 触底提示 -->
    <view class="loading" v-show="!hasMore">
      我也是有底线的...
    </view>
  </view>
</template>

<script>
import { getGoodsList } from "@/api";
export default {
  data(){
    return{
      keyword:'',
      tabs:["综合","销量","价格"],
      tabIndex:0,
      goodsList:[],
      pagenum:1,
      pagesize:20,
      hasMore:true
    }
  },
  // onLoad 生命周期函数
  onLoad(options){
    this.keyword = options.keyword;
    this.getGoodsData();
  },
  onUnload(){
    this.initData();
  },
  // 上拉触底事件
  onReachBottom(){
    // console.log('上拉触底了')
    this.getGoodsData();
  },
  // 下拉刷新触发的页面事件
  onPullDownRefresh(){
    // console.log("下拉刷新");
    // 1. 初始化数据
    this.initData();
    // 2. 请求数据
    this.getGoodsData();

  },
  methods: {
    // 跳转到搜索页
    gotoSearch(){
      wx.navigateTo({ url: '/pages/search/main?keyword=' + this.keyword });
    },
    // 初始化数据
    initData(){
       // 由于Mpvue 会把页面的data数据缓存起来，所以注意重新设置一下，防止页面使用的是上次打开时候的数据
      this.goodsList = [];
      this.pagenum = 1;
      this.pagesize = 20;
      this.hasMore = true;
    },
    changeTab(index){
      this.tabIndex = index;
    },
    // 获取页面数据的方法
    getGoodsData(){

      // 如果 hasMore 为假，就不发送请求了
      if( !this.hasMore ) return;

      wx.showLoading({
        title: '加载中'
      });
      getGoodsList({
        query:  this.keyword,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res=>{
        let goods = res.data.message.goods
        // 如果请求的长度已经不足够20条，hasMore 的值就要被修改成假，代表没有数据了
        if( goods.length < this.pagesize ){
          this.hasMore = false;
        }
        // 请求成功后，要考虑的事情
        // 1. 把请求回来的数据，赋值给 goodsList
        // this.goodsList = res.data.message.goods;
        // this.goodsList = this.goodsList.concat(res.data.message.goods);
        this.goodsList = [...this.goodsList, ...goods];
        // 2. 页数要加1
        this.pagenum++;
        wx.hideLoading();
        wx.stopPullDownRefresh();
      })
    }
  }

}
</script>

<style  lang="scss">
.search-wrapper{
    background: #eee;
    padding:20rpx;

    .search-input{
        background:#fff;
        height:60rpx;
        font-size:15px;
        color:#999;
        display: flex;
        align-items: center;
        padding: 0 20rpx;
    }

    .search-input icon{
    margin-right:5px;
    }
}

.tab{
    display: flex;
    border-bottom:1px #eee solid;
    .tab-item{
        flex:1;
        text-align: center;
        line-height: 100rpx;
    }

    .active{
        color:red;
    }
}

.goods-list{
    padding-left:20rpx;

    .goods-item{
        padding:20rpx 20rpx 20rpx 0;
        display: flex;
        border-bottom:1px #eee solid;

        image{
            display: block;
            width:200rpx;
            height:200rpx;
            flex-shrink: 0;
            margin-right: 20rpx;
        }

        .goods-title{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        .goods-right{
            flex:1;
            display: flex;
            flex-direction:column;
            justify-content: space-between;
        }

        .price{
            color:red;
            font-size: 14px;
            span{
                font-size: 22px;
            }
        }
    }
}

.loading{
    line-height: 80rpx;
    text-align: center;
    font-size:14px;
    color:#999;
}
</style>
