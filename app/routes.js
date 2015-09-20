var Sheet = require('./models/sheet.js');

module.exports = function(app, passport, io) {

  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('join', function (room) {
      socket.join(room);
      console.log('room joined');
      io.to(room).emit('joined', room);
    });
  });

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', function(req, res) {
    res.render('home.handlebars'); // load the index handlebars file
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  app.get('/auth/google/callback',
    passport.authenticate('google', {
            successRedirect : '/sheets',
            failureRedirect : '/'
  }));

  // =====================================
  // SHEETS LIST =========================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/sheets', isLoggedIn, function(req, res) {
    Sheet.find({ owner: req.user }, function(err, sheets){
      res.render('sheets.handlebars', {
        user: req.user, // get the user out of session and pass to template
        sheets: sheets
      });
    });
  });

  app.post('/sheet/create', isLoggedIn, function(req, res) {
    var sheet = new Sheet({
      name: req.body.name,
      owner: req.user,
      collaborators: [],
      published: true,
      columns: [],
      rows: []
    });
    sheet.save(function(err, sheet) {
      res.redirect('/sheet/'+sheet._id);
    });
  });

  app.get('/sheet/:id', isLoggedIn, function(req, res, next) {
    Sheet.findOne({ owner: req.user, _id: req.params.id }, function(err, sheet) {
      if (err) next(err);
      else {
        res.render('editor.handlebars', {
          user: req.user, // get the user out of session and pass to template
          sheet: sheet
        });
      }
    });
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
