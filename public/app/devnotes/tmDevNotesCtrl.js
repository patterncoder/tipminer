angular.module('app').controller('tmDevNotesCtrl', function($scope){


    $scope.DevNotes = [
        {"date": "140324", "text":"Setting up new dev project with the pluralsight project by Joe Eames on the mean stack."}
        ,{"date": "140324", "text":"Created new directory...npm installed --save express jade"}
        ,{"date": "140324", "text":"[git init] to kick of git for source control"}
        ,{"date": "140324", "text":"created a new .gitignore file in webstorm [git status] to see what files are tracked"}
        ,{"date": "140324", "text":"added .idea and node_modules to the gitignore file to keep them out of source control"}
        ,{"date": "140324", "text":"[git status] again and the files have been removed from gits purview"}
        ,{"date": "140324", "text":"[git add -A] to add to staging and [git commit -m 'initial commit']"}
        ,{"date": "140324", "text":"[git remote add origin https://github.com/patterncoder/tipminer.git] to add the github repo I created on the site"}
        ,{"date": "140324", "text":"[git push -u origin master] entered the username and password"}
        ,{"date": "140324", "text":"install client side dependencies with bower I chose to install globally could have installed as just scoped to project would have been [npm install bower --save-dev]"}
        ,{"date": "140324", "text":"[npm install bower -g] executed successfully geez..lot of stuff with bower"}
        ,{"date": "140324", "text":"now need to setup folder structure added two top level folder server(node files and views, partials etc this is because partials will be processed with jade) and public(css, angular etc)"}
        ,{"date": "140324", "text":"added a bowerrc file to tell where to place client side dependencies"}
        ,{"date": "140324", "text":"[bower init]...answered several questions no to all except yes to private..also set to node module type(not sure if this was correct)"}
        ,{"date": "140324", "text":"[bower install jquery --save]...[bower install toastr --save]...[bower install angular angular-route angular-resource --save]"}
        ,{"date": "140324", "text":"the above commands added a dependency node to the bower.json file also because of the .bowerrc file it added the installed files in the public/vendor folder...pretty clean so far"}
        ,{"date": "140324", "text":"added server.js file...and started coding according to the \'creating the node application \' module in the pluralsight video.  this is where watchers were discussed for webstorm."}
        ,{"date": "140324", "text":"added server/views folder and an index.jade file"}
        ,{"date": "140324", "text":"started up server succesfully but could not browse to it...fixed it..had doctype html and is should just be doctype at the top of the jade file"}
        ,{"date": "140324", "text":"[npm install nodemon -g] for the ability make changes without stopping node each time  "}
        ,{"date": "140324", "text":"added some more code to server.js and [npm install stylus --save]"}
        ,{"date": "140324", "text":"everything is working at this point."}
        ,{"date": "140324", "text":"committed changes to this point...pushed to github...deployed to azure...didn't work...think it has to do with ports"}
        ,{"date": "140324", "text":"added an server/includes folder and a layout.jade file in the folder...added a public/css folder"}
        ,{"date": "140324", "text":"bower installed bootstrap for project then copied the bootstrap.css file to the public/css folder"}
        ,{"date": "140324", "text":"npm intalled globally the stylus module so that the stylus file watcher would work"}
        ,{"date": "140324", "text":"modified the index.jade and created layout.jade and scripts.jade this packaged up the scripts and process the site.styl file"}
        ,{"date": "140324", "text":"fixed azure after modifying how the port was set and now it runs correctly"}
        ,{"date": "140324", "text":"added public/app folder and added app.js file and started the angular aspect of the app"}
        ,{"date": "140324", "text":"going to setup angular partials to use jade...added a /server/views/partials folder and added a main.jade file called from the mainCtrl"}
        ,{"date": "140324", "text":"added ng-view and ng-app directives to index.jade and layout.jade respectively"}
        ,{"date": "140324", "text":"getting ready to add mongo...npm install mongoose --save"}
        ,{"date": "140324", "text":"added code according to the video and got it working!"}
        ,{"date": "140324", "text":"next part is the heroku deployment which includes adding a mongolab db"}
        ,{"date": "140324", "text":"made a Procfile that heroku reads to tell it to launch node, also modified the package.json to have an engines key that has the node and npm versions specified"}
        ,{"date": "140324", "text":"okay..messed around for a while.  got the github repo deploying to azure and heroku.  to get to heroku it goes through codeship"}
        ,{"date": "140324", "text":"played around with environment variables...NODE_ENV=production was set in the config screen on azure and through the heroku cli for heroku.  the heroku deployment varies from the video a little bit because of the dual deployment"}
        ,{"date": "140407", "text":"Starting back up today...trying to figure out where I left off...reviewed that I started implementing some bootstrap on the partials that angular calls for in the main.jade"}
        ,{"date": "140407", "text":"Looks like next we are going to mock up some sample data...just did a git status to see what's up there...currently up to date..just learned cd .. moves you up one directory in the command line"}
        ,{"date": "140407", "text":"did some reorganization...move main controller controller to a new folder app/main"}
        ,{"date": "140407", "text":"put sample data objects in the main controller and then linked to them in the two partials via ng-repeat"}
        ,{"date": "140407", "text":"Created partial for login...added ng-include to the main.jade"}
        ,{"date": "140407", "text":"refactored some more and moved files around...changed the partials route in server.js to an asterisk and moved files to ../../public/app/ + req.params"}
        ,{"date": "140407", "text":"did some more refactoring to move code out into their own files and used a lot of require() statements...liking where this is going and was doing some of the refactoring before the video explained it...i did watch it like five times while on the bike."}
        ,{"date": "140414", "text":"picking up on the preparing for login module on the pluralsight video.  npm install passport passport-local --save"}
        ,{"date": "140414", "text":"in mongoose.js created a userSchema mongoose.Schema, created a User var to create a mongoose model based on the mongoose schema"}
        ,{"date": "140414", "text":"learned that mongoose schema calls utils.toCollectionName to take the schema name and pluraize it to name the collection.  override this by new Schema({...},{collection:'putNameHere'}) tried it and it works"}
        ,{"date": "140414", "text":"finished the server and client code to implement a naive login...used passport...touched the server.js, routes.js, tmNavBarLoginCtrl and express.js files...deployed to github and thus heroku and azure..working on both sites!"}
        ,{"date": "140414", "text":"Moving on to improving the client login code video...started by implementing toastr notification..created new folder app/common...wrapped toastr in angular service"}
        ,{"date": "140414", "text":"Following video still...refactoring..created app/account/tmAuth.js...this is where Q is introduced for promises...moved the http call to authentication to its own module"}
        ,{"date": "140414", "text":"Moving on to next video improving the server login code....refactoring login route and moved logic to its own file...remember exports.[functionName] can modularize just a function"}
        ,{"date": "140414", "text":"Learning how to encrypt passwords. One way encryption..aka hashing...password + unique salt => hashing algorithm = hashed password"}
        ,{"date": "140414", "text":"the salt stuff wasn't too bad once i typed 'er in.  ***Remember to remove the password and salt from the schema when passing up to the client"}
        ,{"date": "140414", "text":"video Adding Signout Functionality...added signout feature in the navbar-login.jade file"}
        ,{"date": "140414", "text":"created the signout() function on the login controller...and created a route on the server to handle the logout"}
        ,{"date": "140414", "text":"persisting login between page refreshes video...stuck the current user into the currentuser.jade file and linked it to angular in the identity module with the $window angular service"}
        ,{"date": "140414", "text":"refactored server.js by putting all of the passport code in passport.js"}
        ,{"date": "140417", "text":"video:implementing clientside authorization...used angular resource added admin menu item when logged in as admin"}
        ,{"date": "140417", "text":"video:implementing serverside authroization..."}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}
        ,{"date": "140417", "text":""}

    ]

})