"use strict";
var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var index_1 = require("./routes/index");
var users_1 = require("./routes/users");
/**
 * The server.
 *
 * @class Server
 */
var Server = (function () {
    /**
     * Constructor.
     *
     * @class Server
     * @constructor
     */
    function Server() {
        //create expressjs application
        this.app = express();
        //configure application
        this.config();
        //configure routes
        this.routes();
    }
    /**
     * Configure application
     *
     * @class Server
     * @method config
     * @return void
     */
    Server.prototype.config = function () {
        //configure jade
        this.app.set("views", path.join(__dirname, "../views"));
        this.app.set("view engine", "jade");
        //mount logger
        //this.app.use(logger("dev"));
        //mount json form parser
        this.app.use(bodyParser.json());
        //mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));
        //add static paths
        this.app.use(express.static(path.join(__dirname, "../public")));
        // catch 404 and forward to error handler
        this.app.use(function (err, req, res, next) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });
    };
    /**
     * Configure routes
     *
     * @class Server
     * @method routes
     * @return void
     */
    Server.prototype.routes = function () {
        //use router middleware
        this.app.use('/', index_1.router);
        this.app.use('/users', users_1.router);
    };
    return Server;
}());
var server = new Server();
module.exports = server.app;
