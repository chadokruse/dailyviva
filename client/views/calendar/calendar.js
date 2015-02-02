Template.calendar.created = function () {
  $('#calendar').datepicker('setDates', Session.get('days'));
};

Template.calendar.rendered = function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('#calendar').datepicker({
    //todayBtn: "linked",
    multidate: true,
    keyboardNavigation: false,
    todayHighlight: true,
  });

  Tracker.autorun(function () {
    $('#calendar').datepicker('setDates', Session.get('days'));
    //Tracker.afterFlush(function () {
      //var q = Routines.findOne({_id: Session.get('routineId')});
      //console.log(q);
      //Session.set('days', Routines.findOne({_id: Session.get('routineId')}));
    //});
  });


  //Session.set('days', Routines.findOne({_id: Session.get('routineId')}).days);

  $('#calendar').on('changeDate', function (e){
      var id = Session.get('routineId');
      var day = e.date; //"latest date picked"
      //console.log('Deselected: ' + selectedDate);
      console.log('Date: ' + e.date);
      var countBefore = Session.get('count');
      var countAfter = $('#calendar').datepicker('getDates').length;
      console.log('CountBefore: ' + countBefore);
      console.log('CountAfter: ' + countAfter);
      //var q = $('#calendar').data().datepicker;
      var deselectedId = $('#calendar').data().datepicker.viewDate;
      console.log('targetDate: ' + deselectedId);
      //alert("myObject is " + q.toSource());
      //console.log(JSON.stringify(q,null, 4));
      //console.log('Valueof: ' + e.date.valueOf());
      //console.log('Dates Array : ' + e.dates);
      //var dateVal = $('#calendar').datepicker('getDates');
      //console.log('getDates :' + dateVal);
      //if (e.dates.contains(date) !== -1) {
      //if (!$.inArray(e.date, e.dates)) {
      //if ($(e.target).hasClass('active')) {
      //if (day === undefined) {
      //if ($.inArray(day, e.dates) != -1) {
      if (countAfter < countBefore) {
        console.log('Action: REMOVE');
        Meteor.call('removeDay', id, deselectedId, function (error, result) {});
      } else {
        console.log('Action: ADD');
        Meteor.call('addDay', id, day, function (error, result) {});
      }
      Session.set('count', countAfter);
      return false;
  });
};

Template.calendar.helpers({
  days: function () {
    var q = Routines.findOne({_id: Session.get('routineId')});
    console.log(q);
    Session.set('days', q);
  }
});

Template.calendar.events({
  'click .js-routine-select': function (e) {
    e.preventDefault();
    var id = $(e.target).data('id');
    console.log(id);
    Router.go('calendar', {view: 'monthly', id: id});
  },
  'click td.active': function (e) {
    console.log('clicked');
  },
  'click #calendar': function (e) {
    console.log('clicked');
  }

});


