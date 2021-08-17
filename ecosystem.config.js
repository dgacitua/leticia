module.exports = {
  apps : [
    {
      name        : "leticia-app",
      script      : "./build/index.js",
      env: {
        "NODE_ENV": "production"
      },
      env_development: {
        "NODE_ENV": "development",
      }
    }
  ]
}