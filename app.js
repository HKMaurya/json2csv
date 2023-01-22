const express = require('express');
const converter = require('json-2-csv');
const fs = require('fs');
const multer = require("multer");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'));


const getOriginalname = (originalname) => {
  return originalname.split('.')[0];
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, getOriginalname(file.originalname) + '.json') //Appending .jpg
  }
});
const upload = multer({ storage: storage });

const checkFileExtension = (image, imgExt) => {
  const array_of_allowed_files = ['json'];
  const array_of_allowed_file_types = ['application/json'];
  // Check if the uploaded file is allowed
  return !array_of_allowed_files.includes(imgExt) && !array_of_allowed_file_types.includes(image.memetype) ? false : true;
}

const getFileExtension = (image) => {
  let fileExt = image.originalname.slice(
    ((image.originalname.lastIndexOf('.') - 1) >>> 0) + 2
  );
  return fileExt.toLowerCase();
}

const uploadFiles = async(req, res) => {
  try {
    const host = req.get('host');
    if (!req.file) return res.status(400).send({error: "Invalid file"});
    // Get the extension of the uploaded file
    let image = req.file;
    const file_extension = getFileExtension(image);
    const isValidFile = checkFileExtension(image, file_extension);
    if (!isValidFile) return res.status(400).send({error: "Invalid file"});
    const fileInfo = JSON.parse(fs.readFileSync(__dirname + `/${image.path}`));
    let originalName = getOriginalname(image.originalname);
    converter.json2csv(fileInfo, (err1, csv) => {
        if (err1) throw err1;
        // write CSV to a file
        console.log(csv, 'csv+++++')
        fs.writeFileSync(__dirname + `/uploads/${originalName}.csv`, csv)
        res.status(200).send({message : "succeeded in converted", data: host + `/csv/${originalName}.csv`});
    });

  } catch(err) {
    console.log(err, 'errr');
    return res.status(500).send({error: err});
  }
}

const removeFile = async (req, res) => {
  try {
    let urlData = req.body.url;
    let csvFile = urlData.split('csv/')[1]
    let jsonFile = csvFile.replace(".csv", ".json");
    console.log(__dirname + `/uploads/${csvFile}`)
    await fs.unlink(__dirname + `/uploads/${csvFile}`);
    await fs.unlink(__dirname + `/uploads/${jsonFile}`);
    res.status(200).send({message : "succeeded", data: ''});
  }  catch(err) {
    console.log(err, 'errr');
    return res.status(500).send({error: err});
  }
}

app.post("/upload", upload.single('file'), uploadFiles);
app.use('/csv', express.static('uploads'))
app.post("/remove", removeFile);
app.get('/hello', (req, res) => {
  console.log('dsvdfgdfg 4444')
  res.send('Hello World 222 333 4353456345645645 ffff')
})

app.listen(5050, () => {
  console.log('Server is running on 5050')
})