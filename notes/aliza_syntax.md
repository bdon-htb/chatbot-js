# How ALIZA Files Are Structured.
## Introduction
The `.aliza` file syntax borrows most of its ideas from [AIML](https://en.wikipedia.org/wiki/AIML). Similar to `.aiml` files, `.aliza` files are internally an `.xml` file but contains custom tags.

## Basic Syntax
### AIML Syntax
First lets give a brief overview of the structure of a `.aiml` files:
```xml
<category>
    <pattern>WHAT IS YOUR NAME</pattern>
    <template>My name is John Doe.</template>
</category>
```
In AIML the `<category>` tag is the fundamental unit of knowledge. Categories are further
split into `<pattern>` tags and `<template>` tags. `<pattern>` tags contain the string of
characters that the chatbot will try to match from user input while `<template>` tags
contains the bot's response.
### ALIZA Syntax
The basic structure of a `.aliza` is almost identical to AIML:
```xml
<io>
  <in>WHAT IS YOUR NAME</in>
  <out>My name is Aliza.</out>
</io>
```
Where the tags `<io>`, `<in>`, and `<out>` correspond to `<category>`, `<pattern>`,
and `<template>` accordingly.

## Tag List
