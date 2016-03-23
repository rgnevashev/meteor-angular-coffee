Package.describe({
  name: 'rgnevashev:angular-coffee',
  version: '1.10.0',
  summary: 'support for ng-annotate to use .ng.coffee files',
  git: 'https://github.com/rgnevashev/meteor-angular-coffee.git',
  documentation: 'README.md'
});

Package.registerBuildPlugin({
  name: "compilengAnnotateCoffeescript",
  use: [],
  sources: [
    'plugin.js'
  ],
  npmDependencies: {
    "coffee-script": '1.10.0',
    'ng-annotate': '1.2.1'
  }
});
