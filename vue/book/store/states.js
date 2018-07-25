/**
 * Created by linfengluo@gmail.com on 2018/5/18.
 */
const state = {
   	title: '推荐',
	isShowFooter: true,
	alertInfo: {
   		title: '',
		message: '',
		onClose: null,
		isShow: false,
		colseText: ''
	},
	isOpenMenu: false,
	isShowAppBar: true,
	bookInfo: {
   		isInit: false,
   		id: '',
		section: {},
		total: 0,
		bookmarks: 1,
		count: 0
	},
	bookSection: [],
	isShowReadMenu: false
}

export default state
