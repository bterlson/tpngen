"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
};
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var readFile = fs_1.promises.readFile;
var readdir = fs_1.promises.readdir;
var stat = fs_1.promises.stat;
var SKIP_DIRS = new Set(['node_modules', 'test', 'test-browser', 'dist-test']);
function projectSourcemaps(rootPath) {
    return __asyncGenerator(this, arguments, function projectSourcemaps_1() {
        var files, _i, files_1, file, filepath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __await(readdir(rootPath, { withFileTypes: true }))];
                case 1:
                    files = _a.sent();
                    _i = 0, files_1 = files;
                    _a.label = 2;
                case 2:
                    if (!(_i < files_1.length)) return [3 /*break*/, 9];
                    file = files_1[_i];
                    filepath = path_1.join(rootPath, file.name);
                    if (!file.isDirectory()) return [3 /*break*/, 5];
                    if (SKIP_DIRS.has(file.name)) {
                        return [3 /*break*/, 8];
                    }
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(projectSourcemaps(filepath))))];
                case 3: return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 5:
                    if (!file.name.endsWith(".js.map")) return [3 /*break*/, 8];
                    return [4 /*yield*/, __await(filepath)];
                case 6: return [4 /*yield*/, _a.sent()];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 2];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function getPackageRoot(filename) {
    return __awaiter(this, void 0, void 0, function () {
        var dir, pkgPath, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dir = path_1.dirname(filename);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    pkgPath = path_1.join(dir, "package.json");
                    //console.log('checking existence of', pkgPath);
                    return [4 /*yield*/, stat(pkgPath)];
                case 2:
                    //console.log('checking existence of', pkgPath);
                    _a.sent();
                    //console.log('exists');
                    return [2 /*return*/, dir];
                case 3:
                    e_1 = _a.sent();
                    //console.log('got error' ,e);
                    if (e_1.code === 'ENOENT') {
                        return [2 /*return*/, getPackageRoot(dir)];
                    }
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
var PROJECT_ROOT = "../azure-sdk-for-js/sdk/";
var projects = [
    'storage/storage-queue'
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var e_2, _a, _i, projects_1, project, root, seenPackages, _b, _c, map, contents, _d, _e, sources, _f, sources_1, source, sourcePath, packageRoot, pkgJson, _g, _h, e_2_1;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _i = 0, projects_1 = projects;
                    _j.label = 1;
                case 1:
                    if (!(_i < projects_1.length)) return [3 /*break*/, 19];
                    project = projects_1[_i];
                    console.log('\n\n### ' + project);
                    root = PROJECT_ROOT + project;
                    seenPackages = new Set();
                    _j.label = 2;
                case 2:
                    _j.trys.push([2, 12, 13, 18]);
                    _b = __asyncValues(projectSourcemaps(root));
                    _j.label = 3;
                case 3: return [4 /*yield*/, _b.next()];
                case 4:
                    if (!(_c = _j.sent(), !_c.done)) return [3 /*break*/, 11];
                    map = _c.value;
                    console.log('have sourcemap', map);
                    _e = (_d = JSON).parse;
                    return [4 /*yield*/, readFile(map, "utf-8")];
                case 5:
                    contents = _e.apply(_d, [_j.sent()]);
                    sources = contents.sources;
                    _f = 0, sources_1 = sources;
                    _j.label = 6;
                case 6:
                    if (!(_f < sources_1.length)) return [3 /*break*/, 10];
                    source = sources_1[_f];
                    sourcePath = path_1.join(path_1.dirname(map), source);
                    return [4 /*yield*/, getPackageRoot(sourcePath)];
                case 7:
                    packageRoot = _j.sent();
                    _h = (_g = JSON).parse;
                    return [4 /*yield*/, readFile(path_1.join(packageRoot, "package.json"), "utf-8")];
                case 8:
                    pkgJson = _h.apply(_g, [_j.sent()]);
                    if (pkgJson.name === 'rush-common') {
                        console.log('cant find package root for', source);
                    }
                    if (seenPackages.has(pkgJson.name))
                        return [3 /*break*/, 9];
                    seenPackages.add(pkgJson.name);
                    if (pkgJson.author &&
                        JSON.stringify(pkgJson.author).match(/microsoft/i)) {
                        if (pkgJson.name === "@azure/core-tracing") {
                            console.log("opentelemetry-js");
                        }
                    }
                    else {
                        console.log(pkgJson.name);
                    }
                    _j.label = 9;
                case 9:
                    _f++;
                    return [3 /*break*/, 6];
                case 10: return [3 /*break*/, 3];
                case 11: return [3 /*break*/, 18];
                case 12:
                    e_2_1 = _j.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 18];
                case 13:
                    _j.trys.push([13, , 16, 17]);
                    if (!(_c && !_c.done && (_a = _b.return))) return [3 /*break*/, 15];
                    return [4 /*yield*/, _a.call(_b)];
                case 14:
                    _j.sent();
                    _j.label = 15;
                case 15: return [3 /*break*/, 17];
                case 16:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 17: return [7 /*endfinally*/];
                case 18:
                    _i++;
                    return [3 /*break*/, 1];
                case 19: return [2 /*return*/];
            }
        });
    });
}
main().catch(function (e) { return console.error(e); });
