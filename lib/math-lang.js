"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
var lexer_1 = require("./lexer/lexer");
var SyntaxType_1 = require("./custom/SyntaxType");
var defalt_run_opts = {
    show_tokenized_code: false,
};
function execute(code, options) {
    if (options === void 0) { options = defalt_run_opts; }
    var lexer = new lexer_1.Lexer(code);
    while (true) {
        var token = lexer.getToken();
        process.stdout.write(token.type + ": '" + token.text + "'" + (token.value == null ? '' : ' ' + token.value) + "\n");
        if (token.type == SyntaxType_1.SyntaxType.EndOfFileToken)
            break;
    }
}
exports.execute = execute;
