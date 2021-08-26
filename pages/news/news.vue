<template>
	<view class="news">
		<view class="news_item" @click="goDetail(item.path)" v-for="(item,i) in news" :id="i">
			<image :src="item.image"></image>
			<view class="right">
				<view class="tit">
						{{item.title}}
				</view>
				<view class="info">
					<text>发表时间：{{item.passtime}}</text>
					<text>浏览：{{100+Math.floor(Math.random()*100)}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				news:[]
			}    
		},
		onLoad() {
			this.getNews()
		},
		methods: {
			async getNews(){
				const res=await uni.request({
					// #ifdef H5
					url:'/apis/getWangYiNews',
					// #endif
					
					// #ifdef 
					url:'https://api.apiopen.top/getWangYiNews',
					// #endif
				})	
				if(res[1].data.code!==200) return
				this.news=res[1].data.result
			},
			goDetail(path){
				uni.navigateTo({
					url:'./news-detail?url='+path
				})
				console.log('./news-detail?url='+path)
			}
		}
	}
</script>

<style lang="scss">
.news{
	.news_item{
		display: flex;
		padding: 10rpx 20rpx;
		border-bottom: 1px solid $shop-color;
		image{
			min-width: 200rpx;
			max-width: 200rpx;
			height: 150rpx;
		}
		.right{
			margin-left: 15rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.tit{
				font-size: 30rpx;
			}
			.info{
				font-size: 24rpx;
				text:nth-child(2){
					margin-left: 25rpx;
				}
			}
		}	
	}
}
</style>
