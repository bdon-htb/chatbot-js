# How ALIZA Files are Structured.
## Introduction
The `.aliza` file syntax borrows most of its ideas from [AIML](https://en.wikipedia.org/wiki/AIML). Similar to `.aiml` files, `.aliza` files are internally an `.xml` file but contain custom tags.

## Basic Syntax
### AIML Syntax
First lets give a brief overview of the structure of a `.aiml` files:
```xml
<category>
    <pattern>WHAT IS YOUR NAME</pattern>
    <template>My name is John Doe.</template>
</category>
```
In AIML the `category` tag is the fundamental unit of knowledge. Categories are further
split into `pattern` and `template` tags. `pattern` tags contain the string of
characters that the chatbot will try to match from user input while `template` tags
contains the bot's response. You can read more in-depth about AIML's syntax on the AIML foundation
website http://www.aiml.foundation/doc.html.
### ALIZA Syntax
The basic structure of a `.aliza` file is almost identical to AIML:
```xml
<io>
  <in>WHAT IS YOUR NAME</in>
  <out>My name is Aliza.</out>
</io>
```
Where the tags `io`, `in`, and `out` correspond to `category`, `pattern`,
and `template`.

Any number of `in` and `out` tags will work as long as there is at least one
of each:
```xml
<io>
  <in>WHAT IS</in>
  <in>WHO IS</in>
  <in>WHERE IS</in>
  <out>Not sure. Let me find out.</out>
  <out>No idea. Let me see what I can find.</out>
</io>
```
Where each `in` tag will be treated as a possible match for any of the `out` tags
within the same `io` block. At runtime, the `out` tag response will be selected
at random. This differs from AIML where random responses needed to be explicitly
wrapped into a `random` tag.

ALIZA does not support wildcarding like AIML.

ALIZA has support for calling actions. actions are essentially hooks
for calling chatbot functions in the code.
```xml
<io>
  <in>HELLO</in>
  <out>{actions.greet}</out>
</io>
```
In this example, inputting "hello" will tell ALIZA to call the "greet" action
assigned in her actionHandler. Take a look at /src/scripts/actions for relevant
code.
