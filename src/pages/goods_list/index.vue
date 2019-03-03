<template>
  <view>
    <!-- 搜索框 -->
    <view class="search-wrapper">
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
      goodsList:[]
    }
  },
  onLoad(options){
    this.keyword = options.keyword;
    getGoodsList({
      query:  this.keyword
    }).then(res=>{
      this.goodsList = res.data.message.goods;
    })
  },
  methods: {
    changeTab(index){
      this.tabIndex = index;
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
