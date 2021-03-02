# Grammer
This is a file explainging the grammer of the langueage

```ebnf
expression ::= <term> [(<add> | <subtract>) <term>]*;


term ::= <factor> [(<multiply> | <divide>) <factor>]*;


factor ::= <int_literal> | <float_literal>
        |  <left_paren> <expression> <right_paren>;

left_paren ::= '(';
right_paren ::= ')';

add ::= '+';
subtract ::= '-';

multiply ::= '*';
divide ::= '/';




```
## Ideas
- Data types
- idnetifier
  - Variables
  - keyword
    - if else, ect
    - functions
- built in functions

systemize a list of tokens, and a way to check if they match with rewind ability.