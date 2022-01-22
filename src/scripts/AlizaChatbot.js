import Parser from './Parser.js';
import PatternTree from './tree/PatternTree.js';

import GUIHandler from './GUIHandler.js';
import ActionHandler from './ActionHandler.js';

import { randomChoice } from './funcs.js';

/** Class handles main chatbot logic.  */
export default class AlizaChatbot {
    patternFileURL = '/data/data_set.alzml';
    actionPattern = /{action.(.*)}/;

    /**
     * Creates chatbot instance.
    */
    constructor()
    {
        this.parser = new Parser();
        this.gui = new GUIHandler();
        this.actions = new ActionHandler(this);
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
    async takeInput()
    {
        let inputText = this.gui.getInput();

        let responseText = this.getResponse(this.parser.tokenize(inputText));
        if(responseText != null && responseText.match(this.actionPattern) != null)
        {
            // Extract action name from matched response.
            let actionName = responseText.replace(/(?:\r\n|\r|\n|\{|\}|)/g, '','').split('.')[1];
            this.actions.act(actionName);
        }
        else if(responseText != null)
        {
            this.speak(responseText);
        }
        else { // Generic messages.
            this.actions.act('getGeneric')
        }

        this.gui.addToTranscript('YOU', inputText);
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

    async speak(message)
    {
        await this.gui.startSpeak(message);
        this.gui.addToTranscript('ALIZA', message);
    }
}
