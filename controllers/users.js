const User = require("../models/user.js");
const { saveRedirectUrl } = require("../middleware.js");

module.exports.signUpForm = (req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res) => {
    try {
        let {username, email, password} = req.body.listing;
        // console.log(req.body.listing);
        
        // Ensure all required fields are present
        if (!username || !email || !password) {
            req.flash("error", "All fields are required.");
            return res.redirect("/signup");
        }

        const newUser = new User({ email, username });
        // console.log(newUser);

        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        //Automatic Login After SignUp
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });
    } catch (e) {
        console.error(e);

        // Handle specific error cases
        if (e.name === 'UserExistsError') {
            req.flash("error", "A user with the given username is already registered.");
        } else {
            req.flash("error", "There was an error registering the user.");
        }

        res.redirect("/signup");
    }
};

module.exports.loginForm = (req,res)=>{
    res.render("users/login.ejs");
};

module.exports.login = async (req,res)=>{
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout =  (req,res,next)=>{
    req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success", "You're logged out now!");
        res.redirect("/listings");
    });
};