const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('./src'));
app.listen(port, () => console.log(`Serving on at http://localhost:${port}`));