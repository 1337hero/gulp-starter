# Gulp Static Starter Workflow

This project is a *starter kit* for building static sites with an emphasis on maintaing an organized project structure. I use HTML Partials and Nunjucks to add some ....

## INSTALLATION

If you're already up and running with most of the usual Node ecosystem tools this starter kit won't require much additional effort.

### REQUIRED

* Install [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm).
* Install [Gulp](http://gulpjs.com/): `npm install -g gulp`.
* Download or clone this repo: `git clone https://github.com/1337hero/gulp-starter.git`.

TO-DO List

Need to improve this README

## Project Structure

````bash
my-gulp-project/                  // Your project folder
├── gulpfile.js                   // Gulp Configuration
│
├── dev                           // Development Folder
│   ├── sass                      // SASS
│   │   ├── app.scss              
│   │   ├── variables.scss     
│   │   └── page.scss
│   │ 
│   ├── html                      // Site Files go here
│   │   └── inc                   // html partials
│   │   │   ├── header.html 
│   │   │   └── footer.html 
│   │   ├── about.html
│   │   └── index.html
│   ├── img                       // put images here
│   ├── js                        // put your javascript here
│   └── fonts                     // fonts go here
│
└── dist                          // 
    ├── css
    ├── js
    ├── fonts
    └── img                    // 

````

## Contributors welcome! Cheers.