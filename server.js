const app = require('express')();

app.listen(5000, ()=>console.log('...'));

var o = {"json":true,"data":[0,1,2,3,4,5]};

app.get('/api', (req,res)=>{
    res.send(JSON.stringify(o));
});

