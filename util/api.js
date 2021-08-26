const BASE_URL='https://api-hmugo-web.itheima.net'
export const myRequest=(options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method:options.method || 'GET',
			data:options.data || {},
			success:(res)=>{
				if(res.data.meta.status!==200){return}
				resolve(res.data)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}