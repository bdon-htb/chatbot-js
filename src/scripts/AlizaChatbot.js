import Parser from './Parser.js';
import PatternTree from './tree/PatternTree.js';

import GUIHandler from './GUIHandler.js';
import ActionHandler from './ActionHandler.js';

import { randomChoice } from './funcs.js';

/** Class handles main chatbot logic.  */
export default class AlizaChatbot {
    patternFileURL = '/data/data_set.alzml';

    /**
     * Creates chatbot instance.
    */
    constructor()
    {
        this.parser = new Parser();
        this.gui = new GUIHandler();
        this.actions = new ActionHandler();
        this.patterns;
    }

    /**
     * Initializes certain components.
    */
    async start()
    {
        this.patterns = await this.parser.loadAndCompile(this.patternFileURL);
        this.initGUI();
    }

    /**
     * Initializes GUI component.
    */
    initGUI()
    {
        this.gui.init();
        this.gui.setSubmitHandler(() => this.takeInput());
    }

    /**
     * Takes in input from the input form and responds.
     * This is automatically called when the Ask button is pressed.
    */
    takeInput()
    {
        let inputText = this.gui.getInput();
        let responseText = this.getResponse(this.parser.tokenize(inputText));

        this.gui.addToTranscript('YOU', inputText);
        this.gui.addToTranscript('ALIZA', responseText);
    }

    // TODO: Implement actions.
    getResponse(pattern)
    {
        let closest = this.patterns.search(pattern);
        if(closest != null && closest.hasTemplates())
        {
            return randomChoice(closest.getTemplates());
        }
        else return null;
    }
}
