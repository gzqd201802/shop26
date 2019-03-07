<template>
    <view>
      <!-- 顶部地址栏 -->
      <view class="cart-top" @tap="chooseAddress">
        <block v-if="address.userName">
          <view class="user">
            <view class="user-name">收货人：{{ address.userName }}</view>
            <view class="user-tel">{{ address.telNumber }}</view>
            </view>
          <view class="address">
              收获地址：{{ address.addressInfo }}
          </view>
        </block>
        <block v-else>
          <view class="add-addresss">请添加收获地址+</view>
        </block>
        <view class="address-border"></view>
      </view>
      <!-- 购物车列表 -->
      <view class="list-title">
        品优购生活馆
      </view>
      <view class="ware-list">
        <block v-for="(item, key) in cartList" :key="key">
          <view class="ware-item" @tap="gotoDetail(key)">
            <view class="ware-info">
              <div class="ware-content">
                <div class="ware-image">
                  <image :src="item.goods_small_logo"></image>
                </div>
                <div class="ware-info">
                    <div class="ware-title">{{ item.goods_name }}</div>
                    <div class="ware-info-btm">
                      <div class="ware-price">
                        ￥{{ item.goods_price }}
                      </div>
                      <div class="calculate">
                        <div class="number">x {{ item.count }}</div>
                      </div>
                    </div>
                </div>
              </div>
            </view>
          </view>
        </block>
      </view>
      <!-- 支付按钮 -->
      <button type="primary" @tap="payHandle">支付订单</button>
    </view>
</template>

<script>
import { orderCreate } from "@/api";
export default {
  data(){
    return{
      address:{
        userName:"",
        telNumber:"",
        addressInfo:""
      },
      cartList:{},
      allCount:0,
      cartLength: 0
    }
  },
  computed: {
    // 计算总数
    allPrice(){
      // 总价格
      let _allPrice = 0;
      // 选中的总数
      let _allCount = 0;
      // // 购物车长度
      // let _cartLength = 0;

      // 遍历购物车对象 用 for in
      for(var key in this.cartList){
        let item = this.cartList[key];
        // 如果是选中状态
        if(item.selected){
          // 计算总价格
          _allPrice += item.goods_price * item.count;
          // 计算总个数
          _allCount++;
        }
      }
      // 赋值给 this.allCount，可以改变总个数
      this.allCount = _allCount;
      // 购物车列表长度
      this.cartLength = Object.keys(this.cartList).length;
      // 更新本地存储数据
      wx.setStorageSync('cartList',this.cartList);
      // 返回值 return 返回总价格
      return _allPrice;
    },
  },
  onShow(){
    this.address = wx.getStorageSync('address') || {};
    this.cartList = wx.getStorageSync('cartList') || {};
  },
  methods:{
    // 支付按钮
    payHandle(){
      // 点击支付按钮的时候，先看用户是否授权，授权后，会向服务器换取token，并存到本地
      let token = wx.getStorageSync('token');
      if(!token){
        wx.navigateTo({ url: '/pages/auth/main' });
      }else{
        // 购物车商品列表拼接
        let goods = [];
        for(let key in this.cartList){
          let item = this.cartList[key];
          goods.push({
            "goods_id":item.goods_id,
            "goods_number":item.count,
            "goods_price":item.goods_price
          })
        }
        // 向自家服务器发起请求
        orderCreate({
          order_price: this.allPrice,
          consignee_addr: this.address.addressInfo,
          goods: goods
        });
      }
    },
    // 点击跳转到商品详情
    gotoDetail(id){
      wx.navigateTo({ url: '/pages/goods_detail/main?goods_id='+id });
    },
    // 点击购物车顶部实现选择收获地址
    chooseAddress(){
      // 调用微信小程序自带的收货地址功能
      wx.chooseAddress({
        success: res => {
          // 传统赋值写法
          // let userName = res.userName;
          // 解构赋值写法 - 和上一行代码功能相同
          // let { userName } = res;

          let { userName,provinceName,cityName,countyName,detailInfo,telNumber } = res;
          // 拼接收获地址
          this.address = {
            userName,
            telNumber,
            addressInfo:`${provinceName}${cityName}${countyName}${detailInfo}`
          }

          // 把数据存储到本地
          wx.setStorageSync('address',this.address);

        }
      });
    }
  }
}
</script>

<style lang="scss">
.cart-top {
  min-height: 180rpx;
  position: relative;
  .user {
    display: flex;
    padding: 20rpx;
    justify-content: space-between;
    position: relative;
    padding-right: 50rpx;
    &:after {
      display: block;
      content: "";
      width: 12px;
      height: 12px;
      border-top: 1px #999 solid;
      border-right: 1px #999 solid;
      transform: rotate(45deg);
      position: absolute;
      right: 20rpx;
      top: 20rpx;
      margin-top: 6px;
    }
  }
  .address {
    padding: 20rpx;
    padding-top: 0;
  }
  .address-border {
    width: 100%;
    height: 8px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: red;
  }
  .add-addresss {
    height: 180rpx;
    padding: 20rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.list-title {
  padding: 20rpx;
  border-bottom: 1px #eee solid;
  border-top: 10px #eee solid;
}
.ware-list {
  padding-bottom: 100rpx;
}
.icon-xuanze-fill {
  color: #ff2d4a;
}
.ware-item {
  padding: 20rpx;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  .choice-button {
    flex-shrink: 0;
    text-align: center;
    margin-right: 20rpx;
    font-size: 32rpx;
  }
}
.ware-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.ware-content {
  display: flex;
  flex: 1;
  justify-content: space-between;
  border-bottom: 1px #eee solid;
  padding-bottom: 20rpx;
}
.ware-image {
  image {
    display: block;
    width: 200rpx;
    height: 200rpx;
  }
}
.ware-info {
  flex: 1;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.ware-info-btm {
  display: flex;
  justify-content: space-between;
  .ware-price {
    color: red;
  }
}
.calculate {
  display: flex;
}
.rect {
  width: 20px;
  text-align: center;
  border: 1px #999 solid;
  line-height: 1.2;
}
.number {
  margin: 0 10px;
}
.cart-total {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  .total-button {
    padding-left: 20px;
    icon {
      margin-right: 10px;
    }
  }
  .total-center {
    flex: 1;
    padding: 20rpx;
    text-align: right;
    .colorRed {
      color: red;
    }
    .price-tips {
      font-size: 14px;
      color: #666;
    }
  }
  .accounts {
    width: 30%;
    height: 100rpx;
    background: red;
    color: #fff;
    line-height: 100rpx;
    text-align: center;
  }
}
</style>
