# Aliza Chatbot

Aliza (or ALIZA) is a simple chatbot that I made as a submission for [PyJac Rebooted](https://pyjac-rebooted.devpost.com/).

Aliza's name is a portmanteau of the names Alice (A.L.I.C.E.) and Eliza who
are older chatbots that Aliza was based on. Aliza even uses a custom markup language
that is very similar to AIML. You can read more about the .alzml file syntax in the notes directory of this repo.

Aliza uses a [merkle tree](https://en.wikipedia.org/wiki/Merkle_tree) data structure using JavaScript's
builtin Map objects. This implementation is similar to how ALICE's interpreter is
implementated as according to the [AIML foundation website](http://www.aiml.foundation/doc.html) (checkout the "AIML Pattern Matching" section).

PyJac is a hackathon run by students at UTM. Participants are given a selection
of prompts to choose and are then given a week to code and submit it with a video demonstration.

## Developing

### Built With
Aliza was developed using modern / ES6 JavaScript.

### Prerequisites
I recommend running Aliza on a local server. To do this, I personally use python3's
http.server. If you don't already have python installed you can get it [here](https://www.python.org/downloads/)

### Getting Started
Clone the repo:
```
git clone https://github.com/bdon-htb/chatbot-js
```
And then run a local server.
```
cd chatbot-js/src
python -m http.server 8000
```
Then open your browser of choice (I suggest in private browsing), navigate to localhost:8000 and the webpage should load.

## Preview Images
![Screenshot of Aliza Interface](https://github.com/bdon-htb/chatbot-js/blob/main/preview_images/screenshot.png)
