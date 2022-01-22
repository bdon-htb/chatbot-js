
/**
 * Class is the base class for any chatbot action.
 * @abstract
*/
export default class Action {
    name = null; // The name of the action.

    /**
     * Creates an action.
     * @param { AlizaChatbot } chatbot - The AlizaChatbot instance for this action.
    */
    constructor(chatbot)
    {
        this.chatbot = chatbot;
    }

    /**
     * Performs the action for this action object.
     * @abstract
    */
    async act(){}
}
