
const axios = require('axios')
const cheerio = require('cheerio')
const writeData = require('../utils/xlsx')

module.exports = {
    douban: function () {
        const url = "https://movie.douban.com/top250"
        const movies = []
        const excel = []
        excel.push(['ID', '电影名', '豆瓣评分'])
        axios.post(url).then(async ({ data }) => {
            $ = cheerio.load(data)
            const content = $('.item')
            console.log('***开始抓取****')
            content.map(i => {
                const movieInfo = $(content[i]).children('.info')
                const hd = $(movieInfo).children('.hd')
                const bd = $(movieInfo).children('.bd')
                const star = $(bd).children('.star')
                const rating = $(star).children('.rating_num').text()
                const a = $(hd).children('a')
                const title = $(a).children('.title')
                const title_cn = $(title[0]).text()
                const title_en = $(title[1]).text()
                const obj = {
                    "电影名称": title_cn + title_en,
                    "豆瓣评分": rating,
                }
                excel.push([i + 1, title_cn, rating])
                movies.push(obj)
            })
            console.log('***爬虫成功****')
            writeData(excel, '豆瓣')
        })
    },
    lianjia: function () {
        const url = "https://hf.lianjia.com/ershoufang/binhuxinqu/"
        const homes = []
        const excel = []
        excel.push(['ID', '标题', '单价', '总价', '地址', '描述',])
        axios.post(url).then(async ({ data }) => {
            $ = cheerio.load(data)
            const content = $('.info.clear')
            console.log('***开始抓取****', content)

            content.map(i => {
                const title = $(content[i]).children('.title').text()
                const flood = $(content[i]).children('.flood').children('.positionInfo').children('a').text()
                const address = $(content[i]).children('.address').children('.houseInfo').text()
                const totalPrice = $(content[i]).children('.priceInfo').children('.totalPrice').text()
                const unitPrice = $(content[i]).children('.priceInfo').children('.unitPrice').text()
                const obj = {
                    "标题": title,
                    "地址": flood,
                    "描述": address,
                    "总价": totalPrice,
                    "单价": unitPrice,
                }
                excel.push([i + 1, title, unitPrice, totalPrice, flood, address])
                homes.push(obj)
                console.log('***爬虫成功****', homes)
            })
            writeData(excel, '链家')
        })
    }
}