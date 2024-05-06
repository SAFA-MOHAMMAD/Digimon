const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Check for the Authorization header
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        // Split the header value to get the token
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        // Verify the token using your_secret_key
        jwt.verify(bearerToken, 'your_secret_key', (err, authData) => {
            if (err) {
                // Send Forbidden status if verification fails
                res.sendStatus(403); // Forbidden access
            } else {
                // Attach the user data to the request object for further use
                req.user = authData;
                next(); // Proceed to the next middleware or route handler
            }
        });
    } else {
        // Forbidden if no token is found
        res.sendStatus(403);
    }
};

module.exports = verifyToken;
