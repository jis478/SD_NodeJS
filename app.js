const express = require('express');
const multer = require("multer");
const sharp = require("sharp");
const axios = require('axios');
const fs = require("fs");

function main() {
    const app = express();
    const upload = multer();

    app.get("/", (req,res) => {
        res.end(fs.readFileSync("index.html", "utf8"))
    })

    app.post('/translation', upload.single('image_file'), async function (req, res) {
        console.log("processing..")
        // to-do: center-crop
        const result_image = await toonfilter_on_image(req.file.buffer)
        res.send(result_image) 
        // const boxes = await detect_objects_on_image(req.file.buffer);
        // res.json(boxes);
    });

    app.listen(8080, () => {
        console.log('Server is listening on port 8080')
    });

main()


async function toonfilter_on_image(input) {
    const outputs = await api. 
    model.run({images:input});
    return outputs["output0"].data;
}


async function callRemoteAPI() {
  try {
    const response = await axios.get('https://api.example.com/data');
    // Process the response data
    console.log(response.data);
  } catch (error) {
    // Handle any errors that occurred during the API call
    console.error(error);
  }
}

callRemoteAPI();
