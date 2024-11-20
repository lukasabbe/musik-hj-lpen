const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.use(express.json());

app.get('/:bossa', async (req, res) => {
    let data =  await fetch(`https://bossan.musikhjalpen.se/page-data/${req.params.bossa}/page-data.json`);
    let json = await data.json();
    data = await fetch(`https://musikhjalpen-franceska.herokuapp.com/server/fundraisers/${json.result.data.contentfulFundraiser.contentful_id}?fields%5B%5D=amount&fields=prev_amount`)
    json = await data.json();
    res.set("Access-Control-Allow-Origin","*").json(json);
})

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});