/**
 * Created by linfengluo@gmail.com on 2018/7/10.
 */

/**
 * Created by linfengluo@gmail.com on 2018/5/22.
 */
import Vue from 'vue'
import axios from './axios'
Vue.mixin({
	data(){
		return {
			api: {
				hotBooks: '/api/book/hot',
				search: '/api/search',
				getMenu: '/api/book/menu'
			},
			routerKey: 'LAST_ROUTER'

		}
	},

	methods: {
		back(){
			this.$router.back()
		},
		openAlert(alertInfo){
			alertInfo.isShow = true
			this.$store.commit('TOGGLE_ALERT_DIALOG', alertInfo)
		},
		postFn(api, data, showNotify = true){
			return new Promise((resolve, reject)=> {
					axios.post(this.api[api], data)
						.then(res => {
							let response = res.data
							if (response.code == 200) {
								resolve(response.data)
							} else {
								showNotify && this.openAlert({message: response.msg})

							}
						})
						.catch(err => {
							this.openAlert({message: '网络异常，请稍后再试'})
							reject(err)
						})
				}
			)
		},

		getFn(api, data){
			return new Promise((resolve, reject)=> {
					axios.get(this.api[api], {
						params: data
					})
						.then(res => {
							let response = res.data
							if (response.code == 200) {
								resolve(response.data)
							} else {
								this.openAlert({message: response.msg})
							}
						})
						.catch(err => {
							this.openAlert({message: '网络异常，请稍后再试'})
							reject(err)
						})
				}
			)

		},

		storageGet(name){
			if (window.localStorage) {
				return JSON.parse(window.localStorage.getItem(name)) || ''
			}
		},
		storageSave(name, value){
			if (window.localStorage) {
				window.localStorage.setItem(name, JSON.stringify(value))
			}
		},
		storageDel(name){
			if (window.localStorage) {
				window.localStorage.removeItem(name)
			}
		}


	},

	computed: {
	}
})

