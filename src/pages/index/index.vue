<template>
    <view>
      <!-- 搜索框 -->
      <view class="search">
        <view class="search-in">
          <icon type="search" size="16"> </icon>
          <text>搜索</text>
        </view>
      </view>
      <!-- 轮播图 -->
      <swiper
        indicator-dots
        autoplay
        circular
        indicator-color="rgba(255,255,255,0.3)"
        indicator-active-color="#fff"
      >
        <block v-for="(item,index) in imgUrls" :key="index">
          <swiper-item>
            <image :src="item.image_src" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
      <!-- 导航分类分区 -->
      <view class="cate">
          <view class="cate-item" v-for="(item,index) in catList" :key="index">
              <image  class="cate-item-img"  :src="item.image_src"></image>
          </view>
      </view>
        <!-- 楼层分区 -->
        <block v-for="(item,index) in floors" :key="index">
          <view class="floor">
              <view class="floor-title">
                  <image class="floor-title-img" :src="item.floor_title.image_src" mode="aspectFit"></image>
              </view>
              <view class="floor-content">
                  <view class="floor-content-left">
                      <image :src="item.product_list[0].image_src"></image>
                  </view>
                  <view class="floor-content-right">
                      <block v-for="(subitem,subindex) in item.product_list" :key="subindex" >
                          <image v-show="subindex != 0" :src="subitem.image_src"></image>
                      </block>
                  </view>
              </view>
          </view>
        </block>

    </view>
</template>

<script>
import request from "../../utils/request";
export default {
  data(){
    return{
      imgUrls:[],
      catList:[],
      floors:[]
    }
  },
  mounted () {

    // 轮播图的请求
    // request("https://autumnfish.cn/wx/api/public/v1/home/swiperdata").then(res=>{
    //   this.imgUrls = res.data.message;
    // });

    request.get("home/swiperdata").then(res=>{
      this.imgUrls = res.data.message;
    })

    // 导航分类
    request("https://autumnfish.cn/wx/api/public/v1/home/catitems").then(res=>{
      this.catList = res.data.message;
    });

    // 楼层数据请求
    request("https://autumnfish.cn/wx/api/public/v1/home/floordata").then(res=>{
      this.floors = res.data.message;
    });


  }
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

  .slide-image,
  swiper{
      width: 750rpx;
      height: 340rpx;
  }

  .cate{
      height: 190rpx;
      display: flex;
  }
  .cate-item{
      flex:1;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .cate-item-img{
      width: 128rpx;
      height: 140rpx;
  }

  .floor-title-img{
      width:750rpx;
      height:60rpx;
  }
  .floor-content{
      display: flex;
      padding: 20rpx 0 20rpx 20rpx;
  }
  .floor-content-left image{
      width: 232rpx;
      height: 386rpx;
      margin-right: 10rpx;
  }
  .floor-content-right image{
      width: 232rpx;
      height: 188rpx;
      margin-right: 10rpx;
  }

</style>
