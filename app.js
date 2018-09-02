
const path    = require('path')
const express = require('express') // require only works under node.
const app     = express()


// This sets pug as the "view engine". You don't need to use this 
// specific one and each web framework more or less provides its own
// for example Django (python) uses django templates, that look like jinja2.
// There are many for express
app.set('view engine', 'pug') // use pug to render templates in view/*.pug


// JSON encoded bodies.
app.use(express.json());
app.use(express.urlencoded());
// here we serve everything under static as a path under /static.
// On HTTP/1.x servers, you can fetch a maximum of 8 files simultaneously
// from a given domain. Using a subdomain spreads the load from the main 
// server. You can also have the subdomain point to a content-distribution 
// network (CDN).
app.use('/static/', express.static(path.join(__dirname, 'static')))


// here we set a GET route. A GET request is 99% of your web browsing
// and means "fetch the content at this location".
app.get('/', (request, response) => {
    // return the template index.pug, with properties title and message 
    // passed in.
    response.render('index', { title: "Test Application", message: "Hello world"})
})

// for our next route we add both a GET and a POST handler.
// The GET handler displays the view.
// The POST handler isn't supposed to display anything; instead it 
// does some parsing. We prevent redirecting to it by the return false 
// action in the form.
// This isn't the nicest design, but this is just a demo.
app.route('/add')
    .get(function (request, response) {
        response.render('add');
    })
    .post(function (request, response) {
        console.log("Server received:");
        console.log(request.body);
        var a = parseInt(request.body.a, 10);
        var b = parseInt(request.body.b, 10);
        var sum = a+b;
        if ( isNaN(sum) ) {
            response.status(400).send({});
            return;
        }
        console.log("Computed sum: " + sum.toString());
        // we're doing JSON request and responses, so we send back 
        // an object indicating the sum:
        var obj = {'sum': sum};
        response.status(200).send(obj);
    });

app.listen(3000, () => console.log('Started application: http://127.0.0.1:3000'))
