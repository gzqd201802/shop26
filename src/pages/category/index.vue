<template>
    <div>
      <!-- 3. 使用组件 -->
      <search></search>
      <view class="cate">
        <scroll-view scroll-y class="cate-left">
          <block v-for="(item,index) in cateList" :key="index">
            <view class="cate-left-item"
              :class="{ 'active' : index == tabIndex }"
              @tap="changeIndex(index)">
              {{ item.cat_name }}
            </view>
          </block>
        </scroll-view>
        <scroll-view scroll-y class="cate-right">
          <block v-for="(item,index) in rightData" :key="index">
            <view class="floor">
              <view class="floor-title">
                {{ item.cat_name }}
              </view>
              <view class="floor-list">
                <block v-for="(subitem,subindex) in item.children" :key="subindex">
                  <view class="floor-list-item">
                    <image :src="'https://autumnfish.cn/wx/'+subitem.cat_icon"></image>
                    <view>{{ subitem.cat_name }}</view>
                  </view>
                </block>
              </view>
            </view>
          </block>
        </scroll-view>
      </view>
    </div>
</template>

<script>
// 1. 导入
import Search from "@/components/search";
import { getCateList } from "@/api";
export default {
  data(){
    return{
      cateList: [],
      tabIndex: 0,
      rightData:[]
    }
  },
  components: {
    // 2. 注册
    Search
  },
  mounted () {
    getCateList().then(res=>{
      this.cateList = res.data.message;
      this.rightData = this.cateList[0].children;
    })
  },
  methods: {
    changeIndex(index){
      this.tabIndex = index;
    }
  }
}
</script>

<style>
  .cate{
    display: flex;
    /* 定位盒子拉伸 */
    position: fixed;
    left: 0;
    right: 0;
    top:98rpx;
    bottom:0;

  }

  .cate-left{
    width: 200rpx;
    height: 100%;
    /* overflow-y:auto; */
  }
  .cate-left-item{
    line-height: 100rpx;
    text-align: center;
    background-color: #f4f4f4;
    position: relative;
  }
  .cate-left-item.active{
    color:#eb4450;
    background-color: #fff;
  }
  .cate-left-item.active::before{
    content: "";
    width: 10rpx;
    background-color: #eb4450;
    position: absolute;
    top:20rpx;
    bottom:20rpx;
    left:0;
  }
  .cate-right{
    flex: 1;
    height: 100%;
  }
  .floor-title{
    text-align: center;
    margin: 30rpx 0;
  }
  .floor-title::before,
  .floor-title::after{
    content: "/";
    color:#666;
    margin: 0 20rpx;
  }


  .floor-list{
    display:flex;
    flex-wrap: wrap;
  }
  .floor-list-item{
    width: 33.3333%;
    text-align: center;
    font-size: 28rpx;
    color:#333;
    margin: 20rpx 0;
  }
    /* 分类右边 */
  .floor-list-item image{
    width: 120rpx;
    height: 100rpx;
  }

</style>
