module.exports = {

  spreadsheetIdFromUrl: function() {
    var path = window.location.pathname;
    var precedent = "/sheet/";
    return path.substr(path.lastIndexOf(precedent) + precedent.length + 1);
  }

};
