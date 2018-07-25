require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("tracer");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_mysql_promise__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_node_mysql_promise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_node_mysql_promise__);
/**
 * Created by linfengluo@gmail.com on 2018/5/17.
 */


const mysql = __WEBPACK_IMPORTED_MODULE_0_node_mysql_promise___default.a.createConnection({
    host:  false ? '111.67.193.69' : 'localhost',
    user: 'feng',
    password: 'feng@3618',
    database: 'book',
    listRows: 20
});

/* harmony default export */ __webpack_exports__["a"] = (mysql);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_mysql__ = __webpack_require__(2);
/**
 * Created by linfengluo@gmail.com on 2018/7/9.
 */

const BOOK_LIST = 'b_list';
const BOOK_MEMU = 'b_menu';

const ErrorLog = __webpack_require__(0).dailyfile({ root: './server/logs/error/' });
const SuccessLog = __webpack_require__(0).dailyfile({ root: './server/logs/success/' });

const bookController = {
	getRecentBook() {
		return new Promise((resolve, reject) => {
			__WEBPACK_IMPORTED_MODULE_0__config_mysql__["a" /* default */].table(BOOK_LIST).order({ updatedAt: 'DESC' }).limit(10).field('id,name,author, logo, href, updatedAt').select().then(result => {
				resolve(result);
			}).catch(err => {
				console.log(err);
			});
		});
	},
	searchBook(name) {
		return new Promise((resolve, reject) => {
			__WEBPACK_IMPORTED_MODULE_0__config_mysql__["a" /* default */].table(BOOK_LIST).where({ name: ['LIKE', name] }).select().then(result => {
				resolve(result);
			});
		});
	},

	getBookInfo(id) {
		return new Promise((resolve, reject) => {
			__WEBPACK_IMPORTED_MODULE_0__config_mysql__["a" /* default */].table(BOOK_LIST).where({
				id: id
			}).field('id,name,author, logo, href, updatedAt, intro').find().then(data => {
				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	},

	getMenu(id, page, direct = 'ASC') {
		return new Promise((resolve, reject) => {
			__WEBPACK_IMPORTED_MODULE_0__config_mysql__["a" /* default */].table(BOOK_MEMU).where({ bookId: id }).field('title,link,index, id').order({ index: direct }).page(page, 50).countSelect().then(result => {
				resolve(result);
			}).catch(err => {
				console.log(err);
			});
		});
	},
	updateBookLog(data) {
		const _this = this;
		const lastIndex = data.menu[data.menu.length - 1].index;
		__WEBPACK_IMPORTED_MODULE_0__config_mysql__["a" /* default */].table(BOOK_LIST).where({
			name: data.name,
			author: data.author
		}).find().then(function (result) {
			// if (result.lastIndex < lastIndex) {
			// 	_this.updateBook(result, data, lastIndex)
			// 	_this.updateMenu(result.id, result.bookKey, data.menu, result.lastIndex)
			// }
		});
	},

	updateBook(data, lastIndex) {
		__WEBPACK_IMPORTED_MODULE_0__config_mysql__["a" /* default */].table(BOOK_LIST).where({
			id: data.id
		}).update({
			updatedAt: new Date().valueOf(),
			lastIndex: lastIndex
		}).then(affectRows => {
			SuccessLog.info(`${data.name}: 更新成功`);
		});
	},

	addBook(data, lastIndex) {
		const _this = this;
		let bookKey = data.bookInfo.href.replace(/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)biquge5200\.cc\//i, '');
		bookKey = bookKey.substr(0, bookKey.lastIndexOf('/'));
		return new Promise((resolve, reject) => {
			__WEBPACK_IMPORTED_MODULE_0__config_mysql__["a" /* default */].table(BOOK_LIST).add({
				name: data.bookInfo.name,
				author: data.bookInfo.author,
				logo: data.bookInfo.logo,
				intro: data.bookInfo.intro,
				href: data.bookInfo.href,
				bookKey: bookKey,
				lastIndex: lastIndex,
				createdAt: new Date().valueOf(),
				updatedAt: new Date().valueOf()
			}).then(insertId => {
				SuccessLog.info(`${data.bookInfo.name}: 添加成功（${insertId}）`);
				_this.updateMenu(insertId, bookKey, data.data, 0);
				resolve(insertId);
			}).catch(err => {
				ErrorLog.info(`${data.bookInfo.name}: 添加失败(${err})`);
			});
		});
	},

	updateMenu(id, bookKey, menu, last) {
		let data = [];
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
				});
			} else {
				break;
			}
		}

		__WEBPACK_IMPORTED_MODULE_0__config_mysql__["a" /* default */].table(BOOK_MEMU).addAll(data).then(() => {
			SuccessLog.info('更新成功');
		}).catch(err => {
			ErrorLog.info('更新失败');
		});
	}
};

/* harmony default export */ __webpack_exports__["a"] = (bookController);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_body_parser___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_body_parser__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api__ = __webpack_require__(7);



// import cookieParser from 'cookie-parser'
// import session from 'express-session'


const app = __WEBPACK_IMPORTED_MODULE_0_express___default()();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3030;

app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.json());
app.use(__WEBPACK_IMPORTED_MODULE_2_body_parser___default.a.urlencoded({ extended: false }));
// app.use(cookieParser())
// app.use(session({
//     secret: 'book',
//     resave: false,
//     saveUninitialized: false
// }))

app.set('port', port);

app.use(__WEBPACK_IMPORTED_MODULE_3__api__["a" /* default */]);

// Import and Set Nuxt.js options
let config = __webpack_require__(16);
config.dev = !("production" === 'production');

// Init Nuxt.js
const nuxt = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Nuxt"](config);

// Build only in dev mode
if (config.dev) {
    const builder = new __WEBPACK_IMPORTED_MODULE_1_nuxt__["Builder"](nuxt);
    builder.build();
}

// Give nuxt middleware to express
app.use(nuxt.render);

// Listen the server
app.listen(port, host);

console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_express___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_express__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__units_resFormat__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controllers_crawlerController__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_bookController__ = __webpack_require__(3);
/**
 * Created by linfengluo@gmail.com on 2018/7/9.
 */





const router = Object(__WEBPACK_IMPORTED_MODULE_0_express__["Router"])();

router.get('/api/search', function (req, res, next) {
	const bookName = req.query.key;

	__WEBPACK_IMPORTED_MODULE_3__controllers_bookController__["a" /* default */].searchBook(bookName).then(data => {
		if (data.length > 0) {
			return res.json(__WEBPACK_IMPORTED_MODULE_1__units_resFormat__["a" /* default */].success({
				type: 'local',
				bookList: data
			}));
		} else {
			__WEBPACK_IMPORTED_MODULE_2__controllers_crawlerController__["a" /* default */].searchBook(bookName).then(data => {
				return res.json(__WEBPACK_IMPORTED_MODULE_1__units_resFormat__["a" /* default */].success({
					type: 'online',
					bookList: data
				}));
			}).catch(err => {
				return res.json(__WEBPACK_IMPORTED_MODULE_1__units_resFormat__["a" /* default */].error(err));
			});
		}
	});
});

router.get('/api/book/menu', function (req, res, next) {
	const type = req.query.type;
	const page = typeof req.query.page == 'undefined' ? 1 : req.query.page;
	const direct = typeof req.query.direct == 'undefined' ? 'ASC' : req.query.direct;
	const key = req.query.key;

	if (type === 'local') {
		__WEBPACK_IMPORTED_MODULE_3__controllers_bookController__["a" /* default */].getMenu(key, page, direct).then(data => {
			return res.json(__WEBPACK_IMPORTED_MODULE_1__units_resFormat__["a" /* default */].success(data));
		}).catch(err => {
			console.log(err);
		});
	} else {
		__WEBPACK_IMPORTED_MODULE_2__controllers_crawlerController__["a" /* default */].getBookMenu(key, direct).then(data => {
			return res.json(__WEBPACK_IMPORTED_MODULE_1__units_resFormat__["a" /* default */].success(data));
		}).catch(err => {
			return res.json(__WEBPACK_IMPORTED_MODULE_1__units_resFormat__["a" /* default */].error(err));
		});
	}
});
router.get('/api/book/hot', function (req, res, next) {

	__WEBPACK_IMPORTED_MODULE_3__controllers_bookController__["a" /* default */].getRecentBook().then(data => {
		return res.json(__WEBPACK_IMPORTED_MODULE_1__units_resFormat__["a" /* default */].success(data));
	});
});
router.get('/api/book/info', function (req, res, next) {

	__WEBPACK_IMPORTED_MODULE_3__controllers_bookController__["a" /* default */].getBookInfo(req.query.id).then(data => {
		return res.json(__WEBPACK_IMPORTED_MODULE_1__units_resFormat__["a" /* default */].success(data));
	}).catch(err => {
		console.log(err);
	});
});
router.get('/api/book/section', function (req, res, next) {
	__WEBPACK_IMPORTED_MODULE_2__controllers_crawlerController__["a" /* default */].getBookSection(decodeURIComponent(req.query.link)).then(data => {
		return res.json(__WEBPACK_IMPORTED_MODULE_1__units_resFormat__["a" /* default */].success(data));
	}).catch(err => {
		console.log(err);
	});
});

/* harmony default export */ __webpack_exports__["a"] = (router);

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__response__ = __webpack_require__(9);
/**
 * Created by linfengluo@gmail.com on 2018/5/18.
 */


const resFormat = {
  error(error, msg = '出错啦，请稍后再试！') {
    return {
      code: __WEBPACK_IMPORTED_MODULE_0__response__["a" /* ERROR_CODE */],
      data: error,
      msg: msg
    };
  },

  success(result = {}, msg = '获取成功') {
    return {
      code: __WEBPACK_IMPORTED_MODULE_0__response__["c" /* SUCCESS_CODE */],
      data: result,
      msg: msg
    };
  },

  lackParams(msg = '缺少参数') {
    return {
      code: __WEBPACK_IMPORTED_MODULE_0__response__["b" /* LACK_PARAMS */],
      data: {},
      msg: msg
    };
  }
};

/* harmony default export */ __webpack_exports__["a"] = (resFormat);

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Created by linfengluo@gmail.com on 2018/5/18.
 */
const SUCCESS_CODE = 200;
/* harmony export (immutable) */ __webpack_exports__["c"] = SUCCESS_CODE;

const ERROR_CODE = 201;
/* harmony export (immutable) */ __webpack_exports__["a"] = ERROR_CODE;

const LACK_PARAMS = 202;
/* harmony export (immutable) */ __webpack_exports__["b"] = LACK_PARAMS;

const UNAUTHENTICATED = 401;
/* unused harmony export UNAUTHENTICATED */


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cheerio__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_cheerio___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_cheerio__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xss__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_xss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_xss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__units_fetch__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_mysql__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__bookController__ = __webpack_require__(3);
/**
 * Created by linfengluo@gmail.com on 2018/7/9.
 */






const SEARCH_LINK = 'https://www.baidu.com/s?wd=';
const BOOK_SITE = 'www.biquge5200.cc';
const BOOK_TABLE = 'b_list';

const ErrorLog = __webpack_require__(0).dailyfile({ root: './server/logs/error/' });
const SuccessLog = __webpack_require__(0).dailyfile({ root: './server/logs/success/' });

const crawlerController = {
	searchBook(name) {
		return new Promise((resolve, reject) => {
			const key = encodeURIComponent(`${name} site:${BOOK_SITE}`);
			const searchUrl = `${SEARCH_LINK}${key}`;
			Object(__WEBPACK_IMPORTED_MODULE_2__units_fetch__["a" /* default */])(searchUrl).then(res => {
				let $ = __WEBPACK_IMPORTED_MODULE_0_cheerio___default.a.load(res);
				let data = [];

				$('#content_left .result').each((i, elem) => {
					data.push({
						title: $(elem).find('a').text(),
						link: $(elem).find('a').attr('href')
					});
				});

				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	},

	getBookMenu(link, direct) {
		return new Promise((resolve, reject) => {
			Object(__WEBPACK_IMPORTED_MODULE_2__units_fetch__["a" /* default */])(link).then(res => {
				let $ = __WEBPACK_IMPORTED_MODULE_0_cheerio___default.a.load(res);
				let menu = [];

				const title = $('#info h1').text();
				const logo = $('#fmimg img').attr('src');
				const desc = $('#intro').text();
				const realLink = $("meta[property='og:novel:read_url']").attr("content");
				let author = '';

				$('#info p').each((i, elem) => {
					if (i == 0) {
						author = $(elem).text();
					}
				});

				$('#list dl dd').each((i, elem) => {
					let link = $(elem).find('a').attr('href');
					if (i > 8) {
						menu.push({
							title: $(elem).find('a').text(),
							link: link,
							index: link.substring(link.lastIndexOf('/') + 1, link.lastIndexOf('.'))
						});
					}
				});

				menu = menu.sort((a, b) => {
					return a.index - b.index;
				});

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
						author: author.substr(author.indexOf("：") + 1)
					}
				};
				__WEBPACK_IMPORTED_MODULE_4__bookController__["a" /* default */].addBook(result, menu[menu.length - 1].index).then(id => {
					result.bookInfo.id = id;
					result.data = direct == 'ASC' ? menu.slice(0, 50) : menu.slice(-50);
					resolve(result);
				});
			}).catch(err => {
				reject(err);
			});
		});
	},

	updateBooks(data) {
		__WEBPACK_IMPORTED_MODULE_3__config_mysql__["a" /* default */].table(BOOK_TABLE).where({
			name: data.name,
			author: data.author
		}).find().then(function (data) {
			if (!data) {
				this.addBook(data);
			} else {}
		});
	},

	updateMenu() {},

	addBook(data) {
		__WEBPACK_IMPORTED_MODULE_3__config_mysql__["a" /* default */].table(BOOK_TABLE).add({
			name: data.name,
			author: data.author,
			logo: data.logo,
			href: data.bookLink,
			lastIndex: data.menu[data.menu.length - 1].index,
			createdAt: new Date().valueOf(),
			updatedAt: new Date().valueOf()
		}).then(insertId => {
			SuccessLog.info(`${data.name}: 添加成功（${insertId}）`);
		}).catch(err => {
			ErrorLog.info(`${data.name}: 添加失败(${err})`);
		});
	},

	getBookSection(link) {
		return new Promise((resolve, reject) => {
			Object(__WEBPACK_IMPORTED_MODULE_2__units_fetch__["a" /* default */])(link).then(res => {
				let $ = __WEBPACK_IMPORTED_MODULE_0_cheerio___default.a.load(res);
				let data = {
					content: '',
					next: '',
					prev: '',
					title: ''
				};

				data.content = __WEBPACK_IMPORTED_MODULE_1_xss___default()($('#content').html());
				data.title = $('.bookname h1').text();
				data.name = $('meta[name=keywords]').attr('content').split(',')[0];

				$('.bottem1 a').each((i, elem) => {
					if ($(elem).text().match('上一章')) {
						data.prev = $(elem).attr('href');
					}

					if ($(elem).text().match('下一章')) {
						data.next = $(elem).attr('href');
					}
				});

				resolve(data);
			}).catch(err => {
				reject(err);
			});
		});
	}
};

/* harmony default export */ __webpack_exports__["a"] = (crawlerController);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("xss");

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_puppeteer__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_puppeteer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_puppeteer__);
/**
 * Created by linfengluo@gmail.com on 2018/7/9.
 */

const ErrorLog = __webpack_require__(0).dailyfile({ root: './server/logs/error/' });
const SuccessLog = __webpack_require__(0).dailyfile({ root: './server/logs/success/' });
const fetch = (href, title = '', type = 'get') => {
	return new Promise(async (resolve, reject) => {
		let config = {
			timeout: 0,
			headless: true
		};

		if (false) {
			config.executablePath = "E:\\temp\\demo\\bookReader\\chromium\\chrome.exe";
		} else {
			config.args = ['--no-sandbox', '--disable-setuid-sandbox'];
		}
		try {
			const browser = await __WEBPACK_IMPORTED_MODULE_0_puppeteer___default.a.launch(config);
			const page = await browser.newPage();
			await page.goto(href);
			const content = await page.content();
			await browser.close();
			resolve(content);
		} catch (err) {
			ErrorLog.error(`puppeteer : ${err}`);
		}
	});
};

/* harmony default export */ __webpack_exports__["a"] = (fetch);

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("puppeteer");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("node-mysql-promise");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'book',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: [{
    src: '~/scss/main.scss',
    lang: 'scss'
  }],
  plugins: ['~/plugins/muse.js', {
    src: '~/plugins/globalMixins.js',
    ssr: true
  }],
  build: {
    /*
    ** Run ESLint on save
    */
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map