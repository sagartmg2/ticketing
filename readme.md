

1.client hits a url route // eg. /signup with request body.
2.server receives and checks for the specific route and if valid, lets express.Router() handles that route
3.if any middleware, the middleware is first executed and via next(), other remaining middlewares/actions are processed.
4.finally our method inside controller is called where the method does various logical and database related operations. 
