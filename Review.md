# Review Questions

## What is Node.js?
Node.js is a runtime environment used to execute JavaScript applications outside the browser.

## What is Express?
Express is a web application framework that sits on top of the Node.js web server and adds extra functionality, like routing and middleware support, and a simpler API.

## Mention two parts of Express that you learned about this week.
It's compatible with connect middleware and it's unopinionated.

## What is Middleware?
An array of functions that get executed in the order they are introduced into the server code.

## What is a Resource?
In Node.js everything is a resource, so they're akin to being essentially a grouping of data.

## What can the API return to help clients know if a request was successful?
res.status codes.

## How can we partition our application into sub-applications?
Express routers allow us to break up our endpoints into seperate sub-applications.

## What is express.json() and why do we need it?
It converts the object being returned into json formatting, so that we can interact with the data more easily.