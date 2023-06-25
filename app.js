const express = require('express');
const multer = require("multer");
const axios = require('axios');
const fs = require("fs");
const cors = require("cors")
const path = require('path');


function main() {
    const app = express();
    const upload = multer();
    const baseUrl = 'http://10.168.73.84:50626/sdapi/v1'

    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.engine('html', require('ejs').renderFile);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));    
    app.use(cors());    
    
    app.get("/", (req,res) => {
        console.log("Welcome to NodeJS SD app!")
        // res.end(fs.readFileSync("index.html", "utf8"))
    })

    app.post('/translation', upload.single('image_file'), async function (req, res) {
        console.log("processing..")
        // to-do: center-crop
        const result_image = await toonfilter_on_image(req.file.buffer)
        res.send(result_image) 
        // const boxes = await detect_objects_on_image(req.file.buffer);
        // res.json(boxes);
    });

    app.post('/txt2img', async function (req, res) {
        console.log("processing..")        
        const requestBody = req.body;
        console.log(requestBody)
        const prompt = requestBody.prompt
        const steps = requestBody.steps;
        const resultImage = await txt2img(baseUrl, steps, prompt);        
        res.render('txt2img.html', {imageUrl: resultImage})
        console.log("finished..")
    });

    app.listen(8080, () => {
        console.log('Server is listening on port 8080')
    });

  }

async function txt2img(baseUrl, steps, prompt) {
  try {
    postUrl = baseUrl + "/txt2img"
    const response = await axios.post(postUrl, {
        prompt: prompt,
        steps: steps
    });
    let resultImage = await response.data.images;
    return resultImage

  } catch (err) {
    console.error(err)
  }
}

main();