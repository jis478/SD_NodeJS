// port: 50673 (mapped to 6006)
const express = require("express");
const multer = require("multer");
const PORT = 6006;

function main() {
    const app = express();
    const upload = multer();

    // app.get("/", (req, res) => {
    //     res.send(fs.readFileSync("index.html", "utf8"))
    // })

    app.get("/", (req, res) => {
        console.log("test")
        res.send("hello")
    });

    app.post('/detect', upload.single('image_file'), async function (req, res) {
        console.log('image uploaded!')
    });

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    });
}

main()
