FactoryGirl.sequence('map_name_sequence', function (id) {
  return 'map_' + id;
});

FactoryGirl.define('map', function () {
  this.sequence('map_name_sequence', 'name');
  this.hasMany('routes', 'route', 3);
});
