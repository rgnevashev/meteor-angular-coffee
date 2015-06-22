Package.describe({
  name: 'meteor-angular-coffee',
  version: '1.9.3',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "compilengAnnotateCoffeescript",
  use: [],
  sources: [
    'plugin.js'
  ],
  npmDependencies: {
    "coffee-script": '1.9.3',
    'ng-annotate': '0.15.4'
  }
});
