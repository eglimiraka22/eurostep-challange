// services/auth.js
const fakeAuthService = {
  tokenKey: "token",

  createFakeToken: (payload) => {
    // In a real app, we would use a library like jsonwebtoken to create a valid JWT or
    // get a token from the server api
    // For simplicity, this example uses a simple base64 encoding
    const header = { alg: "HS256", typ: "JWT" };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));

    return `${encodedHeader}.${encodedPayload}`;
  },

  getToken: () => {
    return localStorage.getItem(fakeAuthService.tokenKey);
  },

  setToken: (token) => {
    localStorage.setItem(fakeAuthService.tokenKey, token);
  },

  removeToken: () => {
    localStorage.removeItem(fakeAuthService.tokenKey);
  },

  login: async (username, password) => {
    // Mocking authentication with a fake username and password
    if (username === "user" && password === "password") {
      // Check if a token is stored and not expired
      const storedToken = fakeAuthService.getToken();
      if (storedToken) {
        const decodedToken = fakeAuthService.decodeToken(storedToken);
        if (decodedToken && decodedToken.exp > Math.floor(Date.now() / 1000)) {
          // Token is still valid, return it
          return storedToken;
        }
      }

      // Token is either expired or doesn't exist, generate a new one
      const tokenPayload = {
        usePassword: password,
        exp: Math.floor(Date.now() / 1000) + 3600, // Expiration time (1 hour from now)
      };

      const newToken = fakeAuthService.createFakeToken(tokenPayload);
      fakeAuthService.setToken(newToken);

      return newToken;
    } else {
      return Promise.reject(new Error("Invalid credentials"));
    }
  },

  logout: async () => {
    fakeAuthService.removeToken();
    return Promise.resolve();
  },

  decodeToken: (token) => {
    // Simulate decoding the token to check its expiration
    const [payload] = token.split(".").slice(0, 2);
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  },
};

export default fakeAuthService;
