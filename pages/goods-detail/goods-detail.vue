<template>
	<view class="goods_datail">
		<!-- 轮播图 -->
		<swiper indicator-dots>
			<!-- 如果没有轮播图数据 -->
			<swiper-item v-if="goods.pics && goods.pics.length===0">
				<image src="../../static/zanwu.png"></image>
			</swiper-item>
			<!-- 正常显示轮播图 -->
			<swiper-item v-else v-for="(item,i) in goods.pics" :id="i">
				<image :src="item.pics_mid_url" @click="previewImg(item.pics_mid_url)"></image>
			</swiper-item>
		</swiper>
		<!-- 价钱及简介 -->
		<view class="box1">
			<view class="price">
				<text>￥{{goods.goods_price}}</text>
				<text>￥{{goods.goods_price+300}}</text>
			</view>
			<view class="goods_name">{{goods.goods_name}}</view>
		</view>
		<view class="line"></view>
		<view class="box2">
			<view>货号：{{goods.goods_id}}</view>
			<view>库存：{{goods.goods_number}}</view>
		</view>
		<view class="line"></view>
		<view class="box3">
			<view class="tit">详情介绍</view>
			<rich-text :nodes="goods.goods_introduce"></rich-text>
		</view>
		<view class="goods_nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import uniGoodsNav from '../../components/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		data() {
			return {
				goods_id: 0,
				goods: {},
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},
		onLoad(options) {
			this.goods_id = options.goods_id
			this.getSwipers()
		},
		methods: {
			async getSwipers() {
				const res = await this.$myRequest({
					url: '/api/public/v1/goods/detail?goods_id=' + this.goods_id
				})
				this.goods = res.message
			},
			onClick(e) {
				uni.showToast({
					title: `点击${e.content.text}`,
					icon: 'none'
				})
			},
			buttonClick(e) {
				console.log(e)
				this.options[2].info++
			},
			previewImg(current){
				const urls=this.goods.pics.map(item=>{
					return item.pics_mid_url
				})
				uni.previewImage({
					current,
					urls
				})
			}
		},
		components: {
			uniGoodsNav
		}
	}
</script>

<style lang="scss">
	.goods_datail {
		swiper {
			height: 700rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.box1 {
			padding: 10px;

			.price {
				font-size: 35rpx;
				color: $shop-color;
				line-height: 80rpx;

				text:nth-of-type(2) {
					color: #ccc;
					font-size: 28rpx;
					text-decoration: line-through;
					margin-left: 20rpx;
				}
			}

			.goods_name {
				font-size: 32rpx;
				line-height: 60rpx;
			}
		}
	}

	.line {
		height: 10rpx;
		width: 750rpx;
		background: #EEEEEE;
	}

	.box2 {
		padding: 10px;
		font-size: 32rpx;
		line-height: 80rpx;
	}

	.box3 {
		padding-bottom: 100rpx;
		.tit {
			font-size: 32rpx;
			padding-left: 10px;
			border-bottom: 1px solid #EEEEEE;
			line-height: 70rpx;
		}
	}
	
	.goods_nav{
		position: fixed;
		bottom: 0;
		width: 100%;
	}
</style>
