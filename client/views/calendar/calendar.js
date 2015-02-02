Template.calendar.created = function () {
  //$('#calendar').datepicker('setDates', Session.get('days'));
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
    //$('#calendar').datepicker('setDates', Session.get('days'));
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
      var countBefore = Session.get('count');
      var countAfter = $('#calendar').datepicker('getDates').length;
      console.log('CountBefore: ' + countBefore);
      console.log('CountAfter: ' + countAfter);
      //var q = $('#calendar').data().datepicker;
      var viewDate = $('#calendar').data().datepicker.viewDate;

      var date = viewDate;
var targetTime = new Date(date);
var timeZoneFromDB = -7.00; //time zone value from database
//get the timezone offset from local time in minutes
//var tzDifference = timeZoneFromDB * 60 + targetTime.getTimezoneOffset();
var tzDifference = targetTime.getTimezoneOffset();
//convert the offset to milliseconds, add to targetTime, and make a new Date
var deselectedId = new Date(targetTime.getTime() + tzDifference * 60 * 1000);

      console.log('viewDate: ' + deselectedId);
      console.log('e.date: ' + e.date);
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
        Meteor.call('addDay', id, deselectedId, function (error, result) {});
      }
      Session.set('count', countAfter);
      return false;
  });
};

Template.calendar.helpers({
  days: function () {
    var q;
    q = Routines.findOne({_id: Session.get('routineId')});
    if (q) {
      console.log(q.days);
      Session.set('days', q.days);
      //$('#calendar').datepicker('setDates', Session.get('days'));
      $('#calendar').datepicker('setDates', q.days);
    }
    return false;
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


