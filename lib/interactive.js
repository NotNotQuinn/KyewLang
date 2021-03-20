"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Prompt = require("prompt-sync");
var _Prompt_history = require("prompt-sync-history");
var math_lang_1 = require("./math-lang");
var prompt = Prompt({ sigint: true, history: _Prompt_history() });
while (true) {
    var text = prompt("> ");
    var ahaha = math_lang_1.execute(text);
    console.log(ahaha);
}
