#!/usr/bin/env node

// this generator assumes you have run the the documentation
// generation script prior to execution

// required modules
var fs = require("fs");
var path = require("path");
var util = require("util");

// default tree structure
var tree = {
    "/": {
        isDirectory: true,
        isFile: false,
        path: "/",
        basename: "bootplate-mvc"
    }
};

// default path
var root = "./source";

// additional variables
var files;
var json = [];
var cwd = process.cwd();
var jsonfile = "./assets/filestructure.json";

// add the root to the json model objects
jsonify(tree["/"]);

// a recursive filesystem walk to create a tree of just
// the javascript files and directories we're interested in
// while simultaneously generating the JSON parseable objects
// for the manfiest
function walk (file, base) {
    var basename = path.basename(file);
    var fullpath;
    var stat;
    var docpath;
    base = base || tree["/"];
    fullpath = base.path === "/"? path.resolve("./", file): path.resolve(base.path, file);
    stat = fs.statSync(fullpath);
    if (stat.isDirectory() && basename !== "css") {
        base = base[basename] = {};
        base.path = fullpath;
        base.isDirectory = true;
        base.isFile = false;
        base.basename = basename;
        jsonify(base);
        fs.readdirSync(fullpath).forEach(function (file) {
            walk(file, base);
        });
    } else if (stat.isFile()) {
        if (path.extname(basename) === ".js" && "package.js" !== basename) {
            docpath = path.resolve("./assets/docco/generated", basename.slice(0,-3) + ".html");
            base = base[basename] = {};
            base.path = fullpath;
            base.isDirectory = false;
            base.isFile = true;
            base.basename = basename;
            base.documentation = fs.readFileSync(docpath, "utf8");
            jsonify(base);
        }
    }
}

// generates the appropriate JSON entry for a model
function jsonify (node) {
    var props = {basename:"",isDirectory:"",isFile:""};
    var prop;
    var nodepath = node.path.slice(cwd.length) || "/";
    var parent = nodepath.split("/").slice(0,-1).join("/") || null;
    // for the one-case and the parent is the root node
    if ("/" === nodepath[0] && nodepath.length > 1 && null === parent) parent = "/";
    for (prop in props) {
        props[prop] = node[prop];
    }
    props.path = nodepath;
    props.parent = parent;
    if (props.isFile) {
        props.documentation = node.documentation;
    }
    json.push(props);
}

// walk and construct the tree with only
// the files we care about
walk(root);
// now generate the desired JSON manifest file
fs.writeFileSync(jsonfile, JSON.stringify(json, null, 4));