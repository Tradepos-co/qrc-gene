const express = require('express')
const bodyParser = require('body-parser');
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(bodyParser.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/qrc', function(req, res){

    console.log(req.body.name);
    rsults = parseData(req.body);

    res.end(rsults)
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))


function parseData(data){
  var name = getTLV(1, data.name);
  var vat_no = getTLV(2, data.vat_no);
  var date = getTLV(3, data.date);
  var total = getTLV(4, data.total);
  var total_tax = getTLV(5, data.tax);
  var dataArray = [name, vat_no, date, total, total_tax];
  return Buffer.concat(dataArray);
}

function getTLV(tagNum, tagVal) {
  var bufnum = Buffer.from([tagNum], "utf8");
  var buflen = Buffer.from([tagVal.length], "utf8");
  var bufname = Buffer.from(tagVal, "utf8");
  var bufArray = [bufnum, buflen, bufname];
  return Buffer.concat(bufArray);
}