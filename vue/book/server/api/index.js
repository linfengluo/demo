/**
 * Created by linfengluo@gmail.com on 2018/7/9.
 */
import {Router} from 'express'
import resFormat from '../../units/resFormat'
import crawlerController from '../controllers/crawlerController'
import bookController from '../controllers/bookController'

const router = Router()

router.get('/api/search', function (req, res, next) {
	const bookName = req.query.key

	bookController.searchBook(bookName)
		.then(data => {
			if (data.length > 0) {
				return res.json(resFormat.success({
					type: 'local',
					bookList: data
				}))
			} else {
				crawlerController.searchBook(bookName)
					.then(data => {
						return res.json(resFormat.success({
							type: 'online',
							bookList: data
						}))

					})
					.catch(err => {
						return res.json(resFormat.error(err))
					})
			}
		})

})

router.get('/api/book/menu', function (req, res, next) {
	const type = req.query.type
	const page = typeof req.query.page == 'undefined' ? 1 : req.query.page
	const direct = typeof req.query.direct == 'undefined' ? 'ASC' : req.query.direct
	const key = req.query.key


	if (type === 'local') {
		bookController.getMenu(key, page, direct)
			.then(data => {
				return res.json(resFormat.success(data))
			})
			.catch(err => {
				console.log(err)
			})
	} else {
		crawlerController.getBookMenu(key, direct)
			.then(data => {
				return res.json(resFormat.success(data))
			})
			.catch(err => {
				return res.json(resFormat.error(err))
			})
	}
})
router.get('/api/book/hot', function (req, res, next) {

	bookController.getRecentBook()
		.then(data => {
			return res.json(resFormat.success(data))
		})
})
router.get('/api/book/info', function (req, res, next) {

	bookController.getBookInfo(req.query.id)
		.then(data => {
			return res.json(resFormat.success(data))
		})
		.catch(err => {
			console.log(err)
		})
})
router.get('/api/book/section', function (req, res, next) {
	crawlerController.getBookSection(decodeURIComponent(req.query.link))
		.then(data => {
			return res.json(resFormat.success(data))
		})
		.catch(err => {
			console.log(err)
		})
})

export default router
