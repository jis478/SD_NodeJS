const express = require('express');
const multer = require("multer");
const axios = require('axios');
const fs = require("fs");


function main() {
    const app = express();
    const upload = multer();
    const baseUrl = 'https://127.0.0.1:7860/sdapi/v1'

    app.use(express.urlencoded({ extended: true }));
    
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
        const prompt = requestBody.prompt
        const steps = requestBody.steps;
        const resultImage = await txt2img(baseUrl, steps, prompt);
        res.render('txt2img', {image: resultImage})
        console.log("finished..")
    });

    app.listen(8080, () => {
        console.log('Server is listening on port 8080')
    });

  }


async function txt2img(baseUrl, steps, prompt) {
  try {
    postUrl = baseUrl + "/txt2img"
    const request = await axios.post(postUrl, {
        prompt: prompt,
        steps: steps
    });
    let resultImage = await request.data.images;
    return resultImage

  } catch (err) {
    console.error(err)
  }
}

main();