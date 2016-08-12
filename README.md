# TravelRS

This project is an single page application simulating a reservation page the project has is devided in fornt-end and back-end

## Front-end
The front-end has been defined using the ```MVP``` patern for separation of concerns:
- ```Model```: javascript class or objects that represent information (found on path /client/models)
- ```Presenters```: javascript class in charged of defining the Jquery interactions (found on path /client/presenters)
- ```views```: 
    - ```partials```:  html partial classes for the UI devinition (found on path /client/views/partials)
    - ```styles```: ui styles defined using ```stylus``` (found on path /client/views/styles)

All the code is writen using ```ES6``` and transpiled for compatibility browser reasons using ```webpacks```. For styling and control ```bootstrap``` has been used with some extra controls for UI improvements (```bootstrap-3-typeahead```,```bootstrap-datepicker``` and```bootstrap-validator```).

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
Furthermore for security to make sure there is no ```Parameter Pollution```, parameter types have been checked. Also to prevent ```XSS``` on the request the body of the request has been sanitize.
