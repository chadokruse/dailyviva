Template.guest.rendered = function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('#calendar').datepicker({
    //todayBtn: "linked",
    multidate: true,
    keyboardNavigation: false,
    todayHighlight: true,
  });


  //Session.set('days', Routines.findOne({_id: Session.get('routineId')}).days);

  $('#calendar').on('changeDate', function (e){
      //var id = Session.get('routineId');
      var day = e.date; //"latest date picked"
      var countBefore = Session.get('count');
      var countAfter = $('#calendar').datepicker('getDates').length;
      console.log('CountBefore: ' + countBefore);
      console.log('CountAfter: ' + countAfter);
      //var q = $('#calendar').data().datepicker;
      var viewDate = $('#calendar').data().datepicker.viewDate;

      var date = viewDate;
      var targetTime = new Date(date);
      var timeZoneFromDB = -7.00; //time zone value from database
      var tzDifference = targetTime.getTimezoneOffset();
      var deselectedId = new Date(targetTime.getTime() + tzDifference * 60 * 1000);

      console.log('viewDate: ' + deselectedId);
      console.log('e.date: ' + e.date);
      //alert("myObject is " + q.toSource());
      //console.log('Valueof: ' + e.date.valueOf());;
      //if ($.inArray(day, e.dates) != -1) {
      if (countAfter < countBefore) {
        console.log('Action: REMOVE');
        //Meteor.call('removeDay', id, deselectedId, function (error, result) {});
      } else {
        console.log('Action: ADD');
        //Meteor.call('addDay', id, deselectedId, function (error, result) {});
      }
      Session.set('count', countAfter);
      return false;
  });
};

Template.guest.events({
  'click .js-routine-select': function (e) {
    e.preventDefault();
    var id = $(e.target).data('id');
    console.log(id);
    //Router.go('calendar', {view: 'monthly', id: id});
  },
  'click .js-add': function (e) {
    swal({
      title: 'Easy Tiger!',
      text: 'You\'ll need a DailyViva account to add more routines. We\'re still in private beta, but hope to open things up in a few weeks. Check back soon!',
      type: "warning",
      showCancelButton: false,
      confirmButtonClass: 'btn-blue-dark',
      confirmButtonText: 'OK',
      closeOnConfirm: true
    },
    function(){
      //swal("Deleted!", "Your imaginary file has been deleted.", "success");
    });
  },

});
