const cors = require('cors');
const express = require('express');
var bodyParser = require('body-parser')
const initRoutes = require("./src/routers");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

global.__basedir = __dirname;

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(express.json());

initRoutes(app);

const port = process.env.PORT || 8081;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});
