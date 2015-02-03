Template.guest.rendered = function () {
  $('[data-toggle="tooltip"]').tooltip();

  //Initialize calendar
  $('#calendar').datepicker({
    multidate: true,
    keyboardNavigation: false,
    todayHighlight: true,
  });

  //Load current routine dates
    var defaultId = '1';
    Session.set('routineId', defaultId);
    var id = Session.get('routineId');
    var dates = Session.get('routine-' + id);
    $('#calendar').datepicker('setDates', dates);

  //Capture date selections when calendar clicked - uses plugin event 'changeDate'
  $('#calendar').on('changeDate', function (e){
      var id = Session.get('routineId');
      var fetchDates = $('#calendar').datepicker('getDates');
      Session.set('routine-' + id, fetchDates);
    //}
  });
};

Template.guest.events({
  'click .js-routine-select': function (e) {
    e.preventDefault();
    //Set the current routine
    var newId = $(e.target).data('id');
    Session.set('routineId', newId);
    //If clicking an active routine, allow editing of text
    if ($(e.target).hasClass('active')) {
      $(e.target).attr('contenteditable','true');
      $(e.target).focus().select();
      $('[contenteditable=true]').not($(e.target)).attr('contenteditable', false);
    } else {
      //Fetch new dates and load them
      var newDates = Session.get('routine-' + newId);
      var loadDates = $('#calendar').datepicker('setDates', newDates);
    }
  },
  'keydown [contenteditable]': function (e) {
    if (e.keyCode === 13) {
      $(e.target).blur();
      return false;
    }
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
    });
  },

});
