<template>
	<view class="categories">
		<scroll-view class="left" scroll-y>
			<view :class="active===i ? 'active' : '' " 
			v-for="(item,i) in categories" 
			:id="i" @click="leftClickHandle(i,item)">
				{{item.name}}
			</view>
		</scroll-view>
		<scroll-view class="right" scroll-y>
			<view class="item" v-for="(item,i) in rightItem" :id="i">
				<image @click="previewImg(item.image_src)" :src="item.image_src"></image>
				<text>{{item.name}}</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categories: [],
				active: 0,
				rightItem:[{image_src:'https://api-hmugo-web.itheima.net/pyg/pic_floor01_title.png',name:'时尚女装'}]
			}
		},
		onLoad() {
			this.getCategories()
		},
		methods: {
			async getCategories() {
				const res = await this.$myRequest({
					url: '/api/public/v1/home/floordata'
				})
				res.message.forEach(item => {
					Object.keys(item).forEach(key => {
						if (Object.prototype.toString.call(item[key]) == '[object Object]') {
							this.categories.push(item[key])
						} else {
							Object.keys(item[key]).forEach(i => {
								this.categories.push(item[key][i])
							})
						}
					})
				})
			},
			leftClickHandle(i,item) {
				this.active = i
				this.rightItem.length=0
				this.rightItem=[item]
			},
			previewImg(current){
				const urls=this.rightItem.map(item=>{
					return item.image_src
				})
				uni.previewImage({
					current,
					urls
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}

	.categories {
		height: 100%;
		display: flex;

		.left {
			width: 200rpx;
			height: 100%;
			border-right: 1px solid #EEEEEE;

			view {
				height: 120rpx;
				line-height: 120rpx;
				color: #333333;
				text-align: center;
				font-size: 30rpx;
				border-top: 1px solid #EEEEEE;
			}

			.active {
				background: $shop-color;
				color: #FFFFFF;
			}
		}
		
		.right{
			height: 100%;
			width: 520rpx;
			margin: 10rpx auto;
			.item{
				image{
					width: 520rpx;
					height: 520rpx;
					border-radius: 5px;
				}
				text{
					font-size: 30rpx;
					line-height: 20rpx;
				}
			}
		}
	}
</style>
