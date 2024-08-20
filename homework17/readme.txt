What are Middleware Functions in Express.js, and How Do They Work?

Middleware Functions are functions that executes during the request and response cycle. They have access to the 
request object, response object and the next middleware function. The middleware functions are executed before 
a request reaches to it destined route. So, lets say we have '/home', '/todo' routes and we have a middleware 
function that console logs "hello". If we decide to apply the middleware function to all the
routes then whenever a user makes a request to any of the routes "hello" will be printed in the console.

What is JWT, and how does it work?
JWT (JSON Web Token) is a method used for securely transmitting information between a client and a server. 
It is often used for authentication and authorization. A JWT consists of three parts: 
a header, which specifies the type of token and the algorithm used.
a payload, which contains the actual data or claims, such as a user ID.
and a signature, which is created by encoding the header and payload with a secret key to ensure the token's integrity.
 
When a user logs in, the server generates a JWT and sends it to the client, where it is stored in the local storage. 
For future requests, the client sends this token back to the server, which verifies the signature to authenticate the user.


How do you securely store JWT on the client-side?
We can use local storage or cookies to securely store JWT on the client-side

How does token expiration work in JWT?
In JWT , token expiration is managed by including an expiration time in the token's payload. 
This claim specifies the exact date and time when the token will expire. When the server receives a JWT, 
it checks the exp value to determine if the token is still valid. If the current time exceeds the expiration time, 
the token is considered expired, and the server will reject it, usually prompting the user to log in again. 