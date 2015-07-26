# Just for Fun

## Project setup

1. Clone this repository
2. Navigate to the root of the folder
```
cd forfun/
```
3. Install NPM modules (for sake of interview assuming user has npm)
```
npm install
```
4. Run the Grunt process
```
grunt
```
5. Make the public folder your web server root and you should see the page!

## Structure
I chose to approach this task with scalability in mind (mainly on the JS side). Using require to modularize and separate components I wanted a system that could be built upon more and more. I've seen projects move backwards too many times because of a lack of attention to potential scalability.

### Tools in Structure
I chose to go with Grunt as it's my most comfortable task manager. I did not want to minify or uglify the JavaScript in case degbugged was needed on the Soylent side. I'm using SCSS for styling with very basic media query mixins. There was no need for sprites but if there were I would have considered using compass.

## How could it be improved
If I had the time to add more features to this my wish list would include the following (and if this is requested of me to demonstrate my skills I can add them in)
* JavaScript unit testing
* CSS animation for the removal of an order
* CSS animation for the popup and hide features of the modal
* AJAX polling that will learn and sync to the correct interval instead of polling every 30 seconds.
* Instead of having the modal template for orders be in JavaScript use HTML partials and have require load them in.

## Why no jQuery or other framework?
I chose not to use jQuery or any other JavaScript framework to demonstrate my native skills. I chose to use require for speediness of modular building but could have also chosen to create name-spaced objects as well.

Thank you all for taking the time to look through my code!
