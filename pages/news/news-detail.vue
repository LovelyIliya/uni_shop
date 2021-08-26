<template>
	<view>
		<web-view :src="url" :progress="false"></web-view>
	</view>
</template>

<script>
	export default {
	    name: "index",
	    data(){
	        return{
	            url:''
	        }
	    },
	    onLoad(val){
	    	//动态获取的url
	        this.url=decodeURIComponent(val.url)
	    }
	}
</script>

<style>
</style>
