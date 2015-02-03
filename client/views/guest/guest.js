Template.guest.rendered = function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('#calendar').datepicker({
    //todayBtn: "linked",
    multidate: true,
    keyboardNavigation: false,
    todayHighlight: true,
  });
  Session.set('test', true);


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
  /*
  'click .js-routine-select': function (e) {
    //e.preventDefault();
    var id = $(e.target).data('id');
    var input = $(e.target).children(':radio').attr('checked', true);
    //console.log('Routine btn clicked. Id: ' + id);
    //Router.go('calendar', {view: 'monthly', id: id});
  },
  */
  'click .js-routine-select': function (e) {
    e.preventDefault();
    //$('[contenteditable=true]').attr('contenteditable', false);
    if ($(e.target).hasClass('active')) {
      $(e.target).attr('contenteditable','true');
      $(e.target).focus().select();
      $('[contenteditable=true]').not($(e.target)).attr('contenteditable', false);
    }
    var id = $(e.target).data('id');
    Session.set('routineId', id);
  },
  'keydown [contenteditable]': function (e) {
    if (e.keyCode === 13) {
      $(e.target).blur();
      return false;
    }
  },
  'mouseenter .js-routine-select': function (e) {
    //if ($(e.target).attr('contenteditable', true))
      //$(e.target).tooltip('show');
  },
  'mouseleave [contenteditable]': function (e) {

    //$(e.target).tooltip('hide');
  },
  /*
  window.onload = function() {
            var div = document.getElementById('editable');
            div.onclick = function(e) {
                this.contentEditable = true;
                this.focus();
                this.style.backgroundColor = '#E0E0E0';
                this.style.border = '1px dotted black';
            }

            div.onmouseout = function() {
                this.style.backgroundColor = '#ffffff';
                this.style.border = '';
                this.contentEditable = false;
            }
        }
        */
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
