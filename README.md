# Flight RS

This project is an single page application simulating a reservation page the project has is devided in fornt-end and back-end

## Front-end
The front-end has been defined using the ```MVP``` patern for separation of concerns:
- ```Model```: javascript class or objects that represent information (found on path /client/models)
- ```Presenters```: javascript class in charged of defining the Jquery interactions (found on path /client/presenters)
- ```views```: 
    - ```partials```:  html partial classes for the UI devinition (found on path /client/views/partials)
    - ```styles```: ui styles defined using ```stylus``` (found on path /client/views/styles)

All the code is writen using ```ES6``` and transpiled for compatibility browser reasons using ```webpacks``` in conjuction with  ```babel```. For styling and control ```bootstrap``` has been used with some extra controls for UI improvements (```bootstrap-3-typeahead```,```bootstrap-datepicker``` and```bootstrap-validator```).

![flightrs](https://cloud.githubusercontent.com/assets/3071208/17628214/a02b22a6-60b4-11e6-93f3-1eb239b92917.png)

## Back-End
The back-end is an ```express``` based application. The API has been defined to fulfil some endpoints. For future extension ```express-router``` has been used to keep the code modular and independant.

Security concerns have been taken in count for this the module ```helmet``` has been integrated, and enable the trust of only the first-proxy, also some headers regarding cache have been disable (this is also done for compatibility with certain browsers).
```js
app.set('trust proxy', 1);  
app.use(helmet());
app.use(function(req,res,next){
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    res.header("X-Frame-Options", "deny");
    next();
});
```
Furthermore for security to make sure there is no ```Parameter Pollution```, parameter types have been checked. Also to prevent ```XSS``` on the request the body the parameters have been sanitize.

## Other

The project has been integrated in a ```Travis-CI``` build. This build is in charge of making sure that the project can be deployed and works correctly, for this the project integrates:
- ```Unit tests```: have been defined using ```mocha``` and ```chai```. This have been done just in a few classes as example but could be extended but required effort on the mocking side with ```sinon```.
- ```integration test```: the back-end endpoints responses are been tested using ```newman```. This is the command line related to ```postman``` so the test can be generated and run also in the developers machine using this last one.

Find all the information of the CI in the next image/link : [![Build Status](https://travis-ci.org/kanekotic/flightRS.svg?branch=develop)](https://travis-ci.org/kanekotic/flightRS)

Also a deployed version of the code can be found [here](http://104.236.246.180/)

## Run and execute

No packages are required locally on deployment. after cloning the repository to run:
- Production enviroments:
```
npm run execute-production

```
- Development enviroments (installation of ```nodemon``` and ```Webpacks``` is required).
```
npm run dev-client
```
or
```
npm run dev-server
```
