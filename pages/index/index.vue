<template>
	<view class="home">
		<!-- 轮播图 -->
		<swiper indicator-dots circular autoplay>
			<swiper-item v-for="item in swipers" :id="item.goods_id">
				<image :src="item.image_src"></image>
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav_item" v-for="(item,i) in nav" :id="i"  @click="navItemClick(item.path)">
				<view class="iconfont">{{item.icon}}</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view class="hot_goods">
			<view class="tit">推荐商品</view>
			<goods_list @goodsItemClick='goGoodsDetail' :goods="goods"></goods_list>
		</view>
	</view>
</template>

<script>
	import goods_list from '../../components/goods_list/goods_list.vue'
	
	export default {
		data() {
			return {
				swipers: [],
				goods:[],
				nav: [{
						name: '超市购',
						icon: '\ue601',
						path:'/pages/goods/goods'
					},
					{
						name: '联系我们',
						icon: '\ue6c9',
						path:'/pages/contact/contact'
					},
					{
						name: '分类',
						icon: '\ue600',
						path:'/pages/categories/categories'
					},
					{
						name: '精彩视频',
						icon: '\ue772',
						path:'/pages/videos/videos'
					}
				],
			}
		},
		components:{goods_list},
		onLoad() {
			this.getHotGoods()
			this.getSwipers()
		},
		methods: {
			//获取轮播图
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/api/public/v1/home/swiperdata'
				})
				this.swipers = res.message
			},
			// 获取热门商品列表
			async getHotGoods() {
				const res = await this.$myRequest({
					url: '/api/public/v1/goods/search'
				})
				this.goods = res.message.goods
			},
			// 导航点击跳转页面
			navItemClick(url){
				uni.navigateTo({
					url
				})
			},
			goGoodsDetail(goods_id){
				uni.navigateTo({
					url:'../goods-detail/goods-detail?goods_id='+goods_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.home {
		swiper {
			width: 750rpx;
			height: 380rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.nav {
		display: flex;
		justify-content: space-around;

		.nav_item {
			text-align: center;

			.iconfont {
				font-family: "iconfont" !important;
				font-style: normal;
				-webkit-font-smoothing: antialiased;
				-webkit-text-stroke-width: 0.2px;
				-moz-osx-font-smoothing: grayscale;
				width: 120rpx;
				height: 120rpx;
				background: $shop-color;
				border-radius: 50%;
				line-height: 120rpx;
				margin-top: 20rpx;
				color: #FFFFFF;
				font-size: 50rpx;
			}

			text {
				font-size: 30rpx;
			}
		}
	}

	.hot_goods {
		background: #EEEEEE;
		overflow: hidden;
		margin-top: 15rpx;

		.tit {
			height: 100rpx;
			line-height: 100rpx;
			color: $shop-color;
			text-align: center;
			letter-spacing: 40rpx;
			background: #FFFFFF;
			margin: 7rpx 0;
		}	
	}
</style>
