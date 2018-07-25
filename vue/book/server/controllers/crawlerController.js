/**
 * Created by linfengluo@gmail.com on 2018/7/9.
 */
import cheerio from 'cheerio'
import xss from 'xss'
import crawlerFetch from '../../units/fetch'
import mysql from '../config/mysql'
import bookController from './bookController'

const SEARCH_LINK = 'https://www.baidu.com/s?wd='
const BOOK_SITE = 'www.biquge5200.cc'
const BOOK_TABLE = 'b_list';

const ErrorLog = require('tracer').dailyfile({root: './server/logs/error/'});
const SuccessLog = require('tracer').dailyfile({root: './server/logs/success/'});

const crawlerController = {
	searchBook(name){
		return new Promise((resolve, reject) => {
			const key = encodeURIComponent(`${name} site:${BOOK_SITE}`)
			const searchUrl = `${SEARCH_LINK}${key}`
			crawlerFetch(searchUrl)
				.then(res => {
					let $ = cheerio.load(res);
					let data = [];

					$('#content_left .result').each((i, elem) => {
						data.push({
							title: $(elem).find('a').text(),
							link: $(elem).find('a').attr('href')
						})
					})

					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	getBookMenu(link, direct){
		return new Promise((resolve, reject) => {
			crawlerFetch(link)
				.then(res => {
					let $ = cheerio.load(res);
					let menu = [];

					const title = $('#info h1').text()
					const logo = $('#fmimg img').attr('src')
					const desc = $('#intro').text()
					const realLink = $("meta[property='og:novel:read_url']").attr("content")
					let author = ''

					$('#info p').each((i, elem) => {
						if (i == 0) {
							author = $(elem).text()
						}
					})

					$('#list dl dd').each((i, elem) => {
						let link = $(elem).find('a').attr('href')
						if (i > 8) {
							menu.push({
								title: $(elem).find('a').text(),
								link: link,
								index: link.substring(link.lastIndexOf('/') + 1, link.lastIndexOf('.'))
							})
						}
					})

					menu = menu.sort((a, b) => {
						return a.index - b.index
					})

					const result = {
						count: menu.length,
						total: Math.ceil(menu.length / 50),
						page: 1,
						num: 50,
						data: menu,
						bookInfo: {
							logo: logo,
							href: realLink,
							intro: desc,
							name: title,
							author: author.substr(author.indexOf("：") + 1),
						}
					}
					bookController.addBook(result, menu[menu.length-1].index)
						.then(id => {
							result.bookInfo.id = id
							result.data = direct == 'ASC' ? menu.slice(0, 50) : menu.slice(-50)
							resolve(result)
						})
				})
				.catch(err => {
					reject(err)
				})
		})
	},

	updateBooks(data){
		mysql.table(BOOK_TABLE).where({
			name: data.name,
			author: data.author
		}).find().then(function (data) {
			if (!data) {
				this.addBook(data)
			} else {

			}
		})
	},

	updateMenu(){

	},

	addBook(data){
		mysql.table(BOOK_TABLE)
			.add({
				name: data.name,
				author: data.author,
				logo: data.logo,
				href: data.bookLink,
				lastIndex: data.menu[data.menu.length - 1].index,
				createdAt: new Date().valueOf(),
				updatedAt: new Date().valueOf()
			})
			.then((insertId) => {
				SuccessLog.info(`${data.name}: 添加成功（${insertId}）`)
			})
			.catch((err) => {
				ErrorLog.info(`${data.name}: 添加失败(${err})`)
			})
	},

	getBookSection(link){
		return new Promise((resolve, reject) => {
			crawlerFetch(link)
				.then(res => {
					let $ = cheerio.load(res);
					let data = {
						content: '',
						next: '',
						prev: '',
						title: ''
					}

					data.content = xss($('#content').html())
					data.title = $('.bookname h1').text()
					data.name = $('meta[name=keywords]').attr('content').split(',')[0]

					$('.bottem1 a').each((i, elem) => {
						if ($(elem).text().match('上一章')) {
							data.prev = $(elem).attr('href')
						}

						if ($(elem).text().match('下一章')) {
							data.next = $(elem).attr('href')
						}
					})

					resolve(data)
				})
				.catch(err => {
					reject(err)
				})
		})

	}
}

export default crawlerController
