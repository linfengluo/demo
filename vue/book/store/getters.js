/**
 * Created by linfengluo@gmail.com on 2018/5/18.
 */

const getters = {
	getBookSections: (state) => (key) => {
		return state.bookInfo.section.hasOwnProperty(key) ? state.bookInfo.section[key] : []
	}
}

export default getters
