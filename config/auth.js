// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
  'googleAuth' : {
    'clientID'      : '421539439170-6bkj042o1gc02j8rvj8qagflchudh7dq.apps.googleusercontent.com',
    'clientSecret'  : 'REDACTED',
    'callbackURL'   : 'http://localhost:8080/auth/google/callback'
  }
};
