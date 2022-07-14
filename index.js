var express = require("express");
var http = require("http");
var path = require("path");
var nodemailer = require("nodemailer");


var app = express();
var server = http.Server(app);
var port = 786;

app.set("port", port);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));

// Routing
app.get("/", function(req, response){
    response.sendFile(path.join(__dirname, "public/index.html"))
});


app.post("/send_email", function(req, response) {
    var fullName = req.body.name;
    var email = req.body.email;
    var subject = req.body.subject;
    var message = req.body.message;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'wasinodemailtest@gmail.com',
            pass: 'ukafetuuypfyzxyq'
        }
    });

    var mailOptions = {
        fullName: fullName,
        email: email,
        subject: subject,
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            // alert("Error");
            console.log(error);
        } else {
            // alert("Email sent Succesfully: " + info.response);
            console.log("Email Sent: " + info.response);
        }
        response.redirect("/");
    });
});


// Initialize Web Server
server.listen(port, function() {
    console.log("Starting server on port" + port);
});

console.clear();