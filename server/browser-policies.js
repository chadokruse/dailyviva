Meteor.startup (function () {
  //Repeating defaults for clarification
  BrowserPolicy.content.disallowEval();
  BrowserPolicy.content.allowInlineStyles();
  //Modifications to other defaults
  BrowserPolicy.content.disallowInlineScripts();
  BrowserPolicy.content.disallowConnect();
  //
  //Allow Meteor DDP Connections
  //
  var rootUrl = __meteor_runtime_config__.ROOT_URL;
  console.log('ROOT_URL: ' + rootUrl);
  //Allow DDP connections for local development
  if (rootUrl == 'http://localhost:3000/') {
    BrowserPolicy.content.allowConnectOrigin(rootUrl);
    BrowserPolicy.content.allowConnectOrigin(rootUrl.replace(/http(s?)/, 'ws$1'));
  }
  //Allow DDP connections for staging server (when hooked up)
  if (rootUrl == 'https://dailyviva.meteor.com' || rootUrl == 'http://dailyviva.meteor.com') {
    BrowserPolicy.content.allowConnectOrigin('https://*.meteor.com');
    BrowserPolicy.content.allowConnectOrigin('wss://*.meteor.com');
  }
  //Allow DDP connections for Modulus
  if (rootUrl == 'https://kynproduction-21782.onmodulus.net' || rootUrl == 'https://kyn.me') {
    BrowserPolicy.content.allowConnectOrigin('https://kyn.me');
    BrowserPolicy.content.allowConnectOrigin('wss://kyn.me');
  }
  //
  //Additional policies
  //
  //Assets
  BrowserPolicy.content.allowOriginForAll('*.bootstrapcdn.com');
  BrowserPolicy.content.allowOriginForAll('fonts.googleapis.com');
  BrowserPolicy.content.allowOriginForAll('fonts.gstatic.com');
  //Analytics
  BrowserPolicy.content.allowScriptOrigin('*.google-analytics.com');
  BrowserPolicy.content.allowImageOrigin('*.google-analytics.com');
  BrowserPolicy.content.allowOriginForAll('engine.kadira.io');
});
