
# Javascript file generator

generate javascript skeleton constructor with header, closure, private functions..

Your support means a lot.

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/isabolic99)

## Install version
### pre requirements

- [node.js](https://nodejs.org)

1) download project into your prefered directory
2) inside terminal navigate into project directory and run
   ```bash
   npm install
   ```
3) go into node.server and edit file package.json, there you set header tokkens for replacement
   ```javascript
    ...
    "options" : {
      "header" : {
        "author":"JS_AUTHOR",
        "authorMail":"JS_AUTHOR",
        "authorTwt":"JS_AUTHOR_TWITTER"
      }
    }
    ...
   ```
4) inside terminal navigate into copied node.server directory and run
   ```bash
   node index.js CONSTRUCTOR_NAME
   ```
 
### templates
You can create/edit/delete templates. All tamplates are stored in templates folder.

### Oracle APEX 
This project also supports creating oracle apex. It creates javascript skeleton with apex JS API.

To generate inside terminal execute
 ```bash
 node index.js CONSTRUCTOR_NAME APEX_INTERNAL_NAME
 ```
 





  

