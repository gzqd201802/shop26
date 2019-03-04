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
          <view class="ware-item">
            <view class="chooice-button" @tap="chooseGoods(key)">
              <view class="iconfont " :class="item.selected ? 'icon-xuanze-fill' : 'icon-xuanze'"></view>
            </view>
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
                        <div class="rect" @tap="countHandle(key,-1)">-</div>
                        <div class="number">{{ item.count }}</div>
                        <div class="rect" @tap="countHandle(key,1)">+</div>
                      </div>
                    </div>
                </div>
              </div>
            </view>
          </view>
        </block>
      </view>
      <!-- 全选结算条 -->
    </view>
</template>

<script>
export default {
  data(){
    return{
      address:{
        userName:"",
        telNumber:"",
        addressInfo:""
      },
      cartList:{}
    }
  },
  onShow(){
    this.address = wx.getStorageSync('address') || {};
    this.cartList = wx.getStorageSync('cartList') || {};
  },
  methods:{
    // 点击左右加减控制数量
    countHandle(key,num){
      // 判断是否为 1 ???
      if(this.cartList[key].count === 1){
        wx.showModal({
          content: '是否删除商品', //提示的内容,
          showCancel: true, //是否显示取消按钮,
          confirmText: '删除', //确定按钮的文字，默认为取消，最多 4 个字符,
          confirmColor: 'red', //确定按钮的文字颜色,
          success: res => {
            if (res.confirm) {
              delete this.cartList[key];
              // console.log(this.cartList);
              // MpVue 的 bug，对象改变了，但是没实现双向绑定
              // 把旧对象处理成全新对象，再重复赋值，即可更新视图
              this.cartList = JSON.parse(JSON.stringify(this.cartList));
            } else if (res.cancel) {
              this.cartList[key].count += 1;
            }
          }
        });
      }
      // 这个地方和上面的判断存在逻辑上的 bug，请思考怎么修复
      this.cartList[key].count += num;
    },
    // 点击选中商品图标
    chooseGoods(key){
      this.cartList[key].selected = !this.cartList[key].selected;
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
