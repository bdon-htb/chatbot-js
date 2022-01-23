import Action from '../Action.js';
import { randomChoice } from '../funcs.js';

/** Action for getting the weather. */
export default class WeatherAction extends Action {
    name = 'getHelp';
    description = 'display this help message again.';

    firstMessage = (
        'To get the best use out of me. I recommend asking only simple ' +
        'questions. I am also capable of certain actions. Would you like ' +
        'to see a list of them? Your options are "Yes" or "No".'
    );

    noMessage = ['Alright then.', 'Okay. Let me know if you need something.'];
    okayMessage = ['Sure thing!', 'Alright!', 'Ok!']
    actionMessageEnd = (
        'I\'d also like to mention that you may call these actions by asking me normally ' +
        'or by directly calling them. i.e. "action=getHelp".'
    )

    async act()
    {
        let callback = (inputText) => { this.handleInput(inputText); }
        this.chatbot.speak(this.firstMessage);
        this.chatbot.prompt(callback);
    }

    handleInput(inputText)
    {
        let tokenized = this.chatbot.parser.tokenize(inputText);
        if(tokenized[0] === 'YES')
        {
            this.chatbot.speak(this.generateActionsMessage());
        }
        else if(tokenized[0] === 'NO')
        {
            this.chatbot.speak(randomChoice(this.noMessage));
        }
        else {
            this.chatbot.actions.act('getGeneric');
        }
    }

    generateActionsMessage()
    {
        let message = randomChoice(this.okayMessage);
        let allActions = this.chatbot.actions.getAllActions();

        let i = 0;
        for(const [actionName, action] of allActions)
        {
            if(!this.chatbot.actions.isPrivate(action))
            {
                if(i < allActions.size - 1)
                {
                    message += ` The "${actionName}" action will have me ${action.getDesc()}`;
                }
                else {
                    message += ` Finally, the ${actionName} action will have me ${action.getDesc()}`;
                }
            }
            i++;
        }
        message += this.actionMessageEnd;
        return message;
    }
}
