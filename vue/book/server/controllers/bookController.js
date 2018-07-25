/**
 * Created by linfengluo@gmail.com on 2018/7/9.
 */
import mysql from '../config/mysql'
const BOOK_LIST = 'b_list';
const BOOK_MEMU = 'b_menu';

const ErrorLog = require('tracer').dailyfile({root: './server/logs/error/'});
const SuccessLog = require('tracer').dailyfile({root: './server/logs/success/'});

const bookController = {
	getRecentBook(){
		return new Promise((resolve, reject) => {
			mysql.table(BOOK_LIST)
				.order({updatedAt: 'DESC'})
				.limit(10)
				.field('id,name,author, logo, href, updatedAt')
				.select()
				.then(result => {
					resolve(result)
				})
				.catch(err => {
					console.log(err)
				})
		})
	},
	searchBook(name){
		return new Promise((resolve, reject) => {
			mysql.table(BOOK_LIST)
				.where({name: ['LIKE', name]})
				.select()
				.then(result => {
					resolve(result)
				})
		})
	},

	getBookInfo(id){
		return new Promise((resolve, reject) => {
			mysql.table(BOOK_LIST)
				.where({
					id: id
				})
				.field('id,name,author, logo, href, updatedAt, intro')
				.find()
				.then((data) => {
					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})

	},

	getMenu(id, page, direct = 'ASC'){
		return new Promise((resolve, reject) => {
			mysql.table(BOOK_MEMU)
				.where({bookId: id})
				.field('title,link,index, id')
				.order({index: direct})
				.page(page, 50)
				.countSelect()
				.then(result => {
					resolve(result)
				})
				.catch(err => {
					console.log(err)
				})
		})

	},
	updateBookLog(data){
		const _this = this
		const lastIndex = data.menu[data.menu.length - 1].index
		mysql.table(BOOK_LIST).where({
			name: data.name,
			author: data.author
		}).find().then(function (result) {
			// if (result.lastIndex < lastIndex) {
			// 	_this.updateBook(result, data, lastIndex)
			// 	_this.updateMenu(result.id, result.bookKey, data.menu, result.lastIndex)
			// }
		})
	},

	updateBook(data, lastIndex){
		mysql.table(BOOK_LIST)
			.where({
				id: data.id,
			})
			.update({
				updatedAt: new Date().valueOf(),
				lastIndex: lastIndex
			})
			.then((affectRows) => {
				SuccessLog.info(`${data.name}: 更新成功`)
			})
	},

	addBook(data, lastIndex){
		const _this = this
		let bookKey = data.bookInfo.href.replace(/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)biquge5200\.cc\//i, '')
		bookKey = bookKey.substr(0, bookKey.lastIndexOf('/'))
		return new Promise((resolve, reject) => {
			mysql.table(BOOK_LIST)
				.add({
					name: data.bookInfo.name,
					author: data.bookInfo.author,
					logo: data.bookInfo.logo,
					intro: data.bookInfo.intro,
					href: data.bookInfo.href,
					bookKey: bookKey,
					lastIndex: lastIndex,
					createdAt: new Date().valueOf(),
					updatedAt: new Date().valueOf()
				})
				.then((insertId) => {
					SuccessLog.info(`${data.bookInfo.name}: 添加成功（${insertId}）`)
					_this.updateMenu(insertId, bookKey, data.data, 0)
					resolve(insertId)
				})
				.catch((err) => {
					ErrorLog.info(`${data.bookInfo.name}: 添加失败(${err})`)
				})
		})

	},

	updateMenu(id, bookKey, menu, last){
		let data = []
		for (let i = menu.length - 1; i >= 0; i--) {
			if (menu[i].index > last) {
				data.push({
					bookId: id,
					bookKey: bookKey,
					title: menu[i].title,
					link: menu[i].link,
					index: menu[i].index,
					createdAt: new Date().valueOf(),
					updatedAt: new Date().valueOf()
				})
			} else {
				break;
			}
		}

		mysql.table(BOOK_MEMU)
			.addAll(data)
			.then(() => {
				SuccessLog.info('更新成功')
			})
			.catch((err) => {
				ErrorLog.info('更新失败')
			})
	}
}

export default bookController
