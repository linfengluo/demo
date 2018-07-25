/**
 * Created by linfengluo@gmail.com on 2018/5/18.
 */

const mutations = {
	['CHANGE_TITLE'](state, title){
		state.title = title
	},
	['CHANGE_MENU_STATUS'](state, isShow = true){
		state.isOpenMenu = isShow
	},
	['TOGGLE_ALERT_DIALOG'](state, data){
		const defaultData = {
			title: '',
			message: '',
			onClose: null,
			isShow: false,
			colseText: '关闭'
		}
		state.alertInfo = Object.assign(defaultData, data)
	},

	['SAVE_BOOK_SECTION'](state, section) {
		const newSection = {}
		newSection[`page${section.page}`] = section.list
		state.bookInfo.section = Object.assign(state.bookInfo.section, newSection)

	},

	['UPDATE_BOOKINFO'](state, info){
		state.bookInfo.total = info.total
		state.bookInfo.count = info.count
	},

	['RESET_BOOKINFO'](state, id) {
		state.bookInfo = {
			id: id,
			section: {},
			total: 0,
			count: 0,
			bookmarks: 1
		}
	},

	['UPDATE_BOOK_SECTION'](state, data){
		const temp = state.bookSection.filter(item => {
			return item.index == data.index
		})

		if (temp.length <= 0) {
			state.bookSection.push(data)
		}
	},

	['SPLICE_BOOK_SECTION'](state, start){
		state.bookSection = state.bookSection.splice(start)
	},

	['CHANGE_APPBAR_STATE'](state, isShow = true){
		state.isShowAppBar = isShow
	},

	['TOGGLE_READ_MENU'](state, isShow) {
		state.isShowReadMenu = isShow
	}
}



export default mutations
