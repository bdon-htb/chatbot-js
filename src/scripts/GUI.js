
/** Class is an interface for the GUI  */
export default class GUI {
    // Keep a reference of relevant tags here.
    submitBtnId = 'aliza-submit-btn';
    submitInputId = 'aliza-submit-text';

    init()
    {
        this.submitBtn = document.getElementById(this.submitBtnId);
        this.submitInput = document.getElementById(this.submitInputId);

        this.btnHandler;
        this.textHandler = (event) => {
            if(event.code === "Enter")
            {
                event.preventDefault();
                this.submitBtn.click();
            }
        }
    }

    /**
     * Extracts and returns the text from the text input.
     * @param { Boolean } clearInput - Clears text input after extracting if set to true.
     * @return { String } Returns the string currently in the text field.
    */
    getInput(clearInput=true)
    {
        let text = this.submitInput.value;
        if(clearInput){ this.clearInputField(); }
        return text;
    }

    /**
     * Clears the text input.
    */
    clearInputField()
    {
        this.submitInput.value = '';
    }

    setSubmitHandler(handler)
    {
        this.removeSubmitHandler();
        this.submitBtn.addEventListener('click', handler);
        this.submitInput.addEventListener('keyup', this.textHandler);
        this.btnHandler = handler;
    }

    removeSubmitHandler()
    {
        if(this.btnHandler)
        {
            this.submitBtn.removeEventListener('click', this.btnHandler);
            this.btnHandler = null;
            this.submitInput.removeEventListener('keyup', this.textHandler);
        }
    }
}
