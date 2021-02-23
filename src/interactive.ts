const Prompt = require("prompt-sync");
const _Prompt_history = require("prompt-sync-history");
import { execute } from "./math-lang";


let prompt = Prompt({ sigint: true, history: _Prompt_history() });
while (true) {
    let text = prompt("math > ")
    let ahaha = execute(text);
    console.log(ahaha)
}

