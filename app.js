const express = require('express');
const multer = require("multer");
const axios = require('axios');
const fs = require("fs");


function main() {
    const app = express();
    const upload = multer();
    const baseUrl = 'https://127.0.0.1:7860/sdapi/v1'
    const sampler = 'Euler a'
    const steps = 20
    const prompt = "this is a test prompt"

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
        const result_image = await txt2img(baseUrl, sampler, steps, prompt)
        res.send(result_image) 
    });

    app.listen(8080, () => {
        console.log('Server is listening on port 8080')
    });

  }


async function txt2img(baseUrl, sampler, steps, prompt) {

  try {

    postUrl = baseUrl + "txt2img"
    const request = await axios.post(postUrl, {
        prompt: prompt,
        sampler: sampler,
        steps: steps
    });

    let resultImage = await request.data.images;
    return resultImage

  } catch (err) {
    console.error(err)
  }
}

main();