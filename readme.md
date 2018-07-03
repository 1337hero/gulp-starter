#Gulp Starter Workflow

This is a basic, and ever evolving workflow for working with Gulp projects. I wanted something could add to most projects, weather it was a WordPress theme, Jeykll site build or static HTML site build.

The primary goals of this experiment:

1. Compile sass, add prefixes, and spit out a minified file.
2. Concat JS and spit out minified file.
3. Build (Deployment structure of site)
4. Serve HTML and refresh the browser with changes using browserSync
5. Deploy changes to Github or Amazon AWS

Future plans

Need to do add html-minified and a way to structure html into the final build for the workflow.

#### Install Dependencies
```bash
npm install
```

#### Run development tasks:
```
gulp
```