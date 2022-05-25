### How to Install?
clone this project then in the root folder run this command in terminal
```
npm install
```
### How to run it?
to start the project run this command in terminal
```
npm run build && npm run start
```
> Note Server Start at http://localhost:3000


### How to run tests?
run this command in terminal
```
npm run test
```

### Another script 
1. to run eslint
```
npm run lint
```
2. to run eslint with fix mode
```
npm run lint:fix
```
3. to run prettier
```
npm run format
```
4. to start the app with nodemon for hot reload on changes
```
npm run start:hot-reload
```
5. to build the app and transpile typescript files to javascript
```
npm run build
```

## How To Use Examples
there is one api endpoint in this application ``/api/images``which takes 3 queryString parameters all of them required 
- ``name`` of type string for the image name, allowed names [``encenadaport`` , ``fjord`` , ``icelandwaterfall`` , ``palmtunnel`` , ``santamonica``]
- ``width`` of type number with minimum value (1) and maximum value (5000) for the desired image width
- ``height`` of type number with minimum value (1) and maximum value (5000) for the desired image height

### Valid Example
 ``http://localhost:3000/api/images?name=encenadaport&height=500&width=500``
 
 > allowed names [``encenadaport`` , ``fjord`` , ``icelandwaterfall`` , ``palmtunnel`` , ``santamonica``]
 
### Unvalid Examples
- ``http://localhost:3000/api/images?name=encenadaport.jpg&height=500&width=500``

-  ``http://localhost:3000/api/images?name=encenadaport``

- ``http://localhost:3000/api/images?name=encenadaport&height=500``

- ``http://localhost:3000/api/images?name=encenadaport&&width=500``
