Meteor.methods({
  addDay: function (id, day) {
    console.log('Method called: addDay');
    console.log(id);
    console.log(day);
    Routines.update({ _id: id }, {$addToSet: { days: day }});
  },
  removeDay: function (id, deselectedId) {
    console.log('Method called: addDay');
    console.log(id);
    console.log(deselectedId);
    Routines.update({ _id: id }, {$pull: { days: deselectedId }});
  }
});
