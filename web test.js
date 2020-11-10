const express = require('express');
const app = express(); // You need to place this at the beggining.
const url = require("url");
const path = require("path");
const passport = require("passport"); // The general passport module.
const passportDiscord = require("passport-discord"); // This will allow us to solve the output from OAuth.
const ejs = require("ejs")
const bodyParser = require("body-parser");
const session = require("express-session");
const MemoryStore = require("memorystore");
const mStore = MemoryStore(session); // We initialize memorystore with express-session.
const { Permissions } = require('discord.js')
const GuildSettings = require('./models/settings')

module.exports = async (client) => {
  
//paths 
const filesDirectory = path.resolve(`${process.cwd()}${path.sep}dashboard`);
const templatesDirectory = path.resolve(`${filesDirectory}${path.sep}templates`);

//passports
const Strategy = passportDiscord.Strategy // This will solve the actual output.
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj, done) => {
    done(null, obj);
});

const strategy = new Strategy({
    clientID: "770779828998897684",
    clientSecret: "jxMZiyG2ZbM_qf3IxY6YKPpoUgKdP2wy", 
    callbackURL: "https://henrysbot.glitch.me/callback",// The url that will handle callbacks.
    scope: ["identify", "guilds"] // Get tag and profile picture + servers user is in.
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
});

passport.use(strategy);
  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(passport.initialize());

app.use(passport.session());

app.use(session({
    store: new mStore({ checkPeriod: 86400000 }), // we refresh the store each day
    secret: "A_RANDOM_STRING_FOR_SECURITY_PURPOSES_OH_MY_HERNY_BOT_YEY",
    resave: false,
    saveUninitialized: false
}));

// app.use("/assets", express.static(path.resolve(`${filesDirectory}${path.sep}assets`))); 

app.set("view engine", "ejs");

  const checkAuth = (req, res, next) => {
    // If authenticated we forward the request further in the route.
    if (req.isAuthenticated()) return next();
    // If not authenticated, we set the url the user is redirected to into the memory.
    req.session.backURL = req.url;
    // We redirect user to login endpoint/route.
    res.redirect("/login");
  }


//rendering
  // We declare a renderTemplate function to make rendering of a template in a route as easy as possible.
  const renderTemplate = (res, req, template, data = {}) => {
    // Default base data which passed to the ejs template by default. 
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null
    };
    // We render template using the absolute path of the template and the merged default data with the additional data provided.
    res.render(path.resolve(`${templatesDirectory}${path.sep}${template}`), Object.assign(baseData, data));
  };

app.get("/", (req, res) => {
  renderTemplate(res, req, "index.ejs");
});

app.get('/about', (req, res) => {
  renderTemplate(res, req, 'about.ejs')
})

app.get('/docs', (req, res) => {
  res.sendFile(path.join(__dirname + '/docs/index.html'))
})

app.get("/login", (req, res, next) => {
  if (req.session.backURL) { // We check if there a return URL has been set prior redirecting/accesing.
   //Return URL is the url that user will be redirected to after login. 
    req.session.backURL = req.session.backURL;
  } else { // If there is no return URL we simply set it to index page.
    req.session.backURL = "/";
  }
  // Now that we have configured the returning URL, we can let passport redirect user to appropriate auth page.
  next();
}, passport.authenticate("discord"));

app.get("/logout", function (req, res) {
  req.session.destroy(() => { // We destroy session
    req.logout(); // Inside callback we logout user
    console.log('Successfully logged out!')
    res.redirect("/"); // And to make sure he isnt on any pages that require authorization, we redirect it to main page.
  });
});

   app.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => { // Passport collects data that discord has returned and if user aborted auhorization it redirects to '/'
  session.us = req.user;
  if (req.session.backURL) { // If there is a returning url we redirect user to it.
    const url = req.session.backURL;
    req.session.backURL = null; // We change returning url to null for little more performance.
    res.redirect(url);
  } else { // If there still isn't we won't leave user alone and stuck so well redirect it to index page.
    res.redirect("/");
  }
}); 
/*
  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => { // Passport collects data that discord has returned and if user aborted auhorization it redirects to '/'
    session.us = req.user;
    res.redirect("/");
  });
*/
  app.get("/dashboard", checkAuth, (req, res) => {
    renderTemplate(res, req, "dashboard.ejs", { perms: Permissions });
  });
  
app.get("/dashboard/:guildID", checkAuth, async (req, res) => {
    // We validate the request, check if guild exists, member is in guild and if member has minimum permissions, if not, we redirect it back.
    const guild = client.guilds.cache.get(req.params.guildID);
    if (!guild) return res.redirect("/dashboard");
    const member = guild.members.cache.get(req.user.id);
    if (!member) return res.redirect("/dashboard");
    if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/dashboard");
    // We retrive the settings stored for this guild.
    var storedSettings = await GuildSettings.findOne({ gid: guild.id });
    if (!storedSettings) {
      // If there are no settings stored for this guild, we create them and try to retrive them again.
      const newSettings = new GuildSettings({
        gid: guild.id
      });
      await newSettings.save().catch(()=>{});
      storedSettings = await GuildSettings.findOne({ gid: guild.id });
    }
  
    renderTemplate(res, req, "settings.ejs", { guild, settings: storedSettings, alert: null });
  });

    // Settings endpoint.
    app.post("/dashboard/:guildID", checkAuth, async (req, res) => {
        // We validate the request, check if guild exists, member is in guild and if member has minimum permissions, if not, we redirect it back.
        const guild = client.guilds.cache.get(req.params.guildID);
        if (!guild) return res.redirect("/dashboard");
        const member = guild.members.cache.get(req.user.id);
        if (!member) return res.redirect("/dashboard");
        if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/dashboard");
        // We retrive the settings stored for this guild.
        var storedSettings = await GuildSettings.findOne({ gid: guild.id });
        if (!storedSettings) {
          // If there are no settings stored for this guild, we create them and try to retrive them again.
          const newSettings = new GuildSettings({
            gid: guild.id
          });
          await newSettings.save().catch(()=>{});
          storedSettings = await GuildSettings.findOne({ gid: guild.id });
        }
      
        // We set the prefix of the server settings to the one that was sent in request from the form.
        storedSettings.prefix = req.body.prefix;
        // We save the settings.
        await storedSettings.save().catch(() => {});

        // We render the template with an alert text which confirms that settings have been saved.
        renderTemplate(res, req, "settings.ejs", { guild, settings: storedSettings, alert: "Your settings have been saved." });
    });

app.listen(8080, null, null, () => console.log("The web server is up and running!")); // You need to place this at the really end of your file.
}