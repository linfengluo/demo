/**
 * Created by linfengluo@gmail.com on 2018/5/18.
 */
import axios from '../plugins/axios'
import api from '../units/api'
const actions = {
	getSections({commit, state}, params){
		return new Promise((resolve, reject) => {

			if (!state.bookInfo.section.hasOwnProperty(`page${params.page}`)) {
				axios.get(api.getSection, {
					params: params
				}).then(res => {
					let response = res.data
					if (response.code == 200) {
						resolve(response.data.data)
						commit('SAVE_BOOK_SECTION', {
							page: response.data.page,
							list: response.data.data
						})
						if (!state.isInit) {
							commit('UPDATE_BOOKINFO', {
								total: response.data.total,
								count: response.data.count,
								isInit: true
							})
						}
					} else {
						resolve(response)
						this.openAlert({message: response.msg})
					}
				})
			} else {
				resolve(state.bookInfo.section[`page${params.page}`])
			}
		})
	},

	getSectionContent({commit, state, dispatch}, link){
		return new Promise((resolve, reject) => {
			const sectionLink = decodeURIComponent(link)
			if (sectionLink.match(/.html/ig)) {
				const index = sectionLink.substring(sectionLink.lastIndexOf('/') + 1, sectionLink.lastIndexOf('.'))
				let currentIndex = -1
				const preSave = state.bookSection.filter((item, arrIdx) => {
					if (currentIndex < 0 && item.index == index) {
						currentIndex = arrIdx
					}
					return item.index == index
				})

				if (preSave.length > 0) {
					resolve(preSave[0])

					const sectionLength = state.bookSection.length

					if (sectionLength < 7) {
						dispatch('getSectionContent',state.bookSection[sectionLength - 1].next)

					}

					if (currentIndex >= 2) {
						commit('SPLICE_BOOK_SECTION', 1)
					}
				} else {
					getSectionContent(sectionLink, index)
						.then(res => {
							res.index = index
							commit('UPDATE_BOOK_SECTION', res)
							resolve(res)
							if (state.bookSection.length < 7) {
								dispatch('getSectionContent', res.next)
							}
						})
				}

			} else {
				reject('无效')
			}
		})

	},

	getLocalBook({commit, state}, params){
		return new Promise((resolve, reject) => {
			axios.get(api.getBookInfo, {
				params: params
			})
				.then((res) => {
					let response = res.data
					if (response.code == 200) {
						commit('RESET_BOOKINFO', response.data.id)
						resolve({
							bookInfo: response.data,
							page: 1,
						})
					} else {
						this.openAlert({message: response.msg})
					}
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	getOnlineBook({commit, state}, params){
		return new Promise((resolve, reject) => {
			axios.get(api.getBookOnlineBook, {
				params: params
			})
				.then((res) => {
					let response = res.data
					if (response.code == 200) {
						commit('RESET_BOOKINFO', response.data.bookInfo.bookId)
						commit('SAVE_BOOK_SECTION', {
							page: response.data.page,
							list: response.data.data
						})
						commit('UPDATE_BOOKINFO', {
							total: response.data.total,
							count: response.data.count,
							isInit: true
						})
						resolve( {
							bookInfo: response.data.bookInfo,
							bookSections: response.data.data,
							page: response.data.page,
						})
					} else {
						reject(res)
					}
				})
		})
	}

}

function getSectionContent(link) {
	return new Promise((resolve, reject) => {
		axios.get(api.getSectionContent, {
			params: {
				link: link
			}
		}).then(res => {
			let response = res.data
			if (response.code == 200) {
				resolve(response.data)
			} else {
				reject(response)
			}
		})
	})
}

export default actions
