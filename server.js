const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`listening on ${port}...`);
});

const o = { arr: [12, 45, 12, 2, 54, 78] };

app.get("/", (res, req) => {
    res.send(o);
});
