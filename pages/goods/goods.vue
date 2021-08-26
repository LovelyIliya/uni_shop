<template>
	<view class="goods">
		<goods_list @goodsItemClick="goGoodsDetail" :goods="goods"></goods_list>
		<view class="isOver" v-if="flag">--------已经到底啦----------</view>
	</view>
</template>

<script>
	import goods_list from '../../components/goods_list/goods_list.vue'
	export default {
		data() {
			return {
				goods: [],
				pagenum: 1,
				pagesize: 6,
				flag: false
			}
		},
		components: {
			goods_list
		},
		onLoad() {
			this.getGoodsList()
		},
		onReachBottom() {
			if (this.goods.length >= 20) {
				return this.flag = true
			}
			this.pagenum++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.pagenum = 1
			this.goods = []
			this.flag = false
			setTimeout(() => {
				this.getGoodsList(uni.stopPullDownRefresh())
			}, 1000)
		},
		methods: {
			// 获取商品列表
			async getGoodsList(callback) {
				const res = await this.$myRequest({
					url: `/api/public/v1/goods/search?pagenum=${this.pagenum}&pagesize=${this.pagesize}`,
				})
				this.goods = [...this.goods, ...res.message.goods]		
					callback && callback()
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
	.goods {
		background: #EEEEEE;

		.isOver {
			width: 100%;
			text-align: center;
		}
	}
</style>
