module.exports = {
  apps : [
    {
      name        : "leticia-backend",
      script      : "./build/server/index.js",
      env: {
        "NODE_ENV": "development",
      },
      env_production: {
        "NODE_ENV": "production"
      }
    },
    {
      name       : "leticia-frontend",
      script     : "http-server",
      args       : "./build/client -p 3000 --proxy http://localhost:3000?",
      env: {
        "NODE_ENV": "development",
      },
      env_production: {
        "NODE_ENV": "production"
      }
    }
  ]
}
