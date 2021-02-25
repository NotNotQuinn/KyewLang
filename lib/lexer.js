"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
var Tokens = __importStar(require("./tokens"));
var DIGITS = /^(\d|\.)+$/;
var WHITESPACE = /^(\n|\t| )+$/gi;
function convert_to_float(a) {
    // Type conversion 
    // of string to float 
    var floatValue = +(a);
    // Return float value 
    return floatValue;
}
var Lexer = /** @class */ (function () {
    function Lexer(source) {
        this.source = source;
        this.pos = -1;
        this.advance();
    }
    Lexer.prototype.advance = function () {
        this.pos++;
        this.currentChar = this.source.rawText[this.pos];
    };
    Lexer.prototype.make_tokens = function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(this.currentChar != undefined)) return [3 /*break*/, 17];
                    if (!WHITESPACE.test(this.currentChar)) return [3 /*break*/, 1];
                    // no token for whitespace
                    this.advance();
                    return [3 /*break*/, 16];
                case 1:
                    if (!DIGITS.test(this.currentChar)) return [3 /*break*/, 3];
                    return [4 /*yield*/, this.generate_number()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 16];
                case 3:
                    if (!(this.currentChar == '-')) return [3 /*break*/, 5];
                    return [4 /*yield*/, new Tokens.MinusToken()];
                case 4:
                    _a.sent();
                    this.advance();
                    return [3 /*break*/, 16];
                case 5:
                    if (!(this.currentChar == '+')) return [3 /*break*/, 7];
                    return [4 /*yield*/, new Tokens.PlusToken()];
                case 6:
                    _a.sent();
                    this.advance();
                    return [3 /*break*/, 16];
                case 7:
                    if (!(this.currentChar == '*')) return [3 /*break*/, 9];
                    return [4 /*yield*/, new Tokens.MultiplyToken()];
                case 8:
                    _a.sent();
                    this.advance();
                    return [3 /*break*/, 16];
                case 9:
                    if (!(this.currentChar == '/')) return [3 /*break*/, 11];
                    return [4 /*yield*/, new Tokens.DivideToken()];
                case 10:
                    _a.sent();
                    this.advance();
                    return [3 /*break*/, 16];
                case 11:
                    if (!(this.currentChar == '(')) return [3 /*break*/, 13];
                    return [4 /*yield*/, new Tokens.LeftPerenthesisToken()];
                case 12:
                    _a.sent();
                    this.advance();
                    return [3 /*break*/, 16];
                case 13:
                    if (!(this.currentChar == ')')) return [3 /*break*/, 15];
                    return [4 /*yield*/, new Tokens.RightPerenthesisToken()];
                case 14:
                    _a.sent();
                    this.advance();
                    return [3 /*break*/, 16];
                case 15:
                    console.log("invalid character '" + this.currentChar + "' ");
                    this.advance();
                    _a.label = 16;
                case 16: return [3 /*break*/, 0];
                case 17: return [2 /*return*/];
            }
        });
    };
    Lexer.prototype.generate_number = function () {
        var number_str = "";
        if (number_str === undefined) {
            throw new Error("Syntax error, tried to generate token when current character is undefined.");
        }
        var point_count = 0;
        while (this.currentChar != undefined && (DIGITS.test(this.currentChar) || this.currentChar == '.')) {
            if (this.currentChar == '.') {
                if (point_count > 0) {
                    break;
                }
                point_count++;
                number_str += this.currentChar;
                this.advance();
            }
            if (DIGITS.test(this.currentChar)) {
                number_str += this.currentChar;
                this.advance();
            }
        }
        if (number_str.startsWith('.'))
            number_str = "0" + number_str;
        if (number_str.endsWith('.')) {
            // TODO refactor the lexer, and parser to use and look for errors in tokens and nodes 
            throw new Error("Syntax error: Cannot end number with '.'");
        }
        if (point_count == 0) {
            // there was no floating point value
            return new Tokens.IntToken(convert_to_float(number_str));
        }
        else {
            return new Tokens.FloatToken(convert_to_float(number_str));
        }
    };
    return Lexer;
}());
exports.Lexer = Lexer;
