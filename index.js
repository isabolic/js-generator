"use strict";
/**
 *
 * project : javascript generator
 * Version : 1.0.0
 *
 * Author : isabolic99
 * Mail   : sabolic.ivan@gmail.com
 * Twitter: @isabolic99
 */

(() => {
    const winston = require("winston");
    const mkdirp  = require("mkdirp");
    const fs      = require("fs");
    const q       = require("q");
    const pjson   = require("./package.json");
    const options = pjson.options;

    let wiLogger = new(winston.Logger)({
        transports: [
            new(winston.transports.Console)(),
            new(winston.transports.File)({
                name: "info-file",
                filename: "logs/filelog-info.log",
                level: "info"
            }),
            new(winston.transports.File)({
                name: "error-file",
                filename: "logs/filelog-error.log",
                level: "error"
            })
        ]
    });

    const templateFolder = "templates";
    const jsExt          = ".js";
    const outDir         = "out";

    const filesTemplates = {
        "header"            : "header.js",
        "namespace"         : "namespace.js",
        "startClosure"      : "closure.start.js",
        "endClosure"        : "closure.end.js",
        "startClosureApx"   : "closure.start.apx.js",
        "endClosureApx"     : "closure.end.apx.js",
        "constructorOpts"   : "constructor.opts.js",
        "constructorOptsApx": "constructor.opts.apx.js",
        "constrProps"       : "constructor.props.js",
        "constrPropsApx"    : "constructor.props.apx.js",
        "privateMethodsApx" : "private.methods.apx.js",
        "privateMethods"    : "private.methods.js"
    }

    const tokens = ["#NAME#", "#APEX_NAME#"];

    let className = null;
    let apexName = null;

    let getClassName = () => {
        let def = q.defer();

        process.argv.forEach((val, index, array) => {
            if (index === 2){
                wiLogger.log("info", "new className => " + val);
                className = val;
            }

            if (index === 3) {
                wiLogger.log("info", "apexName => " + val);
                apexName = val;
            }

            if (array.length === (index + 1)){
                def.resolve(className);
            }
        });

        return  def.promise;
    }

    let getFileName = () => {
        return className.toLowerCase() + jsExt;
    }


    let createLogDir = () => {
        let def = q.defer();

        mkdirp("logs", (err) => {
            if (err) {
                wiLogger.log("error", "err creating log folder " + err);
                def.reject();
            } else {
                def.resolve();
            }

        });

        return  def.promise;
    }

    let createOutDir = () => {
        let def = q.defer();

        mkdirp(outDir, (err) => {
            if (err) {
                wiLogger.log("error", "err creating out folder " + err);
                def.reject();
            } else {
                def.resolve();
            }
        });

        return  def.promise;
    }

    let createFile = () => {
        let def = q.defer();
        fs.writeFile(outDir + "/" + getFileName(), "", (err) => {
            if(err) {
                wiLogger.log("error", "err creating out folder " + err);
                def.reject(err);
            } else {
                def.resolve();
            }
        });

        return  def.promise;
    }

    let writeToFile = (data) => {
        let def = q.defer();

        fs.appendFile(outDir + "/" + getFileName(), data, (err) => {
             if(err) {
                wiLogger.log("error", "err creating out folder " + err);
                def.reject(err);
            } else {
                def.resolve();
            }
        });

        return  def.promise;
    }

    let replaceTokens = (content) => {
        let ret = content;

        ret = ret.replace(new RegExp(tokens[0], 'g'), className);
        ret = ret.replace(new RegExp(tokens[1], 'g'), apexName);

        return ret;

    }

    let getTemplateContent = (fpath) => {
         let content = fs.readFileSync(fpath).toString();
         return content;
    }

    let createHeader = () => {
        let def = q.defer(), header;

        header = getTemplateContent(templateFolder + "/" + filesTemplates.header);
        header = replaceTokens(header);

        if( typeof(options.header) === "object") {
            Object.keys(options.header).forEach((key) => {
                header = header.replace(new RegExp("#header." + key + '#', 'g'), options.header[key]);
            });
        }


        writeToFile(header)
                .done(def.resolve());

        return  def.promise;
    }

    let createNamespace = () => {
        let def = q.defer(), content, template, nspace,
            namespaces = className.split('.');

        template = getTemplateContent(templateFolder + "/" + filesTemplates.namespace);
        // remove className
        namespaces.splice(-1,1);

        namespaces.forEach((val) => {

            if(content !== undefined){
                nspace += "." + val;
                content +=  template.replace(new RegExp(tokens[0], 'g'), nspace);
            } else {
                nspace = val;
                content = template.replace(new RegExp(tokens[0], 'g'), nspace);
            }
        });

        writeToFile(content)
                .done(def.resolve());


        return  def.promise;
    }

    let createOpenClosure = () => {
        let def = q.defer(), content;

        if (apexName === null){
            content = getTemplateContent(templateFolder + "/" + filesTemplates.startClosure);
        }else{
            content = getTemplateContent(templateFolder + "/" + filesTemplates.startClosureApx);
        }

        writeToFile(content)
                .done(def.resolve());

        return  def.promise;
    }

    let createEndClosure = () => {
        let def = q.defer(), content;

        if (apexName === null){
            content = getTemplateContent(templateFolder + "/" + filesTemplates.endClosure);
        }else{
            content = getTemplateContent(templateFolder + "/" + filesTemplates.endClosureApx);
        }

        writeToFile(content)
                .done(def.resolve());

        return  def.promise;
    }

    let createPrivateMethod = ()  => {
        let def = q.defer(), content;

        if (apexName === null){
            content = getTemplateContent(templateFolder + "/" + filesTemplates.privateMethods);
        }else{
            content = getTemplateContent(templateFolder + "/" + filesTemplates.privateMethodsApx);
        }

        writeToFile(content)
                .done(def.resolve());


        return  def.promise;
    }

    let createOptsObject = () => {
        let def = q.defer(), content;

        if (apexName === null){
            content = getTemplateContent(templateFolder + "/" + filesTemplates.constructorOpts);
        }else{
            content = getTemplateContent(templateFolder + "/" + filesTemplates.constructorOptsApx);
        }

        writeToFile(content)
                .done(def.resolve());

        return  def.promise;
    }

    let createConstProp = () => {
        let def = q.defer(), content;

        if (apexName === null){
            content = getTemplateContent(templateFolder + "/" + filesTemplates.constrProps);
        }else{
            content = getTemplateContent(templateFolder + "/" + filesTemplates.constrPropsApx);
        }

        content = replaceTokens(content);

        writeToFile(content)
                .done(def.resolve());

        return  def.promise;
    }

    let createConstructor = () => {
        let def = q.defer();

        q.fcall(getClassName)
            .then(createFile)
            .then(createHeader)
            .then(createNamespace)
            .then(createOpenClosure)
            .then(createOptsObject)
            .then(createPrivateMethod)
            .then(createConstProp)
            .then(createEndClosure);

        return  def.promise;
    }

    q.fcall(createLogDir)
     .then(createOutDir)
     .done(createConstructor);


})();