import { randomInt } from './funcs.js';
import Animation from './Animation.js'

/** Class is an interface for the GUI  */
export default class GUIHandler {
    // References to relevant tags..
    submitBtnId = 'aliza-submit-btn';
    submitInputId = 'aliza-submit-text';
    transcriptId = 'aliza-transcript';
    alizaCanvasId = 'aliza-portrait-canvas';
    alizaSpeechId = 'aliza-speech-bubble';

    // Reference to relevant DOM elements.
    submitBtn; // <button> element.
    submitInput; // <input> element.
    transcript; // <div> element.
    alizaCanvas; // <canvas> element.
    alizaSpeech; // <div> element; Aliza's speech bubble.

    alizaAssetsURL = '../images/aliza_assets';
    alizaAssetNames = [
        'body.png',
        'eyes1.png',
        'eyes2.png',
        'eyes3.png',
        'mouth1.png',
        'mouth2.png',
        'mouth3.png'
    ]
    alizaAssetWidth = 608;
    alizaAssetHeight = 854;

    askInputText = 'Ask!';
    askPlaceholderText = 'Enter your question for ALIZA here...';
    respondInputText = 'Respond!';
    respondPlaceholderText = 'Enter a response for ALIZA here...';


    /**
     * Initializes GUIHandler instance by storing references to relevant document elements.
    */
    async init()
    {
        this.submitBtn = document.getElementById(this.submitBtnId);
        this.submitInput = document.getElementById(this.submitInputId);
        this.transcript = document.getElementById(this.transcriptId);
        this.alizaCanvas = document.getElementById(this.alizaCanvasId);
        this.alizaSpeech = document.getElementById(this.alizaSpeechId);

        this.btnHandler;
        this.textHandler = (event) => {
            if(event.code === 'Enter')
            {
                event.preventDefault();
                this.submitBtn.click();
            }
        }

        this.alizaCanvas.width = this.alizaAssetWidth;
        this.alizaCanvas.height = this.alizaAssetHeight;

        this.alizaAssets = new Map();
        await this.loadAlizaAssets();

        this.blinkAnimation = new Animation(41.7, [1, 2, 3, 2, 1], false, () => { this.startBlink(); });
        this.talkAnimation = new Animation(41.7, [1, 2, 3, 2, 1], true);

        this.startBlink(1000);
        this.drawAliza();

        window.addEventListener("resize", () => { this.updateSpeechBubbleSize(); });
        this.updateSpeechBubbleSize();

        this.speechBubbleAnimation = null;
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

    addToTranscript(speaker, text)
    {
        let html = `<span class="transcript-element"><p class="transcript-speaker-name">${speaker}:</p><p class="transcript-speaker-text">${text}</p></span>`;
        this.transcript.insertAdjacentHTML('afterbegin', html);
    }

    async loadAlizaAssets()
    {
        let width = this.alizaAssetWidth;
        let height = this.alizaAssetHeight;

        let image;
        let url;
        for(const filename of this.alizaAssetNames)
        {
            url = this.alizaAssetsURL + '/' + filename;
            image = await this.loadImage(url, width, height);
            this.alizaAssets.set(filename, image);
        }
    }

    loadImage(src, width, height)
    {
        return new Promise((resolve, reject) => {
            let image = new Image(width, height);
            image.onload = () => resolve(image);
            image.onerror = reject;
            image.src = src;
        });
    }

    drawAliza()
    {
        let canvas = this.alizaCanvas;

        let images = [
            this.alizaAssets.get('body.png'),
            this.alizaAssets.get(`mouth${this.talkAnimation.getFrame()}.png`),
            this.alizaAssets.get(`eyes${this.blinkAnimation.getFrame()}.png`)
        ]

        let ratio = Math.min(canvas.width / this.alizaAssetWidth, canvas.height / this.alizaAssetHeight);

        let ctx = this.alizaCanvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for(let img of images)
        {
            ctx.drawImage(img, 0, 0, img.width, img.height, // source rectangle
                   0, 0, canvas.width, canvas.height); // dest rectangle
        }
        this.updateSpeechBubbleText();
        window.requestAnimationFrame(() => { this.drawAliza() });
    }

    startBlink(delay)
    {
        if(delay == null){ delay = randomInt(2000, 8000); }
        setTimeout(() => { this.blinkAnimation.start() }, delay);
    }

    updateSpeechBubbleSize()
    {
        let newWidth = this.alizaCanvas.getBoundingClientRect().height;
        this.alizaSpeech.setAttribute('style',  `height: ${newWidth}px`);
    }

    clearSpeechBubble()
    {
        this.alizaSpeech.innerHTML = '';
    }

    updateSpeechBubbleText()
    {
        if(this.speechBubbleAnimation != null){
            let frames = this.speechBubbleAnimation.getAllFrames();
            frames = frames.slice(0, this.speechBubbleAnimation.getIndex() + 1);
            this.alizaSpeech.innerHTML = frames.join('');;
        }
    }

    startSpeak(s)
    {
        return new Promise((resolve, reject) => {
            this.speaking = true;

            if(this.speechBubbleAnimation != null){
                this.speechBubbleAnimation.stop();
            }

            let frames = s.split('');
            let callback = () => {
                this.stopSpeak();
                resolve();
            }
            this.speechBubbleAnimation = new Animation(17, frames, false, callback);
            this.speechBubbleAnimation.start();
            this.talkAnimation.start(true);
        });
    }

    stopSpeak()
    {
        if(!this.speaking){ return; }

        this.speaking = false;
        this.speechBubbleAnimation.stop();
        this.speechBubbleAnimation.setIndex(-1);
        this.updateSpeechBubbleText();
        this.talkAnimation.stop();

        this.speechBubbleAnimation = null;
    }

    isSpeaking()
    {
        return this.speaking;
    }

    setAskInput()
    {
        this.submitInput.placeholder = this.askPlaceholderText;
        this.submitBtn.innerHTML = this.askInputText;
    }

    setPromptInput()
    {
        this.submitInput.placeholder = this.respondPlaceholderText;
        this.submitBtn.innerHTML = this.respondInputText;
    }
}
