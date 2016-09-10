
Steps:-

1. Install node version min 4.4.4+   https://nodejs.org/en/
2. Install npm with command npm install  https://docs.npmjs.com/cli/install
3.  Install npm dependencies:-
	a. npm Express  - npm install express
	b. Fs file system npm  -  npm install --save fs-extra
	c. Npm Static - npm install node-static
	d. body-parser - npm install body-parser
	e. http server - npm install -g http-server
4. On the main folder run node app.js It will by default run in http://localhost:3003

Whole Ui code is inside public folder

5. The google-maps.html for ui can be opened through same url in browser by going to http://localhost:3003/google-maps.html
6. By default have given lat and long as 0,0
7. But it will ask for geolocation if you allow it will show the current city as map center
8. All css is inside css/maps.css
9. Js is inside js/maps.js
10. Server we are creating local with help of node to interact with local json file.
11. Bottom are links which is grouped by country & city and order by country. Clicking on that takes to the respective marker.

Questions answered:-
1. Not written test cases as dnt have a working experience on that. As started basic learning for jasmine, protractor and karma
2. Javascript with angularjs framework and node for running localserver and host the web
3. Libraries used:-
	a. Node.js for local server
	b. angular js for frontend as currently working on that so needed more profieciency so tried my hands on the same to test my capability
	c. Kept code very simple and straight. Node js used generally for same above reason and wanted to try out a local server creation also.
	d. Deployment of both server and frontend on local nodejs server. Port also is same as all code under a single directory.