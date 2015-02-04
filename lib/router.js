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
    onAfterAction: function() {
      setPageTitle('Track Your Daily Routines');
    },
  });
  this.route('guest', {
    path: 'guest',
    onAfterAction: function() {
      setPageTitle('Welcome');
    },
  });
});
