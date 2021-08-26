<template>
	<view class="goods_list">
		<view class="goods_item" v-for="(item,i) in goods" :id="i" @click="navigator(item.goods_id)">
			<image :src="getGoodImg(item)"></image>
			<view class="price">
				<text>￥{{item.goods_price}}</text>
				<text>￥{{item.goods_price+200}}</text>
			</view>
			<view class="name">{{item.goods_name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "goods_list",
		props:['goods'],
		computed: {
			getGoodImg() {
				return function(item) {
					return item.goods_small_logo ? item.goods_small_logo : 'http://image3.suning.cn/uimg/b2c/newcatentries/0070078057-000000000136928577_1_400x400.jpg'
				}
			}
		},
		methods:{
			navigator(goods_id){
				this.$emit('goodsItemClick',goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.goods_list {
		padding: 0 15rpx;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.goods_item {
			background: #FFFFFF;
			width: 355rpx;
			height: 530rpx;
			margin: 10rpx 0;
			padding: 15rpx;
			box-sizing: border-box;

			image {
				width: 80%;
				height: 300rpx;
				display: block;
				margin: 0 auto;
			}

			.price {
				color: $shop-color;
				font-size: 36rpx;
				margin-top: 10rpx;

				text:nth-child(2) {
					font-size: 28rpx;
					margin-left: 17rpx;
					text-decoration: line-through;
					color: #c8c0c2;
				}
			}

			.name {
				font-size: 30rpx;
				line-height: 50rpx;
				padding-top: 10rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
			}
		}
	}
</style>
