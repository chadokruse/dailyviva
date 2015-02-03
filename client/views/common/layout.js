Template.header.events({
  'click .js-login': function (e) {
    e.preventDefault();
    swal({
      title: 'Easy Tiger!',
      text: 'You\'ll need a DailyViva account to add more routines. We\'re still in private beta, but hope to open things up in a few weeks. Check back soon!',
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: 'btn-blue-black',
      confirmButtonText: 'Explore',
      closeOnConfirm: false
    },
    function(){
      Router.go('calendar');
    });
  },
});
