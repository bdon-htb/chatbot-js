import Action from './Action.js';

import WeatherAction from './actions/WeatherAction.js';
import GreetAction from './actions/GreetAction.js';
import GetTimeAction from './actions/GetTimeAction.js';
import GetGenericAction from './actions/GetGenericAction.js';

/** Class serves as an interface for starting chatbot actions */
export default class ActionHandler {
    actionClasses = [
        WeatherAction,
        GreetAction,
        GetTimeAction,
        GetGenericAction
    ]

    /**
     * Creates an ActionHandler.
    */
    constructor(chatbot)
    {
        this.chatbot = chatbot;
        this.actions = new Map();
        this.createActions();
    }

    /**
     * Creates all actions and sets them in this.actions.
    */
    createActions()
    {
        for(const cls of this.actionClasses)
        {
            let action = new cls(this.chatbot);
            this.actions.set(action.name, action);
        }
    }

    /**
     * Starts an action.
     * @param { String } actionName - name of the action to start.
     * @return { Boolean } Returns true if the action was found and started. false otherwise.
    */
    act(actionName)
    {
        let action = this.actions.get(actionName);
        if(action instanceof Action)
        {
            action.act();
            return true;
        }
        return false;
    }
}
