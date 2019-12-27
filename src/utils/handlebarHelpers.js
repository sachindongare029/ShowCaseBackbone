Handlebars.registerHelper('list', function(designers, options) {
  var Chars = '';
  for (var j = 0; j < designers.length; j++) {
    Chars = Chars + designers[j].name[0];
  }
  var startWithCharacters = _.uniq(Chars);

  startWithCharacters.sort();
  var out = '<div class="designers-sort">';

  for (var i = 0; i < startWithCharacters.length; i++) {
    out = out + '<h2>' + startWithCharacters[i] + '</h2>' + '<hr/>';

    for (var j = 0; j < designers.length; j++) {
      if (designers[j].name.substr(0, 1) === startWithCharacters[i]) {
        out = out + "<p><a href='#/catalog/b/"+ designers[j].slug +"'>" + designers[j].name + "</a></p>";
      }
    }
  }

  return out + '</div>';
});
