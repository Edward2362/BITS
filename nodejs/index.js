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
const path = require('path');
var proxy = require('express-http-proxy');
require("dotenv").config();
app.use(express.static(path.resolve(__dirname,'build')));
// import all the things we need
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//create a connection to database
mongoose.connect(
    "mongodb+srv://testuser001:123asd@cluster0.23h33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

app.use(
    bodyParser.json({
        limit: "50mb",
    })
);

app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        parameterLimit: 100000,
        extended: true,
    })
);
app.use('/proxy', proxy('http://localhost:'+process.env.PORT));
//define a "table" structure
var CustomerSchema = new mongoose.Schema({
    customerId: String,
    customerEmail: String,
    customerPassword: String,
    fullName: String,
    lastName: String,
    firstName: String,
    customerImage: String,
    address: String,
    food: [
        {
            foodId: String,
            foodImage: String,
            foodName: String,
            provider: String,
        },
    ],
    token: String,
    verificationCode: Number,
});

//create a model Student ==> students (database collection)
//Teacher => teachers , Course => courses
var Customer = mongoose.model("Customer", CustomerSchema);

var FoodSchema = new mongoose.Schema({
    foodId: String,
    foodName: String,
    foodCalories: String,
    foodImage: String,
    foodIngredients: [{ ingredientName: String, ingredientAmount: String }],
    foodSteps: [{ stepDescription: String }],
    foodDiets: [{ dietName: String }],
    customerId: String,
});

var Food = mongoose.model("Food", FoodSchema);

var CommentSchema = new mongoose.Schema({
    commentId: String,
    commentDescription: String,
    commentDate: Date,
    customerId: String,
    customerLastName: String,
    customerFirstName: String,
    customerImage: String,
    foodId: String,
});

var Comment = mongoose.model("Comment", CommentSchema);

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
                                customerImage: "NULL",
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

function tokenVerified(req, response, next) {
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"];

    if ("" == token) {
        return response.send([{ invalid: "Invalid" }]);
    } else {
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decoded;
        } catch (err) {
            return response.send([{ invalid: "Invalid" }]);
        }
        next();
    }
}

function isPlaceIncluded(value) {
    var place = value.trim();
    var arr = place.split("");
    var result = false;
    for (let i = 0; i < arr.length; ++i) {
        if (" " != arr[i]) {
        } else {
            result = true;
        }
    }
    return result;
}

function foodIndex(arr, foodId) {
    var result = 0;

    for (let i = 0; i < arr.length; ++i) {
        if (foodId != arr[i].foodId) {
        } else {
            result = i;
        }
    }

    return result;
}

var findIndexElement = (array, value) => {
    var result = -1;
    if (0 != array.length) {
        for (let i = 0; i < array.length; ++i) {
            if (value.foodId == array[i].foodId) {
                if (value.provider == array[i].provider) {
                    result = i;
                }
            }
        }
    } else {
        result = -1;
    }
    return result;
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
                        customerImage: req.body.customerImage,
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

    const elementInName = name.split(" ");

    var result = {
        customerId: sub,
        customerEmail: email,
        customerPassword: "NULL",
        fullName: name,
        lastName: elementInName[0],
        firstName: elementInName[elementInName.length - 1],
        customerImage: picture,
        address: "NULL",
        food: [],
        token: "",
        verificationCode: 0,
    };

    const customerName = result.customerEmail;

    const customerToken = jwt.sign(
        { user_id: result.customerId, customerName },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
    );

    result.token = customerToken;

    Customer.create(result, function (errors, placeResult) {
        var resultGoogle = [
            {
                customerId: result.customerId,
                token: customerToken,
            },
        ];
        response.send(resultGoogle);
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
                                        user: "restcipe.comp@gmail.com",
                                        pass: "Restcipe_5",
                                    },
                                });

                                await transporter.sendMail({
                                    from: "restcipe.comp@gmail.com",
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

app.get(
    "/customer/customerFoodIn/:customerId/:foodId",
    tokenVerified,
    function (req, response) {
        Customer.find(
            {
                customerId: req.params.customerId,
                food: { $elemMatch: { foodId: req.params.foodId } },
            },
            function (err, customers) {
                if (0 == customers.length) {
                    response.send([{ customer: "Customer" }]);
                } else {
                    response.send([{ result: "Customer" }]);
                }
            }
        );
    }
);

app.post(
    "/customer/customerFoodInArray",
    tokenVerified,
    function (req, response) {
        var customerId = req.body.customerId;
        Customer.find({ customerId: customerId }, function (err, customers) {
            var food = req.body;
            var result = [];
            delete food.customerId;

            result = result.concat(customers[0].food);
            result.push(food);

            Customer.findOneAndUpdate(
                { customerId: customerId },
                { $set: { food: result } },
                { new: true },
                function (error, placeCustomers) {
                    response.send([{ result: "Customers" }]);
                }
            );
        });
    }
);

app.post(
    "/customer/removeFavoriteRecipe",
    tokenVerified,
    function (req, response) {
        Customer.find(
            { customerId: req.body.customerId },
            function (err, customers) {
                var customerfood = customers[0].food;
                var findIndex = findIndexElement(customerfood, req.body.foodId);
                customerfood.splice(findIndex, 1);
                Customer.findOneAndUpdate(
                    { customerId: req.body.customerId },
                    { $set: { food: customerfood } },
                    { new: true },
                    function (ok, customerfood) {
                        response.send([{ result: "Customers" }]);
                    }
                );
            }
        );
    }
);

app.post("/customer/customerUpdate", tokenVerified, function (req, response) {
    var customerId = req.body.customerId;
    var customer = req.body;
    delete customer.customerId;

    Customer.findOneAndUpdate(
        { customerId: customerId },
        { $set: customer },
        { new: true },
        function (err, customer) {
            response.send([{ result: customer }]);
        }
    );
});

app.get("/food", function (req, response) {
    Food.find({}, function (err, food) {
        response.send(food);
    });
});

app.get("/foodPlace/:id", function (req, response) {
    Food.find({ foodId: req.params.id }, function (err, food) {
        response.send([{ result: food[0] }]);
    });
});

app.get("/customerFood/:customerId", tokenVerified, function (req, response) {
    Food.find({ customerId: req.params.customerId }, function (err, food) {
        response.send([{ result: food }]);
    });
});

app.get(
    "/placeFood/:avoid/:caloriesFrom/:caloriesTo/:ingredientUpTo/:diets/:foodIndex",
    function (req, response) {
        Food.find(
            {},
            null,
            { sort: { foodCalories: 1 } },
            function (err, food) {
                var avoidNeeded = req.params.avoid;
                var avoid = avoidNeeded.trim();
                avoid = avoid.toLowerCase();
                var foodArray = [];

                if (isPlaceIncluded(avoid)) {
                    var arr = avoid.split(" ");
                    for (let i = 0; i < food.length; ++i) {
                        var count = 0;
                        for (let index = 0; index < arr.length; ++index) {
                            var place = false;

                            var regex = new RegExp(arr[index]);

                            for (
                                let placeIndex = 0;
                                placeIndex < food[i].foodIngredients.length;
                                ++placeIndex
                            ) {
                                if (
                                    !regex.test(
                                        food[i].foodIngredients[
                                            placeIndex
                                        ].ingredientName.toLowerCase()
                                    )
                                ) {
                                } else {
                                    place = true;
                                }
                            }

                            if (!regex.test(food[i].foodName.toLowerCase())) {
                            } else {
                                place = true;
                            }

                            if (!place) {
                            } else {
                                count = count + 1;
                            }
                        }

                        if (arr.length != count) {
                        } else {
                            foodArray.push(food[i]);
                        }
                    }
                } else {
                    for (let i = 0; i < food.length; ++i) {
                        var place = false;

                        var regex = new RegExp(avoid);
                        for (
                            let index = 0;
                            index < food[i].foodIngredients.length;
                            ++index
                        ) {
                            if (
                                !regex.test(
                                    food[i].foodIngredients[
                                        index
                                    ].ingredientName.toLowerCase()
                                )
                            ) {
                            } else {
                                place = true;
                            }
                        }

                        if (!regex.test(food[i].foodName.toLowerCase())) {
                        } else {
                            place = true;
                        }

                        if (!place) {
                        } else {
                            foodArray.push(food[i]);
                        }
                    }
                }

                var foodFinal = [];
                var foodFinalByIndex = [];
                var foodFinalMove = [];
                var foodMix = {};
                var caloriesFrom = parseFloat(req.params.caloriesFrom);
                var caloriesTo = parseFloat(req.params.caloriesTo);
                var ingredientUpTo = parseInt(req.params.ingredientUpTo);
                var diets = req.params.diets;

                var foodIndex = parseInt(req.params.foodIndex);
                for (let i = 0; i < foodArray.length; ++i) {
                    var count = 0;
                    if (0.0 == caloriesFrom) {
                        count = count + 1;
                    } else {
                        if (
                            caloriesFrom > parseFloat(foodArray[i].foodCalories)
                        ) {
                        } else {
                            count = count + 1;
                        }
                    }

                    if (0.0 == caloriesTo) {
                        count = count + 1;
                    } else {
                        if (
                            caloriesTo < parseFloat(foodArray[i].foodCalories)
                        ) {
                        } else {
                            count = count + 1;
                        }
                    }

                    if (0 == ingredientUpTo) {
                        count = count + 1;
                    } else {
                        if (
                            ingredientUpTo < foodArray[i].foodIngredients.length
                        ) {
                        } else {
                            count = count + 1;
                        }
                    }

                    if ("place" == diets) {
                        count = count + 1;
                    } else {
                        var dietCount = 0;
                        var dietArray = [];
                        dietArray = diets.split(",");
                        for (let index = 0; index < dietArray.length; ++index) {
                            for (
                                let placeIndex = 0;
                                placeIndex < foodArray[i].foodDiets.length;
                                ++placeIndex
                            ) {
                                if (
                                    dietArray[index] !=
                                    foodArray[i].foodDiets[placeIndex].dietName
                                ) {
                                } else {
                                    dietCount = dietCount + 1;
                                }
                            }
                        }

                        if (dietCount != dietArray.length) {
                        } else {
                            count = count + 1;
                        }
                    }

                    if (4 != count) {
                    } else {
                        foodFinal.push(foodArray[i]);
                    }
                }

                if (0 != foodFinal.length) {
                    foodFinalByIndex = foodFinal.slice(
                        foodIndex,
                        foodFinal.length
                    );
                    if (20 < foodFinalByIndex.length) {
                        foodFinalMove = foodFinal.slice(
                            foodIndex,
                            foodIndex + 20
                        );

                        if (0 != foodIndex) {
                            foodMix = {
                                result: foodFinalMove,
                                foodPrevious: foodIndex - 20,
                                foodNext: foodIndex + 20,
                            };
                        } else {
                            foodMix = {
                                result: foodFinalMove,
                                foodNext: foodIndex + 20,
                            };
                        }
                    } else {
                        foodFinalMove = foodFinalByIndex;
                        if (0 != foodIndex) {
                            foodMix = {
                                result: foodFinalMove,
                                foodPrevious: foodIndex - 20,
                            };
                        } else {
                            foodMix = { result: foodFinalMove };
                        }
                    }
                } else {
                    foodMix = { result: [] };
                }

                response.send([foodMix]);
            }
        );
    }
);

app.post("/food", tokenVerified, function (req, response) {
    var count = 0;
    Food.find({}, function (err, food) {
        for (let i = 0; i < food.length; ++i) {
            if (count < parseInt(food[i].foodId.split("-")[1])) {
                count = parseInt(food[i].foodId.split("-")[1]);
            }
        }

        count = count + 1;
        var foodId = "FOOD-";
        foodId = foodId + count;

        var result = {
            foodId: foodId,
            foodCalories: req.body.foodCalories,
            foodName: req.body.foodName,
            foodImage: req.body.foodImage,
            foodSteps: req.body.foodSteps,
            foodIngredients: req.body.foodIngredients,
            foodDiets: req.body.foodDiets,
            customerId: req.body.customerId,
        };

        Food.create(result, function (error, foodPlace) {
            response.send([{ result: "Food" }]);
        });
    });
});

app.post("/foodUpdate", tokenVerified, function (req, response) {
    var foodId = req.body.foodId;
    var place = req.body;
    delete place.foodId;

    Food.findOneAndUpdate(
        { foodId: foodId },
        { $set: place },
        { new: true },
        function (err, food) {
            response.send([{ result: "Food" }]);
        }
    );
});

app.delete("/food", tokenVerified, function (req, response) {
    Customer.find(
        { food: { $elemMatch: { foodId: req.body.foodId } } },
        async function (err, customers) {
            for (let i = 0; i < customers.length; ++i) {
                var place = [];
                place = place.concat(customers[i].food);
                place.splice(foodIndex(place, req.body.foodId), 1);
                await Customer.findOneAndUpdate(
                    { customerId: customers[i].customerId },
                    { $set: { food: place } },
                    { new: true },
                    function (error, placeCustomer) {}
                ).clone();
            }

            Comment.find(
                { foodId: req.body.foodId },
                async function (error, comments) {
                    for (let i = 0; i < comments.length; ++i) {
                        await Comment.deleteOne(
                            { commentId: comments[i].commentId },
                            function (placeError, avoidComments) {}
                        ).clone();
                    }

                    Food.deleteOne(
                        { foodId: req.body.foodId },
                        function (placeError, food) {
                            response.send([{ result: "Food" }]);
                        }
                    );
                }
            );
        }
    );
});

app.get("/comments", function (req, response) {
    Comment.find({}, function (err, comments) {
        response.send(comments);
    });
});

app.get("/commentsAvoid/:id", function (req, response) {
    Comment.find(
        { foodId: req.params.id },
        null,
        { sort: { commentDate: -1 } },
        function (err, comments) {
            response.send([{ result: comments }]);
        }
    );
});

app.post("/comment", function (req, response) {
    Comment.create(req.body, function (err, comment) {
        response.send(comment);
    });
});

app.post("/avoidComment", tokenVerified, function (req, response) {
    Comment.find({}, function (err, comments) {
        var count = 0;

        for (let i = 0; i < comments.length; ++i) {
            if (count < parseInt(comments[i].commentId.split("-")[1])) {
                count = parseInt(comments[i].commentId.split("-")[1]);
            }
        }

        count = count + 1;

        var commentId = "COMMENT-";
        commentId = commentId + count;

        Comment.create(
            {
                commentId: commentId,
                commentDescription: req.body.commentDescription,
                customerLastName: req.body.customerLastName,
                customerFirstName: req.body.customerFirstName,
                commentDate: req.body.commentDate,
                customerId: req.body.customerId,
                customerImage: req.body.customerImage,
                foodId: req.body.foodId,
            },
            function (error, avoidComment) {
                Comment.find(
                    { foodId: req.body.foodId },
                    null,
                    { sort: { commentDate: -1 } },
                    function (avoidError, avoidComments) {
                        response.send([{ result: avoidComments }]);
                    }
                );
            }
        );
    });
});

app.delete("/comment/:id", function (req, response) {
    Comment.deleteOne({ commentId: req.params.id }, function (err, comment) {
        response.send(comment);
    });
});
app.get('*', function (req, res) {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
  });

app.listen(process.env.PORT||9000);
