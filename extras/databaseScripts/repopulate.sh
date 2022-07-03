#!/bin/sh

mongo leticia-user cleanUserDatabase.js
mongo leticia-data cleanDataDatabase.js

mongo leticia-user populateUserDatabase.js
mongo leticia-data populateDataDatabase-en.js