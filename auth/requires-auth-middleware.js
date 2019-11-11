

// Write a piece of global middleware that ensures a user is logged in when accessing any route prefixed by /api/restricted/. For instance, /api/restricted/something, /api/restricted/other, and /api/restricted/a should all be protected by the middleware; only logged in users should be able to access these routes.