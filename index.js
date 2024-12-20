const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/money/:bossa', async (req, res) => {

    if(req.params.bossa === null || req.params.bossa == "favicon.ico") return res.status(400).json({error: "No bossa id provided"});

    let data = await fetch(`https://bossan.musikhjalpen.se/page-data/${req.params.bossa}/page-data.json`);
    if(data.status != 200) return res.status(400).json({error: "Invalid bossa id"});
    let json = await data.json().catch();
    data = await fetch(`https://musikhjalpen-franceska.herokuapp.com/server/fundraisers/${json.result.data.contentfulFundraiser.contentful_id}?fields%5B%5D=amount&fields=prev_amount`)
    json = await data.json()
    res.json(json);
})

app.get('/:bossa', async (req, res) => {

    if(req.params.bossa === null || req.params.bossa == "favicon.ico") return res.status(400).json({error: "No bossa id provided"});

    let data = await fetch(`https://bossan.musikhjalpen.se/page-data/${req.params.bossa}/page-data.json`);
    if(data.status != 200) return res.status(400).json({error: "Invalid bossa id"});
    let json = await data.json().catch();
    res.json(json);
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});