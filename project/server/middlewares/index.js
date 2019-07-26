// fs
const accessLogger = require('./accessLogger');
const reqParser = require('./reqParser');
const catchError = require('./catchError');
const defaultRoute = require('./defaultRoute');
const reqLog = require('./reqLog');
const extendReqRes = require('./extendReqRes');

module.exports = (ctx) => {
  return {
    accessLogger: accessLogger(ctx),
    reqParser: reqParser(ctx),
    catchError: catchError(ctx),
    defaultRoute: defaultRoute(ctx),
    reqLog: reqLog(ctx),
    extendReqRes: extendReqRes(ctx),
  }
}
