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
    path: '/calendar',
  });
});
