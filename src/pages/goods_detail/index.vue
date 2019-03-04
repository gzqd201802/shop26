<template>
  <view>
    <!-- 轮播图 -->
    <swiper indicator-dots autoplay circular>
        <block v-for="(item,index) in detail.pics" :key="index">
            <swiper-item>
                <image @tap="previewImg(item.pics_big)" class="slide-image" mode="aspectFill" :src="item.pics_big"></image>
            </swiper-item>
        </block>
    </swiper>
    <!-- 商品价格 -->
    <view class="goods-price">
      ￥ {{ detail.goods_price }}
    </view>
    <!-- 商品信息 -->
    <view class="goods-info">
      <view>{{ detail.goods_name }}</view>
      <view class="info-right">
        <view class="iconfont icon-shoucang"></view>
        <view class="text">收藏</view>
      </view>
    </view>
    <!-- 商品详情介绍 -->
    <view class="detail">
      <view class="detail-title">商品详情介绍</view>
      <view class="detail-content">
        <rich-text :nodes="detail.goods_introduce"></rich-text>
      </view>
    </view>
    <!-- 底部分区 -->
    <view class="footer">
      <button class="contact"  open-type="contact">客服按钮</button>
      <view class="ft-left">
        <view class="iconfont icon-kefu"></view>
        <view class="text">客服</view>
      </view>
      <navigator url="/pages/cart/main" open-type="switchTab" class="ft-left">
        <view class="iconfont icon-gouwuche"></view>
        <view class="text">购物车</view>
      </navigator>
      <view class="ft-right" @tap="addToCart(detail.goods_id)">
        加入购物车
      </view>
      <view class="ft-right">
        立即购买
      </view>
    </view>
  </view>
</template>

<script>
import { getDetail } from "@/api";
export default {
  data(){
    return {
      detail:{},
      goods_id:0
    }
  },
  onLoad(options){
    this.goods_id = options.goods_id;

    // 根据 goods_id 发起详情页数据的请求
    getDetail({
      goods_id:this.goods_id
    }).then(res=>{
      this.detail = res.data.message;
    })
  },
  methods: {
    // 点击加入购物车按钮
    addToCart(id){
      // 防止还没获取到数据的时候，点击了购物车
      if(!id) return;

      // 获取本地存储，如果没有
      let cartList = wx.getStorageSync('cartList') || {};

      // 添加选中状态
      this.detail.selected = true;

      // 判断本地数据是否已经存在过 id 值，如果有就累加1，如果没有就初始化成 1
      if(cartList[id]){
        // 直接找到本地存储，加1
        cartList[id].count++;
      }else{
        // 添加数量
        this.detail.count = 1;
         // 存储到本地
        cartList[id] = this.detail;
      }
      // 添加到本地存储
      wx.setStorageSync('cartList', cartList);
      // 添加后的提示
      wx.showToast({
        title: '添加成功', //提示的内容,
        icon: 'success', //图标,
        duration: 1000, //延迟时间,
        mask: true, //显示透明蒙层，<防止触摸穿透>
        success: res => {}
      });

    },
    // 点击预览大图
    previewImg(current){
      // 数据格式不一致的时候，可以自己处理成合适的数据格式
      let imgArr = [];
      this.detail.pics.forEach(item=>{
        imgArr.push(item.pics_big)
      });
      // 预览图片的功能，图片可保存和转发
      wx.previewImage({
        current: current, // 当前显示图片的http链接
        urls: imgArr // 需要预览的图片http链接列表
      })
    }
  }
}
</script>

<style lang="scss">

swiper{
    height:720rpx;
}

.slide-image{
    height:720rpx;
    width:750rpx;
}

.goods-price{
    padding:20rpx;
    color:red;
    font-size:22px;
}

.goods-info{
    padding:20rpx;
    padding-top:0;
    display: flex;

    .info-right{
        width:160rpx;
        text-align: center;
        color:#999;
        border-left:1px #999 solid;
        font-size:14px;
        margin-left:20rpx;

        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-shrink: 0;
    }
}

.detail{
    border-top:20rpx #eee solid;
    padding-bottom:120rpx;
    .detail-title{
        padding:20rpx;
        border-bottom:1px #eee solid;
    }
    .detail-content{
      // 父级字号设置为0，清除富文本图片之间的默认间距
      font-size: 0;
    }
}

.footer{
    position: fixed;
    width:100%;
    left:0;
    bottom:0;
    height:100rpx;
    background:#fff;
    display: flex;

    .contact{
        width:20%;
        height:100rpx;
        padding:0;
        margin:0;
        position: absolute;
        left:0;
        top:0;
        // 隐藏真正的客服聊天按钮
        opacity: 0;
    }

    .ft-left{
        width:20%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color:#666;
        font-size: 14px;

        .iconfont{
            font-size:18px;
        }
    }

    .ft-right{
        width:30%;
        background: orange;
        line-height: 100rpx;
        text-align: center;
        color:#fff;

        &:last-child{
            background: red;
        }
    }

}
</style>
