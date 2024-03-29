module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });

var Node = function () {
    function Node(type) {
        _classCallCheck(this, Node);

        if (type) this.type = type;
    }
    // Append a Node to the body.  This must handle cases where a Node's body is
    // another Node like a BlockStatement.  If it doesn't have a body,
    // don't do anything.


    _createClass(Node, [{
        key: "append",
        value: function append(node) {
            if (this.body instanceof Array) {
                this.body.push(node);
            } else if (this.body instanceof Node) {
                this.body.append(node);
            }
        }
    }], [{
        key: "arrayExpression",
        value: function arrayExpression(elements) {
            var node = new Node('ArrayExpression');
            node.elements = elements || [];
            return node;
        }
    }, {
        key: "assignmentExpression",
        value: function assignmentExpression(left, operator, right) {
            var node = new Node('AssignmentExpression');
            node.left = left;
            node.operator = operator;
            node.right = right;
            return node;
        }
        /* Node factory methods. */

    }, {
        key: "arrowFunctionExpression",
        value: function arrowFunctionExpression(params, body) {
            var node = new Node('ArrowFunctionExpression');
            node.params = params;
            node.body = body;
            node.id = null;
            node.generator = false;
            node.expression = true;
            return node;
        }
    }, {
        key: "binaryExpression",
        value: function binaryExpression(left, operator, right) {
            var node = new Node('BinaryExpression');
            node.left = left;
            node.operator = operator;
            node.right = right;
            return node;
        }
    }, {
        key: "blockStatement",
        value: function blockStatement() {
            var node = new Node('BlockStatement');
            node.body = [];
            return node;
        }
    }, {
        key: "callExpression",
        value: function callExpression(callee, args) {
            var node = new Node('CallExpression');
            if (typeof callee === 'string') {
                node.callee = Node.identifier(callee);
            } else if (callee instanceof Node) {
                node.callee = callee;
            }
            node.arguments = args || [];
            return node;
        }
    }, {
        key: "conditionalExpression",
        value: function conditionalExpression(test, consequent, alternate) {
            var node = new Node('ConditionalExpression');
            node.test = test;
            node.consequent = consequent;
            node.alternate = alternate;
            return node;
        }
    }, {
        key: "expressionStatement",
        value: function expressionStatement(expression) {
            var node = new Node('ExpressionStatement');
            node.expression = expression;
            return node;
        }
    }, {
        key: "functionDeclaration",
        value: function functionDeclaration(id, params, body, options) {
            var node = new Node('FunctionDeclaration');
            node.id = id;
            node.params = params;
            node.body = body;
            node.generator = options ? options.generator || false : false;
            node.expression = options ? options.expression || false : false;
            return node;
        }
    }, {
        key: "functionExpression",
        value: function functionExpression(id, params, options) {
            var node = new Node('FunctionExpression');
            node.id = id;
            node.params = params;
            node.body = Node.blockStatement();
            node.generator = options ? options.generator || false : false;
            node.expression = options ? options.expression || false : false;
            return node;
        }
    }, {
        key: "identifier",
        value: function identifier(name) {
            var node = new Node('Identifier');
            node.name = name;
            return node;
        }
    }, {
        key: "labeledStatement",
        value: function labeledStatement(label, expression) {
            var node = new Node('LabeledStatement');
            node.label = Node.identifier(label);
            node.body = expression;
            return node;
        }
    }, {
        key: "literal",
        value: function literal(value) {
            var node = new Node('Literal');
            node.value = value;
            node.raw = typeof value === 'number' ? value.toString() : "'" + value + "'";
            return node;
        }
    }, {
        key: "memberExpression",
        value: function memberExpression(obj, property, computed) {
            var node = new Node('MemberExpression');
            node.object = obj;
            node.property = property;
            node.computed = computed || false;
            return node;
        }
    }, {
        key: "objectExpression",
        value: function objectExpression(properties) {
            var node = new Node('ObjectExpression');
            node.properties = properties || [];
            return node;
        }
    }, {
        key: "property",
        value: function property(key, value) {
            var node = new Node('Property');
            node.key = key;
            node.value = value;
            node.computed = false;
            node.kind = 'init';
            node.method = false;
            node.shorthand = false;
            return node;
        }
    }, {
        key: "program",
        value: function program() {
            var node = new Node('Program');
            node.body = [];
            node.sourceType = 'script';
            return node;
        }
    }, {
        key: "returnStatement",
        value: function returnStatement(argument) {
            var node = new Node('ReturnStatement');
            node.argument = argument;
            return node;
        }
    }, {
        key: "variableDeclaration",
        value: function variableDeclaration(kind, declarations) {
            var node = new Node('VariableDeclaration');
            node.kind = kind;
            node.declarations = declarations || [];
            return node;
        }
    }, {
        key: "variableDeclarator",
        value: function variableDeclarator(id, init) {
            var node = new Node('VariableDeclarator');
            node.id = id;
            node.init = init;
            return node;
        }
    }]);

    return Node;
}();

exports.default = Node;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// Reserved word lists for various dialects of the language

var reservedWords = {
  3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
  5: "class enum extends super const export import",
  6: "enum",
  strict: "implements interface let package private protected public static yield",
  strictBind: "eval arguments"
};

// And the keywords

var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";

var keywords = {
  5: ecma5AndLessKeywords,
  6: ecma5AndLessKeywords + " const class extends export import super"
};

// ## Character categories

// Big ugly regular expressions that match characters in the
// whitespace, identifier, and identifier-start categories. These
// are only applied when a character is found to actually have a
// code point above 128.
// Generated by `bin/generate-identifier-regex.js`.

var nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
var nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D01-\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA900-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";

var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;

// These are a run-length and offset encoded representation of the
// >0xffff code points that are a valid part of identifiers. The
// offset starts at 0x10000, and each pair of numbers represents an
// offset to the next range, and then a size of the range. They were
// generated by bin/generate-identifier-regex.js

// eslint-disable-next-line comma-spacing
var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 17, 26, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 157, 310, 10, 21, 11, 7, 153, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 26, 45, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 785, 52, 76, 44, 33, 24, 27, 35, 42, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 54, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 86, 25, 391, 63, 32, 0, 449, 56, 264, 8, 2, 36, 18, 0, 50, 29, 881, 921, 103, 110, 18, 195, 2749, 1070, 4050, 582, 8634, 568, 8, 30, 114, 29, 19, 47, 17, 3, 32, 20, 6, 18, 881, 68, 12, 0, 67, 12, 65, 0, 32, 6124, 20, 754, 9486, 1, 3071, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 4149, 196, 60, 67, 1213, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42710, 42, 4148, 12, 221, 3, 5761, 10591, 541];

// eslint-disable-next-line comma-spacing
var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 1306, 2, 54, 14, 32, 9, 16, 3, 46, 10, 54, 9, 7, 2, 37, 13, 2, 9, 52, 0, 13, 2, 49, 13, 10, 2, 4, 9, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 57, 0, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 87, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 423, 9, 838, 7, 2, 7, 17, 9, 57, 21, 2, 13, 19882, 9, 135, 4, 60, 6, 26, 9, 1016, 45, 17, 3, 19723, 1, 5319, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 2214, 6, 110, 6, 6, 9, 792487, 239];

// This has a complexity linear to the value of the code. The
// assumption is that looking up astral identifier characters is
// rare.
function isInAstralSet(code, set) {
  var pos = 0x10000;
  for (var i = 0; i < set.length; i += 2) {
    pos += set[i];
    if (pos > code) return false;
    pos += set[i + 1];
    if (pos >= code) return true;
  }
}

// Test whether a given character code starts an identifier.

function isIdentifierStart(code, astral) {
  if (code < 65) return code === 36;
  if (code < 91) return true;
  if (code < 97) return code === 95;
  if (code < 123) return true;
  if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
  if (astral === false) return false;
  return isInAstralSet(code, astralIdentifierStartCodes);
}

// Test whether a given character is part of an identifier.

function isIdentifierChar(code, astral) {
  if (code < 48) return code === 36;
  if (code < 58) return true;
  if (code < 65) return false;
  if (code < 91) return true;
  if (code < 97) return code === 95;
  if (code < 123) return true;
  if (code <= 0xffff) return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
  if (astral === false) return false;
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
}

// ## Token types

// The assignment of fine-grained, information-carrying type objects
// allows the tokenizer to store the information it has about a
// token in a way that is very cheap for the parser to look up.

// All token type variables start with an underscore, to make them
// easy to recognize.

// The `beforeExpr` property is used to disambiguate between regular
// expressions and divisions. It is set on all token types that can
// be followed by an expression (thus, a slash after them would be a
// regular expression).
//
// The `startsExpr` property is used to check if the token ends a
// `yield` expression. It is set on all token types that either can
// directly start an expression (like a quotation mark) or can
// continue an expression (like the body of a string).
//
// `isLoop` marks a keyword as starting a loop, which is important
// to know when parsing a label, in order to allow or disallow
// continue jumps to that label.

var TokenType = function TokenType(label, conf) {
  if (conf === void 0) conf = {};

  this.label = label;
  this.keyword = conf.keyword;
  this.beforeExpr = !!conf.beforeExpr;
  this.startsExpr = !!conf.startsExpr;
  this.isLoop = !!conf.isLoop;
  this.isAssign = !!conf.isAssign;
  this.prefix = !!conf.prefix;
  this.postfix = !!conf.postfix;
  this.binop = conf.binop || null;
  this.updateContext = null;
};

function binop(name, prec) {
  return new TokenType(name, { beforeExpr: true, binop: prec });
}
var beforeExpr = { beforeExpr: true };
var startsExpr = { startsExpr: true };
// Map keyword names to token types.

var keywordTypes = {};

// Succinct definitions of keyword token types
function kw(name, options) {
  if (options === void 0) options = {};

  options.keyword = name;
  return keywordTypes[name] = new TokenType(name, options);
}

var tt = {
  num: new TokenType("num", startsExpr),
  regexp: new TokenType("regexp", startsExpr),
  string: new TokenType("string", startsExpr),
  name: new TokenType("name", startsExpr),
  eof: new TokenType("eof"),

  // Punctuation token types.
  bracketL: new TokenType("[", { beforeExpr: true, startsExpr: true }),
  bracketR: new TokenType("]"),
  braceL: new TokenType("{", { beforeExpr: true, startsExpr: true }),
  braceR: new TokenType("}"),
  parenL: new TokenType("(", { beforeExpr: true, startsExpr: true }),
  parenR: new TokenType(")"),
  comma: new TokenType(",", beforeExpr),
  semi: new TokenType(";", beforeExpr),
  colon: new TokenType(":", beforeExpr),
  dot: new TokenType("."),
  question: new TokenType("?", beforeExpr),
  arrow: new TokenType("=>", beforeExpr),
  template: new TokenType("template"),
  invalidTemplate: new TokenType("invalidTemplate"),
  ellipsis: new TokenType("...", beforeExpr),
  backQuote: new TokenType("`", startsExpr),
  dollarBraceL: new TokenType("${", { beforeExpr: true, startsExpr: true }),

  // Operators. These carry several kinds of properties to help the
  // parser use them properly (the presence of these properties is
  // what categorizes them as operators).
  //
  // `binop`, when present, specifies that this operator is a binary
  // operator, and will refer to its precedence.
  //
  // `prefix` and `postfix` mark the operator as a prefix or postfix
  // unary operator.
  //
  // `isAssign` marks all of `=`, `+=`, `-=` etcetera, which act as
  // binary operators with a very low precedence, that should result
  // in AssignmentExpression nodes.

  eq: new TokenType("=", { beforeExpr: true, isAssign: true }),
  assign: new TokenType("_=", { beforeExpr: true, isAssign: true }),
  incDec: new TokenType("++/--", { prefix: true, postfix: true, startsExpr: true }),
  prefix: new TokenType("prefix", { beforeExpr: true, prefix: true, startsExpr: true }),
  logicalOR: binop("||", 1),
  logicalAND: binop("&&", 2),
  bitwiseOR: binop("|", 3),
  bitwiseXOR: binop("^", 4),
  bitwiseAND: binop("&", 5),
  equality: binop("==/!=", 6),
  relational: binop("</>", 7),
  bitShift: binop("<</>>", 8),
  plusMin: new TokenType("+/-", { beforeExpr: true, binop: 9, prefix: true, startsExpr: true }),
  modulo: binop("%", 10),
  star: binop("*", 10),
  slash: binop("/", 10),
  starstar: new TokenType("**", { beforeExpr: true }),

  // Keyword token types.
  _break: kw("break"),
  _case: kw("case", beforeExpr),
  _catch: kw("catch"),
  _continue: kw("continue"),
  _debugger: kw("debugger"),
  _default: kw("default", beforeExpr),
  _do: kw("do", { isLoop: true, beforeExpr: true }),
  _else: kw("else", beforeExpr),
  _finally: kw("finally"),
  _for: kw("for", { isLoop: true }),
  _function: kw("function", startsExpr),
  _if: kw("if"),
  _return: kw("return", beforeExpr),
  _switch: kw("switch"),
  _throw: kw("throw", beforeExpr),
  _try: kw("try"),
  _var: kw("var"),
  _const: kw("const"),
  _while: kw("while", { isLoop: true }),
  _with: kw("with"),
  _new: kw("new", { beforeExpr: true, startsExpr: true }),
  _this: kw("this", startsExpr),
  _super: kw("super", startsExpr),
  _class: kw("class"),
  _extends: kw("extends", beforeExpr),
  _export: kw("export"),
  _import: kw("import"),
  _null: kw("null", startsExpr),
  _true: kw("true", startsExpr),
  _false: kw("false", startsExpr),
  _in: kw("in", { beforeExpr: true, binop: 7 }),
  _instanceof: kw("instanceof", { beforeExpr: true, binop: 7 }),
  _typeof: kw("typeof", { beforeExpr: true, prefix: true, startsExpr: true }),
  _void: kw("void", { beforeExpr: true, prefix: true, startsExpr: true }),
  _delete: kw("delete", { beforeExpr: true, prefix: true, startsExpr: true })
};

// Matches a whole line break (where CRLF is considered a single
// line break). Used to count lines.

var lineBreak = /\r\n?|\n|\u2028|\u2029/;
var lineBreakG = new RegExp(lineBreak.source, "g");

function isNewLine(code) {
  return code === 10 || code === 13 || code === 0x2028 || code === 0x2029;
}

var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/;

var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;

var ref = Object.prototype;
var hasOwnProperty = ref.hasOwnProperty;
var toString = ref.toString;

// Checks if an object has a property.

function has(obj, propName) {
  return hasOwnProperty.call(obj, propName);
}

var isArray = Array.isArray || function (obj) {
  return toString.call(obj) === "[object Array]";
};

// These are used when `options.locations` is on, for the
// `startLoc` and `endLoc` properties.

var Position = function Position(line, col) {
  this.line = line;
  this.column = col;
};

Position.prototype.offset = function offset(n) {
  return new Position(this.line, this.column + n);
};

var SourceLocation = function SourceLocation(p, start, end) {
  this.start = start;
  this.end = end;
  if (p.sourceFile !== null) this.source = p.sourceFile;
};

// The `getLineInfo` function is mostly useful when the
// `locations` option is off (for performance reasons) and you
// want to find the line/column position for a given character
// offset. `input` should be the code string that the offset refers
// into.

function getLineInfo(input, offset) {
  for (var line = 1, cur = 0;;) {
    lineBreakG.lastIndex = cur;
    var match = lineBreakG.exec(input);
    if (match && match.index < offset) {
      ++line;
      cur = match.index + match[0].length;
    } else {
      return new Position(line, offset - cur);
    }
  }
}

// A second optional argument can be given to further configure
// the parser process. These options are recognized:

var defaultOptions = {
  // `ecmaVersion` indicates the ECMAScript version to parse. Must
  // be either 3, 5, 6 (2015), 7 (2016), or 8 (2017). This influences support
  // for strict mode, the set of reserved words, and support for
  // new syntax features. The default is 7.
  ecmaVersion: 7,
  // `sourceType` indicates the mode the code should be parsed in.
  // Can be either `"script"` or `"module"`. This influences global
  // strict mode and parsing of `import` and `export` declarations.
  sourceType: "script",
  // `onInsertedSemicolon` can be a callback that will be called
  // when a semicolon is automatically inserted. It will be passed
  // th position of the comma as an offset, and if `locations` is
  // enabled, it is given the location as a `{line, column}` object
  // as second argument.
  onInsertedSemicolon: null,
  // `onTrailingComma` is similar to `onInsertedSemicolon`, but for
  // trailing commas.
  onTrailingComma: null,
  // By default, reserved words are only enforced if ecmaVersion >= 5.
  // Set `allowReserved` to a boolean value to explicitly turn this on
  // an off. When this option has the value "never", reserved words
  // and keywords can also not be used as property names.
  allowReserved: null,
  // When enabled, a return at the top level is not considered an
  // error.
  allowReturnOutsideFunction: false,
  // When enabled, import/export statements are not constrained to
  // appearing at the top of the program.
  allowImportExportEverywhere: false,
  // When enabled, hashbang directive in the beginning of file
  // is allowed and treated as a line comment.
  allowHashBang: false,
  // When `locations` is on, `loc` properties holding objects with
  // `start` and `end` properties in `{line, column}` form (with
  // line being 1-based and column 0-based) will be attached to the
  // nodes.
  locations: false,
  // A function can be passed as `onToken` option, which will
  // cause Acorn to call that function with object in the same
  // format as tokens returned from `tokenizer().getToken()`. Note
  // that you are not allowed to call the parser from the
  // callback—that will corrupt its internal state.
  onToken: null,
  // A function can be passed as `onComment` option, which will
  // cause Acorn to call that function with `(block, text, start,
  // end)` parameters whenever a comment is skipped. `block` is a
  // boolean indicating whether this is a block (`/* */`) comment,
  // `text` is the content of the comment, and `start` and `end` are
  // character offsets that denote the start and end of the comment.
  // When the `locations` option is on, two more parameters are
  // passed, the full `{line, column}` locations of the start and
  // end of the comments. Note that you are not allowed to call the
  // parser from the callback—that will corrupt its internal state.
  onComment: null,
  // Nodes have their start and end characters offsets recorded in
  // `start` and `end` properties (directly on the node, rather than
  // the `loc` object, which holds line/column data. To also add a
  // [semi-standardized][range] `range` property holding a `[start,
  // end]` array with the same numbers, set the `ranges` option to
  // `true`.
  //
  // [range]: https://bugzilla.mozilla.org/show_bug.cgi?id=745678
  ranges: false,
  // It is possible to parse multiple files into a single AST by
  // passing the tree produced by parsing the first file as
  // `program` option in subsequent parses. This will add the
  // toplevel forms of the parsed file to the `Program` (top) node
  // of an existing parse tree.
  program: null,
  // When `locations` is on, you can pass this to record the source
  // file in every node's `loc` object.
  sourceFile: null,
  // This value, if given, is stored in every node, whether
  // `locations` is on or off.
  directSourceFile: null,
  // When enabled, parenthesized expressions are represented by
  // (non-standard) ParenthesizedExpression nodes
  preserveParens: false,
  plugins: {}
};

// Interpret and default an options object

function getOptions(opts) {
  var options = {};

  for (var opt in defaultOptions) {
    options[opt] = opts && has(opts, opt) ? opts[opt] : defaultOptions[opt];
  }if (options.ecmaVersion >= 2015) options.ecmaVersion -= 2009;

  if (options.allowReserved == null) options.allowReserved = options.ecmaVersion < 5;

  if (isArray(options.onToken)) {
    var tokens = options.onToken;
    options.onToken = function (token) {
      return tokens.push(token);
    };
  }
  if (isArray(options.onComment)) options.onComment = pushComment(options, options.onComment);

  return options;
}

function pushComment(options, array) {
  return function (block, text, start, end, startLoc, endLoc) {
    var comment = {
      type: block ? "Block" : "Line",
      value: text,
      start: start,
      end: end
    };
    if (options.locations) comment.loc = new SourceLocation(this, startLoc, endLoc);
    if (options.ranges) comment.range = [start, end];
    array.push(comment);
  };
}

// Registered plugins
var plugins = {};

function keywordRegexp(words) {
  return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$");
}

var Parser = function Parser(options, input, startPos) {
  this.options = options = getOptions(options);
  this.sourceFile = options.sourceFile;
  this.keywords = keywordRegexp(keywords[options.ecmaVersion >= 6 ? 6 : 5]);
  var reserved = "";
  if (!options.allowReserved) {
    for (var v = options.ecmaVersion;; v--) {
      if (reserved = reservedWords[v]) break;
    }if (options.sourceType == "module") reserved += " await";
  }
  this.reservedWords = keywordRegexp(reserved);
  var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
  this.reservedWordsStrict = keywordRegexp(reservedStrict);
  this.reservedWordsStrictBind = keywordRegexp(reservedStrict + " " + reservedWords.strictBind);
  this.input = String(input);

  // Used to signal to callers of `readWord1` whether the word
  // contained any escape sequences. This is needed because words with
  // escape sequences must not be interpreted as keywords.
  this.containsEsc = false;

  // Load plugins
  this.loadPlugins(options.plugins);

  // Set up token state

  // The current position of the tokenizer in the input.
  if (startPos) {
    this.pos = startPos;
    this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
    this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
  } else {
    this.pos = this.lineStart = 0;
    this.curLine = 1;
  }

  // Properties of the current token:
  // Its type
  this.type = tt.eof;
  // For tokens that include more information than their type, the value
  this.value = null;
  // Its start and end offset
  this.start = this.end = this.pos;
  // And, if locations are used, the {line, column} object
  // corresponding to those offsets
  this.startLoc = this.endLoc = this.curPosition();

  // Position information for the previous token
  this.lastTokEndLoc = this.lastTokStartLoc = null;
  this.lastTokStart = this.lastTokEnd = this.pos;

  // The context stack is used to superficially track syntactic
  // context to predict whether a regular expression is allowed in a
  // given position.
  this.context = this.initialContext();
  this.exprAllowed = true;

  // Figure out if it's a module code.
  this.inModule = options.sourceType === "module";
  this.strict = this.inModule || this.strictDirective(this.pos);

  // Used to signify the start of a potential arrow function
  this.potentialArrowAt = -1;

  // Flags to track whether we are in a function, a generator, an async function.
  this.inFunction = this.inGenerator = this.inAsync = false;
  // Positions to delayed-check that yield/await does not exist in default parameters.
  this.yieldPos = this.awaitPos = 0;
  // Labels in scope.
  this.labels = [];

  // If enabled, skip leading hashbang line.
  if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!") this.skipLineComment(2);

  // Scope tracking for duplicate variable names (see scope.js)
  this.scopeStack = [];
  this.enterFunctionScope();
};

// DEPRECATED Kept for backwards compatibility until 3.0 in case a plugin uses them
Parser.prototype.isKeyword = function isKeyword(word) {
  return this.keywords.test(word);
};
Parser.prototype.isReservedWord = function isReservedWord(word) {
  return this.reservedWords.test(word);
};

Parser.prototype.extend = function extend(name, f) {
  this[name] = f(this[name]);
};

Parser.prototype.loadPlugins = function loadPlugins(pluginConfigs) {
  var this$1 = this;

  for (var name in pluginConfigs) {
    var plugin = plugins[name];
    if (!plugin) throw new Error("Plugin '" + name + "' not found");
    plugin(this$1, pluginConfigs[name]);
  }
};

Parser.prototype.parse = function parse() {
  var node = this.options.program || this.startNode();
  this.nextToken();
  return this.parseTopLevel(node);
};

var pp = Parser.prototype;

// ## Parser utilities

var literal = /^(?:'((?:[^']|\.)*)'|"((?:[^"]|\.)*)"|;)/;
pp.strictDirective = function (start) {
  var this$1 = this;

  for (;;) {
    skipWhiteSpace.lastIndex = start;
    start += skipWhiteSpace.exec(this$1.input)[0].length;
    var match = literal.exec(this$1.input.slice(start));
    if (!match) return false;
    if ((match[1] || match[2]) == "use strict") return true;
    start += match[0].length;
  }
};

// Predicate that tests whether the next token is of the given
// type, and if yes, consumes it as a side effect.

pp.eat = function (type) {
  if (this.type === type) {
    this.next();
    return true;
  } else {
    return false;
  }
};

// Tests whether parsed token is a contextual keyword.

pp.isContextual = function (name) {
  return this.type === tt.name && this.value === name;
};

// Consumes contextual keyword if possible.

pp.eatContextual = function (name) {
  return this.value === name && this.eat(tt.name);
};

// Asserts that following token is given contextual keyword.

pp.expectContextual = function (name) {
  if (!this.eatContextual(name)) this.unexpected();
};

// Test whether a semicolon can be inserted at the current position.

pp.canInsertSemicolon = function () {
  return this.type === tt.eof || this.type === tt.braceR || lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
};

pp.insertSemicolon = function () {
  if (this.canInsertSemicolon()) {
    if (this.options.onInsertedSemicolon) this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
    return true;
  }
};

// Consume a semicolon, or, failing that, see if we are allowed to
// pretend that there is a semicolon at this position.

pp.semicolon = function () {
  if (!this.eat(tt.semi) && !this.insertSemicolon()) this.unexpected();
};

pp.afterTrailingComma = function (tokType, notNext) {
  if (this.type == tokType) {
    if (this.options.onTrailingComma) this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
    if (!notNext) this.next();
    return true;
  }
};

// Expect a token of a given type. If found, consume it, otherwise,
// raise an unexpected token error.

pp.expect = function (type) {
  this.eat(type) || this.unexpected();
};

// Raise an unexpected token error.

pp.unexpected = function (pos) {
  this.raise(pos != null ? pos : this.start, "Unexpected token");
};

var DestructuringErrors = function DestructuringErrors() {
  this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = -1;
};

pp.checkPatternErrors = function (refDestructuringErrors, isAssign) {
  if (!refDestructuringErrors) return;
  if (refDestructuringErrors.trailingComma > -1) this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
  var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
  if (parens > -1) this.raiseRecoverable(parens, "Parenthesized pattern");
};

pp.checkExpressionErrors = function (refDestructuringErrors, andThrow) {
  var pos = refDestructuringErrors ? refDestructuringErrors.shorthandAssign : -1;
  if (!andThrow) return pos >= 0;
  if (pos > -1) this.raise(pos, "Shorthand property assignments are valid only in destructuring patterns");
};

pp.checkYieldAwaitInDefaultParams = function () {
  if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos)) this.raise(this.yieldPos, "Yield expression cannot be a default value");
  if (this.awaitPos) this.raise(this.awaitPos, "Await expression cannot be a default value");
};

pp.isSimpleAssignTarget = function (expr) {
  if (expr.type === "ParenthesizedExpression") return this.isSimpleAssignTarget(expr.expression);
  return expr.type === "Identifier" || expr.type === "MemberExpression";
};

var pp$1 = Parser.prototype;

// ### Statement parsing

// Parse a program. Initializes the parser, reads any number of
// statements, and wraps them in a Program node.  Optionally takes a
// `program` argument.  If present, the statements will be appended
// to its body instead of creating a new node.

pp$1.parseTopLevel = function (node) {
  var this$1 = this;

  var exports = {};
  if (!node.body) node.body = [];
  while (this.type !== tt.eof) {
    var stmt = this$1.parseStatement(true, true, exports);
    node.body.push(stmt);
  }
  this.next();
  if (this.options.ecmaVersion >= 6) {
    node.sourceType = this.options.sourceType;
  }
  return this.finishNode(node, "Program");
};

var loopLabel = { kind: "loop" };
var switchLabel = { kind: "switch" };
pp$1.isLet = function () {
  if (this.type !== tt.name || this.options.ecmaVersion < 6 || this.value != "let") return false;
  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length,
      nextCh = this.input.charCodeAt(next);
  if (nextCh === 91 || nextCh == 123) return true; // '{' and '['
  if (isIdentifierStart(nextCh, true)) {
    var pos = next + 1;
    while (isIdentifierChar(this.input.charCodeAt(pos), true)) {
      ++pos;
    }var ident = this.input.slice(next, pos);
    if (!this.isKeyword(ident)) return true;
  }
  return false;
};

// check 'async [no LineTerminator here] function'
// - 'async /*foo*/ function' is OK.
// - 'async /*\n*/ function' is invalid.
pp$1.isAsyncFunction = function () {
  if (this.type !== tt.name || this.options.ecmaVersion < 8 || this.value != "async") return false;

  skipWhiteSpace.lastIndex = this.pos;
  var skip = skipWhiteSpace.exec(this.input);
  var next = this.pos + skip[0].length;
  return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 == this.input.length || !isIdentifierChar(this.input.charAt(next + 8)));
};

// Parse a single statement.
//
// If expecting a statement and finding a slash operator, parse a
// regular expression literal. This is to handle cases like
// `if (foo) /blah/.exec(foo)`, where looking at the previous token
// does not help.

pp$1.parseStatement = function (declaration, topLevel, exports) {
  var starttype = this.type,
      node = this.startNode(),
      kind;

  if (this.isLet()) {
    starttype = tt._var;
    kind = "let";
  }

  // Most types of statements are recognized by the keyword they
  // start with. Many are trivial to parse, some require a bit of
  // complexity.

  switch (starttype) {
    case tt._break:case tt._continue:
      return this.parseBreakContinueStatement(node, starttype.keyword);
    case tt._debugger:
      return this.parseDebuggerStatement(node);
    case tt._do:
      return this.parseDoStatement(node);
    case tt._for:
      return this.parseForStatement(node);
    case tt._function:
      if (!declaration && this.options.ecmaVersion >= 6) this.unexpected();
      return this.parseFunctionStatement(node, false);
    case tt._class:
      if (!declaration) this.unexpected();
      return this.parseClass(node, true);
    case tt._if:
      return this.parseIfStatement(node);
    case tt._return:
      return this.parseReturnStatement(node);
    case tt._switch:
      return this.parseSwitchStatement(node);
    case tt._throw:
      return this.parseThrowStatement(node);
    case tt._try:
      return this.parseTryStatement(node);
    case tt._const:case tt._var:
      kind = kind || this.value;
      if (!declaration && kind != "var") this.unexpected();
      return this.parseVarStatement(node, kind);
    case tt._while:
      return this.parseWhileStatement(node);
    case tt._with:
      return this.parseWithStatement(node);
    case tt.braceL:
      return this.parseBlock();
    case tt.semi:
      return this.parseEmptyStatement(node);
    case tt._export:
    case tt._import:
      if (!this.options.allowImportExportEverywhere) {
        if (!topLevel) this.raise(this.start, "'import' and 'export' may only appear at the top level");
        if (!this.inModule) this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
      }
      return starttype === tt._import ? this.parseImport(node) : this.parseExport(node, exports);

    // If the statement does not start with a statement keyword or a
    // brace, it's an ExpressionStatement or LabeledStatement. We
    // simply start parsing an expression, and afterwards, if the
    // next token is a colon and the expression was a simple
    // Identifier node, we switch to interpreting it as a label.

    /* MScript Addition
     * Start parsing an expression and if the next token is another identifier
     * or a left brace, then it's a command statement.
     * Command Statements look like this:
     * commandName [id] {body}. */
    default:
      if (this.isAsyncFunction() && declaration) {
        this.next();
        return this.parseFunctionStatement(node, true);
      }

      var maybeName = this.value,
          expr = this.parseExpression();

      /* Maybe a Command Statement. */
      if (starttype === tt.name && expr.type === "Identifier" && maybeName !== "await") {
        if (this.type === tt.braceL) {
          return this.parseCommandStatement(node, expr, false);
        } else {
          if (this.type === tt.name && !this.canInsertSemicolon()) {
            return this.parseCommandStatement(node, expr, true);
          }
        }
      }

      if (starttype === tt.name && expr.type === "Identifier" && this.eat(tt.colon)) return this.parseLabeledStatement(node, maybeName, expr);else return this.parseExpressionStatement(node, expr);
  }
};

pp$1.parseCommandStatement = function (node, expr, hasId) {
  node.name = expr;
  if (hasId) {
    node.id = this.parseIdent();
  }
  if (this.type !== tt.braceL) this.unexpected();
  node.body = this.parseBlock();
  return this.finishNode(node, "CommandStatement");
};

pp$1.parseBreakContinueStatement = function (node, keyword) {
  var this$1 = this;

  var isBreak = keyword == "break";
  this.next();
  if (this.eat(tt.semi) || this.insertSemicolon()) node.label = null;else if (this.type !== tt.name) this.unexpected();else {
    node.label = this.parseIdent();
    this.semicolon();
  }

  // Verify that there is an actual destination to break or
  // continue to.
  var i = 0;
  for (; i < this.labels.length; ++i) {
    var lab = this$1.labels[i];
    if (node.label == null || lab.name === node.label.name) {
      if (lab.kind != null && (isBreak || lab.kind === "loop")) break;
      if (node.label && isBreak) break;
    }
  }
  if (i === this.labels.length) this.raise(node.start, "Unsyntactic " + keyword);
  return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
};

pp$1.parseDebuggerStatement = function (node) {
  this.next();
  this.semicolon();
  return this.finishNode(node, "DebuggerStatement");
};

pp$1.parseDoStatement = function (node) {
  this.next();
  this.labels.push(loopLabel);
  node.body = this.parseStatement(false);
  this.labels.pop();
  this.expect(tt._while);
  node.test = this.parseParenExpression();
  if (this.options.ecmaVersion >= 6) this.eat(tt.semi);else this.semicolon();
  return this.finishNode(node, "DoWhileStatement");
};

// Disambiguating between a `for` and a `for`/`in` or `for`/`of`
// loop is non-trivial. Basically, we have to parse the init `var`
// statement or expression, disallowing the `in` operator (see
// the second parameter to `parseExpression`), and then check
// whether the next token is `in` or `of`. When there is no init
// part (semicolon immediately after the opening parenthesis), it
// is a regular `for` loop.

pp$1.parseForStatement = function (node) {
  this.next();
  this.labels.push(loopLabel);
  this.enterLexicalScope();
  this.expect(tt.parenL);
  if (this.type === tt.semi) return this.parseFor(node, null);
  var isLet = this.isLet();
  if (this.type === tt._var || this.type === tt._const || isLet) {
    var init$1 = this.startNode(),
        kind = isLet ? "let" : this.value;
    this.next();
    this.parseVar(init$1, true, kind);
    this.finishNode(init$1, "VariableDeclaration");
    if ((this.type === tt._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init$1.declarations.length === 1 && !(kind !== "var" && init$1.declarations[0].init)) return this.parseForIn(node, init$1);
    return this.parseFor(node, init$1);
  }
  var refDestructuringErrors = new DestructuringErrors();
  var init = this.parseExpression(true, refDestructuringErrors);
  if (this.type === tt._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) {
    this.toAssignable(init);
    this.checkLVal(init);
    this.checkPatternErrors(refDestructuringErrors, true);
    return this.parseForIn(node, init);
  } else {
    this.checkExpressionErrors(refDestructuringErrors, true);
  }
  return this.parseFor(node, init);
};

pp$1.parseFunctionStatement = function (node, isAsync) {
  this.next();
  return this.parseFunction(node, true, false, isAsync);
};

pp$1.isFunction = function () {
  return this.type === tt._function || this.isAsyncFunction();
};

pp$1.parseIfStatement = function (node) {
  this.next();
  node.test = this.parseParenExpression();
  // allow function declarations in branches, but only in non-strict mode
  node.consequent = this.parseStatement(!this.strict && this.isFunction());
  node.alternate = this.eat(tt._else) ? this.parseStatement(!this.strict && this.isFunction()) : null;
  return this.finishNode(node, "IfStatement");
};

pp$1.parseReturnStatement = function (node) {
  if (!this.inFunction && !this.options.allowReturnOutsideFunction) this.raise(this.start, "'return' outside of function");
  this.next();

  // In `return` (and `break`/`continue`), the keywords with
  // optional arguments, we eagerly look for a semicolon or the
  // possibility to insert one.

  if (this.eat(tt.semi) || this.insertSemicolon()) node.argument = null;else {
    node.argument = this.parseExpression();this.semicolon();
  }
  return this.finishNode(node, "ReturnStatement");
};

pp$1.parseSwitchStatement = function (node) {
  var this$1 = this;

  this.next();
  node.discriminant = this.parseParenExpression();
  node.cases = [];
  this.expect(tt.braceL);
  this.labels.push(switchLabel);
  this.enterLexicalScope();

  // Statements under must be grouped (by label) in SwitchCase
  // nodes. `cur` is used to keep the node that we are currently
  // adding statements to.

  var cur;
  for (var sawDefault = false; this.type != tt.braceR;) {
    if (this$1.type === tt._case || this$1.type === tt._default) {
      var isCase = this$1.type === tt._case;
      if (cur) this$1.finishNode(cur, "SwitchCase");
      node.cases.push(cur = this$1.startNode());
      cur.consequent = [];
      this$1.next();
      if (isCase) {
        cur.test = this$1.parseExpression();
      } else {
        if (sawDefault) this$1.raiseRecoverable(this$1.lastTokStart, "Multiple default clauses");
        sawDefault = true;
        cur.test = null;
      }
      this$1.expect(tt.colon);
    } else {
      if (!cur) this$1.unexpected();
      cur.consequent.push(this$1.parseStatement(true));
    }
  }
  this.exitLexicalScope();
  if (cur) this.finishNode(cur, "SwitchCase");
  this.next(); // Closing brace
  this.labels.pop();
  return this.finishNode(node, "SwitchStatement");
};

pp$1.parseThrowStatement = function (node) {
  this.next();
  if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) this.raise(this.lastTokEnd, "Illegal newline after throw");
  node.argument = this.parseExpression();
  this.semicolon();
  return this.finishNode(node, "ThrowStatement");
};

// Reused empty array added for node fields that are always empty.

var empty = [];

pp$1.parseTryStatement = function (node) {
  this.next();
  node.block = this.parseBlock();
  node.handler = null;
  if (this.type === tt._catch) {
    var clause = this.startNode();
    this.next();
    this.expect(tt.parenL);
    clause.param = this.parseBindingAtom();
    this.enterLexicalScope();
    this.checkLVal(clause.param, "let");
    this.expect(tt.parenR);
    clause.body = this.parseBlock(false);
    this.exitLexicalScope();
    node.handler = this.finishNode(clause, "CatchClause");
  }
  node.finalizer = this.eat(tt._finally) ? this.parseBlock() : null;
  if (!node.handler && !node.finalizer) this.raise(node.start, "Missing catch or finally clause");
  return this.finishNode(node, "TryStatement");
};

pp$1.parseVarStatement = function (node, kind) {
  this.next();
  this.parseVar(node, false, kind);
  this.semicolon();
  return this.finishNode(node, "VariableDeclaration");
};

pp$1.parseWhileStatement = function (node) {
  this.next();
  node.test = this.parseParenExpression();
  this.labels.push(loopLabel);
  node.body = this.parseStatement(false);
  this.labels.pop();
  return this.finishNode(node, "WhileStatement");
};

pp$1.parseWithStatement = function (node) {
  if (this.strict) this.raise(this.start, "'with' in strict mode");
  this.next();
  node.object = this.parseParenExpression();
  node.body = this.parseStatement(false);
  return this.finishNode(node, "WithStatement");
};

pp$1.parseEmptyStatement = function (node) {
  this.next();
  return this.finishNode(node, "EmptyStatement");
};

pp$1.parseLabeledStatement = function (node, maybeName, expr) {
  var this$1 = this;

  for (var i = 0; i < this.labels.length; ++i) {
    if (this$1.labels[i].name === maybeName) this$1.raise(expr.start, "Label '" + maybeName + "' is already declared");
  }var kind = this.type.isLoop ? "loop" : this.type === tt._switch ? "switch" : null;
  for (var i$1 = this.labels.length - 1; i$1 >= 0; i$1--) {
    var label = this$1.labels[i$1];
    if (label.statementStart == node.start) {
      label.statementStart = this$1.start;
      label.kind = kind;
    } else break;
  }
  this.labels.push({ name: maybeName, kind: kind, statementStart: this.start });
  node.body = this.parseStatement(true);
  if (node.body.type == "ClassDeclaration" || node.body.type == "VariableDeclaration" && node.body.kind != "var" || node.body.type == "FunctionDeclaration" && (this.strict || node.body.generator)) this.raiseRecoverable(node.body.start, "Invalid labeled declaration");
  this.labels.pop();
  node.label = expr;
  return this.finishNode(node, "LabeledStatement");
};

pp$1.parseExpressionStatement = function (node, expr) {
  node.expression = expr;
  this.semicolon();
  return this.finishNode(node, "ExpressionStatement");
};

// Parse a semicolon-enclosed block of statements, handling `"use
// strict"` declarations when `allowStrict` is true (used for
// function bodies).

pp$1.parseBlock = function (createNewLexicalScope) {
  var this$1 = this;
  if (createNewLexicalScope === void 0) createNewLexicalScope = true;

  var node = this.startNode();
  node.body = [];
  this.expect(tt.braceL);
  if (createNewLexicalScope) {
    this.enterLexicalScope();
  }
  while (!this.eat(tt.braceR)) {
    var stmt = this$1.parseStatement(true);
    node.body.push(stmt);
  }
  if (createNewLexicalScope) {
    this.exitLexicalScope();
  }
  return this.finishNode(node, "BlockStatement");
};

// Parse a regular `for` loop. The disambiguation code in
// `parseStatement` will already have parsed the init statement or
// expression.

pp$1.parseFor = function (node, init) {
  node.init = init;
  this.expect(tt.semi);
  node.test = this.type === tt.semi ? null : this.parseExpression();
  this.expect(tt.semi);
  node.update = this.type === tt.parenR ? null : this.parseExpression();
  this.expect(tt.parenR);
  this.exitLexicalScope();
  node.body = this.parseStatement(false);
  this.labels.pop();
  return this.finishNode(node, "ForStatement");
};

// Parse a `for`/`in` and `for`/`of` loop, which are almost
// same from parser's perspective.

pp$1.parseForIn = function (node, init) {
  var type = this.type === tt._in ? "ForInStatement" : "ForOfStatement";
  this.next();
  node.left = init;
  node.right = this.parseExpression();
  this.expect(tt.parenR);
  this.exitLexicalScope();
  node.body = this.parseStatement(false);
  this.labels.pop();
  return this.finishNode(node, type);
};

// Parse a list of variable declarations.

pp$1.parseVar = function (node, isFor, kind) {
  var this$1 = this;

  node.declarations = [];
  node.kind = kind;
  for (;;) {
    var decl = this$1.startNode();
    this$1.parseVarId(decl, kind);
    if (this$1.eat(tt.eq)) {
      decl.init = this$1.parseMaybeAssign(isFor);
    } else if (kind === "const" && !(this$1.type === tt._in || this$1.options.ecmaVersion >= 6 && this$1.isContextual("of"))) {
      this$1.unexpected();
    } else if (decl.id.type != "Identifier" && !(isFor && (this$1.type === tt._in || this$1.isContextual("of")))) {
      this$1.raise(this$1.lastTokEnd, "Complex binding patterns require an initialization value");
    } else {
      decl.init = null;
    }
    node.declarations.push(this$1.finishNode(decl, "VariableDeclarator"));
    if (!this$1.eat(tt.comma)) break;
  }
  return node;
};

pp$1.parseVarId = function (decl, kind) {
  decl.id = this.parseBindingAtom(kind);
  this.checkLVal(decl.id, kind, false);
};

// Parse a function declaration or literal (depending on the
// `isStatement` parameter).

pp$1.parseFunction = function (node, isStatement, allowExpressionBody, isAsync) {
  this.initFunction(node);
  if (this.options.ecmaVersion >= 6 && !isAsync) node.generator = this.eat(tt.star);
  if (this.options.ecmaVersion >= 8) node.async = !!isAsync;

  if (isStatement) {
    node.id = isStatement === "nullableID" && this.type != tt.name ? null : this.parseIdent();
    if (node.id) {
      this.checkLVal(node.id, "var");
    }
  }

  var oldInGen = this.inGenerator,
      oldInAsync = this.inAsync,
      oldYieldPos = this.yieldPos,
      oldAwaitPos = this.awaitPos,
      oldInFunc = this.inFunction;
  this.inGenerator = node.generator;
  this.inAsync = node.async;
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.inFunction = true;
  this.enterFunctionScope();

  if (!isStatement) node.id = this.type == tt.name ? this.parseIdent() : null;

  this.parseFunctionParams(node);
  this.parseFunctionBody(node, allowExpressionBody);

  this.inGenerator = oldInGen;
  this.inAsync = oldInAsync;
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.inFunction = oldInFunc;
  return this.finishNode(node, isStatement ? "FunctionDeclaration" : "FunctionExpression");
};

pp$1.parseFunctionParams = function (node) {
  this.expect(tt.parenL);
  node.params = this.parseBindingList(tt.parenR, false, this.options.ecmaVersion >= 8, true);
  this.checkYieldAwaitInDefaultParams();
};

// Parse a class declaration or literal (depending on the
// `isStatement` parameter).

pp$1.parseClass = function (node, isStatement) {
  var this$1 = this;

  this.next();

  this.parseClassId(node, isStatement);
  this.parseClassSuper(node);
  var classBody = this.startNode();
  var hadConstructor = false;
  classBody.body = [];
  this.expect(tt.braceL);
  while (!this.eat(tt.braceR)) {
    if (this$1.eat(tt.semi)) continue;
    var method = this$1.startNode();
    var isGenerator = this$1.eat(tt.star);
    var isAsync = false;
    var isMaybeStatic = this$1.type === tt.name && this$1.value === "static";
    this$1.parsePropertyName(method);
    method.static = isMaybeStatic && this$1.type !== tt.parenL;
    if (method.static) {
      if (isGenerator) this$1.unexpected();
      isGenerator = this$1.eat(tt.star);
      this$1.parsePropertyName(method);
    }
    if (this$1.options.ecmaVersion >= 8 && !isGenerator && !method.computed && method.key.type === "Identifier" && method.key.name === "async" && this$1.type !== tt.parenL && !this$1.canInsertSemicolon()) {
      isAsync = true;
      this$1.parsePropertyName(method);
    }
    method.kind = "method";
    var isGetSet = false;
    if (!method.computed) {
      var key = method.key;
      if (!isGenerator && !isAsync && key.type === "Identifier" && this$1.type !== tt.parenL && (key.name === "get" || key.name === "set")) {
        isGetSet = true;
        method.kind = key.name;
        key = this$1.parsePropertyName(method);
      }
      if (!method.static && (key.type === "Identifier" && key.name === "constructor" || key.type === "Literal" && key.value === "constructor")) {
        if (hadConstructor) this$1.raise(key.start, "Duplicate constructor in the same class");
        if (isGetSet) this$1.raise(key.start, "Constructor can't have get/set modifier");
        if (isGenerator) this$1.raise(key.start, "Constructor can't be a generator");
        if (isAsync) this$1.raise(key.start, "Constructor can't be an async method");
        method.kind = "constructor";
        hadConstructor = true;
      }
    }
    this$1.parseClassMethod(classBody, method, isGenerator, isAsync);
    if (isGetSet) {
      var paramCount = method.kind === "get" ? 0 : 1;
      if (method.value.params.length !== paramCount) {
        var start = method.value.start;
        if (method.kind === "get") this$1.raiseRecoverable(start, "getter should have no params");else this$1.raiseRecoverable(start, "setter should have exactly one param");
      } else {
        if (method.kind === "set" && method.value.params[0].type === "RestElement") this$1.raiseRecoverable(method.value.params[0].start, "Setter cannot use rest params");
      }
    }
  }
  node.body = this.finishNode(classBody, "ClassBody");
  return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
};

pp$1.parseClassMethod = function (classBody, method, isGenerator, isAsync) {
  method.value = this.parseMethod(isGenerator, isAsync);
  classBody.body.push(this.finishNode(method, "MethodDefinition"));
};

pp$1.parseClassId = function (node, isStatement) {
  node.id = this.type === tt.name ? this.parseIdent() : isStatement === true ? this.unexpected() : null;
};

pp$1.parseClassSuper = function (node) {
  node.superClass = this.eat(tt._extends) ? this.parseExprSubscripts() : null;
};

// Parses module export declaration.

pp$1.parseExport = function (node, exports) {
  var this$1 = this;

  this.next();
  // export * from '...'
  if (this.eat(tt.star)) {
    this.expectContextual("from");
    node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
    this.semicolon();
    return this.finishNode(node, "ExportAllDeclaration");
  }
  if (this.eat(tt._default)) {
    // export default ...
    this.checkExport(exports, "default", this.lastTokStart);
    var isAsync;
    if (this.type === tt._function || (isAsync = this.isAsyncFunction())) {
      var fNode = this.startNode();
      this.next();
      if (isAsync) this.next();
      node.declaration = this.parseFunction(fNode, "nullableID", false, isAsync);
    } else if (this.type === tt._class) {
      var cNode = this.startNode();
      node.declaration = this.parseClass(cNode, "nullableID");
    } else {
      node.declaration = this.parseMaybeAssign();
      this.semicolon();
    }
    return this.finishNode(node, "ExportDefaultDeclaration");
  }
  // export var|const|let|function|class ...
  if (this.shouldParseExportStatement()) {
    node.declaration = this.parseStatement(true);
    if (node.declaration.type === "VariableDeclaration") this.checkVariableExport(exports, node.declaration.declarations);else this.checkExport(exports, node.declaration.id.name, node.declaration.id.start);
    node.specifiers = [];
    node.source = null;
  } else {
    // export { x, y as z } [from '...']
    node.declaration = null;
    node.specifiers = this.parseExportSpecifiers(exports);
    if (this.eatContextual("from")) {
      node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
    } else {
      // check for keywords used as local names
      for (var i = 0; i < node.specifiers.length; i++) {
        if (this$1.keywords.test(node.specifiers[i].local.name) || this$1.reservedWords.test(node.specifiers[i].local.name)) {
          this$1.unexpected(node.specifiers[i].local.start);
        }
      }

      node.source = null;
    }
    this.semicolon();
  }
  return this.finishNode(node, "ExportNamedDeclaration");
};

pp$1.checkExport = function (exports, name, pos) {
  if (!exports) return;
  if (has(exports, name)) this.raiseRecoverable(pos, "Duplicate export '" + name + "'");
  exports[name] = true;
};

pp$1.checkPatternExport = function (exports, pat) {
  var this$1 = this;

  var type = pat.type;
  if (type == "Identifier") this.checkExport(exports, pat.name, pat.start);else if (type == "ObjectPattern") for (var i = 0; i < pat.properties.length; ++i) {
    this$1.checkPatternExport(exports, pat.properties[i].value);
  } else if (type == "ArrayPattern") for (var i$1 = 0; i$1 < pat.elements.length; ++i$1) {
    var elt = pat.elements[i$1];
    if (elt) this$1.checkPatternExport(exports, elt);
  } else if (type == "AssignmentPattern") this.checkPatternExport(exports, pat.left);else if (type == "ParenthesizedExpression") this.checkPatternExport(exports, pat.expression);
};

pp$1.checkVariableExport = function (exports, decls) {
  var this$1 = this;

  if (!exports) return;
  for (var i = 0; i < decls.length; i++) {
    this$1.checkPatternExport(exports, decls[i].id);
  }
};

pp$1.shouldParseExportStatement = function () {
  return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
};

// Parses a comma-separated list of module exports.

pp$1.parseExportSpecifiers = function (exports) {
  var this$1 = this;

  var nodes = [],
      first = true;
  // export { x, y as z } [from '...']
  this.expect(tt.braceL);
  while (!this.eat(tt.braceR)) {
    if (!first) {
      this$1.expect(tt.comma);
      if (this$1.afterTrailingComma(tt.braceR)) break;
    } else first = false;

    var node = this$1.startNode();
    node.local = this$1.parseIdent(true);
    node.exported = this$1.eatContextual("as") ? this$1.parseIdent(true) : node.local;
    this$1.checkExport(exports, node.exported.name, node.exported.start);
    nodes.push(this$1.finishNode(node, "ExportSpecifier"));
  }
  return nodes;
};

// Parses import declaration.

pp$1.parseImport = function (node) {
  this.next();
  // import '...'
  if (this.type === tt.string) {
    node.specifiers = empty;
    node.source = this.parseExprAtom();
  } else {
    node.specifiers = this.parseImportSpecifiers();
    this.expectContextual("from");
    node.source = this.type === tt.string ? this.parseExprAtom() : this.unexpected();
  }
  this.semicolon();
  return this.finishNode(node, "ImportDeclaration");
};

// Parses a comma-separated list of module imports.

pp$1.parseImportSpecifiers = function () {
  var this$1 = this;

  var nodes = [],
      first = true;
  if (this.type === tt.name) {
    // import defaultObj, { x, y as z } from '...'
    var node = this.startNode();
    node.local = this.parseIdent();
    this.checkLVal(node.local, "let");
    nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
    if (!this.eat(tt.comma)) return nodes;
  }
  if (this.type === tt.star) {
    var node$1 = this.startNode();
    this.next();
    this.expectContextual("as");
    node$1.local = this.parseIdent();
    this.checkLVal(node$1.local, "let");
    nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
    return nodes;
  }
  this.expect(tt.braceL);
  while (!this.eat(tt.braceR)) {
    if (!first) {
      this$1.expect(tt.comma);
      if (this$1.afterTrailingComma(tt.braceR)) break;
    } else first = false;

    var node$2 = this$1.startNode();
    node$2.imported = this$1.parseIdent(true);
    if (this$1.eatContextual("as")) {
      node$2.local = this$1.parseIdent();
    } else {
      node$2.local = node$2.imported;
      if (this$1.isKeyword(node$2.local.name)) this$1.unexpected(node$2.local.start);
      if (this$1.reservedWordsStrict.test(node$2.local.name)) this$1.raiseRecoverable(node$2.local.start, "The keyword '" + node$2.local.name + "' is reserved");
    }
    this$1.checkLVal(node$2.local, "let");
    nodes.push(this$1.finishNode(node$2, "ImportSpecifier"));
  }
  return nodes;
};

var pp$2 = Parser.prototype;

// Convert existing expression atom to assignable pattern
// if possible.

pp$2.toAssignable = function (node, isBinding) {
  var this$1 = this;

  if (this.options.ecmaVersion >= 6 && node) {
    switch (node.type) {
      case "Identifier":
        if (this.inAsync && node.name === "await") this.raise(node.start, "Can not use 'await' as identifier inside an async function");
        break;

      case "ObjectPattern":
      case "ArrayPattern":
        break;

      case "ObjectExpression":
        node.type = "ObjectPattern";
        for (var i = 0; i < node.properties.length; i++) {
          var prop = node.properties[i];
          if (prop.kind !== "init") this$1.raise(prop.key.start, "Object pattern can't contain getter or setter");
          this$1.toAssignable(prop.value, isBinding);
        }
        break;

      case "ArrayExpression":
        node.type = "ArrayPattern";
        this.toAssignableList(node.elements, isBinding);
        break;

      case "AssignmentExpression":
        if (node.operator === "=") {
          node.type = "AssignmentPattern";
          delete node.operator;
          this.toAssignable(node.left, isBinding);
          // falls through to AssignmentPattern
        } else {
          this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
          break;
        }

      case "AssignmentPattern":
        break;

      case "ParenthesizedExpression":
        node.expression = this.toAssignable(node.expression, isBinding);
        break;

      case "MemberExpression":
        if (!isBinding) break;

      default:
        this.raise(node.start, "Assigning to rvalue");
    }
  }
  return node;
};

// Convert list of expression atoms to binding list.

pp$2.toAssignableList = function (exprList, isBinding) {
  var this$1 = this;

  var end = exprList.length;
  if (end) {
    var last = exprList[end - 1];
    if (last && last.type == "RestElement") {
      --end;
    } else if (last && last.type == "SpreadElement") {
      last.type = "RestElement";
      var arg = last.argument;
      this.toAssignable(arg, isBinding);
      if (arg.type !== "Identifier" && arg.type !== "MemberExpression" && arg.type !== "ArrayPattern") this.unexpected(arg.start);
      --end;
    }

    if (isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier") this.unexpected(last.argument.start);
  }
  for (var i = 0; i < end; i++) {
    var elt = exprList[i];
    if (elt) this$1.toAssignable(elt, isBinding);
  }
  return exprList;
};

// Parses spread element.

pp$2.parseSpread = function (refDestructuringErrors) {
  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
  return this.finishNode(node, "SpreadElement");
};

pp$2.parseRest = function (allowNonIdent) {
  var node = this.startNode();
  this.next();

  // RestElement inside of a function parameter must be an identifier
  if (allowNonIdent) node.argument = this.type === tt.name ? this.parseIdent() : this.unexpected();else node.argument = this.type === tt.name || this.type === tt.bracketL ? this.parseBindingAtom() : this.unexpected();

  return this.finishNode(node, "RestElement");
};

// Parses lvalue (assignable) atom.

pp$2.parseBindingAtom = function () {
  if (this.options.ecmaVersion < 6) return this.parseIdent();
  switch (this.type) {
    case tt.name:
      return this.parseIdent();

    case tt.bracketL:
      var node = this.startNode();
      this.next();
      node.elements = this.parseBindingList(tt.bracketR, true, true);
      return this.finishNode(node, "ArrayPattern");

    case tt.braceL:
      return this.parseObj(true);

    default:
      this.unexpected();
  }
};

pp$2.parseBindingList = function (close, allowEmpty, allowTrailingComma, allowNonIdent) {
  var this$1 = this;

  var elts = [],
      first = true;
  while (!this.eat(close)) {
    if (first) first = false;else this$1.expect(tt.comma);
    if (allowEmpty && this$1.type === tt.comma) {
      elts.push(null);
    } else if (allowTrailingComma && this$1.afterTrailingComma(close)) {
      break;
    } else if (this$1.type === tt.ellipsis) {
      var rest = this$1.parseRest(allowNonIdent);
      this$1.parseBindingListItem(rest);
      elts.push(rest);
      if (this$1.type === tt.comma) this$1.raise(this$1.start, "Comma is not permitted after the rest element");
      this$1.expect(close);
      break;
    } else {
      var elem = this$1.parseMaybeDefault(this$1.start, this$1.startLoc);
      this$1.parseBindingListItem(elem);
      elts.push(elem);
    }
  }
  return elts;
};

pp$2.parseBindingListItem = function (param) {
  return param;
};

// Parses assignment pattern around given atom if possible.

pp$2.parseMaybeDefault = function (startPos, startLoc, left) {
  left = left || this.parseBindingAtom();
  if (this.options.ecmaVersion < 6 || !this.eat(tt.eq)) return left;
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.right = this.parseMaybeAssign();
  return this.finishNode(node, "AssignmentPattern");
};

// Verify that a node is an lval — something that can be assigned
// to.
// bindingType can be either:
// 'var' indicating that the lval creates a 'var' binding
// 'let' indicating that the lval creates a lexical ('let' or 'const') binding
// 'none' indicating that the binding should be checked for illegal identifiers, but not for duplicate references

pp$2.checkLVal = function (expr, bindingType, checkClashes) {
  var this$1 = this;

  switch (expr.type) {
    case "Identifier":
      if (this.strict && this.reservedWordsStrictBind.test(expr.name)) this.raiseRecoverable(expr.start, (bindingType ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
      if (checkClashes) {
        if (has(checkClashes, expr.name)) this.raiseRecoverable(expr.start, "Argument name clash");
        checkClashes[expr.name] = true;
      }
      if (bindingType && bindingType !== "none") {
        if (bindingType === "var" && !this.canDeclareVarName(expr.name) || bindingType !== "var" && !this.canDeclareLexicalName(expr.name)) {
          this.raiseRecoverable(expr.start, "Identifier '" + expr.name + "' has already been declared");
        }
        if (bindingType === "var") {
          this.declareVarName(expr.name);
        } else {
          this.declareLexicalName(expr.name);
        }
      }
      break;

    case "MemberExpression":
      if (bindingType) this.raiseRecoverable(expr.start, (bindingType ? "Binding" : "Assigning to") + " member expression");
      break;

    case "ObjectPattern":
      for (var i = 0; i < expr.properties.length; i++) {
        this$1.checkLVal(expr.properties[i].value, bindingType, checkClashes);
      }break;

    case "ArrayPattern":
      for (var i$1 = 0; i$1 < expr.elements.length; i$1++) {
        var elem = expr.elements[i$1];
        if (elem) this$1.checkLVal(elem, bindingType, checkClashes);
      }
      break;

    case "AssignmentPattern":
      this.checkLVal(expr.left, bindingType, checkClashes);
      break;

    case "RestElement":
      this.checkLVal(expr.argument, bindingType, checkClashes);
      break;

    case "ParenthesizedExpression":
      this.checkLVal(expr.expression, bindingType, checkClashes);
      break;

    default:
      this.raise(expr.start, (bindingType ? "Binding" : "Assigning to") + " rvalue");
  }
};

// A recursive descent parser operates by defining functions for all
// syntactic elements, and recursively calling those, each function
// advancing the input stream and returning an AST node. Precedence
// of constructs (for example, the fact that `!x[1]` means `!(x[1])`
// instead of `(!x)[1]` is handled by the fact that the parser
// function that parses unary prefix operators is called first, and
// in turn calls the function that parses `[]` subscripts — that
// way, it'll receive the node for `x[1]` already parsed, and wraps
// *that* in the unary operator node.
//
// Acorn uses an [operator precedence parser][opp] to handle binary
// operator precedence, because it is much more compact than using
// the technique outlined above, which uses different, nesting
// functions to specify precedence, for all of the ten binary
// precedence levels that JavaScript defines.
//
// [opp]: http://en.wikipedia.org/wiki/Operator-precedence_parser

var pp$3 = Parser.prototype;

// Check if property name clashes with already added.
// Object/class getters and setters are not allowed to clash —
// either with each other or with an init property — and in
// strict mode, init properties are also not allowed to be repeated.

pp$3.checkPropClash = function (prop, propHash) {
  if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand)) return;
  var key = prop.key;
  var name;
  switch (key.type) {
    case "Identifier":
      name = key.name;break;
    case "Literal":
      name = String(key.value);break;
    default:
      return;
  }
  var kind = prop.kind;
  if (this.options.ecmaVersion >= 6) {
    if (name === "__proto__" && kind === "init") {
      if (propHash.proto) this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
      propHash.proto = true;
    }
    return;
  }
  name = "$" + name;
  var other = propHash[name];
  if (other) {
    var redefinition;
    if (kind === "init") {
      redefinition = this.strict && other.init || other.get || other.set;
    } else {
      redefinition = other.init || other[kind];
    }
    if (redefinition) this.raiseRecoverable(key.start, "Redefinition of property");
  } else {
    other = propHash[name] = {
      init: false,
      get: false,
      set: false
    };
  }
  other[kind] = true;
};

// ### Expression parsing

// These nest, from the most general expression type at the top to
// 'atomic', nondivisible expression types at the bottom. Most of
// the functions will simply let the function(s) below them parse,
// and, *if* the syntactic construct they handle is present, wrap
// the AST node that the inner parser gave them in another node.

// Parse a full expression. The optional arguments are used to
// forbid the `in` operator (in for loops initalization expressions)
// and provide reference for storing '=' operator inside shorthand
// property assignment in contexts where both object expression
// and object pattern might appear (so it's possible to raise
// delayed syntax error at correct position).

pp$3.parseExpression = function (noIn, refDestructuringErrors) {
  var this$1 = this;

  var startPos = this.start,
      startLoc = this.startLoc;
  var expr = this.parseMaybeAssign(noIn, refDestructuringErrors);
  if (this.type === tt.comma) {
    var node = this.startNodeAt(startPos, startLoc);
    node.expressions = [expr];
    while (this.eat(tt.comma)) {
      node.expressions.push(this$1.parseMaybeAssign(noIn, refDestructuringErrors));
    }return this.finishNode(node, "SequenceExpression");
  }
  return expr;
};

// Parse an assignment expression. This includes applications of
// operators like `+=`.

pp$3.parseMaybeAssign = function (noIn, refDestructuringErrors, afterLeftParse) {
  if (this.inGenerator && this.isContextual("yield")) return this.parseYield();

  var ownDestructuringErrors = false,
      oldParenAssign = -1,
      oldTrailingComma = -1;
  if (refDestructuringErrors) {
    oldParenAssign = refDestructuringErrors.parenthesizedAssign;
    oldTrailingComma = refDestructuringErrors.trailingComma;
    refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
  } else {
    refDestructuringErrors = new DestructuringErrors();
    ownDestructuringErrors = true;
  }

  var startPos = this.start,
      startLoc = this.startLoc;
  if (this.type == tt.parenL || this.type == tt.name) this.potentialArrowAt = this.start;
  var left = this.parseMaybeConditional(noIn, refDestructuringErrors);
  if (afterLeftParse) left = afterLeftParse.call(this, left, startPos, startLoc);
  if (this.type.isAssign) {
    this.checkPatternErrors(refDestructuringErrors, true);
    if (!ownDestructuringErrors) DestructuringErrors.call(refDestructuringErrors);
    var node = this.startNodeAt(startPos, startLoc);
    node.operator = this.value;
    node.left = this.type === tt.eq ? this.toAssignable(left) : left;
    refDestructuringErrors.shorthandAssign = -1; // reset because shorthand default was used correctly
    this.checkLVal(left);
    this.next();
    node.right = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "AssignmentExpression");
  } else {
    if (ownDestructuringErrors) this.checkExpressionErrors(refDestructuringErrors, true);
  }
  if (oldParenAssign > -1) refDestructuringErrors.parenthesizedAssign = oldParenAssign;
  if (oldTrailingComma > -1) refDestructuringErrors.trailingComma = oldTrailingComma;
  return left;
};

// Parse a ternary conditional (`?:`) operator.

pp$3.parseMaybeConditional = function (noIn, refDestructuringErrors) {
  var startPos = this.start,
      startLoc = this.startLoc;
  var expr = this.parseExprOps(noIn, refDestructuringErrors);
  if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
  if (this.eat(tt.question)) {
    var node = this.startNodeAt(startPos, startLoc);
    node.test = expr;
    node.consequent = this.parseMaybeAssign();
    this.expect(tt.colon);
    node.alternate = this.parseMaybeAssign(noIn);
    return this.finishNode(node, "ConditionalExpression");
  }
  return expr;
};

// Start the precedence parser.

pp$3.parseExprOps = function (noIn, refDestructuringErrors) {
  var startPos = this.start,
      startLoc = this.startLoc;
  var expr = this.parseMaybeUnary(refDestructuringErrors, false);
  if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
  return expr.start == startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, noIn);
};

// Parse binary operators with the operator precedence parsing
// algorithm. `left` is the left-hand side of the operator.
// `minPrec` provides context that allows the function to stop and
// defer further parser to one of its callers when it encounters an
// operator that has a lower precedence than the set it is parsing.

pp$3.parseExprOp = function (left, leftStartPos, leftStartLoc, minPrec, noIn) {
  var prec = this.type.binop;
  if (prec != null && (!noIn || this.type !== tt._in)) {
    if (prec > minPrec) {
      var logical = this.type === tt.logicalOR || this.type === tt.logicalAND;
      var op = this.value;
      this.next();
      var startPos = this.start,
          startLoc = this.startLoc;
      var right = this.parseExprOp(this.parseMaybeUnary(null, false), startPos, startLoc, prec, noIn);
      var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical);
      return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, noIn);
    }
  }
  return left;
};

pp$3.buildBinary = function (startPos, startLoc, left, right, op, logical) {
  var node = this.startNodeAt(startPos, startLoc);
  node.left = left;
  node.operator = op;
  node.right = right;
  return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
};

// Parse unary operators, both prefix and postfix.

pp$3.parseMaybeUnary = function (refDestructuringErrors, sawUnary) {
  var this$1 = this;

  var startPos = this.start,
      startLoc = this.startLoc,
      expr;
  if (this.inAsync && this.isContextual("await")) {
    expr = this.parseAwait(refDestructuringErrors);
    sawUnary = true;
  } else if (this.type.prefix) {
    var node = this.startNode(),
        update = this.type === tt.incDec;
    node.operator = this.value;
    node.prefix = true;
    this.next();
    node.argument = this.parseMaybeUnary(null, true);
    this.checkExpressionErrors(refDestructuringErrors, true);
    if (update) this.checkLVal(node.argument);else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier") this.raiseRecoverable(node.start, "Deleting local variable in strict mode");else sawUnary = true;
    expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
  } else {
    expr = this.parseExprSubscripts(refDestructuringErrors);
    if (this.checkExpressionErrors(refDestructuringErrors)) return expr;
    while (this.type.postfix && !this.canInsertSemicolon()) {
      var node$1 = this$1.startNodeAt(startPos, startLoc);
      node$1.operator = this$1.value;
      node$1.prefix = false;
      node$1.argument = expr;
      this$1.checkLVal(expr);
      this$1.next();
      expr = this$1.finishNode(node$1, "UpdateExpression");
    }
  }

  if (!sawUnary && this.eat(tt.starstar)) return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false), "**", false);else return expr;
};

// Parse call, dot, and `[]`-subscript expressions.

pp$3.parseExprSubscripts = function (refDestructuringErrors) {
  var startPos = this.start,
      startLoc = this.startLoc;
  var expr = this.parseExprAtom(refDestructuringErrors);
  var skipArrowSubscripts = expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")";
  if (this.checkExpressionErrors(refDestructuringErrors) || skipArrowSubscripts) return expr;
  var result = this.parseSubscripts(expr, startPos, startLoc);
  if (refDestructuringErrors && result.type === "MemberExpression") {
    if (refDestructuringErrors.parenthesizedAssign >= result.start) refDestructuringErrors.parenthesizedAssign = -1;
    if (refDestructuringErrors.parenthesizedBind >= result.start) refDestructuringErrors.parenthesizedBind = -1;
  }
  return result;
};

pp$3.parseSubscripts = function (base, startPos, startLoc, noCalls) {
  var this$1 = this;

  var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd == base.end && !this.canInsertSemicolon();
  for (var computed;;) {
    if ((computed = this$1.eat(tt.bracketL)) || this$1.eat(tt.dot)) {
      var node = this$1.startNodeAt(startPos, startLoc);
      node.object = base;
      node.property = computed ? this$1.parseExpression() : this$1.parseIdent(true);
      node.computed = !!computed;
      if (computed) this$1.expect(tt.bracketR);
      base = this$1.finishNode(node, "MemberExpression");
    } else if (!noCalls && this$1.eat(tt.parenL)) {
      var refDestructuringErrors = new DestructuringErrors(),
          oldYieldPos = this$1.yieldPos,
          oldAwaitPos = this$1.awaitPos;
      this$1.yieldPos = 0;
      this$1.awaitPos = 0;
      var exprList = this$1.parseExprList(tt.parenR, this$1.options.ecmaVersion >= 8, false, refDestructuringErrors);
      if (maybeAsyncArrow && !this$1.canInsertSemicolon() && this$1.eat(tt.arrow)) {
        this$1.checkPatternErrors(refDestructuringErrors, false);
        this$1.checkYieldAwaitInDefaultParams();
        this$1.yieldPos = oldYieldPos;
        this$1.awaitPos = oldAwaitPos;
        return this$1.parseArrowExpression(this$1.startNodeAt(startPos, startLoc), exprList, true);
      }
      this$1.checkExpressionErrors(refDestructuringErrors, true);
      this$1.yieldPos = oldYieldPos || this$1.yieldPos;
      this$1.awaitPos = oldAwaitPos || this$1.awaitPos;
      var node$1 = this$1.startNodeAt(startPos, startLoc);
      node$1.callee = base;
      node$1.arguments = exprList;
      base = this$1.finishNode(node$1, "CallExpression");
    } else if (this$1.type === tt.backQuote) {
      var node$2 = this$1.startNodeAt(startPos, startLoc);
      node$2.tag = base;
      node$2.quasi = this$1.parseTemplate({ isTagged: true });
      base = this$1.finishNode(node$2, "TaggedTemplateExpression");
    } else {
      return base;
    }
  }
};

// Parse an atomic expression — either a single token that is an
// expression, an expression started by a keyword like `function` or
// `new`, or an expression wrapped in punctuation like `()`, `[]`,
// or `{}`.

pp$3.parseExprAtom = function (refDestructuringErrors) {
  var node,
      canBeArrow = this.potentialArrowAt == this.start;
  switch (this.type) {
    case tt._super:
      if (!this.inFunction) this.raise(this.start, "'super' outside of function or class");

    case tt._this:
      var type = this.type === tt._this ? "ThisExpression" : "Super";
      node = this.startNode();
      this.next();
      return this.finishNode(node, type);

    case tt.name:
      var startPos = this.start,
          startLoc = this.startLoc;
      var id = this.parseIdent(this.type !== tt.name);
      if (this.options.ecmaVersion >= 8 && id.name === "async" && !this.canInsertSemicolon() && this.eat(tt._function)) return this.parseFunction(this.startNodeAt(startPos, startLoc), false, false, true);
      if (canBeArrow && !this.canInsertSemicolon()) {
        if (this.eat(tt.arrow)) return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false);
        if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === tt.name) {
          id = this.parseIdent();
          if (this.canInsertSemicolon() || !this.eat(tt.arrow)) this.unexpected();
          return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true);
        }
      }
      return id;

    case tt.regexp:
      var value = this.value;
      node = this.parseLiteral(value.value);
      node.regex = { pattern: value.pattern, flags: value.flags };
      return node;

    case tt.num:case tt.string:
      return this.parseLiteral(this.value);

    case tt._null:case tt._true:case tt._false:
      node = this.startNode();
      node.value = this.type === tt._null ? null : this.type === tt._true;
      node.raw = this.type.keyword;
      this.next();
      return this.finishNode(node, "Literal");

    case tt.parenL:
      var start = this.start,
          expr = this.parseParenAndDistinguishExpression(canBeArrow);
      if (refDestructuringErrors) {
        if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr)) refDestructuringErrors.parenthesizedAssign = start;
        if (refDestructuringErrors.parenthesizedBind < 0) refDestructuringErrors.parenthesizedBind = start;
      }
      return expr;

    case tt.bracketL:
      node = this.startNode();
      this.next();
      node.elements = this.parseExprList(tt.bracketR, true, true, refDestructuringErrors);
      return this.finishNode(node, "ArrayExpression");

    case tt.braceL:
      return this.parseObj(false, refDestructuringErrors);

    case tt._function:
      node = this.startNode();
      this.next();
      return this.parseFunction(node, false);

    case tt._class:
      return this.parseClass(this.startNode(), false);

    case tt._new:
      return this.parseNew();

    case tt.backQuote:
      return this.parseTemplate();

    default:
      this.unexpected();
  }
};

pp$3.parseLiteral = function (value) {
  var node = this.startNode();
  node.value = value;
  node.raw = this.input.slice(this.start, this.end);
  this.next();
  return this.finishNode(node, "Literal");
};

pp$3.parseParenExpression = function () {
  this.expect(tt.parenL);
  var val = this.parseExpression();
  this.expect(tt.parenR);
  return val;
};

pp$3.parseParenAndDistinguishExpression = function (canBeArrow) {
  var this$1 = this;

  var startPos = this.start,
      startLoc = this.startLoc,
      val,
      allowTrailingComma = this.options.ecmaVersion >= 8;
  if (this.options.ecmaVersion >= 6) {
    this.next();

    var innerStartPos = this.start,
        innerStartLoc = this.startLoc;
    var exprList = [],
        first = true,
        lastIsComma = false;
    var refDestructuringErrors = new DestructuringErrors(),
        oldYieldPos = this.yieldPos,
        oldAwaitPos = this.awaitPos,
        spreadStart,
        innerParenStart;
    this.yieldPos = 0;
    this.awaitPos = 0;
    while (this.type !== tt.parenR) {
      first ? first = false : this$1.expect(tt.comma);
      if (allowTrailingComma && this$1.afterTrailingComma(tt.parenR, true)) {
        lastIsComma = true;
        break;
      } else if (this$1.type === tt.ellipsis) {
        spreadStart = this$1.start;
        exprList.push(this$1.parseParenItem(this$1.parseRest()));
        if (this$1.type === tt.comma) this$1.raise(this$1.start, "Comma is not permitted after the rest element");
        break;
      } else {
        if (this$1.type === tt.parenL && !innerParenStart) {
          innerParenStart = this$1.start;
        }
        exprList.push(this$1.parseMaybeAssign(false, refDestructuringErrors, this$1.parseParenItem));
      }
    }
    var innerEndPos = this.start,
        innerEndLoc = this.startLoc;
    this.expect(tt.parenR);

    if (canBeArrow && !this.canInsertSemicolon() && this.eat(tt.arrow)) {
      this.checkPatternErrors(refDestructuringErrors, false);
      this.checkYieldAwaitInDefaultParams();
      if (innerParenStart) this.unexpected(innerParenStart);
      this.yieldPos = oldYieldPos;
      this.awaitPos = oldAwaitPos;
      return this.parseParenArrowList(startPos, startLoc, exprList);
    }

    if (!exprList.length || lastIsComma) this.unexpected(this.lastTokStart);
    if (spreadStart) this.unexpected(spreadStart);
    this.checkExpressionErrors(refDestructuringErrors, true);
    this.yieldPos = oldYieldPos || this.yieldPos;
    this.awaitPos = oldAwaitPos || this.awaitPos;

    if (exprList.length > 1) {
      val = this.startNodeAt(innerStartPos, innerStartLoc);
      val.expressions = exprList;
      this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
    } else {
      val = exprList[0];
    }
  } else {
    val = this.parseParenExpression();
  }

  if (this.options.preserveParens) {
    var par = this.startNodeAt(startPos, startLoc);
    par.expression = val;
    return this.finishNode(par, "ParenthesizedExpression");
  } else {
    return val;
  }
};

pp$3.parseParenItem = function (item) {
  return item;
};

pp$3.parseParenArrowList = function (startPos, startLoc, exprList) {
  return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList);
};

// New's precedence is slightly tricky. It must allow its argument to
// be a `[]` or dot subscript expression, but not a call — at least,
// not without wrapping it in parentheses. Thus, it uses the noCalls
// argument to parseSubscripts to prevent it from consuming the
// argument list.

var empty$1 = [];

pp$3.parseNew = function () {
  var node = this.startNode();
  var meta = this.parseIdent(true);
  if (this.options.ecmaVersion >= 6 && this.eat(tt.dot)) {
    node.meta = meta;
    node.property = this.parseIdent(true);
    if (node.property.name !== "target") this.raiseRecoverable(node.property.start, "The only valid meta property for new is new.target");
    if (!this.inFunction) this.raiseRecoverable(node.start, "new.target can only be used in functions");
    return this.finishNode(node, "MetaProperty");
  }
  var startPos = this.start,
      startLoc = this.startLoc;
  node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true);
  if (this.eat(tt.parenL)) node.arguments = this.parseExprList(tt.parenR, this.options.ecmaVersion >= 8, false);else node.arguments = empty$1;
  return this.finishNode(node, "NewExpression");
};

// Parse template expression.

pp$3.parseTemplateElement = function (ref) {
  var isTagged = ref.isTagged;

  var elem = this.startNode();
  if (this.type === tt.invalidTemplate) {
    if (!isTagged) {
      this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
    }
    elem.value = {
      raw: this.value,
      cooked: null
    };
  } else {
    elem.value = {
      raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
      cooked: this.value
    };
  }
  this.next();
  elem.tail = this.type === tt.backQuote;
  return this.finishNode(elem, "TemplateElement");
};

pp$3.parseTemplate = function (ref) {
  var this$1 = this;
  if (ref === void 0) ref = {};
  var isTagged = ref.isTagged;if (isTagged === void 0) isTagged = false;

  var node = this.startNode();
  this.next();
  node.expressions = [];
  var curElt = this.parseTemplateElement({ isTagged: isTagged });
  node.quasis = [curElt];
  while (!curElt.tail) {
    this$1.expect(tt.dollarBraceL);
    node.expressions.push(this$1.parseExpression());
    this$1.expect(tt.braceR);
    node.quasis.push(curElt = this$1.parseTemplateElement({ isTagged: isTagged }));
  }
  this.next();
  return this.finishNode(node, "TemplateLiteral");
};

// Parse an object literal or binding pattern.

pp$3.parseObj = function (isPattern, refDestructuringErrors) {
  var this$1 = this;

  var node = this.startNode(),
      first = true,
      propHash = {};
  node.properties = [];
  this.next();
  while (!this.eat(tt.braceR)) {
    if (!first) {
      this$1.expect(tt.comma);
      if (this$1.afterTrailingComma(tt.braceR)) break;
    } else first = false;

    var prop = this$1.startNode(),
        isGenerator,
        isAsync,
        startPos,
        startLoc;
    if (this$1.options.ecmaVersion >= 6) {
      prop.method = false;
      prop.shorthand = false;
      if (isPattern || refDestructuringErrors) {
        startPos = this$1.start;
        startLoc = this$1.startLoc;
      }
      if (!isPattern) isGenerator = this$1.eat(tt.star);
    }
    this$1.parsePropertyName(prop);
    if (!isPattern && this$1.options.ecmaVersion >= 8 && !isGenerator && !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && this$1.type !== tt.parenL && this$1.type !== tt.colon && !this$1.canInsertSemicolon()) {
      isAsync = true;
      this$1.parsePropertyName(prop, refDestructuringErrors);
    } else {
      isAsync = false;
    }
    this$1.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors);
    this$1.checkPropClash(prop, propHash);
    node.properties.push(this$1.finishNode(prop, "Property"));
  }
  return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
};

pp$3.parsePropertyValue = function (prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors) {
  if ((isGenerator || isAsync) && this.type === tt.colon) this.unexpected();

  if (this.eat(tt.colon)) {
    prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
    prop.kind = "init";
  } else if (this.options.ecmaVersion >= 6 && this.type === tt.parenL) {
    if (isPattern) this.unexpected();
    prop.kind = "init";
    prop.method = true;
    prop.value = this.parseMethod(isGenerator, isAsync);
  } else if (this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && this.type != tt.comma && this.type != tt.braceR) {
    if (isGenerator || isAsync || isPattern) this.unexpected();
    prop.kind = prop.key.name;
    this.parsePropertyName(prop);
    prop.value = this.parseMethod(false);
    var paramCount = prop.kind === "get" ? 0 : 1;
    if (prop.value.params.length !== paramCount) {
      var start = prop.value.start;
      if (prop.kind === "get") this.raiseRecoverable(start, "getter should have no params");else this.raiseRecoverable(start, "setter should have exactly one param");
    } else {
      if (prop.kind === "set" && prop.value.params[0].type === "RestElement") this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
    }
  } else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier") {
    if (this.keywords.test(prop.key.name) || (this.strict ? this.reservedWordsStrict : this.reservedWords).test(prop.key.name) || this.inGenerator && prop.key.name == "yield" || this.inAsync && prop.key.name == "await") this.raiseRecoverable(prop.key.start, "'" + prop.key.name + "' can not be used as shorthand property");
    prop.kind = "init";
    if (isPattern) {
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
    } else if (this.type === tt.eq && refDestructuringErrors) {
      if (refDestructuringErrors.shorthandAssign < 0) refDestructuringErrors.shorthandAssign = this.start;
      prop.value = this.parseMaybeDefault(startPos, startLoc, prop.key);
    } else {
      prop.value = prop.key;
    }
    prop.shorthand = true;
  } else this.unexpected();
};

pp$3.parsePropertyName = function (prop) {
  if (this.options.ecmaVersion >= 6) {
    if (this.eat(tt.bracketL)) {
      prop.computed = true;
      prop.key = this.parseMaybeAssign();
      this.expect(tt.bracketR);
      return prop.key;
    } else {
      prop.computed = false;
    }
  }
  return prop.key = this.type === tt.num || this.type === tt.string ? this.parseExprAtom() : this.parseIdent(true);
};

// Initialize empty function node.

pp$3.initFunction = function (node) {
  node.id = null;
  if (this.options.ecmaVersion >= 6) {
    node.generator = false;
    node.expression = false;
  }
  if (this.options.ecmaVersion >= 8) node.async = false;
};

// Parse object or class method.

pp$3.parseMethod = function (isGenerator, isAsync) {
  var node = this.startNode(),
      oldInGen = this.inGenerator,
      oldInAsync = this.inAsync,
      oldYieldPos = this.yieldPos,
      oldAwaitPos = this.awaitPos,
      oldInFunc = this.inFunction;

  this.initFunction(node);
  if (this.options.ecmaVersion >= 6) node.generator = isGenerator;
  if (this.options.ecmaVersion >= 8) node.async = !!isAsync;

  this.inGenerator = node.generator;
  this.inAsync = node.async;
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.inFunction = true;
  this.enterFunctionScope();

  this.expect(tt.parenL);
  node.params = this.parseBindingList(tt.parenR, false, this.options.ecmaVersion >= 8);
  this.checkYieldAwaitInDefaultParams();
  this.parseFunctionBody(node, false);

  this.inGenerator = oldInGen;
  this.inAsync = oldInAsync;
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.inFunction = oldInFunc;
  return this.finishNode(node, "FunctionExpression");
};

// Parse arrow function expression with given parameters.

pp$3.parseArrowExpression = function (node, params, isAsync) {
  var oldInGen = this.inGenerator,
      oldInAsync = this.inAsync,
      oldYieldPos = this.yieldPos,
      oldAwaitPos = this.awaitPos,
      oldInFunc = this.inFunction;

  this.enterFunctionScope();
  this.initFunction(node);
  if (this.options.ecmaVersion >= 8) node.async = !!isAsync;

  this.inGenerator = false;
  this.inAsync = node.async;
  this.yieldPos = 0;
  this.awaitPos = 0;
  this.inFunction = true;

  node.params = this.toAssignableList(params, true);
  this.parseFunctionBody(node, true);

  this.inGenerator = oldInGen;
  this.inAsync = oldInAsync;
  this.yieldPos = oldYieldPos;
  this.awaitPos = oldAwaitPos;
  this.inFunction = oldInFunc;
  return this.finishNode(node, "ArrowFunctionExpression");
};

// Parse function body and check parameters.

pp$3.parseFunctionBody = function (node, isArrowFunction) {
  var isExpression = isArrowFunction && this.type !== tt.braceL;
  var oldStrict = this.strict,
      useStrict = false;

  if (isExpression) {
    node.body = this.parseMaybeAssign();
    node.expression = true;
    this.checkParams(node, false);
  } else {
    var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
    if (!oldStrict || nonSimple) {
      useStrict = this.strictDirective(this.end);
      // If this is a strict mode function, verify that argument names
      // are not repeated, and it does not try to bind the words `eval`
      // or `arguments`.
      if (useStrict && nonSimple) this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list");
    }
    // Start a new scope with regard to labels and the `inFunction`
    // flag (restore them to their old value afterwards).
    var oldLabels = this.labels;
    this.labels = [];
    if (useStrict) this.strict = true;

    // Add the params to varDeclaredNames to ensure that an error is thrown
    // if a let/const declaration in the function clashes with one of the params.
    this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && this.isSimpleParamList(node.params));
    node.body = this.parseBlock(false);
    node.expression = false;
    this.labels = oldLabels;
  }
  this.exitFunctionScope();

  if (this.strict && node.id) {
    // Ensure the function name isn't a forbidden identifier in strict mode, e.g. 'eval'
    this.checkLVal(node.id, "none");
  }
  this.strict = oldStrict;
};

pp$3.isSimpleParamList = function (params) {
  for (var i = 0; i < params.length; i++) {
    if (params[i].type !== "Identifier") return false;
  }return true;
};

// Checks function params for various disallowed patterns such as using "eval"
// or "arguments" and duplicate parameters.

pp$3.checkParams = function (node, allowDuplicates) {
  var this$1 = this;

  var nameHash = {};
  for (var i = 0; i < node.params.length; i++) {
    this$1.checkLVal(node.params[i], "var", allowDuplicates ? null : nameHash);
  }
};

// Parses a comma-separated list of expressions, and returns them as
// an array. `close` is the token type that ends the list, and
// `allowEmpty` can be turned on to allow subsequent commas with
// nothing in between them to be parsed as `null` (which is needed
// for array literals).

pp$3.parseExprList = function (close, allowTrailingComma, allowEmpty, refDestructuringErrors) {
  var this$1 = this;

  var elts = [],
      first = true;
  while (!this.eat(close)) {
    if (!first) {
      this$1.expect(tt.comma);
      if (allowTrailingComma && this$1.afterTrailingComma(close)) break;
    } else first = false;

    var elt;
    if (allowEmpty && this$1.type === tt.comma) elt = null;else if (this$1.type === tt.ellipsis) {
      elt = this$1.parseSpread(refDestructuringErrors);
      if (refDestructuringErrors && this$1.type === tt.comma && refDestructuringErrors.trailingComma < 0) refDestructuringErrors.trailingComma = this$1.start;
    } else {
      elt = this$1.parseMaybeAssign(false, refDestructuringErrors);
    }
    elts.push(elt);
  }
  return elts;
};

// Parse the next token as an identifier. If `liberal` is true (used
// when parsing properties), it will also convert keywords into
// identifiers.

pp$3.parseIdent = function (liberal) {
  var node = this.startNode();
  if (liberal && this.options.allowReserved == "never") liberal = false;
  if (this.type === tt.name) {
    if (!liberal && (this.strict ? this.reservedWordsStrict : this.reservedWords).test(this.value) && (this.options.ecmaVersion >= 6 || this.input.slice(this.start, this.end).indexOf("\\") == -1)) this.raiseRecoverable(this.start, "The keyword '" + this.value + "' is reserved");
    if (this.inGenerator && this.value === "yield") this.raiseRecoverable(this.start, "Can not use 'yield' as identifier inside a generator");
    if (this.inAsync && this.value === "await") this.raiseRecoverable(this.start, "Can not use 'await' as identifier inside an async function");
    node.name = this.value;
  } else if (liberal && this.type.keyword) {
    node.name = this.type.keyword;
  } else {
    this.unexpected();
  }
  this.next();
  return this.finishNode(node, "Identifier");
};

// Parses yield expression inside generator.

pp$3.parseYield = function () {
  if (!this.yieldPos) this.yieldPos = this.start;

  var node = this.startNode();
  this.next();
  if (this.type == tt.semi || this.canInsertSemicolon() || this.type != tt.star && !this.type.startsExpr) {
    node.delegate = false;
    node.argument = null;
  } else {
    node.delegate = this.eat(tt.star);
    node.argument = this.parseMaybeAssign();
  }
  return this.finishNode(node, "YieldExpression");
};

pp$3.parseAwait = function () {
  if (!this.awaitPos) this.awaitPos = this.start;

  var node = this.startNode();
  this.next();
  node.argument = this.parseMaybeUnary(null, true);
  return this.finishNode(node, "AwaitExpression");
};

var pp$4 = Parser.prototype;

// This function is used to raise exceptions on parse errors. It
// takes an offset integer (into the current `input`) to indicate
// the location of the error, attaches the position to the end
// of the error message, and then raises a `SyntaxError` with that
// message.

pp$4.raise = function (pos, message) {
  var loc = getLineInfo(this.input, pos);
  message += " (" + loc.line + ":" + loc.column + ")";
  var err = new SyntaxError(message);
  err.pos = pos;err.loc = loc;err.raisedAt = this.pos;
  throw err;
};

pp$4.raiseRecoverable = pp$4.raise;

pp$4.curPosition = function () {
  if (this.options.locations) {
    return new Position(this.curLine, this.pos - this.lineStart);
  }
};

var pp$5 = Parser.prototype;

// Object.assign polyfill
var assign = Object.assign || function (target) {
  var sources = [],
      len = arguments.length - 1;
  while (len-- > 0) {
    sources[len] = arguments[len + 1];
  }for (var i = 0; i < sources.length; i++) {
    var source = sources[i];
    for (var key in source) {
      if (has(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};

// The functions in this module keep track of declared variables in the current scope in order to detect duplicate variable names.

pp$5.enterFunctionScope = function () {
  // var: a hash of var-declared names in the current lexical scope
  // lexical: a hash of lexically-declared names in the current lexical scope
  // childVar: a hash of var-declared names in all child lexical scopes of the current lexical scope (within the current function scope)
  // parentLexical: a hash of lexically-declared names in all parent lexical scopes of the current lexical scope (within the current function scope)
  this.scopeStack.push({ var: {}, lexical: {}, childVar: {}, parentLexical: {} });
};

pp$5.exitFunctionScope = function () {
  this.scopeStack.pop();
};

pp$5.enterLexicalScope = function () {
  var parentScope = this.scopeStack[this.scopeStack.length - 1];
  var childScope = { var: {}, lexical: {}, childVar: {}, parentLexical: {} };

  this.scopeStack.push(childScope);
  assign(childScope.parentLexical, parentScope.lexical, parentScope.parentLexical);
};

pp$5.exitLexicalScope = function () {
  var childScope = this.scopeStack.pop();
  var parentScope = this.scopeStack[this.scopeStack.length - 1];

  assign(parentScope.childVar, childScope.var, childScope.childVar);
};

/**
 * A name can be declared with `var` if there are no variables with the same name declared with `let`/`const`
 * in the current lexical scope or any of the parent lexical scopes in this function.
 */
pp$5.canDeclareVarName = function (name) {
  var currentScope = this.scopeStack[this.scopeStack.length - 1];

  return !has(currentScope.lexical, name) && !has(currentScope.parentLexical, name);
};

/**
 * A name can be declared with `let`/`const` if there are no variables with the same name declared with `let`/`const`
 * in the current scope, and there are no variables with the same name declared with `var` in the current scope or in
 * any child lexical scopes in this function.
 */
pp$5.canDeclareLexicalName = function (name) {
  var currentScope = this.scopeStack[this.scopeStack.length - 1];

  return !has(currentScope.lexical, name) && !has(currentScope.var, name) && !has(currentScope.childVar, name);
};

pp$5.declareVarName = function (name) {
  this.scopeStack[this.scopeStack.length - 1].var[name] = true;
};

pp$5.declareLexicalName = function (name) {
  this.scopeStack[this.scopeStack.length - 1].lexical[name] = true;
};

var Node = function Node(parser, pos, loc) {
  this.type = "";
  this.start = pos;
  this.end = 0;
  if (parser.options.locations) this.loc = new SourceLocation(parser, loc);
  if (parser.options.directSourceFile) this.sourceFile = parser.options.directSourceFile;
  if (parser.options.ranges) this.range = [pos, 0];
};

// Start an AST node, attaching a start offset.

var pp$6 = Parser.prototype;

pp$6.startNode = function () {
  return new Node(this, this.start, this.startLoc);
};

pp$6.startNodeAt = function (pos, loc) {
  return new Node(this, pos, loc);
};

// Finish an AST node, adding `type` and `end` properties.

function finishNodeAt(node, type, pos, loc) {
  node.type = type;
  node.end = pos;
  if (this.options.locations) node.loc.end = loc;
  if (this.options.ranges) node.range[1] = pos;
  return node;
}

pp$6.finishNode = function (node, type) {
  return finishNodeAt.call(this, node, type, this.lastTokEnd, this.lastTokEndLoc);
};

// Finish node at given position

pp$6.finishNodeAt = function (node, type, pos, loc) {
  return finishNodeAt.call(this, node, type, pos, loc);
};

// The algorithm used to determine whether a regexp can appear at a
// given point in the program is loosely based on sweet.js' approach.
// See https://github.com/mozilla/sweet.js/wiki/design

var TokContext = function TokContext(token, isExpr, preserveSpace, override, generator) {
  this.token = token;
  this.isExpr = !!isExpr;
  this.preserveSpace = !!preserveSpace;
  this.override = override;
  this.generator = !!generator;
};

var types = {
  b_stat: new TokContext("{", false),
  b_expr: new TokContext("{", true),
  b_tmpl: new TokContext("${", true),
  p_stat: new TokContext("(", false),
  p_expr: new TokContext("(", true),
  q_tmpl: new TokContext("`", true, true, function (p) {
    return p.tryReadTemplateToken();
  }),
  f_expr: new TokContext("function", true),
  f_expr_gen: new TokContext("function", true, false, null, true),
  f_gen: new TokContext("function", false, false, null, true)
};

var pp$7 = Parser.prototype;

pp$7.initialContext = function () {
  return [types.b_stat];
};

pp$7.braceIsBlock = function (prevType) {
  if (prevType === tt.colon) {
    var parent = this.curContext();
    if (parent === types.b_stat || parent === types.b_expr) return !parent.isExpr;
  }
  // The check for `tt.name && exprAllowed` detects whether we are
  // after a `yield` or `of` construct. See the `updateContext` for
  // `tt.name`.
  if (prevType === tt._return || prevType == tt.name && this.exprAllowed) return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
  if (prevType === tt._else || prevType === tt.semi || prevType === tt.eof || prevType === tt.parenR || prevType == tt.arrow) return true;
  if (prevType == tt.braceL) return this.curContext() === types.b_stat;
  if (prevType == tt._var || prevType == tt.name) return false;
  return !this.exprAllowed;
};

pp$7.inGeneratorContext = function () {
  var this$1 = this;

  for (var i = this.context.length - 1; i >= 0; i--) {
    if (this$1.context[i].generator) return true;
  }return false;
};

pp$7.updateContext = function (prevType) {
  var update,
      type = this.type;
  if (type.keyword && prevType == tt.dot) this.exprAllowed = false;else if (update = type.updateContext) update.call(this, prevType);else this.exprAllowed = type.beforeExpr;
};

// Token-specific context update code

tt.parenR.updateContext = tt.braceR.updateContext = function () {
  if (this.context.length == 1) {
    this.exprAllowed = true;
    return;
  }
  var out = this.context.pop(),
      cur;
  if (out === types.b_stat && (cur = this.curContext()) && cur.token === "function") {
    this.context.pop();
    this.exprAllowed = false;
  } else if (out === types.b_tmpl) {
    this.exprAllowed = true;
  } else {
    this.exprAllowed = !out.isExpr;
  }
};

tt.braceL.updateContext = function (prevType) {
  this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
  this.exprAllowed = true;
};

tt.dollarBraceL.updateContext = function () {
  this.context.push(types.b_tmpl);
  this.exprAllowed = true;
};

tt.parenL.updateContext = function (prevType) {
  var statementParens = prevType === tt._if || prevType === tt._for || prevType === tt._with || prevType === tt._while;
  this.context.push(statementParens ? types.p_stat : types.p_expr);
  this.exprAllowed = true;
};

tt.incDec.updateContext = function () {
  // tokExprAllowed stays unchanged
};

tt._function.updateContext = function (prevType) {
  if (prevType.beforeExpr && prevType !== tt.semi && prevType !== tt._else && !((prevType === tt.colon || prevType === tt.braceL) && this.curContext() === types.b_stat)) this.context.push(types.f_expr);
  this.exprAllowed = false;
};

tt.backQuote.updateContext = function () {
  if (this.curContext() === types.q_tmpl) this.context.pop();else this.context.push(types.q_tmpl);
  this.exprAllowed = false;
};

tt.star.updateContext = function (prevType) {
  if (prevType == tt._function) {
    if (this.curContext() === types.f_expr) this.context[this.context.length - 1] = types.f_expr_gen;else this.context.push(types.f_gen);
  }
  this.exprAllowed = true;
};

tt.name.updateContext = function (prevType) {
  var allowed = false;
  if (this.options.ecmaVersion >= 6) {
    if (this.value == "of" && !this.exprAllowed || this.value == "yield" && this.inGeneratorContext()) allowed = true;
  }
  this.exprAllowed = allowed;
};

// Object type used to represent tokens. Note that normally, tokens
// simply exist as properties on the parser object. This is only
// used for the onToken callback and the external tokenizer.

var Token = function Token(p) {
  this.type = p.type;
  this.value = p.value;
  this.start = p.start;
  this.end = p.end;
  if (p.options.locations) this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
  if (p.options.ranges) this.range = [p.start, p.end];
};

// ## Tokenizer

var pp$8 = Parser.prototype;

// Are we running under Rhino?
var isRhino = (typeof Packages === "undefined" ? "undefined" : _typeof(Packages)) == "object" && Object.prototype.toString.call(Packages) == "[object JavaPackage]";

// Move to the next token

pp$8.next = function () {
  if (this.options.onToken) this.options.onToken(new Token(this));

  this.lastTokEnd = this.end;
  this.lastTokStart = this.start;
  this.lastTokEndLoc = this.endLoc;
  this.lastTokStartLoc = this.startLoc;
  this.nextToken();
};

pp$8.getToken = function () {
  this.next();
  return new Token(this);
};

// If we're in an ES6 environment, make parsers iterable
if (typeof Symbol !== "undefined") pp$8[Symbol.iterator] = function () {
  var this$1 = this;

  return {
    next: function next() {
      var token = this$1.getToken();
      return {
        done: token.type === tt.eof,
        value: token
      };
    }
  };
};

// Toggle strict mode. Re-reads the next number or string to please
// pedantic tests (`"use strict"; 010;` should fail).

pp$8.curContext = function () {
  return this.context[this.context.length - 1];
};

// Read a single token, updating the parser object's token-related
// properties.

pp$8.nextToken = function () {
  var curContext = this.curContext();
  if (!curContext || !curContext.preserveSpace) this.skipSpace();

  this.start = this.pos;
  if (this.options.locations) this.startLoc = this.curPosition();
  if (this.pos >= this.input.length) return this.finishToken(tt.eof);

  if (curContext.override) return curContext.override(this);else this.readToken(this.fullCharCodeAtPos());
};

pp$8.readToken = function (code) {
  // Identifier or keyword. '\uXXXX' sequences are allowed in
  // identifiers, so '\' also dispatches to that.
  if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 /* '\' */) return this.readWord();

  return this.getTokenFromCode(code);
};

pp$8.fullCharCodeAtPos = function () {
  var code = this.input.charCodeAt(this.pos);
  if (code <= 0xd7ff || code >= 0xe000) return code;
  var next = this.input.charCodeAt(this.pos + 1);
  return (code << 10) + next - 0x35fdc00;
};

pp$8.skipBlockComment = function () {
  var this$1 = this;

  var startLoc = this.options.onComment && this.curPosition();
  var start = this.pos,
      end = this.input.indexOf("*/", this.pos += 2);
  if (end === -1) this.raise(this.pos - 2, "Unterminated comment");
  this.pos = end + 2;
  if (this.options.locations) {
    lineBreakG.lastIndex = start;
    var match;
    while ((match = lineBreakG.exec(this.input)) && match.index < this.pos) {
      ++this$1.curLine;
      this$1.lineStart = match.index + match[0].length;
    }
  }
  if (this.options.onComment) this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
};

pp$8.skipLineComment = function (startSkip) {
  var this$1 = this;

  var start = this.pos;
  var startLoc = this.options.onComment && this.curPosition();
  var ch = this.input.charCodeAt(this.pos += startSkip);
  while (this.pos < this.input.length && !isNewLine(ch)) {
    ch = this$1.input.charCodeAt(++this$1.pos);
  }
  if (this.options.onComment) this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
};

// Called at the start of the parse and after every token. Skips
// whitespace and comments, and.

pp$8.skipSpace = function () {
  var this$1 = this;

  loop: while (this.pos < this.input.length) {
    var ch = this$1.input.charCodeAt(this$1.pos);
    switch (ch) {
      case 32:case 160:
        // ' '
        ++this$1.pos;
        break;
      case 13:
        if (this$1.input.charCodeAt(this$1.pos + 1) === 10) {
          ++this$1.pos;
        }
      case 10:case 8232:case 8233:
        ++this$1.pos;
        if (this$1.options.locations) {
          ++this$1.curLine;
          this$1.lineStart = this$1.pos;
        }
        break;
      case 47:
        // '/'
        switch (this$1.input.charCodeAt(this$1.pos + 1)) {
          case 42:
            // '*'
            this$1.skipBlockComment();
            break;
          case 47:
            this$1.skipLineComment(2);
            break;
          default:
            break loop;
        }
        break;
      default:
        if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))) {
          ++this$1.pos;
        } else {
          break loop;
        }
    }
  }
};

// Called at the end of every token. Sets `end`, `val`, and
// maintains `context` and `exprAllowed`, and skips the space after
// the token, so that the next one's `start` will point at the
// right position.

pp$8.finishToken = function (type, val) {
  this.end = this.pos;
  if (this.options.locations) this.endLoc = this.curPosition();
  var prevType = this.type;
  this.type = type;
  this.value = val;

  this.updateContext(prevType);
};

// ### Token reading

// This is the function that is called to fetch the next token. It
// is somewhat obscure, because it works in character codes rather
// than characters, and because operator parsing has been inlined
// into it.
//
// All in the name of speed.
//
pp$8.readToken_dot = function () {
  var next = this.input.charCodeAt(this.pos + 1);
  if (next >= 48 && next <= 57) return this.readNumber(true);
  var next2 = this.input.charCodeAt(this.pos + 2);
  if (this.options.ecmaVersion >= 6 && next === 46 && next2 === 46) {
    // 46 = dot '.'
    this.pos += 3;
    return this.finishToken(tt.ellipsis);
  } else {
    ++this.pos;
    return this.finishToken(tt.dot);
  }
};

pp$8.readToken_slash = function () {
  // '/'
  var next = this.input.charCodeAt(this.pos + 1);
  if (this.exprAllowed) {
    ++this.pos;return this.readRegexp();
  }
  if (next === 61) return this.finishOp(tt.assign, 2);
  return this.finishOp(tt.slash, 1);
};

pp$8.readToken_mult_modulo_exp = function (code) {
  // '%*'
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  var tokentype = code === 42 ? tt.star : tt.modulo;

  // exponentiation operator ** and **=
  if (this.options.ecmaVersion >= 7 && next === 42) {
    ++size;
    tokentype = tt.starstar;
    next = this.input.charCodeAt(this.pos + 2);
  }

  if (next === 61) return this.finishOp(tt.assign, size + 1);
  return this.finishOp(tokentype, size);
};

pp$8.readToken_pipe_amp = function (code) {
  // '|&'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) return this.finishOp(code === 124 ? tt.logicalOR : tt.logicalAND, 2);
  if (next === 61) return this.finishOp(tt.assign, 2);
  return this.finishOp(code === 124 ? tt.bitwiseOR : tt.bitwiseAND, 1);
};

pp$8.readToken_caret = function () {
  // '^'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) return this.finishOp(tt.assign, 2);
  return this.finishOp(tt.bitwiseXOR, 1);
};

pp$8.readToken_plus_min = function (code) {
  // '+-'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === code) {
    if (next == 45 && this.input.charCodeAt(this.pos + 2) == 62 && lineBreak.test(this.input.slice(this.lastTokEnd, this.pos))) {
      // A `-->` line comment
      this.skipLineComment(3);
      this.skipSpace();
      return this.nextToken();
    }
    return this.finishOp(tt.incDec, 2);
  }
  if (next === 61) return this.finishOp(tt.assign, 2);
  return this.finishOp(tt.plusMin, 1);
};

pp$8.readToken_lt_gt = function (code) {
  // '<>'
  var next = this.input.charCodeAt(this.pos + 1);
  var size = 1;
  if (next === code) {
    size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
    if (this.input.charCodeAt(this.pos + size) === 61) return this.finishOp(tt.assign, size + 1);
    return this.finishOp(tt.bitShift, size);
  }
  if (next == 33 && code == 60 && this.input.charCodeAt(this.pos + 2) == 45 && this.input.charCodeAt(this.pos + 3) == 45) {
    if (this.inModule) this.unexpected();
    // `<!--`, an XML-style comment that should be interpreted as a line comment
    this.skipLineComment(4);
    this.skipSpace();
    return this.nextToken();
  }
  if (next === 61) size = 2;
  return this.finishOp(tt.relational, size);
};

pp$8.readToken_eq_excl = function (code) {
  // '=!'
  var next = this.input.charCodeAt(this.pos + 1);
  if (next === 61) return this.finishOp(tt.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2);
  if (code === 61 && next === 62 && this.options.ecmaVersion >= 6) {
    // '=>'
    this.pos += 2;
    return this.finishToken(tt.arrow);
  }
  return this.finishOp(code === 61 ? tt.eq : tt.prefix, 1);
};

pp$8.getTokenFromCode = function (code) {
  switch (code) {
    // The interpretation of a dot depends on whether it is followed
    // by a digit or another two dots.
    case 46:
      // '.'
      return this.readToken_dot();

    // Punctuation tokens.
    case 40:
      ++this.pos;return this.finishToken(tt.parenL);
    case 41:
      ++this.pos;return this.finishToken(tt.parenR);
    case 59:
      ++this.pos;return this.finishToken(tt.semi);
    case 44:
      ++this.pos;return this.finishToken(tt.comma);
    case 91:
      ++this.pos;return this.finishToken(tt.bracketL);
    case 93:
      ++this.pos;return this.finishToken(tt.bracketR);
    case 123:
      ++this.pos;return this.finishToken(tt.braceL);
    case 125:
      ++this.pos;return this.finishToken(tt.braceR);
    case 58:
      ++this.pos;return this.finishToken(tt.colon);
    case 63:
      ++this.pos;return this.finishToken(tt.question);

    case 96:
      // '`'
      if (this.options.ecmaVersion < 6) break;
      ++this.pos;
      return this.finishToken(tt.backQuote);

    case 48:
      // '0'
      var next = this.input.charCodeAt(this.pos + 1);
      if (next === 120 || next === 88) return this.readRadixNumber(16); // '0x', '0X' - hex number
      if (this.options.ecmaVersion >= 6) {
        if (next === 111 || next === 79) return this.readRadixNumber(8); // '0o', '0O' - octal number
        if (next === 98 || next === 66) return this.readRadixNumber(2); // '0b', '0B' - binary number
      }
    // Anything else beginning with a digit is an integer, octal
    // number, or float.
    case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:
      // 1-9
      return this.readNumber(false);

    // Quotes produce strings.
    case 34:case 39:
      // '"', "'"
      return this.readString(code);

    // Operators are parsed inline in tiny state machines. '=' (61) is
    // often referred to. `finishOp` simply skips the amount of
    // characters it is given as second argument, and returns a token
    // of the type given by its first argument.

    case 47:
      // '/'
      return this.readToken_slash();

    case 37:case 42:
      // '%*'
      return this.readToken_mult_modulo_exp(code);

    case 124:case 38:
      // '|&'
      return this.readToken_pipe_amp(code);

    case 94:
      // '^'
      return this.readToken_caret();

    case 43:case 45:
      // '+-'
      return this.readToken_plus_min(code);

    case 60:case 62:
      // '<>'
      return this.readToken_lt_gt(code);

    case 61:case 33:
      // '=!'
      return this.readToken_eq_excl(code);

    case 126:
      // '~'
      return this.finishOp(tt.prefix, 1);
  }

  this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
};

pp$8.finishOp = function (type, size) {
  var str = this.input.slice(this.pos, this.pos + size);
  this.pos += size;
  return this.finishToken(type, str);
};

// Parse a regular expression. Some context-awareness is necessary,
// since a '/' inside a '[]' set does not end the expression.

function tryCreateRegexp(src, flags, throwErrorAt, parser) {
  try {
    return new RegExp(src, flags);
  } catch (e) {
    if (throwErrorAt !== undefined) {
      if (e instanceof SyntaxError) parser.raise(throwErrorAt, "Error parsing regular expression: " + e.message);
      throw e;
    }
  }
}

var regexpUnicodeSupport = !!tryCreateRegexp("\uFFFF", "u");

pp$8.readRegexp = function () {
  var this$1 = this;

  var escaped,
      inClass,
      start = this.pos;
  for (;;) {
    if (this$1.pos >= this$1.input.length) this$1.raise(start, "Unterminated regular expression");
    var ch = this$1.input.charAt(this$1.pos);
    if (lineBreak.test(ch)) this$1.raise(start, "Unterminated regular expression");
    if (!escaped) {
      if (ch === "[") inClass = true;else if (ch === "]" && inClass) inClass = false;else if (ch === "/" && !inClass) break;
      escaped = ch === "\\";
    } else escaped = false;
    ++this$1.pos;
  }
  var content = this.input.slice(start, this.pos);
  ++this.pos;
  // Need to use `readWord1` because '\uXXXX' sequences are allowed
  // here (don't ask).
  var mods = this.readWord1();
  var tmp = content,
      tmpFlags = "";
  if (mods) {
    var validFlags = /^[gim]*$/;
    if (this.options.ecmaVersion >= 6) validFlags = /^[gimuy]*$/;
    if (!validFlags.test(mods)) this.raise(start, "Invalid regular expression flag");
    if (mods.indexOf("u") >= 0) {
      if (regexpUnicodeSupport) {
        tmpFlags = "u";
      } else {
        // Replace each astral symbol and every Unicode escape sequence that
        // possibly represents an astral symbol or a paired surrogate with a
        // single ASCII symbol to avoid throwing on regular expressions that
        // are only valid in combination with the `/u` flag.
        // Note: replacing with the ASCII symbol `x` might cause false
        // negatives in unlikely scenarios. For example, `[\u{61}-b]` is a
        // perfectly valid pattern that is equivalent to `[a-b]`, but it would
        // be replaced by `[x-b]` which throws an error.
        tmp = tmp.replace(/\\u\{([0-9a-fA-F]+)\}/g, function (_match, code, offset) {
          code = Number("0x" + code);
          if (code > 0x10FFFF) this$1.raise(start + offset + 3, "Code point out of bounds");
          return "x";
        });
        tmp = tmp.replace(/\\u([a-fA-F0-9]{4})|[\uD800-\uDBFF][\uDC00-\uDFFF]/g, "x");
        tmpFlags = tmpFlags.replace("u", "");
      }
    }
  }
  // Detect invalid regular expressions.
  var value = null;
  // Rhino's regular expression parser is flaky and throws uncatchable exceptions,
  // so don't do detection if we are running under Rhino
  if (!isRhino) {
    tryCreateRegexp(tmp, tmpFlags, start, this);
    // Get a regular expression object for this pattern-flag pair, or `null` in
    // case the current environment doesn't support the flags it uses.
    value = tryCreateRegexp(content, mods);
  }
  return this.finishToken(tt.regexp, { pattern: content, flags: mods, value: value });
};

// Read an integer in the given radix. Return null if zero digits
// were read, the integer value otherwise. When `len` is given, this
// will return `null` unless the integer has exactly `len` digits.

pp$8.readInt = function (radix, len) {
  var this$1 = this;

  var start = this.pos,
      total = 0;
  for (var i = 0, e = len == null ? Infinity : len; i < e; ++i) {
    var code = this$1.input.charCodeAt(this$1.pos),
        val;
    if (code >= 97) val = code - 97 + 10; // a
    else if (code >= 65) val = code - 65 + 10; // A
      else if (code >= 48 && code <= 57) val = code - 48; // 0-9
        else val = Infinity;
    if (val >= radix) break;
    ++this$1.pos;
    total = total * radix + val;
  }
  if (this.pos === start || len != null && this.pos - start !== len) return null;

  return total;
};

pp$8.readRadixNumber = function (radix) {
  this.pos += 2; // 0x
  var val = this.readInt(radix);
  if (val == null) this.raise(this.start + 2, "Expected number in radix " + radix);
  if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.pos, "Identifier directly after number");
  return this.finishToken(tt.num, val);
};

// Read an integer, octal integer, or floating-point number.

pp$8.readNumber = function (startsWithDot) {
  var start = this.pos,
      isFloat = false,
      octal = this.input.charCodeAt(this.pos) === 48;
  if (!startsWithDot && this.readInt(10) === null) this.raise(start, "Invalid number");
  if (octal && this.pos == start + 1) octal = false;
  var next = this.input.charCodeAt(this.pos);
  if (next === 46 && !octal) {
    // '.'
    ++this.pos;
    this.readInt(10);
    isFloat = true;
    next = this.input.charCodeAt(this.pos);
  }
  if ((next === 69 || next === 101) && !octal) {
    // 'eE'
    next = this.input.charCodeAt(++this.pos);
    if (next === 43 || next === 45) ++this.pos; // '+-'
    if (this.readInt(10) === null) this.raise(start, "Invalid number");
    isFloat = true;
  }
  if (isIdentifierStart(this.fullCharCodeAtPos())) this.raise(this.pos, "Identifier directly after number");

  var str = this.input.slice(start, this.pos),
      val;
  if (isFloat) val = parseFloat(str);else if (!octal || str.length === 1) val = parseInt(str, 10);else if (this.strict) this.raise(start, "Invalid number");else if (/[89]/.test(str)) val = parseInt(str, 10);else val = parseInt(str, 8);
  return this.finishToken(tt.num, val);
};

// Read a string value, interpreting backslash-escapes.

pp$8.readCodePoint = function () {
  var ch = this.input.charCodeAt(this.pos),
      code;

  if (ch === 123) {
    // '{'
    if (this.options.ecmaVersion < 6) this.unexpected();
    var codePos = ++this.pos;
    code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
    ++this.pos;
    if (code > 0x10FFFF) this.invalidStringToken(codePos, "Code point out of bounds");
  } else {
    code = this.readHexChar(4);
  }
  return code;
};

function codePointToString(code) {
  // UTF-16 Decoding
  if (code <= 0xFFFF) return String.fromCharCode(code);
  code -= 0x10000;
  return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00);
}

pp$8.readString = function (quote) {
  var this$1 = this;

  var out = "",
      chunkStart = ++this.pos;
  for (;;) {
    if (this$1.pos >= this$1.input.length) this$1.raise(this$1.start, "Unterminated string constant");
    var ch = this$1.input.charCodeAt(this$1.pos);
    if (ch === quote) break;
    if (ch === 92) {
      // '\'
      out += this$1.input.slice(chunkStart, this$1.pos);
      out += this$1.readEscapedChar(false);
      chunkStart = this$1.pos;
    } else {
      if (isNewLine(ch)) this$1.raise(this$1.start, "Unterminated string constant");
      ++this$1.pos;
    }
  }
  out += this.input.slice(chunkStart, this.pos++);
  return this.finishToken(tt.string, out);
};

// Reads template string tokens.

var INVALID_TEMPLATE_ESCAPE_ERROR = {};

pp$8.tryReadTemplateToken = function () {
  this.inTemplateElement = true;
  try {
    this.readTmplToken();
  } catch (err) {
    if (err === INVALID_TEMPLATE_ESCAPE_ERROR) {
      this.readInvalidTemplateToken();
    } else {
      throw err;
    }
  }

  this.inTemplateElement = false;
};

pp$8.invalidStringToken = function (position, message) {
  if (this.inTemplateElement && this.options.ecmaVersion >= 9) {
    throw INVALID_TEMPLATE_ESCAPE_ERROR;
  } else {
    this.raise(position, message);
  }
};

pp$8.readTmplToken = function () {
  var this$1 = this;

  var out = "",
      chunkStart = this.pos;
  for (;;) {
    if (this$1.pos >= this$1.input.length) this$1.raise(this$1.start, "Unterminated template");
    var ch = this$1.input.charCodeAt(this$1.pos);
    if (ch === 96 || ch === 36 && this$1.input.charCodeAt(this$1.pos + 1) === 123) {
      // '`', '${'
      if (this$1.pos === this$1.start && (this$1.type === tt.template || this$1.type === tt.invalidTemplate)) {
        if (ch === 36) {
          this$1.pos += 2;
          return this$1.finishToken(tt.dollarBraceL);
        } else {
          ++this$1.pos;
          return this$1.finishToken(tt.backQuote);
        }
      }
      out += this$1.input.slice(chunkStart, this$1.pos);
      return this$1.finishToken(tt.template, out);
    }
    if (ch === 92) {
      // '\'
      out += this$1.input.slice(chunkStart, this$1.pos);
      out += this$1.readEscapedChar(true);
      chunkStart = this$1.pos;
    } else if (isNewLine(ch)) {
      out += this$1.input.slice(chunkStart, this$1.pos);
      ++this$1.pos;
      switch (ch) {
        case 13:
          if (this$1.input.charCodeAt(this$1.pos) === 10) ++this$1.pos;
        case 10:
          out += "\n";
          break;
        default:
          out += String.fromCharCode(ch);
          break;
      }
      if (this$1.options.locations) {
        ++this$1.curLine;
        this$1.lineStart = this$1.pos;
      }
      chunkStart = this$1.pos;
    } else {
      ++this$1.pos;
    }
  }
};

// Reads a template token to search for the end, without validating any escape sequences
pp$8.readInvalidTemplateToken = function () {
  var this$1 = this;

  for (; this.pos < this.input.length; this.pos++) {
    switch (this$1.input[this$1.pos]) {
      case "\\":
        ++this$1.pos;
        break;

      case "$":
        if (this$1.input[this$1.pos + 1] !== "{") {
          break;
        }
      // falls through

      case "`":
        return this$1.finishToken(tt.invalidTemplate, this$1.input.slice(this$1.start, this$1.pos));

      // no default
    }
  }
  this.raise(this.start, "Unterminated template");
};

// Used to read escaped characters

pp$8.readEscapedChar = function (inTemplate) {
  var ch = this.input.charCodeAt(++this.pos);
  ++this.pos;
  switch (ch) {
    case 110:
      return "\n"; // 'n' -> '\n'
    case 114:
      return "\r"; // 'r' -> '\r'
    case 120:
      return String.fromCharCode(this.readHexChar(2)); // 'x'
    case 117:
      return codePointToString(this.readCodePoint()); // 'u'
    case 116:
      return "\t"; // 't' -> '\t'
    case 98:
      return "\b"; // 'b' -> '\b'
    case 118:
      return "\x0B"; // 'v' -> '\u000b'
    case 102:
      return "\f"; // 'f' -> '\f'
    case 13:
      if (this.input.charCodeAt(this.pos) === 10) ++this.pos; // '\r\n'
    case 10:
      // ' \n'
      if (this.options.locations) {
        this.lineStart = this.pos;++this.curLine;
      }
      return "";
    default:
      if (ch >= 48 && ch <= 55) {
        var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
        var octal = parseInt(octalStr, 8);
        if (octal > 255) {
          octalStr = octalStr.slice(0, -1);
          octal = parseInt(octalStr, 8);
        }
        if (octalStr !== "0" && (this.strict || inTemplate)) {
          this.invalidStringToken(this.pos - 2, "Octal literal in strict mode");
        }
        this.pos += octalStr.length - 1;
        return String.fromCharCode(octal);
      }
      return String.fromCharCode(ch);
  }
};

// Used to read character escape sequences ('\x', '\u', '\U').

pp$8.readHexChar = function (len) {
  var codePos = this.pos;
  var n = this.readInt(16, len);
  if (n === null) this.invalidStringToken(codePos, "Bad character escape sequence");
  return n;
};

// Read an identifier, and return it as a string. Sets `this.containsEsc`
// to whether the word contained a '\u' escape.
//
// Incrementally adds only escaped chars, adding other chunks as-is
// as a micro-optimization.

pp$8.readWord1 = function () {
  var this$1 = this;

  this.containsEsc = false;
  var word = "",
      first = true,
      chunkStart = this.pos;
  var astral = this.options.ecmaVersion >= 6;
  while (this.pos < this.input.length) {
    var ch = this$1.fullCharCodeAtPos();
    if (isIdentifierChar(ch, astral)) {
      this$1.pos += ch <= 0xffff ? 1 : 2;
    } else if (ch === 92) {
      // "\"
      this$1.containsEsc = true;
      word += this$1.input.slice(chunkStart, this$1.pos);
      var escStart = this$1.pos;
      if (this$1.input.charCodeAt(++this$1.pos) != 117) // "u"
        this$1.invalidStringToken(this$1.pos, "Expecting Unicode escape sequence \\uXXXX");
      ++this$1.pos;
      var esc = this$1.readCodePoint();
      if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral)) this$1.invalidStringToken(escStart, "Invalid Unicode escape");
      word += codePointToString(esc);
      chunkStart = this$1.pos;
    } else {
      break;
    }
    first = false;
  }
  return word + this.input.slice(chunkStart, this.pos);
};

// Read an identifier or keyword token. Will check for reserved
// words when necessary.

pp$8.readWord = function () {
  var word = this.readWord1();
  var type = tt.name;
  if (this.keywords.test(word)) {
    if (this.containsEsc) this.raiseRecoverable(this.start, "Escape sequence in keyword " + word);
    type = keywordTypes[word];
  }
  return this.finishToken(type, word);
};

// Acorn is a tiny, fast JavaScript parser written in JavaScript.
//
// Acorn was written by Marijn Haverbeke, Ingvar Stepanyan, and
// various contributors and released under an MIT license.
//
// Git repositories for Acorn are available at
//
//     http://marijnhaverbeke.nl/git/acorn
//     https://github.com/ternjs/acorn.git
//
// Please use the [github bug tracker][ghbt] to report issues.
//
// [ghbt]: https://github.com/ternjs/acorn/issues
//
// This file defines the main parser interface. The library also comes
// with a [error-tolerant parser][dammit] and an
// [abstract syntax tree walker][walk], defined in other files.
//
// [dammit]: acorn_loose.js
// [walk]: util/walk.js

var version = "5.0.3";

// The main exported interface (under `self.acorn` when in the
// browser) is a `parse` function that takes a code string and
// returns an abstract syntax tree as specified by [Mozilla parser
// API][api].
//
// [api]: https://developer.mozilla.org/en-US/docs/SpiderMonkey/Parser_API

function parse(input, options) {
  return new Parser(options, input).parse();
}

// This function tries to parse a single expression at a given
// offset in a string. Useful for parsing mixed-language formats
// that embed JavaScript expressions.

function parseExpressionAt(input, pos, options) {
  var p = new Parser(options, input, pos);
  p.nextToken();
  return p.parseExpression();
}

// Acorn is organized as a tokenizer and a recursive-descent parser.
// The `tokenizer` export provides an interface to the tokenizer.

function tokenizer(input, options) {
  return new Parser(options, input);
}

// This is a terrible kludge to support the existing, pre-ES6
// interface where the loose parser module retroactively adds exports
// to this module.

/* Removed for mscript. */
// export let parse_dammit, LooseParser, pluginsLoose // eslint-disable-line camelcase
// export function addLooseExports(parse, Parser, plugins) {
//   parse_dammit = parse // eslint-disable-line camelcase
//   LooseParser = Parser
//   pluginsLoose = plugins
// }

exports.version = version;
exports.parse = parse;
exports.parseExpressionAt = parseExpressionAt;
exports.tokenizer = tokenizer;
exports.Parser = Parser;
exports.plugins = plugins;
exports.defaultOptions = defaultOptions;
exports.Position = Position;
exports.SourceLocation = SourceLocation;
exports.getLineInfo = getLineInfo;
exports.Node = Node;
exports.TokenType = TokenType;
exports.tokTypes = tt;
exports.keywordTypes = keywordTypes;
exports.TokContext = TokContext;
exports.tokContexts = types;
exports.isIdentifierChar = isIdentifierChar;
exports.isIdentifierStart = isIdentifierStart;
exports.Token = Token;
exports.isNewLine = isNewLine;
exports.lineBreak = lineBreak;
exports.lineBreakG = lineBreakG;
exports.nonASCIIwhitespace = nonASCIIwhitespace;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
 Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>
 Copyright (C) 2012-2014 Yusuke Suzuki <utatane.tea@gmail.com>
 Copyright (C) 2012-2013 Michael Ficarra <escodegen.copyright@michael.ficarra.me>
 Copyright (C) 2012-2013 Mathias Bynens <mathias@qiwi.be>
 Copyright (C) 2013 Irakli Gozalishvili <rfobic@gmail.com>
 Copyright (C) 2012 Robert Gust-Bardon <donate@robert.gust-bardon.org>
 Copyright (C) 2012 John Freeman <jfreeman08@gmail.com>
 Copyright (C) 2011-2012 Ariya Hidayat <ariya.hidayat@gmail.com>
 Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
 Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
 Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright
 notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 notice, this list of conditions and the following disclaimer in the
 documentation and/or other materials provided with the distribution.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
 THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

(function (global) {

    'use strict';

    var isArray, json, renumber, hexadecimal, quotes, escapeless, parentheses, semicolons, safeConcatenation, directive, extra, parse, FORMAT_MINIFY, FORMAT_DEFAULTS;

    var Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        ArrayPattern: 'ArrayPattern',
        ArrowFunctionExpression: 'ArrowFunctionExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ClassBody: 'ClassBody',
        ClassDeclaration: 'ClassDeclaration',
        ClassExpression: 'ClassExpression',
        ComprehensionBlock: 'ComprehensionBlock',
        ComprehensionExpression: 'ComprehensionExpression',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DirectiveStatement: 'DirectiveStatement',
        DoWhileStatement: 'DoWhileStatement',
        DebuggerStatement: 'DebuggerStatement',
        EmptyStatement: 'EmptyStatement',
        ExportBatchSpecifier: 'ExportBatchSpecifier',
        ExportDeclaration: 'ExportDeclaration',
        ExportSpecifier: 'ExportSpecifier',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        ForOfStatement: 'ForOfStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        GeneratorExpression: 'GeneratorExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        ImportSpecifier: 'ImportSpecifier',
        ImportDeclaration: 'ImportDeclaration',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        MethodDefinition: 'MethodDefinition',
        ModuleDeclaration: 'ModuleDeclaration',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        ObjectPattern: 'ObjectPattern',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SpreadElement: 'SpreadElement',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        TaggedTemplateExpression: 'TaggedTemplateExpression',
        TemplateElement: 'TemplateElement',
        TemplateLiteral: 'TemplateLiteral',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement',
        YieldExpression: 'YieldExpression'
    };

    var Precedence = {
        Sequence: 0,
        Yield: 1,
        Assignment: 1,
        Conditional: 2,
        ArrowFunction: 2,
        LogicalOR: 3,
        LogicalAND: 4,
        BitwiseOR: 5,
        BitwiseXOR: 6,
        BitwiseAND: 7,
        Equality: 8,
        Relational: 9,
        BitwiseSHIFT: 10,
        Additive: 11,
        Multiplicative: 12,
        Unary: 13,
        Postfix: 14,
        Call: 15,
        New: 16,
        TaggedTemplate: 17,
        Member: 18,
        Primary: 19
    };

    var BinaryPrecedence = {
        '||': Precedence.LogicalOR,
        '&&': Precedence.LogicalAND,
        '|': Precedence.BitwiseOR,
        '^': Precedence.BitwiseXOR,
        '&': Precedence.BitwiseAND,
        '==': Precedence.Equality,
        '!=': Precedence.Equality,
        '===': Precedence.Equality,
        '!==': Precedence.Equality,
        'is': Precedence.Equality,
        'isnt': Precedence.Equality,
        '<': Precedence.Relational,
        '>': Precedence.Relational,
        '<=': Precedence.Relational,
        '>=': Precedence.Relational,
        'in': Precedence.Relational,
        'instanceof': Precedence.Relational,
        '<<': Precedence.BitwiseSHIFT,
        '>>': Precedence.BitwiseSHIFT,
        '>>>': Precedence.BitwiseSHIFT,
        '+': Precedence.Additive,
        '-': Precedence.Additive,
        '*': Precedence.Multiplicative,
        '%': Precedence.Multiplicative,
        '/': Precedence.Multiplicative
    };

    function getDefaultOptions() {
        // default options
        return {
            indent: null,
            base: null,
            parse: null,
            format: {
                indent: {
                    style: '    ',
                    base: 0
                },
                newline: '\n',
                space: ' ',
                json: false,
                renumber: false,
                hexadecimal: false,
                quotes: 'single',
                escapeless: false,
                compact: false,
                parentheses: true,
                semicolons: true,
                safeConcatenation: false
            },
            directive: false,
            raw: true,
            verbatim: null
        };
    }

    //-------------------------------------------------===------------------------------------------------------
    //                                            Lexical utils
    //-------------------------------------------------===------------------------------------------------------

    //Const
    var NON_ASCII_WHITESPACES = [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF];

    //Regular expressions
    var NON_ASCII_IDENTIFIER_CHARACTERS_REGEXP = new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376' + '\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-' + '\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA' + '\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-' + '\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0\u08A2-\u08AC\u08E4-\u08FE\u0900-' + '\u0963\u0966-\u096F\u0971-\u0977\u0979-\u097F\u0981-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-' + '\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-' + '\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38' + '\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83' + '\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9' + '\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-' + '\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-' + '\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E' + '\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-' + '\u0BEF\u0C01-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D-\u0C44\u0C46-' + '\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0C85-\u0C8C\u0C8E-' + '\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE' + '\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D02\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44' + '\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-' + '\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E01-\u0E3A' + '\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-' + '\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9' + '\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84' + '\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-' + '\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5' + '\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-' + '\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-' + '\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD' + '\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191C\u1920-\u192B' + '\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E' + '\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-' + '\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1D00-\u1DE6\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-' + '\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-' + '\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F' + '\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115' + '\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188' + '\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-' + '\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-' + '\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A' + '\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5' + '\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA697' + '\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA827\uA840-\uA873' + '\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-' + '\uA9D9\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7B\uAA80-\uAAC2\uAADB-\uAADD\uAAE0-' + '\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABEA\uABEC' + '\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-' + '\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D' + '\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74' + '\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-' + '\uFFD7\uFFDA-\uFFDC]');

    //Methods
    function isIdentifierCh(cp) {
        if (cp < 0x80) {
            return cp >= 97 && cp <= 122 || // a..z
            cp >= 65 && cp <= 90 || // A..Z
            cp >= 48 && cp <= 57 || // 0..9
            cp === 36 || cp === 95 || // $ (dollar) and _ (underscore)
            cp === 92; // \ (backslash)
        }

        var ch = String.fromCharCode(cp);

        return NON_ASCII_IDENTIFIER_CHARACTERS_REGEXP.test(ch);
    }

    function isLineTerminator(cp) {
        return cp === 0x0A || cp === 0x0D || cp === 0x2028 || cp === 0x2029;
    }

    function isWhitespace(cp) {
        return cp === 0x20 || cp === 0x09 || isLineTerminator(cp) || cp === 0x0B || cp === 0x0C || cp === 0xA0 || cp >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(cp) >= 0;
    }

    function isDecimalDigit(cp) {
        return cp >= 48 && cp <= 57;
    }

    function stringRepeat(str, num) {
        var result = '';

        for (num |= 0; num > 0; num >>>= 1, str += str) {
            if (num & 1) {
                result += str;
            }
        }

        return result;
    }

    isArray = Array.isArray;
    if (!isArray) {
        isArray = function isArray(array) {
            return Object.prototype.toString.call(array) === '[object Array]';
        };
    }

    function updateDeeply(target, override) {
        var key, val;

        function isHashObject(target) {
            return (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target instanceof Object && !(target instanceof RegExp);
        }

        for (key in override) {
            if (override.hasOwnProperty(key)) {
                val = override[key];
                if (isHashObject(val)) {
                    if (isHashObject(target[key])) {
                        updateDeeply(target[key], val);
                    } else {
                        target[key] = updateDeeply({}, val);
                    }
                } else {
                    target[key] = val;
                }
            }
        }
        return target;
    }

    function generateNumber(value) {
        var result, point, temp, exponent, pos;

        if (value === 1 / 0) {
            return json ? 'null' : renumber ? '1e400' : '1e+400';
        }

        result = '' + value;
        if (!renumber || result.length < 3) {
            return result;
        }

        point = result.indexOf('.');
        //NOTE: 0x30 == '0'
        if (!json && result.charCodeAt(0) === 0x30 && point === 1) {
            point = 0;
            result = result.slice(1);
        }
        temp = result;
        result = result.replace('e+', 'e');
        exponent = 0;
        if ((pos = temp.indexOf('e')) > 0) {
            exponent = +temp.slice(pos + 1);
            temp = temp.slice(0, pos);
        }
        if (point >= 0) {
            exponent -= temp.length - point - 1;
            temp = +(temp.slice(0, point) + temp.slice(point + 1)) + '';
        }
        pos = 0;

        //NOTE: 0x30 == '0'
        while (temp.charCodeAt(temp.length + pos - 1) === 0x30) {
            --pos;
        }
        if (pos !== 0) {
            exponent -= pos;
            temp = temp.slice(0, pos);
        }
        if (exponent !== 0) {
            temp += 'e' + exponent;
        }
        if ((temp.length < result.length || hexadecimal && value > 1e12 && Math.floor(value) === value && (temp = '0x' + value.toString(16)).length < result.length) && +temp === value) {
            result = temp;
        }

        return result;
    }

    // Generate valid RegExp expression.
    // This function is based on https://github.com/Constellation/iv Engine

    function escapeRegExpCharacter(ch, previousIsBackslash) {
        // not handling '\' and handling \u2028 or \u2029 to unicode escape sequence
        if ((ch & ~1) === 0x2028) {
            return (previousIsBackslash ? 'u' : '\\u') + (ch === 0x2028 ? '2028' : '2029');
        } else if (ch === 10 || ch === 13) {
            // \n, \r
            return (previousIsBackslash ? '' : '\\') + (ch === 10 ? 'n' : 'r');
        }
        return String.fromCharCode(ch);
    }

    function generateRegExp(reg) {
        var match, result, flags, i, iz, ch, characterInBrack, previousIsBackslash;

        result = reg.toString();

        if (reg.source) {
            // extract flag from toString result
            match = result.match(/\/([^/]*)$/);
            if (!match) {
                return result;
            }

            flags = match[1];
            result = '';

            characterInBrack = false;
            previousIsBackslash = false;
            for (i = 0, iz = reg.source.length; i < iz; ++i) {
                ch = reg.source.charCodeAt(i);

                if (!previousIsBackslash) {
                    if (characterInBrack) {
                        if (ch === 93) {
                            // ]
                            characterInBrack = false;
                        }
                    } else {
                        if (ch === 47) {
                            // /
                            result += '\\';
                        } else if (ch === 91) {
                            // [
                            characterInBrack = true;
                        }
                    }
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    previousIsBackslash = ch === 92; // \
                } else {
                    // if new RegExp("\\\n') is provided, create /\n/
                    result += escapeRegExpCharacter(ch, previousIsBackslash);
                    // prevent like /\\[/]/
                    previousIsBackslash = false;
                }
            }

            return '/' + result + '/' + flags;
        }

        return result;
    }

    function escapeAllowedCharacter(code, next) {
        var hex,
            result = '\\';

        switch (code) {
            case 0x08:
                // \b
                result += 'b';
                break;
            case 0x0C:
                // \f
                result += 'f';
                break;
            case 0x09:
                // \t
                result += 't';
                break;
            default:
                hex = code.toString(16).toUpperCase();
                if (json || code > 0xFF) {
                    result += 'u' + '0000'.slice(hex.length) + hex;
                } else if (code === 0x0000 && !isDecimalDigit(next)) {
                    result += '0';
                } else if (code === 0x000B) {
                    // \v
                    result += 'x0B';
                } else {
                    result += 'x' + '00'.slice(hex.length) + hex;
                }
                break;
        }

        return result;
    }

    function escapeDisallowedCharacter(code) {
        var result = '\\';
        switch (code) {
            case 0x5C // \
            :
                result += '\\';
                break;
            case 0x0A // \n
            :
                result += 'n';
                break;
            case 0x0D // \r
            :
                result += 'r';
                break;
            case 0x2028:
                result += 'u2028';
                break;
            case 0x2029:
                result += 'u2029';
                break;
        }

        return result;
    }

    function escapeDirective(str) {
        var i, iz, code, quote;

        quote = quotes === 'double' ? '"' : '\'';
        for (i = 0, iz = str.length; i < iz; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27) {
                // '
                quote = '"';
                break;
            } else if (code === 0x22) {
                // "
                quote = '\'';
                break;
            } else if (code === 0x5C) {
                // \
                ++i;
            }
        }

        return quote + str + quote;
    }

    function escapeString(str) {
        var result = '',
            i,
            len,
            code,
            singleQuotes = 0,
            doubleQuotes = 0,
            single,
            quote;
        //TODO http://jsperf.com/character-counting/8
        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27) {
                // '
                ++singleQuotes;
            } else if (code === 0x22) {
                // "
                ++doubleQuotes;
            } else if (code === 0x2F && json) {
                // /
                result += '\\';
            } else if (isLineTerminator(code) || code === 0x5C) {
                // \
                result += escapeDisallowedCharacter(code);
                continue;
            } else if (json && code < 0x20 || // SP
            !(json || escapeless || code >= 0x20 && code <= 0x7E)) {
                // SP, ~
                result += escapeAllowedCharacter(code, str.charCodeAt(i + 1));
                continue;
            }
            result += String.fromCharCode(code);
        }

        single = !(quotes === 'double' || quotes === 'auto' && doubleQuotes < singleQuotes);
        quote = single ? '\'' : '"';

        if (!(single ? singleQuotes : doubleQuotes)) {
            return quote + result + quote;
        }

        str = result;
        result = quote;

        for (i = 0, len = str.length; i < len; ++i) {
            code = str.charCodeAt(i);
            if (code === 0x27 && single || code === 0x22 && !single) {
                // ', "
                result += '\\';
            }
            result += String.fromCharCode(code);
        }

        return result + quote;
    }

    function join(l, r) {
        if (!l.length) return r;

        if (!r.length) return l;

        var lCp = l.charCodeAt(l.length - 1),
            rCp = r.charCodeAt(0);

        if (isIdentifierCh(lCp) && isIdentifierCh(rCp) || lCp === rCp && (lCp === 0x2B || lCp === 0x2D) || // + +, - -
        lCp === 0x2F && rCp === 0x69) {
            // /re/ instanceof foo
            return l + _.space + r;
        } else if (isWhitespace(lCp) || isWhitespace(rCp)) return l + r;

        return l + _.optSpace + r;
    }

    function shiftIndent() {
        var prevIndent = _.indent;

        _.indent += _.indentUnit;
        return prevIndent;
    }

    function adoptionPrefix($stmt) {
        if ($stmt.type === Syntax.BlockStatement) return _.optSpace;

        if ($stmt.type === Syntax.EmptyStatement) return '';

        return _.newline + _.indent + _.indentUnit;
    }

    function adoptionSuffix($stmt) {
        if ($stmt.type === Syntax.BlockStatement) return _.optSpace;

        return _.newline + _.indent;
    }

    //Subentities generators
    function generateVerbatim($expr, flags, ctxPrecedence) {
        var verbatim = $expr[extra.verbatim],
            strVerbatim = typeof verbatim === 'string',
            precedence = !strVerbatim && verbatim.precedence !== void 0 ? verbatim.precedence : Precedence.Sequence,
            parenthesize = precedence < ctxPrecedence,
            content = strVerbatim ? verbatim : verbatim.content,
            chunks = content.split(/\r\n|\n/),
            chunkCount = chunks.length;

        if (parenthesize) _.js += '(';

        _.js += chunks[0];

        for (var i = 1; i < chunkCount; i++) {
            _.js += _.newline + _.indent + chunks[i];
        }if (parenthesize) _.js += ')';
    }

    function generateFunctionParams($node) {
        var $params = $node.params,
            $rest = $node.rest,
            $defaults = $node.defaults,
            paramCount = $params.length,
            lastParamIdx = paramCount - 1,
            hasDefaults = !!$defaults,
            arrowFuncWithSingleParam = $node.type === Syntax.ArrowFunctionExpression && !$rest && (!hasDefaults || $defaults.length === 0) && paramCount === 1 && $params[0].type === Syntax.Identifier;

        //NOTE: arg => { } case
        if (arrowFuncWithSingleParam) _.js += $params[0].name;else {
            _.js += '(';

            for (var i = 0; i < paramCount; ++i) {
                var $param = $params[i];

                if (hasDefaults && $defaults[i]) {
                    var $fakeAssign = {
                        left: $param,
                        right: $defaults[i],
                        operator: '='
                    };

                    ExprGen.AssignmentExpression($fakeAssign, E_TTT, Precedence.Assignment);
                } else {
                    if ($params[i].type === Syntax.Identifier) _.js += $param.name;else ExprGen[$param.type]($param, E_TTT, Precedence.Assignment);
                }

                if (i !== lastParamIdx) _.js += ',' + _.optSpace;
            }

            if ($rest) {
                if (paramCount) _.js += ',' + _.optSpace;

                _.js += '...' + $rest.name;
            }

            _.js += ')';
        }
    }

    function generateFunctionBody($node) {
        var $body = $node.body;

        generateFunctionParams($node);

        if ($node.type === Syntax.ArrowFunctionExpression) _.js += _.optSpace + '=>';

        if ($node.expression) {
            _.js += _.optSpace;

            var exprJs = exprToJs($body, E_TTT, Precedence.Assignment);

            if (exprJs.charAt(0) === '{') exprJs = '(' + exprJs + ')';

            _.js += exprJs;
        } else {
            _.js += adoptionPrefix($body);
            StmtGen[$body.type]($body, S_TTFF);
        }
    }

    function canUseRawLiteral($expr) {
        if ($expr.hasOwnProperty('raw')) {
            try {
                var raw = parse($expr.raw).body[0].expression;

                return raw.type === Syntax.Literal && raw.value === $expr.value;
            } catch (e) {
                //NOTE: not use raw property
            }
        }

        return false;
    }

    //-------------------------------------------------===------------------------------------------------------
    //                                           Generator flags
    //-------------------------------------------------===------------------------------------------------------

    //Flags
    var F_ALLOW_IN = 1,
        F_ALLOW_CALL = 1 << 1,
        F_ALLOW_UNPARATH_NEW = 1 << 2,
        F_FUNC_BODY = 1 << 3,
        F_DIRECTIVE_CTX = 1 << 4,
        F_SEMICOLON_OPT = 1 << 5;

    //Expression flag sets
    //NOTE: Flag order:
    // F_ALLOW_IN
    // F_ALLOW_CALL
    // F_ALLOW_UNPARATH_NEW
    var E_FTT = F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TTF = F_ALLOW_IN | F_ALLOW_CALL,
        E_TTT = F_ALLOW_IN | F_ALLOW_CALL | F_ALLOW_UNPARATH_NEW,
        E_TFF = F_ALLOW_IN,
        E_FFT = F_ALLOW_UNPARATH_NEW,
        E_TFT = F_ALLOW_IN | F_ALLOW_UNPARATH_NEW;

    //Statement flag sets
    //NOTE: Flag order:
    // F_ALLOW_IN
    // F_FUNC_BODY
    // F_DIRECTIVE_CTX
    // F_SEMICOLON_OPT
    var S_TFFF = F_ALLOW_IN,
        S_TFFT = F_ALLOW_IN | F_SEMICOLON_OPT,
        S_FFFF = 0x00,
        S_TFTF = F_ALLOW_IN | F_DIRECTIVE_CTX,
        S_TTFF = F_ALLOW_IN | F_FUNC_BODY;

    //-------------------------------------------------===-------------------------------------------------------
    //                                             Expressions
    //-------------------------------------------------===-------------------------------------------------------

    //Regular expressions
    var FLOATING_OR_OCTAL_REGEXP = /[.eExX]|^0[0-9]+/,
        LAST_DECIMAL_DIGIT_REGEXP = /[0-9]$/;

    //Common expression generators
    function generateLogicalOrBinaryExpression($expr, flags, ctxPrecedence) {
        var op = $expr.operator,
            precedence = BinaryPrecedence[$expr.operator],
            parenthesize = precedence < ctxPrecedence,
            allowIn = flags & F_ALLOW_IN || parenthesize,
            operandFlags = allowIn ? E_TTT : E_FTT,
            exprJs = exprToJs($expr.left, operandFlags, precedence);

        parenthesize |= op === 'in' && !allowIn;

        if (parenthesize) _.js += '(';

        // 0x2F = '/'
        if (exprJs.charCodeAt(exprJs.length - 1) === 0x2F && isIdentifierCh(op.charCodeAt(0))) exprJs = exprJs + _.space + op;else exprJs = join(exprJs, op);

        precedence++;

        var rightJs = exprToJs($expr.right, operandFlags, precedence);

        //NOTE: If '/' concats with '/' or `<` concats with `!--`, it is interpreted as comment start
        if (op === '/' && rightJs.charAt(0) === '/' || op.slice(-1) === '<' && rightJs.slice(0, 3) === '!--') exprJs += _.space + rightJs;else exprJs = join(exprJs, rightJs);

        _.js += exprJs;

        if (parenthesize) _.js += ')';
    }

    function generateArrayPatternOrExpression($expr) {
        var $elems = $expr.elements,
            elemCount = $elems.length;

        if (elemCount) {
            var lastElemIdx = elemCount - 1,
                multiline = elemCount > 1,
                prevIndent = shiftIndent(),
                itemPrefix = _.newline + _.indent;

            _.js += '[';

            for (var i = 0; i < elemCount; i++) {
                var $elem = $elems[i];

                if (multiline) _.js += itemPrefix;

                if ($elem) ExprGen[$elem.type]($elem, E_TTT, Precedence.Assignment);

                if (i !== lastElemIdx || !$elem) _.js += ',';
            }

            _.indent = prevIndent;

            if (multiline) _.js += _.newline + _.indent;

            _.js += ']';
        } else _.js += '[]';
    }

    function generateImportOrExportSpecifier($expr) {
        _.js += $expr.id.name;

        if ($expr.name) _.js += _.space + 'as' + _.space + $expr.name.name;
    }

    function generateGeneratorOrComprehensionExpression($expr) {
        //NOTE: GeneratorExpression should be parenthesized with (...), ComprehensionExpression with [...]
        var $blocks = $expr.blocks,
            $filter = $expr.filter,
            isGenerator = $expr.type === Syntax.GeneratorExpression,
            exprJs = isGenerator ? '(' : '[',
            bodyJs = exprToJs($expr.body, E_TTT, Precedence.Assignment);

        if ($blocks) {
            var prevIndent = shiftIndent(),
                blockCount = $blocks.length;

            for (var i = 0; i < blockCount; ++i) {
                var blockJs = exprToJs($blocks[i], E_TTT, Precedence.Sequence);

                exprJs = i > 0 ? join(exprJs, blockJs) : exprJs + blockJs;
            }

            _.indent = prevIndent;
        }

        if ($filter) {
            var filterJs = exprToJs($filter, E_TTT, Precedence.Sequence);

            exprJs = join(exprJs, 'if' + _.optSpace);
            exprJs = join(exprJs, '(' + filterJs + ')');
        }

        exprJs = join(exprJs, bodyJs);
        exprJs += isGenerator ? ')' : ']';

        _.js += exprJs;
    }

    //Expression raw generator dictionary
    var ExprRawGen = {
        SequenceExpression: function generateSequenceExpression($expr, flags, ctxPrecedence) {
            var $children = $expr.expressions,
                childrenCount = $children.length,
                lastChildIdx = childrenCount - 1,
                parenthesize = Precedence.Sequence < ctxPrecedence,
                allowIn = flags & F_ALLOW_IN || parenthesize,
                exprFlags = allowIn ? E_TTT : E_FTT;

            if (parenthesize) _.js += '(';

            for (var i = 0; i < childrenCount; i++) {
                var $child = $children[i];

                ExprGen[$child.type]($child, exprFlags, Precedence.Assignment);

                if (i !== lastChildIdx) _.js += ',' + _.optSpace;
            }

            if (parenthesize) _.js += ')';
        },

        AssignmentExpression: function generateAssignmentExpression($expr, flags, ctxPrecedence) {
            var $left = $expr.left,
                $right = $expr.right,
                parenthesize = Precedence.Assignment < ctxPrecedence,
                allowIn = flags & F_ALLOW_IN || parenthesize,
                operandFlags = allowIn ? E_TTT : E_FFT;

            if (parenthesize) _.js += '(';

            ExprGen[$left.type]($left, operandFlags, Precedence.Call);
            _.js += _.optSpace + $expr.operator + _.optSpace;
            ExprGen[$right.type]($right, operandFlags, Precedence.Assignment);

            if (parenthesize) _.js += ')';
        },

        ArrowFunctionExpression: function generateArrowFunctionExpression($expr, flags, ctxPrecedence) {
            var parenthesize = Precedence.ArrowFunction < ctxPrecedence;

            if (parenthesize) _.js += '(';

            generateFunctionBody($expr);

            if (parenthesize) _.js += ')';
        },

        ConditionalExpression: function generateConditionalExpression($expr, flags, ctxPrecedence) {
            var $test = $expr.test,
                $conseq = $expr.consequent,
                $alt = $expr.alternate,
                parenthesize = Precedence.Conditional < ctxPrecedence,
                allowIn = flags & F_ALLOW_IN || parenthesize,
                descFlags = allowIn ? E_TTT : E_FFT;

            if (parenthesize) _.js += '(';

            ExprGen[$test.type]($test, descFlags, Precedence.LogicalOR);
            _.js += _.optSpace + '?' + _.optSpace;
            ExprGen[$conseq.type]($conseq, descFlags, Precedence.Assignment);
            _.js += _.optSpace + ':' + _.optSpace;
            ExprGen[$alt.type]($alt, descFlags, Precedence.Assignment);

            if (parenthesize) _.js += ')';
        },

        LogicalExpression: generateLogicalOrBinaryExpression,

        BinaryExpression: generateLogicalOrBinaryExpression,

        CallExpression: function generateCallExpression($expr, flags, ctxPrecedence) {
            var $callee = $expr.callee,
                $args = $expr['arguments'],
                argCount = $args.length,
                lastArgIdx = argCount - 1,
                parenthesize = ~flags & F_ALLOW_CALL || Precedence.Call < ctxPrecedence;

            if (parenthesize) _.js += '(';

            ExprGen[$callee.type]($callee, E_TTF, Precedence.Call);
            _.js += '(';

            for (var i = 0; i < argCount; ++i) {
                var $arg = $args[i];

                ExprGen[$arg.type]($arg, E_TTT, Precedence.Assignment);

                if (i !== lastArgIdx) _.js += ',' + _.optSpace;
            }

            _.js += ')';

            if (parenthesize) _.js += ')';
        },

        NewExpression: function generateNewExpression($expr, flags, ctxPrecedence) {
            var $args = $expr['arguments'],
                parenthesize = Precedence.New < ctxPrecedence,
                argCount = $args.length,
                lastArgIdx = argCount - 1,
                withCall = ~flags & F_ALLOW_UNPARATH_NEW || parentheses || argCount > 0,
                calleeFlags = withCall ? E_TFF : E_TFT,
                calleeJs = exprToJs($expr.callee, calleeFlags, Precedence.New);

            if (parenthesize) _.js += '(';

            _.js += join('new', calleeJs);

            if (withCall) {
                _.js += '(';

                for (var i = 0; i < argCount; ++i) {
                    var $arg = $args[i];

                    ExprGen[$arg.type]($arg, E_TTT, Precedence.Assignment);

                    if (i !== lastArgIdx) _.js += ',' + _.optSpace;
                }

                _.js += ')';
            }

            if (parenthesize) _.js += ')';
        },

        MemberExpression: function generateMemberExpression($expr, flags, ctxPrecedence) {
            var $obj = $expr.object,
                $prop = $expr.property,
                parenthesize = Precedence.Member < ctxPrecedence,
                descFlags = flags & F_ALLOW_CALL ? E_TTF : E_TFF,
                isNumObj = !$expr.computed && $obj.type === Syntax.Literal && typeof $obj.value === 'number';

            if (parenthesize) _.js += '(';

            if (isNumObj) {
                //NOTE: When the following conditions are all true:
                //   1. No floating point
                //   2. Don't have exponents
                //   3. The last character is a decimal digit
                //   4. Not hexadecimal OR octal number literal
                // then we should add a floating point.

                var numJs = exprToJs($obj, descFlags, Precedence.Call),
                    withPoint = LAST_DECIMAL_DIGIT_REGEXP.test(numJs) && !FLOATING_OR_OCTAL_REGEXP.test(numJs);

                _.js += withPoint ? numJs + '.' : numJs;
            } else ExprGen[$obj.type]($obj, descFlags, Precedence.Call);

            if ($expr.computed) {
                _.js += '[';
                ExprGen[$prop.type]($prop, descFlags, Precedence.Sequence);
                _.js += ']';
            } else _.js += '.' + $prop.name;

            if (parenthesize) _.js += ')';
        },

        UnaryExpression: function generateUnaryExpression($expr, flags, ctxPrecedence) {
            var parenthesize = Precedence.Unary < ctxPrecedence,
                op = $expr.operator,
                argJs = exprToJs($expr.argument, E_TTT, Precedence.Unary);

            if (parenthesize) _.js += '(';

            //NOTE: delete, void, typeof
            // get `typeof []`, not `typeof[]`
            if (_.optSpace === '' || op.length > 2) _.js += join(op, argJs);else {
                _.js += op;

                //NOTE: Prevent inserting spaces between operator and argument if it is unnecessary
                // like, `!cond`
                var leftCp = op.charCodeAt(op.length - 1),
                    rightCp = argJs.charCodeAt(0);

                // 0x2B = '+', 0x2D =  '-'
                if (leftCp === rightCp && (leftCp === 0x2B || leftCp === 0x2D) || isIdentifierCh(leftCp) && isIdentifierCh(rightCp)) {
                    _.js += _.space;
                }

                _.js += argJs;
            }

            if (parenthesize) _.js += ')';
        },

        YieldExpression: function generateYieldExpression($expr, flags, ctxPrecedence) {
            var $arg = $expr.argument,
                js = $expr.delegate ? 'yield*' : 'yield',
                parenthesize = Precedence.Yield < ctxPrecedence;

            if (parenthesize) _.js += '(';

            if ($arg) {
                var argJs = exprToJs($arg, E_TTT, Precedence.Assignment);

                js = join(js, argJs);
            }

            _.js += js;

            if (parenthesize) _.js += ')';
        },

        UpdateExpression: function generateUpdateExpression($expr, flags, ctxPrecedence) {
            var $arg = $expr.argument,
                $op = $expr.operator,
                prefix = $expr.prefix,
                precedence = prefix ? Precedence.Unary : Precedence.Postfix,
                parenthesize = precedence < ctxPrecedence;

            if (parenthesize) _.js += '(';

            if (prefix) {
                _.js += $op;
                ExprGen[$arg.type]($arg, E_TTT, Precedence.Postfix);
            } else {
                ExprGen[$arg.type]($arg, E_TTT, Precedence.Postfix);
                _.js += $op;
            }

            if (parenthesize) _.js += ')';
        },

        FunctionExpression: function generateFunctionExpression($expr) {
            var isGenerator = !!$expr.generator;

            _.js += isGenerator ? 'function*' : 'function';

            if ($expr.id) {
                _.js += isGenerator ? _.optSpace : _.space;
                _.js += $expr.id.name;
            } else _.js += _.optSpace;

            generateFunctionBody($expr);
        },

        ExportBatchSpecifier: function generateExportBatchSpecifier() {
            _.js += '*';
        },

        ArrayPattern: generateArrayPatternOrExpression,

        ArrayExpression: generateArrayPatternOrExpression,

        ClassExpression: function generateClassExpression($expr) {
            var $id = $expr.id,
                $super = $expr.superClass,
                $body = $expr.body,
                exprJs = 'class';

            if ($id) {
                var idJs = exprToJs($id, E_TTT);

                exprJs = join(exprJs, idJs);
            }

            if ($super) {
                var superJs = exprToJs($super, E_TTT, Precedence.Assignment);

                superJs = join('extends', superJs);
                exprJs = join(exprJs, superJs);
            }

            _.js += exprJs + _.optSpace;
            StmtGen[$body.type]($body, S_TFFT);
        },

        MethodDefinition: function generateMethodDefinition($expr) {
            var exprJs = $expr['static'] ? 'static' + _.optSpace : '',
                keyJs = exprToJs($expr.key, E_TTT, Precedence.Sequence);

            if ($expr.computed) keyJs = '[' + keyJs + ']';

            if ($expr.kind === 'get' || $expr.kind === 'set') {
                keyJs = join($expr.kind, keyJs);
                _.js += join(exprJs, keyJs);
            } else {
                if ($expr.value.generator) _.js += exprJs + '*' + keyJs;else _.js += join(exprJs, keyJs);
            }

            generateFunctionBody($expr.value);
        },

        Property: function generateProperty($expr) {
            var $val = $expr.value,
                $kind = $expr.kind,
                keyJs = exprToJs($expr.key, E_TTT, Precedence.Sequence);

            if ($expr.computed) keyJs = '[' + keyJs + ']';

            if ($kind === 'get' || $kind === 'set') {
                _.js += $kind + _.space + keyJs;
                generateFunctionBody($val);
            } else {
                if ($expr.shorthand) _.js += keyJs;else if ($expr.method) {
                    _.js += $val.generator ? '*' + keyJs : keyJs;
                    generateFunctionBody($val);
                } else {
                    _.js += keyJs + ':' + _.optSpace;
                    ExprGen[$val.type]($val, E_TTT, Precedence.Assignment);
                }
            }
        },

        ObjectExpression: function generateObjectExpression($expr) {
            var $props = $expr.properties,
                propCount = $props.length;

            if (propCount) {
                var lastPropIdx = propCount - 1,
                    prevIndent = shiftIndent();

                _.js += '{';

                for (var i = 0; i < propCount; i++) {
                    var $prop = $props[i],
                        propType = $prop.type || Syntax.Property;

                    _.js += _.newline + _.indent;
                    ExprGen[propType]($prop, E_TTT, Precedence.Sequence);

                    if (i !== lastPropIdx) _.js += ',';
                }

                _.indent = prevIndent;
                _.js += _.newline + _.indent + '}';
            } else _.js += '{}';
        },

        ObjectPattern: function generateObjectPattern($expr) {
            var $props = $expr.properties,
                propCount = $props.length;

            if (propCount) {
                var lastPropIdx = propCount - 1,
                    multiline = false;

                if (propCount === 1) multiline = $props[0].value.type !== Syntax.Identifier;else {
                    for (var i = 0; i < propCount; i++) {
                        if (!$props[i].shorthand) {
                            multiline = true;
                            break;
                        }
                    }
                }

                _.js += multiline ? '{' + _.newline : '{';

                var prevIndent = shiftIndent(),
                    propSuffix = ',' + (multiline ? _.newline : _.optSpace);

                for (var i = 0; i < propCount; i++) {
                    var $prop = $props[i];

                    if (multiline) _.js += _.indent;

                    ExprGen[$prop.type]($prop, E_TTT, Precedence.Sequence);

                    if (i !== lastPropIdx) _.js += propSuffix;
                }

                _.indent = prevIndent;
                _.js += multiline ? _.newline + _.indent + '}' : '}';
            } else _.js += '{}';
        },

        ThisExpression: function generateThisExpression() {
            _.js += 'this';
        },

        Identifier: function generateIdentifier($expr) {
            _.js += $expr.name;
        },

        ImportSpecifier: generateImportOrExportSpecifier,

        ExportSpecifier: generateImportOrExportSpecifier,

        Literal: function generateLiteral($expr) {
            if (parse && extra.raw && canUseRawLiteral($expr)) _.js += $expr.raw;else if ($expr.value === null) _.js += 'null';else {
                var valueType = _typeof($expr.value);

                if (valueType === 'string') _.js += escapeString($expr.value);else if (valueType === 'number') _.js += generateNumber($expr.value);else if (valueType === 'boolean') _.js += $expr.value ? 'true' : 'false';else _.js += generateRegExp($expr.value);
            }
        },

        GeneratorExpression: generateGeneratorOrComprehensionExpression,

        ComprehensionExpression: generateGeneratorOrComprehensionExpression,

        ComprehensionBlock: function generateComprehensionBlock($expr) {
            var $left = $expr.left,
                leftJs = void 0,
                rightJs = exprToJs($expr.right, E_TTT, Precedence.Sequence);

            if ($left.type === Syntax.VariableDeclaration) leftJs = $left.kind + _.space + stmtToJs($left.declarations[0], S_FFFF);else leftJs = exprToJs($left, E_TTT, Precedence.Call);

            leftJs = join(leftJs, $expr.of ? 'of' : 'in');

            _.js += 'for' + _.optSpace + '(' + join(leftJs, rightJs) + ')';
        },

        SpreadElement: function generateSpreadElement($expr) {
            var $arg = $expr.argument;

            _.js += '...';
            ExprGen[$arg.type]($arg, E_TTT, Precedence.Assignment);
        },

        TaggedTemplateExpression: function generateTaggedTemplateExpression($expr, flags, ctxPrecedence) {
            var $tag = $expr.tag,
                $quasi = $expr.quasi,
                parenthesize = Precedence.TaggedTemplate < ctxPrecedence,
                tagFlags = flags & F_ALLOW_CALL ? E_TTF : E_TFF;

            if (parenthesize) _.js += '(';

            ExprGen[$tag.type]($tag, tagFlags, Precedence.Call);
            ExprGen[$quasi.type]($quasi, E_FFT, Precedence.Primary);

            if (parenthesize) _.js += ')';
        },

        TemplateElement: function generateTemplateElement($expr) {
            //NOTE: Don't use "cooked". Since tagged template can use raw template
            // representation. So if we do so, it breaks the script semantics.
            _.js += $expr.value.raw;
        },

        TemplateLiteral: function generateTemplateLiteral($expr) {
            var $quasis = $expr.quasis,
                $childExprs = $expr.expressions,
                quasiCount = $quasis.length,
                lastQuasiIdx = quasiCount - 1;

            _.js += '`';

            for (var i = 0; i < quasiCount; ++i) {
                var $quasi = $quasis[i];

                ExprGen[$quasi.type]($quasi, E_TTT, Precedence.Primary);

                if (i !== lastQuasiIdx) {
                    var $childExpr = $childExprs[i];

                    _.js += '${' + _.optSpace;
                    ExprGen[$childExpr.type]($childExpr, E_TTT, Precedence.Sequence);
                    _.js += _.optSpace + '}';
                }
            }

            _.js += '`';
        }
    };

    //-------------------------------------------------===------------------------------------------------------
    //                                              Statements
    //-------------------------------------------------===------------------------------------------------------


    //Regular expressions
    var EXPR_STMT_UNALLOWED_EXPR_REGEXP = /^{|^class(?:\s|{)|^function(?:\s|\*|\()/;

    //Common statement generators
    function generateTryStatementHandlers(stmtJs, $finalizer, handlers) {
        var handlerCount = handlers.length,
            lastHandlerIdx = handlerCount - 1;

        for (var i = 0; i < handlerCount; ++i) {
            var handlerJs = stmtToJs(handlers[i], S_TFFF);

            stmtJs = join(stmtJs, handlerJs);

            if ($finalizer || i !== lastHandlerIdx) stmtJs += adoptionSuffix(handlers[i].body);
        }

        return stmtJs;
    }

    function generateForStatementIterator($op, $stmt, flags) {
        var $body = $stmt.body,
            $left = $stmt.left,
            bodySemicolonOptional = !semicolons && flags & F_SEMICOLON_OPT,
            prevIndent1 = shiftIndent(),
            stmtJs = 'for' + _.optSpace + '(';

        if ($left.type === Syntax.VariableDeclaration) {
            var prevIndent2 = shiftIndent();

            stmtJs += $left.kind + _.space + stmtToJs($left.declarations[0], S_FFFF);
            _.indent = prevIndent2;
        } else stmtJs += exprToJs($left, E_TTT, Precedence.Call);

        stmtJs = join(stmtJs, $op);

        var rightJs = exprToJs($stmt.right, E_TTT, Precedence.Sequence);

        stmtJs = join(stmtJs, rightJs) + ')';

        _.indent = prevIndent1;

        _.js += stmtJs + adoptionPrefix($body);
        StmtGen[$body.type]($body, bodySemicolonOptional ? S_TFFT : S_TFFF);
    }

    //Statement generator dictionary
    var StmtRawGen = {
        BlockStatement: function generateBlockStatement($stmt, flags) {
            var $body = $stmt.body,
                len = $body.length,
                lastIdx = len - 1,
                itemsFlags = flags & F_FUNC_BODY ? S_TFTF : S_TFFF,
                prevIndent = shiftIndent();

            _.js += '{' + _.newline;

            for (var i = 0; i < len; i++) {
                var $item = $body[i],
                    itemFlags = itemsFlags;

                if (i === lastIdx) itemFlags |= F_SEMICOLON_OPT;

                _.js += _.indent;
                StmtGen[$item.type]($item, itemFlags);
                _.js += _.newline;
            }

            _.indent = prevIndent;
            _.js += _.indent + '}';
        },

        BreakStatement: function generateBreakStatement($stmt, flags) {
            if ($stmt.label) _.js += 'break ' + $stmt.label.name;else _.js += 'break';

            if (semicolons || ~flags & F_SEMICOLON_OPT) _.js += ';';
        },

        ContinueStatement: function generateContinueStatement($stmt, flags) {
            if ($stmt.label) _.js += 'continue ' + $stmt.label.name;else _.js += 'continue';

            if (semicolons || ~flags & F_SEMICOLON_OPT) _.js += ';';
        },

        ClassBody: function generateClassBody($stmt) {
            var $body = $stmt.body,
                itemCount = $body.length,
                lastItemIdx = itemCount - 1,
                prevIndent = shiftIndent();

            _.js += '{' + _.newline;

            for (var i = 0; i < itemCount; i++) {
                var $item = $body[i],
                    itemType = $item.type || Syntax.Property;

                _.js += _.indent;
                ExprGen[itemType]($item, E_TTT, Precedence.Sequence);

                if (i !== lastItemIdx) _.js += _.newline;
            }

            _.indent = prevIndent;
            _.js += _.newline + _.indent + '}';
        },

        ClassDeclaration: function generateClassDeclaration($stmt) {
            var $body = $stmt.body,
                $super = $stmt.superClass,
                js = 'class ' + $stmt.id.name;

            if ($super) {
                var superJs = exprToJs($super, E_TTT, Precedence.Assignment);

                js += _.space + join('extends', superJs);
            }

            _.js += js + _.optSpace;
            StmtGen[$body.type]($body, S_TFFT);
        },

        DirectiveStatement: function generateDirectiveStatement($stmt, flags) {
            if (extra.raw && $stmt.raw) _.js += $stmt.raw;else _.js += escapeDirective($stmt.directive);

            if (semicolons || ~flags & F_SEMICOLON_OPT) _.js += ';';
        },

        DoWhileStatement: function generateDoWhileStatement($stmt, flags) {
            var $body = $stmt.body,
                $test = $stmt.test,
                bodyJs = adoptionPrefix($body) + stmtToJs($body, S_TFFF) + adoptionSuffix($body);

            //NOTE: Because `do 42 while (cond)` is Syntax Error. We need semicolon.
            var stmtJs = join('do', bodyJs);

            _.js += join(stmtJs, 'while' + _.optSpace + '(');
            ExprGen[$test.type]($test, E_TTT, Precedence.Sequence);
            _.js += ')';

            if (semicolons || ~flags & F_SEMICOLON_OPT) _.js += ';';
        },

        CatchClause: function generateCatchClause($stmt) {
            var $param = $stmt.param,
                $guard = $stmt.guard,
                $body = $stmt.body,
                prevIndent = shiftIndent();

            _.js += 'catch' + _.optSpace + '(';
            ExprGen[$param.type]($param, E_TTT, Precedence.Sequence);

            if ($guard) {
                _.js += ' if ';
                ExprGen[$guard.type]($guard, E_TTT, Precedence.Sequence);
            }

            _.indent = prevIndent;
            _.js += ')' + adoptionPrefix($body);
            StmtGen[$body.type]($body, S_TFFF);
        },

        DebuggerStatement: function generateDebuggerStatement($stmt, flags) {
            _.js += 'debugger';

            if (semicolons || ~flags & F_SEMICOLON_OPT) _.js += ';';
        },

        EmptyStatement: function generateEmptyStatement() {
            _.js += ';';
        },

        ExportDeclaration: function generateExportDeclaration($stmt, flags) {
            var $specs = $stmt.specifiers,
                $decl = $stmt.declaration,
                withSemicolon = semicolons || ~flags & F_SEMICOLON_OPT;

            // export default AssignmentExpression[In] ;
            if ($stmt['default']) {
                var declJs = exprToJs($decl, E_TTT, Precedence.Assignment);

                _.js += join('export default', declJs);

                if (withSemicolon) _.js += ';';
            }

            // export * FromClause ;
            // export ExportClause[NoReference] FromClause ;
            // export ExportClause ;
            else if ($specs) {
                    var stmtJs = 'export';

                    if ($specs.length === 0) stmtJs += _.optSpace + '{' + _.optSpace + '}';else if ($specs[0].type === Syntax.ExportBatchSpecifier) {
                        var specJs = exprToJs($specs[0], E_TTT, Precedence.Sequence);

                        stmtJs = join(stmtJs, specJs);
                    } else {
                        var prevIndent = shiftIndent(),
                            specCount = $specs.length,
                            lastSpecIdx = specCount - 1;

                        stmtJs += _.optSpace + '{';

                        for (var i = 0; i < specCount; ++i) {
                            stmtJs += _.newline + _.indent;
                            stmtJs += exprToJs($specs[i], E_TTT, Precedence.Sequence);

                            if (i !== lastSpecIdx) stmtJs += ',';
                        }

                        _.indent = prevIndent;
                        stmtJs += _.newline + _.indent + '}';
                    }

                    if ($stmt.source) {
                        _.js += join(stmtJs, 'from' + _.optSpace);
                        ExprGen.Literal($stmt.source);
                    } else _.js += stmtJs;

                    if (withSemicolon) _.js += ';';
                }

                // export VariableStatement
                // export Declaration[Default]
                else if ($decl) {
                        var declJs = stmtToJs($decl, withSemicolon ? S_TFFF : S_TFFT);

                        _.js += join('export', declJs);
                    }
        },

        ExpressionStatement: function generateExpressionStatement($stmt, flags) {
            var $expr = $stmt.expression,
                exprJs = exprToJs($expr, E_TTT, Precedence.Sequence),
                parenthesize = EXPR_STMT_UNALLOWED_EXPR_REGEXP.test(exprJs) || directive && flags & F_DIRECTIVE_CTX && $expr.type === Syntax.Literal && typeof $expr.value === 'string';

            //NOTE: '{', 'function', 'class' are not allowed in expression statement.
            // Therefore, they should be parenthesized.
            if (parenthesize) _.js += '(' + exprJs + ')';else _.js += exprJs;

            if (semicolons || ~flags & F_SEMICOLON_OPT) _.js += ';';
        },

        ImportDeclaration: function generateImportDeclaration($stmt, flags) {
            var $specs = $stmt.specifiers,
                stmtJs = 'import',
                specCount = $specs.length;

            //NOTE: If no ImportClause is present,
            // this should be `import ModuleSpecifier` so skip `from`
            // ModuleSpecifier is StringLiteral.
            if (specCount) {
                var hasBinding = !!$specs[0]['default'],
                    firstNamedIdx = hasBinding ? 1 : 0,
                    lastSpecIdx = specCount - 1;

                // ImportedBinding
                if (hasBinding) stmtJs = join(stmtJs, $specs[0].id.name);

                // NamedImports
                if (firstNamedIdx < specCount) {
                    if (hasBinding) stmtJs += ',';

                    stmtJs += _.optSpace + '{';

                    // import { ... } from "...";
                    if (firstNamedIdx === lastSpecIdx) stmtJs += _.optSpace + exprToJs($specs[firstNamedIdx], E_TTT, Precedence.Sequence) + _.optSpace;else {
                        var prevIndent = shiftIndent();

                        // import {
                        //    ...,
                        //    ...,
                        // } from "...";
                        for (var i = firstNamedIdx; i < specCount; i++) {
                            stmtJs += _.newline + _.indent + exprToJs($specs[i], E_TTT, Precedence.Sequence);

                            if (i !== lastSpecIdx) stmtJs += ',';
                        }

                        _.indent = prevIndent;
                        stmtJs += _.newline + _.indent;
                    }

                    stmtJs += '}' + _.optSpace;
                }

                stmtJs = join(stmtJs, 'from');
            }

            _.js += stmtJs + _.optSpace;
            ExprGen.Literal($stmt.source);

            if (semicolons || ~flags & F_SEMICOLON_OPT) _.js += ';';
        },

        VariableDeclarator: function generateVariableDeclarator($stmt, flags) {
            var $id = $stmt.id,
                $init = $stmt.init,
                descFlags = flags & F_ALLOW_IN ? E_TTT : E_FTT;

            if ($init) {
                ExprGen[$id.type]($id, descFlags, Precedence.Assignment);
                _.js += _.optSpace + '=' + _.optSpace;
                ExprGen[$init.type]($init, descFlags, Precedence.Assignment);
            } else {
                if ($id.type === Syntax.Identifier) _.js += $id.name;else ExprGen[$id.type]($id, descFlags, Precedence.Assignment);
            }
        },

        VariableDeclaration: function generateVariableDeclaration($stmt, flags) {
            var $decls = $stmt.declarations,
                len = $decls.length,
                prevIndent = len > 1 ? shiftIndent() : _.indent,
                declFlags = flags & F_ALLOW_IN ? S_TFFF : S_FFFF;

            _.js += $stmt.kind;

            for (var i = 0; i < len; i++) {
                var $decl = $decls[i];

                _.js += i === 0 ? _.space : ',' + _.optSpace;
                StmtGen[$decl.type]($decl, declFlags);
            }

            if (semicolons || ~flags & F_SEMICOLON_OPT) _.js += ';';

            _.indent = prevIndent;
        },

        ThrowStatement: function generateThrowStatement($stmt, flags) {
            var argJs = exprToJs($stmt.argument, E_TTT, Precedence.Sequence);

            _.js += join('throw', argJs);

            if (semicolons || ~flags & F_SEMICOLON_OPT) _.js += ';';
        },

        TryStatement: function generateTryStatement($stmt) {
            var $block = $stmt.block,
                $finalizer = $stmt.finalizer,
                stmtJs = 'try' + adoptionPrefix($block) + stmtToJs($block, S_TFFF) + adoptionSuffix($block);

            var $handlers = $stmt.handlers || $stmt.guardedHandlers;

            if ($handlers) stmtJs = generateTryStatementHandlers(stmtJs, $finalizer, $handlers);

            if ($stmt.handler) {
                $handlers = isArray($stmt.handler) ? $stmt.handler : [$stmt.handler];
                stmtJs = generateTryStatementHandlers(stmtJs, $finalizer, $handlers);
            }

            if ($finalizer) {
                stmtJs = join(stmtJs, 'finally' + adoptionPrefix($finalizer));
                stmtJs += stmtToJs($finalizer, S_TFFF);
            }

            _.js += stmtJs;
        },

        SwitchStatement: function generateSwitchStatement($stmt) {
            var $cases = $stmt.cases,
                $discr = $stmt.discriminant,
                prevIndent = shiftIndent();

            _.js += 'switch' + _.optSpace + '(';
            ExprGen[$discr.type]($discr, E_TTT, Precedence.Sequence);
            _.js += ')' + _.optSpace + '{' + _.newline;
            _.indent = prevIndent;

            if ($cases) {
                var caseCount = $cases.length,
                    lastCaseIdx = caseCount - 1;

                for (var i = 0; i < caseCount; i++) {
                    var $case = $cases[i];

                    _.js += _.indent;
                    StmtGen[$case.type]($case, i === lastCaseIdx ? S_TFFT : S_TFFF);
                    _.js += _.newline;
                }
            }

            _.js += _.indent + '}';
        },

        SwitchCase: function generateSwitchCase($stmt, flags) {
            var $conseqs = $stmt.consequent,
                $firstConseq = $conseqs[0],
                $test = $stmt.test,
                i = 0,
                conseqSemicolonOptional = !semicolons && flags & F_SEMICOLON_OPT,
                conseqCount = $conseqs.length,
                lastConseqIdx = conseqCount - 1,
                prevIndent = shiftIndent();

            if ($test) {
                var testJs = exprToJs($test, E_TTT, Precedence.Sequence);

                _.js += join('case', testJs) + ':';
            } else _.js += 'default:';

            if (conseqCount && $firstConseq.type === Syntax.BlockStatement) {
                i++;
                _.js += adoptionPrefix($firstConseq);
                StmtGen[$firstConseq.type]($firstConseq, S_TFFF);
            }

            for (; i < conseqCount; i++) {
                var $conseq = $conseqs[i],
                    semicolonOptional = i === lastConseqIdx && conseqSemicolonOptional;

                _.js += _.newline + _.indent;
                StmtGen[$conseq.type]($conseq, semicolonOptional ? S_TFFT : S_TFFF);
            }

            _.indent = prevIndent;
        },

        IfStatement: function generateIfStatement($stmt, flags) {
            var $alt = $stmt.alternate,
                $conseq = $stmt.consequent,
                $test = $stmt.test,
                prevIndent = shiftIndent(),
                semicolonOptional = !semicolons && flags & F_SEMICOLON_OPT;

            _.js += 'if' + _.optSpace + '(';
            ExprGen[$test.type]($test, E_TTT, Precedence.Sequence);
            _.js += ')';
            _.indent = prevIndent;
            _.js += adoptionPrefix($conseq);

            if ($alt) {
                var conseq = stmtToJs($conseq, S_TFFF) + adoptionSuffix($conseq),
                    alt = stmtToJs($alt, semicolonOptional ? S_TFFT : S_TFFF);

                if ($alt.type === Syntax.IfStatement) alt = 'else ' + alt;else alt = join('else', adoptionPrefix($alt) + alt);

                _.js += join(conseq, alt);
            } else StmtGen[$conseq.type]($conseq, semicolonOptional ? S_TFFT : S_TFFF);
        },

        ForStatement: function generateForStatement($stmt, flags) {
            var $init = $stmt.init,
                $test = $stmt.test,
                $body = $stmt.body,
                $update = $stmt.update,
                bodySemicolonOptional = !semicolons && flags & F_SEMICOLON_OPT,
                prevIndent = shiftIndent();

            _.js += 'for' + _.optSpace + '(';

            if ($init) {
                if ($init.type === Syntax.VariableDeclaration) StmtGen[$init.type]($init, S_FFFF);else {
                    ExprGen[$init.type]($init, E_FTT, Precedence.Sequence);
                    _.js += ';';
                }
            } else _.js += ';';

            if ($test) {
                _.js += _.optSpace;
                ExprGen[$test.type]($test, E_TTT, Precedence.Sequence);
            }

            _.js += ';';

            if ($update) {
                _.js += _.optSpace;
                ExprGen[$update.type]($update, E_TTT, Precedence.Sequence);
            }

            _.js += ')';
            _.indent = prevIndent;
            _.js += adoptionPrefix($body);
            StmtGen[$body.type]($body, bodySemicolonOptional ? S_TFFT : S_TFFF);
        },

        ForInStatement: function generateForInStatement($stmt, flags) {
            generateForStatementIterator('in', $stmt, flags);
        },

        ForOfStatement: function generateForOfStatement($stmt, flags) {
            generateForStatementIterator('of', $stmt, flags);
        },

        LabeledStatement: function generateLabeledStatement($stmt, flags) {
            var $body = $stmt.body,
                bodySemicolonOptional = !semicolons && flags & F_SEMICOLON_OPT,
                prevIndent = _.indent;

            _.js += $stmt.label.name + ':' + adoptionPrefix($body);

            if ($body.type !== Syntax.BlockStatement) prevIndent = shiftIndent();

            StmtGen[$body.type]($body, bodySemicolonOptional ? S_TFFT : S_TFFF);
            _.indent = prevIndent;
        },

        ModuleDeclaration: function generateModuleDeclaration($stmt, flags) {
            _.js += 'module' + _.space + $stmt.id.name + _.space + 'from' + _.optSpace;

            ExprGen.Literal($stmt.source);

            if (semicolons || ~flags & F_SEMICOLON_OPT) _.js += ';';
        },

        Program: function generateProgram($stmt) {
            var $body = $stmt.body,
                len = $body.length,
                lastIdx = len - 1;

            if (safeConcatenation && len > 0) _.js += '\n';

            for (var i = 0; i < len; i++) {
                var $item = $body[i],
                    itemFlags = S_TFTF;

                if (!safeConcatenation && i === lastIdx) itemFlags |= F_SEMICOLON_OPT;

                _.js += _.indent;
                StmtGen[$item.type]($item, itemFlags);

                if (i !== lastIdx) _.js += _.newline;
            }
        },

        FunctionDeclaration: function generateFunctionDeclaration($stmt) {
            var isGenerator = !!$stmt.generator;

            _.js += isGenerator ? 'function*' + _.optSpace : 'function' + _.space;
            _.js += $stmt.id.name;
            generateFunctionBody($stmt);
        },

        ReturnStatement: function generateReturnStatement($stmt, flags) {
            var $arg = $stmt.argument;

            if ($arg) {
                var argJs = exprToJs($arg, E_TTT, Precedence.Sequence);

                _.js += join('return', argJs);
            } else _.js += 'return';

            if (semicolons || ~flags & F_SEMICOLON_OPT) _.js += ';';
        },

        WhileStatement: function generateWhileStatement($stmt, flags) {
            var $body = $stmt.body,
                $test = $stmt.test,
                bodySemicolonOptional = !semicolons && flags & F_SEMICOLON_OPT,
                prevIndent = shiftIndent();

            _.js += 'while' + _.optSpace + '(';
            ExprGen[$test.type]($test, E_TTT, Precedence.Sequence);
            _.js += ')';
            _.indent = prevIndent;

            _.js += adoptionPrefix($body);
            StmtGen[$body.type]($body, bodySemicolonOptional ? S_TFFT : S_TFFF);
        },

        WithStatement: function generateWithStatement($stmt, flags) {
            var $body = $stmt.body,
                $obj = $stmt.object,
                bodySemicolonOptional = !semicolons && flags & F_SEMICOLON_OPT,
                prevIndent = shiftIndent();

            _.js += 'with' + _.optSpace + '(';
            ExprGen[$obj.type]($obj, E_TTT, Precedence.Sequence);
            _.js += ')';
            _.indent = prevIndent;
            _.js += adoptionPrefix($body);
            StmtGen[$body.type]($body, bodySemicolonOptional ? S_TFFT : S_TFFF);
        }
    };

    function generateStatement($stmt, option) {
        StmtGen[$stmt.type]($stmt, option);
    }

    //CodeGen
    //-----------------------------------------------------------------------------------
    function exprToJs($expr, flags, ctxPrecedence) {
        var savedJs = _.js;
        _.js = '';

        ExprGen[$expr.type]($expr, flags, ctxPrecedence);

        var src = _.js;
        _.js = savedJs;

        return src;
    }

    function stmtToJs($stmt, flags) {
        var savedJs = _.js;
        _.js = '';

        StmtGen[$stmt.type]($stmt, flags);

        var src = _.js;
        _.js = savedJs;

        return src;
    }

    function run($node) {
        _.js = '';

        if (StmtGen[$node.type]) StmtGen[$node.type]($node, S_TFFF);else ExprGen[$node.type]($node, E_TTF, Precedence.Sequence);

        return _.js;
    }

    function wrapExprGen(gen) {
        return function ($expr, flags, ctxPrecedence) {
            if (extra.verbatim && $expr.hasOwnProperty(extra.verbatim)) generateVerbatim($expr, flags, ctxPrecedence);else gen($expr, flags);
        };
    }

    function createExprGenWithExtras() {
        var gens = {};

        for (var key in ExprRawGen) {
            if (ExprRawGen.hasOwnProperty(key)) gens[key] = wrapExprGen(ExprRawGen[key]);
        }

        return gens;
    }

    //Strings
    var _ = {
        js: '',
        newline: '\n',
        optSpace: ' ',
        space: ' ',
        indentUnit: '    ',
        indent: ''
    };

    //Generators
    var ExprGen = void 0,
        StmtGen = StmtRawGen;

    function generate($node, options) {
        var defaultOptions = getDefaultOptions(),
            result,
            pair;

        if (options != null) {
            //NOTE: Obsolete options
            //
            //   `options.indent`
            //   `options.base`
            //
            // Instead of them, we can use `option.format.indent`.
            if (typeof options.indent === 'string') {
                defaultOptions.format.indent.style = options.indent;
            }
            if (typeof options.base === 'number') {
                defaultOptions.format.indent.base = options.base;
            }
            options = updateDeeply(defaultOptions, options);
            _.indentUnit = options.format.indent.style;
            if (typeof options.base === 'string') {
                _.indent = options.base;
            } else {
                _.indent = stringRepeat(_.indentUnit, options.format.indent.base);
            }
        } else {
            options = defaultOptions;
            _.indentUnit = options.format.indent.style;
            _.indent = stringRepeat(_.indentUnit, options.format.indent.base);
        }
        json = options.format.json;
        renumber = options.format.renumber;
        hexadecimal = json ? false : options.format.hexadecimal;
        quotes = json ? 'double' : options.format.quotes;
        escapeless = options.format.escapeless;

        _.newline = options.format.newline;
        _.optSpace = options.format.space;

        if (options.format.compact) _.newline = _.optSpace = _.indentUnit = _.indent = '';

        _.space = _.optSpace ? _.optSpace : ' ';
        parentheses = options.format.parentheses;
        semicolons = options.format.semicolons;
        safeConcatenation = options.format.safeConcatenation;
        directive = options.directive;
        parse = json ? null : options.parse;
        extra = options;

        if (extra.verbatim) ExprGen = createExprGenWithExtras();else ExprGen = ExprRawGen;

        return run($node);
    }

    FORMAT_MINIFY = {
        indent: {
            style: '',
            base: 0
        },
        renumber: true,
        hexadecimal: true,
        quotes: 'auto',
        escapeless: true,
        compact: true,
        parentheses: false,
        semicolons: false
    };

    var esotope = {
        generate: generate,
        Precedence: updateDeeply({}, Precedence),
        browser: false,
        FORMAT_MINIFY: FORMAT_MINIFY,
        FORMAT_DEFAULTS: getDefaultOptions().format
    };

    //Node
    if (typeof module !== 'undefined' && module.exports) module.exports = esotope;

    //RequireJS
    else if (true) {
            esotope.browser = true;

            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
                return esotope;
            }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
        } else {
            esotope.browser = true;
            global.esotope = esotope;
        }
})(undefined);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);
var entities_1 = __webpack_require__(4);

var Interpreter = function () {
    function Interpreter(ast) {
        _classCallCheck(this, Interpreter);

        this.counter = 0;
        this.result = node_1.default.program();
        this.input = ast;
        this.makeGettable = true;
        this.functionWrap = true;
        this.stack = [{
            identifiers: [],
            entity: new entities_1.ObjectEntity(),
            body: [this.result.body],
            expression: []
        }];
        this.transformStack = {
            rotate: [],
            translate: []
        };
    }
    // Compile kicks off the interpreter.  Iterate over each node in the input
    // body, compile it and add result to the output.


    _createClass(Interpreter, [{
        key: "compile",
        value: function compile() {
            var _this = this;

            this.input.body.forEach(function (n) {
                _this.compileNode(n);
            });
            return this.result;
        }
    }, {
        key: "compileNode",
        value: function compileNode(node) {
            switch (node.type) {
                case 'ArrowFunctionExpression':
                    this.arrowFunctionExpression(node);
                    break;
                case 'BlockStatement':
                    this.blockStatement(node);
                    break;
                case 'CommandStatement':
                    this.commandStatement(node);
                    break;
                case 'ExpressionStatement':
                    this.expressionStatement(node);
                    break;
                case 'ForStatement':
                    this.forStatement(node);
                    break;
                case 'FunctionDeclaration':
                    this.functionDeclaration(node);
                    break;
                case 'IfStatement':
                    this.ifStatement(node);
                    break;
                case 'ReturnStatement':
                    this.returnStatement(node);
                    break;
                case 'VariableDeclaration':
                    this.variableDeclaration(node);
                    break;
                default:
            }
        }
        /** Search the stack for the entity that will accept the given entity. */

    }, {
        key: "accept",
        value: function accept(entity, node) {
            for (var i = this.stack.length; --i >= 0;) {
                if (this.stack[i].entity === null) continue;
                var acceptor = this.stack[i].entity.accept(entity, node);
                if (acceptor) return acceptor;
            }
            return null;
        }
    }, {
        key: "append",
        value: function append(node) {
            if (node) {
                var scope = this.top();
                scope.body[scope.body.length - 1].push(node);
            }
        }
        /** Arrow functions are not appended as they are return by walkExpression()*/

    }, {
        key: "arrowFunctionExpression",
        value: function arrowFunctionExpression(node) {
            var block = node_1.default.blockStatement();
            this.enterScope({
                identifiers: [],
                entity: null,
                body: [block.body],
                expression: []
            });
            this.compileNode(node.body);
            this.closeScope();
            node.body = block;
        }
        /**
        Iterate over nodes in a block.  Some nodes can be modified in place, others
        must be removed and a replacement spliced in.
        */

    }, {
        key: "blockStatement",
        value: function blockStatement(block) {
            var _this2 = this;

            block.body.forEach(function (n) {
                _this2.compileNode(n);
            });
        }
    }, {
        key: "commandStatement",
        value: function commandStatement(command) {
            var details = Interpreter.analyzeCommand(command);
            switch (details.name) {
                case 'array':
                    this.array(command);
                    break;
                case 'box':
                    this.box(command);
                    break;
                case 'component':
                    this.component(command);
                    break;
                case 'group':
                    this.group(command, details);
                    break;
                case 'meta':
                    this.meta(command, details);
                    break;
                case 'param':
                    this.param(command);
                    break;
                case 'rotate':
                    this.rotate(command);
                    break;
                case 'translate':
                    this.translate(command);
                    break;
                default:
                    this.defaultCommand(command);
            }
        }
    }, {
        key: "array",
        value: function array(command) {
            var node = node_1.default.functionExpression(null, []);
            var entity = Interpreter.entity(command);
            this.stack.push({ identifiers: [], entity: entity, body: [node.body.body], expression: [] });
            this.append(node_1.default.variableDeclaration('var', [node_1.default.variableDeclarator(node_1.default.identifier('arr'), node_1.default.arrayExpression())]));
            this.compileNode(command.body);
            this.append(node_1.default.returnStatement(node_1.default.identifier('arr')));
            this.stack.pop();
            this.append(this.accept(entity, node));
        }
    }, {
        key: "box",
        value: function box(command) {
            Object.defineProperty(command.id, 'referenceType', { value: 'geometry' });
            this.pushId(command.id);
            this.append(node_1.default.variableDeclaration('var', [node_1.default.variableDeclarator(command.id, node_1.default.callExpression('box', [this.generateOptionsObject(command)]))]));
        }
    }, {
        key: "component",
        value: function component(command) {
            var entity = Interpreter.entity(command);
            var options = this.generateOptionsObject(command);
            // If there are transorms on the stack, include them here
            if (this.transformStack.rotate.length || this.transformStack.translate.length) {
                options.properties.push(Interpreter.makeTransformProperty(this.transformStack));
            }
            var call = node_1.default.callExpression('component', [options]);
            if (command.id) {
                Object.defineProperty(command.id, 'referenceType', { value: 'component' });
                this.pushId(command.id);
                this.append(node_1.default.variableDeclaration('var', [node_1.default.variableDeclarator(command.id, call)]));
                this.append(this.accept(entity));
            } else {
                this.append(this.accept(entity, call));
            }
            if (command.body) {
                var scope = node_1.default.functionExpression(null, []);
                this.enterScope({ identifiers: [], entity: entity, body: [scope.body.body], expression: [] });
                this.compileNode(command.body);
                this.closeScope();
                this.append(node_1.default.expressionStatement(node_1.default.callExpression(scope)));
            }
        }
        /**
        Command Statement
        */

    }, {
        key: "defaultCommand",
        value: function defaultCommand(command) {
            // var call = Node.callExpression(
            //   Node.identifier(command.name.name),
            //   [this.generateOptionsObject(command)]
            // )
            this.append(node_1.default.variableDeclaration('var', [node_1.default.variableDeclarator(node_1.default.identifier(command.id || '_' + this.counter++), node_1.default.callExpression(node_1.default.identifier(command.name.name), [this.generateOptionsObject(command)]))]));
        }
    }, {
        key: "expressionStatement",
        value: function expressionStatement(node) {
            node.expression = this.walkExpression(node.expression);
            this.append(node);
        }
    }, {
        key: "forStatement",
        value: function forStatement(node) {
            node.test = this.walkExpression(node.test);
            var block = node_1.default.blockStatement();
            this.top().body.push(block.body);
            this.compileNode(node.body);
            this.top().body.pop();
            node.body = block;
            this.append(node);
        }
    }, {
        key: "findIdentifier",
        value: function findIdentifier(name) {
            var result,
                id,
                _break = false;
            for (var i = this.stack.length; --i >= 0 && !_break;) {
                for (var j = this.stack[i].identifiers.length; --j >= 0;) {
                    id = this.stack[i].identifiers[j];
                    if (id.name === name) {
                        result = id;
                        _break = true;
                        break;
                    }
                }
            }
            return result;
        }
    }, {
        key: "functionDeclaration",
        value: function functionDeclaration(node) {
            Object.defineProperty(node.id, 'referenceType', { value: 'function' });
            this.pushId(node.id);
            var block = node_1.default.blockStatement();
            this.enterScope({ identifiers: [], entity: null, body: [block.body], expression: [] });
            this.compileNode(node.body);
            this.closeScope();
            node.body = block;
            this.append(node);
        }
        /**
        Generate an object expression from the labeled statements in a command body.
        Shift the labeled statements from the front so the proper body is left behind.
        */

    }, {
        key: "generateOptionsObject",
        value: function generateOptionsObject(command) {
            var properties = [];
            var current = command.body.body[0].type === 'LabeledStatement' ? command.body.body.shift() : null;
            while (current) {
                var key = current.label;
                var value = this.walkExpression(current.body.expression);
                if (value.wrapInFunction) {
                    value = node_1.default.arrowFunctionExpression([], value);
                    // this.isGettable = false
                }
                properties.push(node_1.default.property(key, value));
                if (command.body.body.length) {
                    current = command.body.body[0].type === 'LabeledStatement' ? command.body.body.shift() : null;
                } else {
                    current = null;
                    command.body = null;
                }
            }
            return node_1.default.objectExpression(properties);
        }
    }, {
        key: "group",
        value: function group(command, details) {
            var entity = Interpreter.entity(command);
            this.makeGettable = false;
            this.functionWrap = false;
            var call = node_1.default.callExpression('group', [this.generateOptionsObject(command)]);
            this.makeGettable = true;
            this.functionWrap = true;
            var scope;
            if (command.id) {
                Object.defineProperty(command.id, 'referenceType', { value: 'group' });
                this.pushId(command.id);
                this.append(node_1.default.variableDeclaration('var', [node_1.default.variableDeclarator(command.id, call)]));
                this.append(this.accept(entity));
            } else {
                var id = command.name.name + '_' + this.stack.length;
                scope = node_1.default.functionExpression(null, []);
                entity.id = id;
                command.id = node_1.default.identifier(id);
                Object.defineProperty(command.id, 'referenceType', { value: 'group' });
                this.pushId(command.id);
                scope.body.body.push(node_1.default.variableDeclaration('var', [node_1.default.variableDeclarator(command.id, call)]));
                scope.body.body.push(this.accept(entity));
            }
            if (command.body) {
                scope = scope || node_1.default.functionExpression(null, []);
                this.enterScope({ identifiers: [], entity: entity, body: [scope.body.body], expression: [] });
                this.compileNode(command.body);
                this.closeScope();
            }
            if (scope) {
                this.append(node_1.default.expressionStatement(node_1.default.callExpression(scope)));
            }
        }
    }, {
        key: "ifStatement",
        value: function ifStatement(node, parent) {
            node.test = this.walkExpression(node.test);
            var consequent = node_1.default.blockStatement();
            this.top().body.push(consequent.body);
            this.compileNode(node.consequent);
            this.top().body.pop();
            node.consequent = consequent;
            if (node.alternate) {
                if (node.alternate.type === 'BlockStatement') {
                    var alternate = node_1.default.blockStatement();
                    this.top().body.push(alternate.body);
                    this.compileNode(node.alternate);
                    this.top().body.pop();
                    node.alternate = alternate;
                } else {
                    this.ifStatement(node.alternate, node);
                }
            }
            if (!parent) {
                this.append(node);
            } else {
                parent.alternate = node;
            }
        }
    }, {
        key: "makeTransform",
        value: function makeTransform() {
            return node_1.default.objectExpression([node_1.default.property(node_1.default.identifier('rotate'), node_1.default.arrayExpression(this.transformStack.rotate.slice(0))), node_1.default.property(node_1.default.identifier('translate'), node_1.default.arrayExpression(this.transformStack.translate.slice(0)))]);
        }
    }, {
        key: "meta",
        value: function meta(command, details) {
            var _this3 = this;

            details.options.forEach(function (option) {
                _this3.append(node_1.default.expressionStatement(node_1.default.assignmentExpression(node_1.default.memberExpression(node_1.default.identifier('object'), node_1.default.identifier(option.label.name)), '=', _this3.walkExpression(option.body.expression))));
            });
        }
    }, {
        key: "returnStatement",
        value: function returnStatement(node) {
            node.argument = this.walkExpression(node.argument);
            this.append(node);
        }
    }, {
        key: "variableDeclaration",
        value: function variableDeclaration(node) {
            var _this4 = this;

            node.declarations.forEach(function (dec) {
                _this4.pushId(dec.id);
            });
            this.append(node);
        }
    }, {
        key: "enterScope",
        value: function enterScope(scope) {
            this.stack.push(scope);
        }
    }, {
        key: "closeScope",
        value: function closeScope() {
            return this.stack.pop();
        }
    }, {
        key: "param",
        value: function param(command) {
            var options = this.generateOptionsObject(command);
            // Params also need to have their identifier included as one of their
            // options.
            if (command.id) {
                options.properties.push(node_1.default.property(node_1.default.identifier('identifier'), node_1.default.literal(command.id.name)));
            }
            var call = node_1.default.callExpression('param', [options]);
            var entity = Interpreter.entity(command);
            if (command.id) {
                Object.defineProperty(command.id, 'referenceType', { value: 'param' });
                this.pushId(command.id);
                this.append(node_1.default.variableDeclaration('var', [node_1.default.variableDeclarator(command.id, call)]));
                this.append(this.accept(entity));
            } else {
                this.append(this.accept(entity, call));
            }
        }
        /** Push an identifier onto the top identifier array*/

    }, {
        key: "pushId",
        value: function pushId(id) {
            this.top().identifiers.push(id);
        }
    }, {
        key: "top",
        value: function top() {
            return this.stack[this.stack.length - 1];
        }
    }, {
        key: "rotate",
        value: function rotate(command) {
            var options = this.generateOptionsObject(command);
            this.transformStack.rotate.push(options);
            this.compileNode(command.body);
            this.transformStack.rotate.pop();
        }
    }, {
        key: "translate",
        value: function translate(command) {
            var options = this.generateOptionsObject(command);
            this.transformStack.translate.push(options);
            this.compileNode(command.body);
            this.transformStack.translate.pop();
        }
        /* Walk an expression and make identifiers that reference params gettable. */

    }, {
        key: "walkExpression",
        value: function walkExpression(expr) {
            var stack = this.top().expression;
            stack.push(expr);
            switch (expr.type) {
                case 'ArrayExpression':
                    for (var i = 0; i < expr.elements.length; i++) {
                        expr.elements[i] = this.walkExpression(expr.elements[i]);
                    }
                    return stack.pop();
                case 'ArrowFunctionExpression':
                    this.compileNode(expr);
                    return stack.pop();
                case 'AssignmentExpression':
                    expr.right = this.walkExpression(expr.right);
                    return stack.pop();
                case 'BinaryExpression':
                    expr.left = this.walkExpression(expr.left);
                    expr.right = this.walkExpression(expr.right);
                    return stack.pop();
                case 'CallExpression':
                    Object.defineProperty(stack[0], 'wrapInFunction', { value: true });
                    for (var _i = 0; _i < expr.arguments.length; _i++) {
                        expr.arguments[_i] = this.walkExpression(expr.arguments[_i]);
                    }
                    expr.callee = this.walkExpression(expr.callee);
                    return stack.pop();
                case 'ConditionalExpression':
                    expr.test = this.walkExpression(expr.test);
                    expr.consequent = this.walkExpression(expr.consequent);
                    expr.alternate = this.walkExpression(expr.alternate);
                    return stack.pop();
                case 'Identifier':
                    var id = this.findIdentifier(expr.name);
                    if (id) {
                        if (id.referenceType === 'param' && this.makeGettable) {
                            stack.pop();
                            stack.push(Interpreter.makeIdentifierGettable(expr));
                            Object.defineProperty(stack[0], 'wrapInFunction', { value: true });
                        } else if (id.referenceType === 'component' || id.referenceType === 'function' || id.referenceType === 'geometry') {
                            if (this.functionWrap) {
                                Object.defineProperty(stack[0], 'wrapInFunction', { value: true });
                            }
                        }
                        return stack.pop();
                    }
                    return stack.pop();
                case 'Literal':
                    return stack.pop();
                case 'MemberExpression':
                    expr.object = this.walkExpression(expr.object);
                    expr.property = this.walkExpression(expr.property);
                    return stack.pop();
                case 'UnaryExpression':
                    expr.argument = this.walkExpression(expr.argument);
                    return stack.pop();
                default:
                    return stack.pop();
            }
        }
        /* Static methods */
        /**
        Extract a command's name, identifier and options.
        */

    }], [{
        key: "analyzeCommand",
        value: function analyzeCommand(command) {
            var name = void 0,
                id = void 0,
                options = void 0;
            name = command.name.name;
            id = command.id ? command.id.name : null;
            options = command.body.body.filter(function (node) {
                return node.type === 'LabeledStatement';
            });
            return {
                name: name,
                id: id,
                options: options
            };
        }
    }, {
        key: "entity",
        value: function entity(node) {
            switch (node.name.name) {
                case 'array':
                    return new entities_1.ArrayEntity(node);
                case 'component':
                    return new entities_1.ComponentEntity(node);
                case 'group':
                    return new entities_1.GroupEntity(node);
                case 'param':
                    return new entities_1.ParamEntity(node);
                default:
                    return null;
            }
        }
    }, {
        key: "enumerateParams",
        value: function enumerateParams(parent) {
            var result = [];
            if (!(parent = parent.parent)) {
                return;
            }
            parent.params.forEach(function (param, i) {
                result.push({ name: param.name, index: i });
            });
            return result;
        }
    }, {
        key: "makeIdentifierGettable",
        value: function makeIdentifierGettable(id) {
            var prop = node_1.default.identifier('get');
            var obj = node_1.default.identifier(id.name);
            var me = node_1.default.memberExpression(obj, prop);
            var node = node_1.default.callExpression(me);
            return node;
        }
    }, {
        key: "makeTransformProperty",
        value: function makeTransformProperty(transform) {
            var object = node_1.default.objectExpression([]);
            if (transform.rotate.length) {
                object.properties.push(node_1.default.property(node_1.default.identifier('rotate'), node_1.default.arrayExpression(transform.rotate.slice(0))));
            }
            if (transform.translate.length) {
                object.properties.push(node_1.default.property(node_1.default.identifier('translate'), node_1.default.arrayExpression(transform.translate.slice(0))));
            }
            return node_1.default.property(node_1.default.identifier('transform'), object);
        }
        /**
         * Make an option's value equal to the saved parameter's value.
         */

    }, {
        key: "modifyParamOptions",
        value: function modifyParamOptions(options, savedParam) {
            console.log(savedParam);
            if (savedParam.value) {
                var option = options.find(function (o) {
                    return o.key.name === 'value';
                });
                option.value.value = savedParam.value;
            }
            if (savedParam.accessor) {
                var _option = options.find(function (o) {
                    return o.key.name === 'accessor';
                });
                if (_option) {
                    _option.value.value = savedParam.accessor;
                } else {
                    options.push(node_1.default.property(node_1.default.identifier('accessor'), node_1.default.literal(savedParam.accessor)));
                }
            }
        }
    }]);

    return Interpreter;
}();

exports.default = Interpreter;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
An Mscript can contain regular javascript as well as commands.  Commands
represent the creation of some entity.  Entities can be parameters, components,
array functions, etc.  Some entities can be declared in the context of other
entities, so when the Mscript is compiled, the output needs auxillary statements
to handle the relationships between entities.

The Node that the constructors accept are always a CommandStatement.
*/

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(0);

var Entity = function Entity(node) {
    _classCallCheck(this, Entity);

    if (node) {
        this.id = node.id ? node.id.name : null;
        this.type = node.name.name;
    }
};

exports.Entity = Entity;
/**
ArrayEntity
*/

var ArrayEntity = function (_Entity) {
    _inherits(ArrayEntity, _Entity);

    function ArrayEntity(node) {
        _classCallCheck(this, ArrayEntity);

        return _possibleConstructorReturn(this, (ArrayEntity.__proto__ || Object.getPrototypeOf(ArrayEntity)).call(this, node));
    }
    /**
    Return the statement required if the given entity can be accepted by
    ComponentEntity.
    */


    _createClass(ArrayEntity, [{
        key: "accept",
        value: function accept(entity, node) {
            switch (entity.type) {
                case 'component':
                    return node_1.default.expressionStatement(node_1.default.callExpression(node_1.default.memberExpression(node_1.default.identifier(this.id || 'arr'), node_1.default.identifier('push')), [node || node_1.default.identifier(entity.id)]));
                default:
                    return null;
            }
        }
        /**
        Return auxillary statements required by the given entity.
        */

    }, {
        key: "auxillary",
        value: function auxillary(node) {
            return null;
        }
    }]);

    return ArrayEntity;
}(Entity);

exports.ArrayEntity = ArrayEntity;
/**
Box
*/

var Box = function (_Entity2) {
    _inherits(Box, _Entity2);

    function Box(node) {
        _classCallCheck(this, Box);

        return _possibleConstructorReturn(this, (Box.__proto__ || Object.getPrototypeOf(Box)).call(this, node));
    }
    /**
    Boxs cannot accept any other entities.
    */


    _createClass(Box, [{
        key: "accept",
        value: function accept(entity, node) {
            return null;
        }
        /**
        Box does not generate auxillary statements.
        */

    }, {
        key: "auxillary",
        value: function auxillary(node) {
            return null;
        }
    }]);

    return Box;
}(Entity);
/**
ComponentEntity
*/


var ComponentEntity = function (_Entity3) {
    _inherits(ComponentEntity, _Entity3);

    function ComponentEntity(node) {
        _classCallCheck(this, ComponentEntity);

        return _possibleConstructorReturn(this, (ComponentEntity.__proto__ || Object.getPrototypeOf(ComponentEntity)).call(this, node));
    }
    /**
    Return the statement required if the given entity can be accepted by
    ComponentEntity.
    */


    _createClass(ComponentEntity, [{
        key: "accept",
        value: function accept(entity, node) {
            if (entity.type === 'component') {
                return node_1.default.expressionStatement(node_1.default.callExpression(node_1.default.memberExpression(node_1.default.identifier(this.id), node_1.default.identifier('add')), [node || node_1.default.identifier(entity.id)]));
            } else {
                return null;
            }
        }
        /**
        Return auxillary statements required by the given entity.
        */

    }, {
        key: "auxillary",
        value: function auxillary(node) {
            return null;
        }
    }]);

    return ComponentEntity;
}(Entity);

exports.ComponentEntity = ComponentEntity;
/**
ComponentEntity
*/

var GroupEntity = function (_Entity4) {
    _inherits(GroupEntity, _Entity4);

    function GroupEntity(node) {
        _classCallCheck(this, GroupEntity);

        return _possibleConstructorReturn(this, (GroupEntity.__proto__ || Object.getPrototypeOf(GroupEntity)).call(this, node));
    }
    /**
    Return the statement required if the given entity can be accepted by
    GroupEntity.
    */


    _createClass(GroupEntity, [{
        key: "accept",
        value: function accept(entity, node) {
            if (entity.type === 'component' || entity.type === 'param') {
                return node_1.default.expressionStatement(node_1.default.callExpression(node_1.default.memberExpression(node_1.default.identifier(this.id), node_1.default.identifier('add')), [node || node_1.default.identifier(entity.id)]));
            } else {
                return null;
            }
        }
        /**
        Return auxillary statements required by the given entity.
        */

    }, {
        key: "auxillary",
        value: function auxillary(node) {
            return null;
        }
    }]);

    return GroupEntity;
}(Entity);

exports.GroupEntity = GroupEntity;
/**
ObjectEntity is the top level thing being built.
*/

var ObjectEntity = function (_Entity5) {
    _inherits(ObjectEntity, _Entity5);

    function ObjectEntity() {
        _classCallCheck(this, ObjectEntity);

        return _possibleConstructorReturn(this, (ObjectEntity.__proto__ || Object.getPrototypeOf(ObjectEntity)).call(this, null));
    }
    /**
    Return the statement required if the given entity can be accepted by
    Object.
    */


    _createClass(ObjectEntity, [{
        key: "accept",
        value: function accept(entity, node) {
            var type = entity.type;
            if (type === 'component' || type === 'param' || type === 'array' || type === 'group') {
                return node_1.default.expressionStatement(node_1.default.callExpression(node_1.default.memberExpression(node_1.default.identifier('object'), node_1.default.identifier('add')), [node || node_1.default.identifier(entity.id)]));
            } else {
                return null;
            }
        }
        /**
        Return auxillary statements required by the given entity.
        */

    }, {
        key: "auxillary",
        value: function auxillary(node) {
            return null;
        }
    }]);

    return ObjectEntity;
}(Entity);

exports.ObjectEntity = ObjectEntity;
/**
ParamEntity.
*/

var ParamEntity = function (_Entity6) {
    _inherits(ParamEntity, _Entity6);

    function ParamEntity(node) {
        _classCallCheck(this, ParamEntity);

        return _possibleConstructorReturn(this, (ParamEntity.__proto__ || Object.getPrototypeOf(ParamEntity)).call(this, node));
    }
    /**
    Params cannot accept any other entities.
    */


    _createClass(ParamEntity, [{
        key: "accept",
        value: function accept(entity, node) {
            return null;
        }
        /**
        Return auxillary statements required by the given entity.
        */

    }, {
        key: "auxillary",
        value: function auxillary(node) {
            return null;
        }
    }]);

    return ParamEntity;
}(Entity);

exports.ParamEntity = ParamEntity;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var acorn = __webpack_require__(1);
var interpreter_1 = __webpack_require__(3);
var esotope = __webpack_require__(2);
var node_1 = __webpack_require__(0);
exports.Node = node_1.default;
function interpret(input, options) {
    var ast = acorn.parse(input);
    var i = new interpreter_1.default(ast);
    return i.compile();
}
exports.interpret = interpret;
function parse(input) {
    return acorn.parse(input);
}
exports.parse = parse;
function compile(input) {
    var ast = acorn.parse(input);
    var i = new interpreter_1.default(ast);
    return esotope.generate(i.compile(), {
        semicolons: false
    });
}
exports.compile = compile;
// To be deprecated in favour of compile
function transpile(input, options) {
    var ast = acorn.parse(input);
    var i = new interpreter_1.default(ast);
    return i.compile();
}
exports.transpile = transpile;
function generate(ast) {
    return esotope.generate(ast, {
        semicolons: false
    });
}
exports.generate = generate;
function traverse(node, callback) {
    if (node instanceof Array) {
        node.forEach(function (_node) {
            traverse(_node, callback);
        });
    } else {
        if (callback instanceof Array) {
            callback.forEach(function (_call) {
                _call(node);
            });
        } else if (callback) {
            callback(node);
        }
        if ((typeof node === "undefined" ? "undefined" : _typeof(node)) === 'object' && node !== null) {
            for (var key in node) {
                if (_typeof(node[key]) === 'object' && node !== null) traverse(node[key], callback);
            }
        }
    }
}
exports.traverse = traverse;
// Only traverse nodes that have a 'body' property.
function shallowBodyTraverse(node, callback) {
    if (node instanceof Array) {
        node.forEach(function (_node) {
            shallowBodyTraverse(_node, callback);
        });
    } else {
        if (callback instanceof Array) {
            callback.forEach(function (_call) {
                _call(node);
            });
        } else if (callback) {
            callback(node);
        }
        if ((typeof node === "undefined" ? "undefined" : _typeof(node)) === 'object' && node !== null && node.body) {
            shallowBodyTraverse(node.body, callback);
        }
    }
}
exports.shallowBodyTraverse = shallowBodyTraverse;

/***/ })
/******/ ]);
//# sourceMappingURL=mscript.js.map