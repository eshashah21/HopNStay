🏝️ HopNStay
HopNStay is a full-stack web application inspired by Airbnb that allows users to explore unique travel stays and host their own properties. Built with the MERN stack, it incorporates robust authentication, data validation, image handling, and user-friendly UI.

⚙️ Tech Stack
Frontend: HTML, CSS, JavaScript, EJS (Templating Engine)
Backend: Node.js, Express.js
Database: MongoDB + Mongoose
Authentication: Passport.js (local strategy)
Templating: ejs-mate (layout support)

📦 Installed Packages
Package	                                         Purpose
express	                                         Node.js framework for backend routing
ejs	                                             Embedded JavaScript for templating
mongoose	                                       MongoDB object modeling
method-override	                                 Support PUT & DELETE via POST
ejs-mate	                                       Layout and partials for EJS
joi	                                             Schema-based data validation
express-session	                                 Session management
connect-flash	                                   Flash message support
passport	                                       Authentication middleware
passport-local	                                 Local strategy for Passport
passport-local-mongoose	                         Simplifies Passport + Mongoose integration

🚀 Features
User registration & login system
Flash messages for notifications
Create, edit, delete listings
View detailed listing pages
Add reviews & ratings
Input validation using Joi
Persistent sessions with Passport.js

## 📁 Project Structure
HopNStay/
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   └── (CSS, images, client-side JS)
│
├── routes/
│   ├── listings.js
│   ├── review.js
│   └── users.js
│
├── utils/
│   ├── ExpressError.js
│   └──  wrapAsync.js
│
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── app.js
├── middleware
├── schema.js
└── README.md
