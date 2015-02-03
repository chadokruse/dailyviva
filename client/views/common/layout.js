Template.header.events({
  'click .js-login': function (e) {
    e.preventDefault();
    swal({
      title: 'Private Beta',
      text: 'We should be open to the general public in a few weeks.',
      type: "warning",
      showCancelButton: true,
      confirmButtonClass: 'btn-blue-black',
      confirmButtonText: 'Take a look around',
      closeOnConfirm: false
    },
    function(){
      Router.go('guest');
    });
  },
});
