const express = require('express');
const app = express();
const client = require('mqtt').connect('mqtt://broker.hivemq.com');
const fs = require('fs');

const PORT = 5000;
//const APIKEY = 'Y6whOqArJVQ98fnCHRrUt6OfvCCQithxo0bACWsVaqF2B5FN21YDPbJMMd0d';

var state = fs.readFileSync('state.json');
var o = JSON.parse(state);

const server = app.listen(PORT, () => {
    console.log(`listening on 0.0.0.0:${PORT} ...`);
});

app.get('/', (req, res) => {
    res.send(`API | GIP - 6TEA`)
});

app.get('/getState', (req, res) => {
    res.send(o);
});

app.get('/updateState/:type/:value', (req, res) => {
    let type = req.params.type;
    let value = Number(req.params.value);
    let reply;

    o[type] = value;
    fs.writeFile('state.json',JSON.stringify(o), () => {});
    reply = {'status':'succes', 'update':o};
    
    console.log(type)
    res.send(reply);
});

app.get('/sendMQTT/:topic/:msg', (req,res) => {
    let key = req.params.apikey
    //if(key !== APIKEY) return res.send({'status':'failed','error':'wrong api key'});
    let tpc = req.params.topic;
    let msg = req.params.msg;

    client.publish(`dragino-1e9d94/test/${tpc}`, msg);
    let reply = {'status':'succes','topic':tpc,'message': msg}
    res.send(reply);
});

app.use('/static', express.static('public'))

// MQTT STUFF!
client.on('connect', (e) => {
    client.subscribe('dragino-1e9d94/#');
});

client.on('message', (topic, message) => {
    let msg = message.toString()
    //console.log(`Received msg: ${msg} from ${topic}`);
});

