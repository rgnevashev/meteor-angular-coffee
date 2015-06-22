var fs = Npm.require('fs');
var path = Npm.require('path');
var _ = Npm.require('underscore');
var ngAnnotate = Npm.require('ng-annotate');

// The coffee-script compiler overrides Error.prepareStackTrace, mostly for the
// use of coffee.run which we don't use.  This conflicts with the tool's use of
// Error.prepareStackTrace to properly show error messages in linked code.  Save
// the tool's one and restore it after coffee-script clobbers it.
var prepareStackTrace = Error.prepareStackTrace;
var coffee = Npm.require('coffee-script');
Error.prepareStackTrace = prepareStackTrace;

var handler = function (compileStep) {
  var source = compileStep.read().toString('utf8');
  var outputFile = compileStep.inputPath + ".js";

  var options = {
    bare: true,
    filename: compileStep.inputPath,
    inline: true,
    // This becomes the "file" field of the source map.
    generatedFile: "/" + outputFile,
  };

  try {
    var output = coffee.compile(source, options);
  } catch (e) {
    // XXX better error handling, once the Plugin interface support it
    throw new Error(
      compileStep.inputPath + ':' +
      (e.location ? (e.location.first_line + ': ') : ' ') +
      e.message
    );
  }

  var ret = ngAnnotate(output, {
    add: true
  });

  if (ret.errors) {
    throw new Error(ret.errors.join(': '));
  }

  compileStep.addJavaScript({
    path: outputFile,
    sourcePath: compileStep.inputPath,
    data: ret.src,
  });
};

Plugin.registerSourceHandler("ng.coffee", handler);
