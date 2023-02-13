const uploadFile = require("../middlewares/upload");
const fs = require("fs");
const baseUrl = "http://localhost:8081/files/";

const upload = async (req, res) => {
    console.log(req.body);
    try {
        await uploadFile(req, res);
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        console.log(req.file);
        res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname
        });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!"
            });
        }
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`
        });
    }
};

const getListFiles = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }
        let fileInfos = [];
        files.forEach((file) => {
            let url = baseUrl + file.toString();
            url = url.split(' ').join('_'); 
            console.log(url);
            fileInfos.push({
                name: file,
                url
            });
        });
        res.status(200).send(fileInfos);
    });
};

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};

const deleteFile = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    fs.unlink(directoryPath + fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not delete the file. " + err,
            });
        }
        res.status(200).send({
            message: "Deleted the file successfully!",
        });
    });
};

const writeFile =(req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    
    console.log(req.params.name);

    const content = req.body.content +"\r\n";
    console.log(content);

    fs.appendFile(directoryPath + fileName, content, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not write the file. " + err,
            });
        }
        res.status(200).send({
            message: "Write the file successfully!",
        });
    });
}

module.exports = {
    upload,
    getListFiles,
    download,
    deleteFile,
    writeFile
};