//
//Robots.txt generation
//

Meteor.startup(function () {
  robots.addLine('User-agent: *');
  //All environments

  //Environment specific
  var rootUrl = __meteor_runtime_config__.ROOT_URL;
  console.log('Robots.txt created for: ' + rootUrl);

  //Staging
  if (rootUrl == 'http://staging.dailyviva.com') {

  }

  //Production
  if (rootUrl == 'https://dailyviva.com') {
    //robots.addLine('Allow: /?_escaped_fragment_');
    //robots.addLine('Allow: /*.js$');
    //robots.addLine('Allow: /*.css?meteor_css_resource=true');
    //robots.addLine('Allow: /sitemap.xml');
  }
  //Disallow everything else
  robots.addLine('Disallow: /');
});
