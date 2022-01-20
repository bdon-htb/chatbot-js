import Parser from './Parser.js';
import PatternTree from './tree/PatternTree.js';
import GUI from './GUI.js';

import { randomChoice } from './funcs.js';

/** Class handles chatbot logic.  */
export default class AlizaChatbot {
    patternFileURL = '/data/data_set.alzml';

    constructor()
    {
        this.parser = new Parser();
        this.gui = new GUI();
        this.patterns;
    }

    async start()
    {
        this.patterns = await this.parser.loadAndCompile(this.patternFileURL);
        this.initGUI();
    }

    initGUI()
    {
        this.gui.init();
        this.gui.setSubmitHandler(() => this.takeInput());
    }

    takeInput()
    {
        let inputText = this.gui.getInput();
        let responseText = this.getResponse(this.parser.tokenize(inputText));
    }

    // TODO: Account for wild cards, implement actions, variables, etc.
    getResponse(pattern)
    {
        let closest = this.patterns.search(pattern);
        if(closest != null && closest.hasTemplates())
        {
            console.log(randomChoice(closest.getTemplates()));
        }
        else console.log("No match found!")
    }
}
