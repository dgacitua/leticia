// $ mongo leticia-pilot seed-mongo.js

db.users.insertOne({
  "name" : "Test",
  "email" : "test@example.org",
  "password" : "$2a$08$e5VVnjX7k/DxWDiuuc3Lt.3crlyGYTmYoUGEp7.iUr565k9Qznq1e",  // password
  "tokens" : []
});