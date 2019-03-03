import request from "../utils/request";

// 首页请求
// 首页轮播图
export const getSwiper = () => request.get("home/swiperdata");
// 首页分类导航
export const getCate = () => request.get("home/catitems");
// 首页楼层
export const getFloor = () => request.get("home/floordata");

// 分类数据
export const getCateList = () => request.get("categories");

// 获取列表数据
export const getGoodsList = obj => request.get("goods/search", obj);

// 获取提示列表
export const getTips= obj => request.get("goods/qsearch", obj);
