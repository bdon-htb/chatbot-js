import Action from '../Action.js';

/** Action for generating a greeting based on the date / time. */
export default class GreetAction extends Action {
    name = 'greet';

    async act()
    {
        let date = new Date();
        let greeting = '';

        if(date.getMonth() === 12 && date.getDate() === 31){ gretting = 'Happy New Years!'; }
        else if(date.getMonth() === 10 && date.getDate() === 31){ greeting = 'Happy Halloween!'; }
        else if(date.getMonth() === 10 && date.getDate() === 10){ greeting = 'Happy Thanksgiving!'; }
        else if(date.getMonth() === 12){ greeting = 'Happy holidays!'; }
        else if(date.getMonth() === 2 && date.getDate() === 14){ greeting = 'Happy Valentine\'s day!'; }
        else { // Generate greeting based on time.
            if(date.getHours() <= 12){ greeting = 'Godd morning!'; }
            else if(date.getHours() <= 18){ greeting = 'Good afternoon!'; }
            else if(date.getHours() <= 21){ greeting = 'Good evening!'; }
            else { greeting = 'Good night!'; }
        }

        this.chatbot.speak(greeting);
    }
}
