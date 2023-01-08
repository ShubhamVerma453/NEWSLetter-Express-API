const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");
const https = require("https");
// const { response } = require("express");

const app = express();
app.use(express.static("public"));              // so it can use static/local css files and img
app.use(bodyParser.urlencoded({extended: "true"}));     // to get form data

app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/signup.html");
});

app.post("/", (req, res)=>{
    const lname = req.body.lname;
    const fname = req.body.fname;
    const email = req.body.email;
    const data = {
        members: [{
            email_address : email,
            status : "subscribed",
            merge_fields : {
                FNAME: fname,
                LNAME: lname,
            },
        }],
    };

    var jsonData = JSON.stringify(data);
    var url = 'https://us13.api.mailchimp.com/3.0/lists/44b07badff';
    var option = {
        method : 'POST',
        auth : 'shubham:559f9e67f5473416c0e41cdcf46a520a-us13',

    };
    const request = https.request(url, option, (response)=>{
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/sucess.html");
        } else {
            res.sendFile(__dirname+"/fail.html");
        }
    });
    // res.send("ok");
    request.write(jsonData);
    request.end();
});

app.listen(process.env.PORT || 3000, ()=>{
    console.log("listening");
});


// API Key    559f9e67f5473416c0e41cdcf46a520a-us13

// Audiance key   44b07badff