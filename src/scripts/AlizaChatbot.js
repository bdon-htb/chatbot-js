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

        this.prompting = false;
        this.promptCallback = null;
        this.lastInput = '';
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
        if(this.prompting){
            // Pass the inputText to whatever originally called for the prompt.
            this.promptCallback(inputText);
            this.setPrompting(false);
        }
        else if(inputText === '' && this.gui.isSpeaking()) // Enter to skip speak animation.
        {
            this.gui.stopSpeak();
        }
        else if(responseText != null && responseText.match(this.actionPattern) != null)
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
        this.lastInput = inputText;
    }

    getResponse(pattern)
    {
        let closest = this.patterns.search(pattern);
        if(closest != null && closest.hasTemplates())
        {
            return randomChoice(closest.getTemplates());
        }
        else return null;
    }

    /**
     * Tells Aliza to start saying that message.
    */
    async speak(message)
    {
        await this.gui.startSpeak(message);
        this.gui.addToTranscript('ALIZA', message);
    }

    /**
     * Prompts user for an input.
    */
    prompt(callback)
    {
        this.gui.clearInputField();
        this.setPrompting(true);
        this.promptCallback = callback;
    }

    setPrompting(b)
    {
        if(b){
            this.gui.setPromptInput();
            this.prompting = true;
        }
        else {
            this.gui.setAskInput();
            this.prompting = false;
        }
    }
}
