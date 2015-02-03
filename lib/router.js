Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound', // note: only relates to routes with data. All others handled with the catch-all below.
  loadingTemplate: 'loading',
  trackPageView: true // Enable Google Analytics for every route site-wide
});

//Fix for known Iron Router scroll bug
//https://github.com/tmeasday/meteor-router/issues/71
Router._filters = {
  autoScroll: function () {
    //alert('autoScroll triggered');
    Session.set('filterScroll', false);
    Tracker.autorun(function () {
      Tracker.afterFlush(function () {
        var scrollTo = window.currentScroll || 0;
        $('body').scrollTop(scrollTo);
        $('body').css("min-height", 0);
        //alert(scrollTo);
      });
    });
  },
  //Because of the bug 'fix', we need special treatment on calendar page
  checkScroll: function () {
    function calendarScroll(){
      //$('html, body').animate({scrollTop:$('#js-scroll-reset-nav').position().top}, 'slow');
      $('html, body').animate({scrollTop: $("#calendar").offset().top}, 'slow');
    }
     //Reset the filterScroll
    function resetScroll(){
      Session.set('calendarScroll', false);
    }

    if (Session.equals('calendarScroll', true)) {
      Tracker.autorun(function () {
        Tracker.afterFlush(function () {
          var calendar = $('#calendar').offset().top;
          if ($(window).scrollTop() > calendar) {
            calendarScroll();
            resetScroll();
          }
        });
      });
    }
  }
};
var filters = Router._filters;
Router.onAfterAction(filters.autoScroll, {except: ['guest', 'calendar']});
Router.onAfterAction(filters.autoScroll);

Router.map(function () {
  var setPageTitle = function () {
    var title = ['DailyViva'];
    _.each(arguments, function (v, k) {
      title.push(v);
    });
    document.title = title.join(' :: ');
  };

  // home page
  this.route('home', {
    path: '/',
  });
  this.route('guest', {
    path: 'guest',
  });
  this.route('guests', {
    path: 'guests',
    onBeforeAction: function () {
      if (Session.equals('guestId', undefined) && Session.equals('routineId', undefined)) {
        Meteor.apply('createGuest', [], {'wait': true}, function(err, result){
          if (result) {
            //TODO Add loading message / top flash message with a spinner?
            //Session.set('guestId', guestId);
            Session.set('guestId', result);
            console.log('SessionGuest: ' + Session.get('guestId'));
          }
        });
      }
      if (!Session.equals('guestId', undefined) && Session.equals('routineId', undefined)) {
        var id = Session.get('guestId');
        Meteor.apply('createRoutine', [id], {'wait': true}, function(err, result){
          if (result) {
            //TODO Add loading message / top flash message with a spinner?
            //Session.set('guestId', guestId);
            Session.set('routineId', result);
            console.log('Sessionroutine: ' + Session.get('routineId'));
          }
        });
      }
      if (!Session.equals('routineId', undefined)) {
        var param = Session.get('routineId');
        this.redirect('/calendar/monthly/' + param);
        this.next();
      }
    }
  });
  this.route('calendar', {
    path: '/calendar/:view/:id',
    onBeforeAction: function () {
      if(Session.equals('guestId', undefined)) {
        Session.set('guestId', '1234567890');
      }
      Session.set('routineId', this.params.id);
      this.next();
    },
    waitOn: function () {
      //if(!Session.equals('guestId', undefined))
        Meteor.subscribe('guests', Session.get('guestId'));
        Meteor.subscribe('routines', Session.get('guestId'));
    },
    data: function () {
      //if(!Session.equals('guestId', undefined))
        return {
          guests: Guests.findOne({_id: Session.get('guestId')}),
          //daysArray: Routines.findOne({_id: this.params.id}),
          routinesDaily: Routines.find({'type': 'daily'}),
          routinesOccasional: Routines.find({'type': 'occasional'})
        };
    },
    action: function () {
      var q = Routines.findOne({_id: this.params.id});
      //console.log(daysArray);
      if (this.ready()) {
        if (q !== undefined) {
          //Session.set('days', q.days);
        }
        this.render();
      }
    },
  });
});
