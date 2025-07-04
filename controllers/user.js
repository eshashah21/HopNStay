const User = require("../models/user.js");

module.exports.renderSignup = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to HopNStay");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLogin = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back to HopNStay! You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";

    if (redirectUrl.includes("/reviews/")) {
        const listingId = redirectUrl.split("/")[2];
        redirectUrl = `/listings/${listingId}`;
    }

    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next();
        }
        req.flash("success", "you are logged out now.");
        res.redirect("/listings");
    });
}