<template>
    <view>
      <!-- 搜索框 -->
      <search></search>
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
import request from "@/utils/request";
import { getSwiper,getCate,getFloor } from "@/api";
// 2. 导入组件
import Search from "@/components/search";
export default {
  data(){
    return{
      imgUrls:[],
      catList:[],
      floors:[]
    }
  },
  // 3. 注册组件
  components: {
    Search
  },
  mounted () {

    getSwiper().then(res=>{
      this.imgUrls = res.data.message;
    });
    getCate().then(res=>{
      this.catList = res.data.message;
    });
    getFloor().then(res=>{
      this.floors = res.data.message;
    });

  }
}
</script>

<style>


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
