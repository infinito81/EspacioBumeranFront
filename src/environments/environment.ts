// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url_token : "http://localhost:9090/oauth/token",
  url_general : "http://localhost:9090/api",
  url_academy : "http://localhost:9090/api/academy"
};
/*
export const environment = {
  production: false,
  url_token : "https://apiespaciobumeran-d0e6f0433524.herokuapp.com/oauth/token",
  url_general : "https://apiespaciobumeran-d0e6f0433524.herokuapp.com/api",
  url_academy : "https://apiespaciobumeran-d0e6f0433524.herokuapp.com/api/academy"
};
*/

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
