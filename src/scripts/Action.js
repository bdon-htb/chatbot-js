
/**
 * Class is the base class for any chatbot action.
 * @abstract
*/
export default class Action {
    name = ''; // The name of the action.
    description = ''; // Description of action. Used in help message.

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

    getName()
    {
        return this.name;
    }

    getDesc()
    {
        return this.description;
    }
}
