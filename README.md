
# Seven steps for the project

- Project definition
    - Goals:
        to demonstrate professional experience and web presence
    - Audience:
        - potential employers
        - developer community
        - ...
- Planning
    - plan content: 
        text (look down in Content structure section) 
        images
            collect theme for images
            sources
            discuss
        videos (?)
        icons
            need to decide on them
    - start thinking about visual hierarchy
    - define the navigation (look down in Main navigation section)
    - define the site structure if it is a bigger project (site map) (?)
- Sketch the ideas before the design
    - get inspired and think about the design
        list example websites:
    - get the ideas out of your head
        list of ideas:
    - sketches:
        links to images
    - never start designing without having an idea of what you want
- Design and development phase
    - design using the guidelines
    - develop in the browser, using html and css
- Optimisation
    - optimise for performance
    - SEO
- Launch the masterpiece
    - hosting
        AWS instance in apache
- Maintenance
    - study the behaviour of your users
    - update the site frequently


## Content structure

### Main Navigation:
1. Who I am (Section 1)
2. What I do (Section x)
3. Experience (Section xx)
4. Blog posts (Section xxx)


### Section 0: Header with hero image and navigation
Title: None

Welcome to my website
Button 1: follow me (go down to sign up section)
Button 2: Show me more (go down to next section)

## Colour palette

* http://paletton.com/palette.php?uid=33w0u0kqDDcgcNPlGHPA3-Z-Cp4

## Setting up gulp

    npm init
    npm install gulp --save
    npm install static-server --save
    npm install gulp-autoprefixer@3.1.0 --save-dev
    npm install --save-dev gulp-imagemin@3.0.1 
    npm install --save imagemin-pngquant@5.0.0
    npm install --save imagemin-jpeg-recompress@5.0.0
    npm install --save-dev del
    npm install --save-dev gulp-zip
    npm install --save-dev gulp-util
    npm install --save-dev gulp-exec
    npm install --save-dev gulp-concat
    npm install --save-dev gulp-clean-css
    npm install --save-dev gulp-sourcemaps
    npm install --save-dev gulp-plumber

## Running the site locally with node

    node server.js

### Push to server

Merge to master branch and it will trigger an upload to the S3 bucket using a web identity in AWS.

[S3 bucket url](http://davidajimenez.net.s3-website-ap-southeast-2.amazonaws.com/)
