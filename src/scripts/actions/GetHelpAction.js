import Action from '../Action.js';

/** Action for getting the weather. */
export default class WeatherAction extends Action {
    name = 'getHelp';

    firstMessage = (
        'To get the best use out of me. I recommend asking only simple ' +
        'questions. I am also capable of certain actions. Would you like ' +
        'to see a list of them? Your options are "Yes" or "No".'
    );

    yesMessage = 'You said yes!';
    noMessage = 'You said no!';

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
            this.chatbot.speak(this.yesMessage);
        }
        else if(tokenized[0] === 'NO')
        {
            this.chatbot.speak(this.noMessage);
        }
        else {
            this.chatbot.actions.act('getGeneric');
        }
    }
}
