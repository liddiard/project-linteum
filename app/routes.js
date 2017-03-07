var Sheet = require('./models/sheet.js');

module.exports = function(app, passport, io) {

  io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('join', function(room) {
      socket.join(room);
      console.log('room joined');
      io.to(room).emit('joined', room);
    });

    socket.on('column create', function(room, columnFields) {
      var column = new Column(columnFields);
      sheet.save(function(err, sheet) {
        io.to(room).emit('column create', columnFields);
      });
    });

    socket.on('column update');

    socket.on('column move');

    socket.on('column delete');

    socket.on('row create');

    socket.on('row update');

    socket.on('row move');

    socket.on('row delete');

    socket.on('collaborator create');

    socket.on('collaborator update');

    socket.on('collaborator delete');

    socket.on('public update');

    socket.on('owner update');

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
            successRedirect : '/edit',
            failureRedirect : '/'
  }));

  // =====================================
  // API =================================
  // =====================================
  app.get('/user', loginRequired, function(req, res) {
    res.json(req.user);
  });

  app.get('/sheets', loginRequired, function(req, res) {
    Sheet.find({ owner: req.user }, {rows: 0, columns: 0}, function(err, sheets){
      res.json(sheets);
    });
  });

  app.post('/sheets', loginRequired, function(req, res) {
    var sheet = new Sheet({
      name: req.body.name,
      owner: req.user,
      collaborators: [],
      published: true,
      columns: [],
      rows: [],
    });
    sheet.save(function(err, sheet) {
      res.json(sheet);
    });
  });

  app.get('/sheet/:id', function(req, res) {
    Sheet.findOne({ _id: req.params.id }, function(err, sheet) {
      if (err) next(err);
      else {
        // if the user is authenticated, they're accessing through the app;
        // return the entire sheet with metadata and rows in a "rows" key
        if (req.isAuthenticated())
          res.json(sheet);
        else // the user is an anonymous (end) user, return only the rows
          res.json(sheet.rows);
      }
    });
  });

  app.delete('/sheet/:id', loginRequired, function(req, res) {
    Sheet.findOne({ owner: req.user, _id: req.params.id }, function(err, sheet) {
      if (err) next(err);
      else {
        res.send({
          deleted: req.params.id
        });
      }
    });
  });

  // =====================================
  // TEMPLATE VIEWS ======================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the loginRequired function)
  app.get(['/edit', '/edit*'], loginRequired, function(req, res) {
    console.log(req.user);
    res.render('editor.handlebars');
  });
};

// route middleware to make sure a user is logged in
function loginRequired(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
