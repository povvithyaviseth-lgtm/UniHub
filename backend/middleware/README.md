Middleware is a function that runs before your route handler. It's like a security guard or traffic filter. 

Incoming request  →  middleware  →  route  →  controller  →  response

every middleware will receive (req, res, next) 
req (request) - the request from the frontend 
res (response) - the response to the frontend
next - the next thing that will be called...?

