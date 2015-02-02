Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound', // note: only relates to routes with data. All others handled with the catch-all below.
  loadingTemplate: 'loading',
  trackPageView: true // Enable Google Analytics for every route site-wide
});

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
