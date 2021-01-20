const fetch = require('node-fetch');
var fetchCalorie = (req,res)=>{
    let foodItem=req.headers.body;
    fetch("https://api.nutritionix.com/v1_1/search/"+foodItem+"?results=0:20&fields=*&appId=f7d44523&appKey=3a7c7173326ffd4676e44486695085e7")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        let calorie=data.hits[0].fields.nf_calories;
        res.json(calorie)
    })
    .catch((err) => {
        console.log(err.message);
    })

};
module.exports.fetchCalorie = fetchCalorie;