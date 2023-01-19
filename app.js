const express = require('express');
const converter = require('json-2-csv');
const fs = require('fs');
const app = express();
// const legacy = JSON.parse(fs.readFileSync('./LegacyReport.json'));
// const legacyIsDemo = JSON.parse(fs.readFileSync('./LegacyReport-isDemo.json'));
// const learnerProgress = JSON.parse(fs.readFileSync('./LearnerProgressReport.json'));
// const b2cReport = JSON.parse(fs.readFileSync('./B2CReport.json'));
// const b2cIos = JSON.parse(fs.readFileSync('./b2c-ios-all.json'));
// const b2cIosOrder = JSON.parse(fs.readFileSync('./b2c-Ios-OrderReports.json'));
// const LearnerActivationLegavy = JSON.parse(fs.readFileSync('./LearnerActivationLegavy.json'));
// const B2C = JSON.parse(fs.readFileSync('./B2C.json'));

// // convert JSON array to CSV string
// converter.json2csv(B2C, (err, csv) => {
//   if (err) {
//     throw err
//   }

//   // print CSV string
//   console.log(csv)
//   // write CSV to a file
//   fs.writeFileSync('B2C_data.csv', csv)
// })
app.get('*', (req, res) => {
  res.send('Hello World')
});

app.listen(5050, () => {
  console.log('Server is running on 5050')
})