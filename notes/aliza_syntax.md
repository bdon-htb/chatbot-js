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
  <in>WHAT IS {*}</in>
  <in>WHO IS {*}</in>
  <in>WHERE IS {*}</in>
  <out>Not sure. Let me find out.</out>
  <out>I'll search about {*}. Give me a second.</out>
  <out>No idea. Let me see what I can find.</out>
  <action>{*} => {actions.search}</action>
</io>
```
Where each `in` tag will be treated as a possible match for any of the `out` tags
within the same `io` block. At runtime, the `out` tag response will be selected
at random. This differs from AIML where random responses needed to be explicitly
wrapped into a `random` tag.

As seen in the example above, ALIZA supports wildcards * similar to AIML. However, wildcards
are treated here as variables and will thus need to be wrapped in braces {*}.

The `action` tag is an ALIZA specific tag designed as a hook into the chatbot itself.
More about that in the Tag Reference section.

### Variables
ALIZA also supports variables like AIML but are written differently. Basically,
anything wrapped in braces { } is a variable. All possible variables are defined
within the bot.
## Tag Reference
(*) = Accepts statement as is, or with stuff after