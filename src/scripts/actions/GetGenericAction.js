import Action from '../Action.js';

import { randomChoice } from '../funcs.js';

/** Responsible for displaying the generic message if there was no match. */
export default class GetGenericAction extends Action {
    name = 'getGeneric';

    messages = [
        'Sorry, I don\'t know that one',
        'Sorry, I don\'t know what you mean by that',
        'I don\'t understand that input. Sorry about that.',
        'I don\'t understand.',
        'I don\'t have that feature.',
    ]

    async act()
    {
        this.chatbot.speak(randomChoice(this.messages));
    }
}
