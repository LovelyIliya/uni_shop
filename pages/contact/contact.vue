<template>
	<view class="contact">
		<image class="img" src="https://www.itcast.cn/2018czydz/images/gywmban.jpg"></image>
		<view class="info">
			<view @click="phone">联系电话：888-888-8888（点击拨打）</view>
			<view>地址：北京市东城区景山前街4号故宫博物院太和殿</view>
		</view>
		<map class="map" :longitude="longitude" :scale="scale" :latitude="latitude" :markers="markers"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				longitude:116.397067,
				latitude:39.917177,
				scale:18,
				markers:[
					{
						longitude:116.397067,
						latitude:39.917177,
						iconPath:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fdpic.tiankong.com%2Fwu%2Fbr%2FQJ6696917180.jpg&refer=http%3A%2F%2Fdpic.tiankong.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1632472000&t=e1ed8ae262ed9fb60dd0955ba1da294c',
						width:30,
						hight:30
					}
				]
			}
		},
		methods: {
			phone(){
				uni.makePhoneCall({
					phoneNumber:'888-888-8888'
				})
			}
		}
	}
</script>

<style lang="scss">
.contact{
	.img{
		width: 750rpx;
		height: 320rpx;
	}
	.info{
		padding: 10rpx 20rpx;
		font-size: 30rpx;
		view{
			line-height: 80rpx;
			border-bottom: 1px solid #EEEEEE;
		}
	}
	.map{
		width: 750rpx;
		height: 915rpx;
	}
}
</style>
