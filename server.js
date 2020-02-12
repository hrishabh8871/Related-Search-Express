var http = require('http')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const port = 8080
const searchArr = ['Milkly', 'Teatly', 'Milk', 'Monkey', 'Monkey cat', 'Mozzella', 'Milkybar', 'Tea', 'Cashew', 'Almonds']
app.post('/', function(req, res) {
   var searchItem = req.body.searchItem;
   var newArr = []
   const relatedSearch = (query) => {
       query = query.toLowerCase()
       const regRule = Array.from(query).reduce((a, v, i) => `${a}[^${query.substr(i)}]*?${v}`, '')
       const re = RegExp(regRule);
       newArr =  searchArr.filter(v => v.toLowerCase().match(re));
       newArr.sort((a, b) => {
           if(a.length > b.length) {
               return 1
           }
       })
       return newArr
   }
   res.send(relatedSearch(searchItem))   
      
})
app.listen(port, () => console.log(`Server is running on port no ${port}`));