Meteor.publish('routines', function (id) {
  return Routines.find({'userId': id});
});
Meteor.publish('guests', function (id) {
  return Guests.find({'_id': id});
});
