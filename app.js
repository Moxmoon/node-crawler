
const Koa = require('koa');
const app = new Koa()
const cheerioFun = require('./crawler/cheerio')
const puppeteerFun = require('./crawler/puppeteer')

app.listen(8008);

cheerioFun.douban()
cheerioFun.lianjia()
// puppeteerFun.getPic()