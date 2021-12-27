var app = require("express")();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();

// import all the things we need
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//create a connection to database
mongoose.connect(
    "mongodb+srv://testuser001:123asd@cluster0.23h33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

//define a "table" structure
var CustomerSchema = new mongoose.Schema({
    customerId: String,
    customerEmail: String,
    customerPassword: String,
    fullName: String,
    lastName: String,
    firstName: String,
    address: String,
    food: [{ food_id: String, provider: String }],
    token: String,
    verificationCode: Number,
});

//create a model Student ==> students (database collection)
//Teacher => teachers , Course => courses
var Customer = mongoose.model("Customer", CustomerSchema);

var FoodSchema = new mongoose.Schema({
    foodId: String,
    foodName: String,
    foodSteps: [{ stepNum: String, stepDetail: String }],
    foodIngredients: [
        {
            ingredientName: String,
            ingredientNum: String,
            ingredientLast: String,
        },
    ],
    foodCalories: String,
    customerId: String,
});

var Food = mongoose.model("Food", FoodSchema);

function signInGoogle(passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/callback",
            },
            (accessToken, refreshToken, profile, done) => {
                Customer.find(
                    { customerId: profile.id },
                    function (err, customer) {
                        if (0 == customer.length) {
                            var result = {
                                customerId: profile.id,
                                customerEmail: profile.emails[0].value,
                                customerPassword: "NULL",
                                lastName: profile.name.familyName,
                                firstName: profile.name.givenName,
                                address: "NULL",
                                food: [],
                                token: "",
                                verificationCode: 0,
                            };
                            var email = profile.emails[0].value;
                            const token = jwt.sign(
                                { user_id: result.customerId, email },
                                process.env.TOKEN_KEY,
                                {
                                    expiresIn: "2h",
                                }
                            );
                            result.token = token;
                            Customer.create(
                                result,
                                function (errors, placeResult) {
                                    done(null, placeResult);
                                }
                            );
                        } else {
                            done(null, customer[0]);
                        }
                    }
                );
            }
        )
    );

    // used to serialize the user for the session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        Customer.findById(id, (err, user) => done(err, user));
    });
}
signInGoogle(passport);

app.use(bodyParser.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl:
                "mongodb+srv://testuser001:123asd@cluster0.23h33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        }),
    })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/index"));
app.use("/auth", require("./routes/auth"));

//create a connection to database
mongoose.connect(
    "mongodb+srv://testuser001:123asd@cluster0.23h33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const tokenVerified = (req, response, next) => {
    const token =
        req.body.token || req.query.token || req.headers[x - access - token];
    if ("" == token) {
        return response.send([{ invalid: "Invalid" }]);
    } else {
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decoded;
        } catch (err) {
            return response.send({ invalid: "Invalid" });
        }

        return next();
    }
};

app.get("/customers", function (req, res) {
    Customer.find({}, function (err, customers) {
        res.send(customers);
    });
});

app.get("/customer/:id", function (req, response) {
    Customer.find({ customerId: req.params.id }, function (err, customers) {
        response.send([customers[0]]);
    });
});

app.post("/customer/signin", function (req, response) {
    Customer.find(
        { customerEmail: req.body.customerUsername },
        async function (err, customer) {
            if (0 == customer.length) {
                var result = [{ invalid: "invalid" }];
                response.send(result);
            } else {
                const email = customer[0].customerEmail;
                if (
                    !(await bcrypt.compare(
                        req.body.customerPassword,
                        customer[0].customerPassword
                    ))
                ) {
                    var result = [{ invalid: "invalid" }];
                    response.send(result);
                } else {
                    const token = jwt.sign(
                        { user_id: customer[0].customerId, email },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "2h",
                        }
                    );
                    Customer.findOneAndUpdate(
                        { customerId: customer[0].customerId },
                        { $set: { token: token } },
                        { new: true },
                        function (error, customerCustomer) {
                            var result = [
                                {
                                    customerId: customer[0].customerId,
                                    token: token,
                                },
                            ];
                            response.send(result);
                        }
                    );
                }
            }
        }
    );
});

app.post("/customer/register", function (req, response) {
    Customer.find(
        { customerEmail: req.body.customerUsername },
        function (err, customer) {
            if (0 == customer.length) {
                var count = 0;
                Customer.find({}, async function (error, customers) {
                    const name = req.body.customerUsername;
                    for (let i = 0; i < customers.length; ++i) {
                        if (
                            count <
                            parseInt(customers[i].customerId.split("-")[1])
                        ) {
                            count = parseInt(
                                customers[i].customerId.split("-")[1]
                            );
                        }
                    }
                    count = count + 1;

                    var guestId = "CUSTOMER-" + count;

                    var encryptedPassword = await bcrypt.hash(
                        req.body.customerPassword,
                        10
                    );
                    var result = {
                        customerId: guestId,
                        customerEmail: req.body.customerUsername,
                        customerPassword: encryptedPassword,
                        fullName: "NULL",
                        lastName: req.body.customerLastName,
                        firstName: req.body.customerFirstName,
                        address: "NULL",
                        food: [],
                        token: "",
                        verificationCode: 0,
                    };

                    const token = jwt.sign(
                        { user_id: result.customerId, name },
                        process.env.TOKEN_KEY,
                        {
                            expiresIn: "2h",
                        }
                    );
                    result.token = token;
                    Customer.create(result, function (errors, placeResult) {
                        response.send([placeResult]);
                    });
                });
            } else {
                var result = [{ invalid: "invalid" }];
                response.send(result);
            }
        }
    );
});

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
app.post("/api/v1/auth/google", async (req, response) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { sub, name, email, picture } = ticket.getPayload();
    var result = {
        customerId: sub,
        customerEmail: email,
        customerPassword: "NULL",
        fullName: name,
        lastName: "NULL",
        firstName: "NULL",
        address: "NULL",
        food: [],
        token: "",
        verificationCode: 0,
    };
    Customer.create(result, function (errors, placeResult) {
        response.send(placeResult);
    });
});

app.engine("html", require("jade").renderFile);
app.set("view engine", "html");

app.post("/customers/reset/email", function (req, response) {
    Customer.find(
        { customerEmail: req.body.customerEmail },
        function (err, customers) {
            if (customers.length == 0) {
                response.send("The email is invalid");
            } else {
                var randomToken = "";
                Customer.find({}, function (fls, list) {
                    while (true) {
                        var checktoken = false;
                        randomToken = crypto.randomBytes(20).toString("hex");
                        for (let i = 0; i < list.length; ++i) {
                            if (randomToken == list[i].resetPasswordToken) {
                                checktoken = true;
                            }
                        }
                        if (checktoken) {
                        } else {
                            break;
                        }
                    }
                    var sendTime = Date.now();
                    Customer.findOneAndUpdate(
                        { customerEmail: req.body.customerEmail },
                        {
                            $set: {
                                resetPasswordToken: randomToken,
                                resetPasswordExpires: sendTime + 300000,
                            },
                        },
                        { new: true },
                        async function (ok, customerReplace) {
                            let link =
                                "http://localhost:9000" +
                                "/api/auth/validate/form/" +
                                randomToken;
                            try {
                                const transporter = nodemailer.createTransport({
                                    service: "gmail",
                                    port: 587,
                                    secure: true,
                                    auth: {
                                        user: "cooky.comp@gmail.com",
                                        pass: "2631988dd",
                                    },
                                });

                                await transporter.sendMail({
                                    from: "cooky.comp@gmail.com",
                                    to: req.body.customerEmail,
                                    subject: "Password change request",
                                    text: ` 
                        Please click on the following link ${link} to reset your password. \n\n 
                        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
                                });
                                console.log("email sent sucessfully");
                                response.send({
                                    test:
                                        "A reset email has been sent to" +
                                        req.body.customerEmail,
                                });
                            } catch (error) {
                                console.log(error, "email not sent");
                                response.send("A reset email can not be sent");
                            }
                        }
                    );
                });
            }
        }
    );
});
app.get("/customer/something", function (req, response) {
    response.render("test.jade");
});
app.get("/api/auth/validate/form/:getToken", function (req, response) {
    Customer.find(
        { resetPasswordToken: req.params.getToken },
        function (err, customers) {
            if (customers.length == 0) {
                response.render("aware.jade");
            } else {
                response.render("reset.jade", {
                    result: customers[0].resetPasswordToken,
                });
            }
        }
    );
});

app.post("/api/auth/reset/:getToken", function (req, response) {
    Customer.find(
        { resetPasswordToken: req.params.getToken },
        async function (err, customers) {
            if (customers.length == 0) {
                response.render("aware.jade");
            } else {
                var getDate = Date.now();
                if (customers[0].resetPasswordExpires < getDate) {
                    response.render("aware.jade");
                } else {
                    var encryptedPassword = await bcrypt.hash(
                        req.body.password,
                        10
                    );
                    Customer.findOneAndUpdate(
                        { resetPasswordToken: customers[0].resetPasswordToken },
                        {
                            $set: {
                                resetPasswordToken: undefined,
                                resetPasswordExpires: undefined,
                                customerPassword: encryptedPassword,
                            },
                        },
                        { new: true },
                        function (ok, customerReplace) {
                            response.redirect("http://localhost:3000/signin");
                        }
                    );
                }
            }
        }
    );
});

app.listen(9000);
