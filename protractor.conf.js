var jasmineReporters = require("jasmine-reporters");
var fs = require("fs-extra");

exports.config = {
  framework: "jasmine",
  directConnect: true,
  specs: ["src/specs/tests/*.ts"],

  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      // args: ["--headless"],
    },
  },

  onPrepare() {
    fs.emptyDir("reports/screenshots", function (err) {
      console.log(err);
    });
    fs.emptyDir("reports/test-report", function (err) {
      console.log(err);
    });
    require("ts-node").register({
      project: require("path").join(__dirname, "./tsconfig.json"),
    });
    jasmine.getEnv().addReporter(
      new jasmineReporters.JUnitXmlReporter({
        consolidateAll: true,
        savePath: "./reports/test-report",
        filePrefix: "xmlresults",
      })
    );
    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.status == "failed") {
          browser.getCapabilities().then(function (caps) {
            var browserName = caps.get("browserName");

            browser.takeScreenshot().then(function (png) {
              var stream = fs.createWriteStream(
                "reports/screenshots/" +
                  browserName +
                  "-" +
                  result.fullName +
                  ".png"
              );
              stream.write(new Buffer(png, "base64"));
              stream.end();
            });
          });
        }
      },
    });
  },

  onComplete() {
    var browserName, browserVersion;
    var capsPromise = browser.getCapabilities();

    capsPromise.then(function (caps) {
      browserName = caps.get("browserName");
      browserVersion = caps.get("version");
      platform = caps.get("platform");

      var HTMLReport = require("protractor-html-reporter-2");

      testConfig = {
        reportTitle: "QAMIND Test Execution Report",
        outputPath: "./reports/test-report",
        outputFilename: "QAMINDTestReport",
        screenshotPath: "./screenshots",
        testBrowser: browserName,
        browserVersion: browserVersion,
        modifiedSuiteName: false,
        screenshotsOnlyOnFailure: true,
        testPlatform: platform,
      };
      new HTMLReport().from("./reports/test-report/xmlresults.xml", testConfig);
    });
  },
};
