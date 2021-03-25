var newman = require('newman'); 
// require newman in your project

// call newman.run to pass `options` object and wait for callback
newman.run({
    collection: require('./SODA_Multicloud_Automation_Test.postman_collection.json'),
    globals: require('./SODA.postman_globals.json'),
    //exportGlobals: ('./soda_global_vars.json'),
    iterationData: ('./iteration_data.json'),
    reporters: ['htmlextra','cli'],
    //bail: true,
    reporter: {
        htmlextra: {
            export: './reports/soda_multicloud_e2e_report.html',
            // template: './template.hbs'
            logs: true,
            // showOnlyFails: true,
            // noSyntaxHighlighting: true,
            // testPaging: true,
            browserTitle: "SODA Multicloud E2E Test report",
            title: "SODA Multicloud E2E Test report",
            // titleSize: 4,
            // omitHeaders: true,
            skipHeaders: "X-Auth-Token",
            hideRequestBody: ["Register Backend", "Register Backend Invalid Credentials"],
            hideResponseBody: ["Register Backend", "Register Backend Invalid Credentials"],
            // showEnvironmentData: true,
            // skipEnvironmentVars: ["API_KEY"],
            // showGlobalData: true,
            skipGlobalVars: ["authToken"],
            // skipSensitiveData: true,
            // showMarkdownLinks: true,
            // showFolderDescription: true,
            // timezone: "Australia/Sydney"
        }
    },
    insecure: true, // allow self-signed certs, required in postman too,
    delayRequest: 2000,
    timeout: 180000  // set time out,
}).on('start', function (err, args) { // on start of run, log to console
    console.log('Running E2E tests for SODA multicloud ...');
}).on('done', function (err, summary) {
    if (err || summary.error) {
        console.error('collection run encountered an error.');
    }
    else {
        console.log('collection run completed.');
    }
});