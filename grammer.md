# Grammer
This is a file explainging the grammer of the langueage

```txt
expression : term [PLUS|MINUS term]*

term       : factor [MULTIPLY|DIVIDE factor]*
           : PLUS|MINUS term

factor     : INT|FLOAT
```
## Ideas
- `()` order of ops
- Data types
- idnetifier
  - Variables
  - keyword
    - if else, ect
    - functions
- built in functions

systemize a list of tokens, and a way to check if they match with rewind ability.