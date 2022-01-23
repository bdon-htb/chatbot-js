import Action from '../Action.js';

/** Action for getting the date. */
export default class GetTimeAction extends Action {
    name = 'getTime';
    description = 'tell you today\'s date.';
    months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ]

    daysOfWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ]

    async act()
    {
        let date = new Date();

        let day = date.getDate()
        let dayOfWeek = this.daysOfWeek[date.getDay()];
        let month = this.months[date.getMonth()];
        let year = date.getFullYear();

        let hour = date.getHours();
        let minute = date.getMinutes();

        let message =  `Today's date is ${dayOfWeek}, ${month} ${day}, ${year}. The current time is ${hour}:${minute}.`
        this.chatbot.speak(message);
    }
}
