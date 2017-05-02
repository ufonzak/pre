
const injector = require("./injector");

/*setTimeout(function () {
  console.log('Tick');
}, 10000);*/

injector().inject(function (main, jQuery) {
  main().catch(er => {
    console.log(`Error unhandled: ${er}.`);
    console.log(er);
    process.exit(1);
  });
});
