export default class Animation {
    constructor(delay, frames, loop, callback)
    {
        this.delay = delay; // Delay between each frame.
        this.startIndex = 0;
        this.endIndex = frames.length;
        this.frames = frames;
        this.loop = loop;
        this.callback = callback;

        this.interval = null;
        this.running = false;
        this.currentIndex = this.startIndex;
    }

    start(ignoreIfRunning=false)
    {
        if(this.running && ignoreIfRunning){ return };

        this.interval = setInterval(() => { this.next(); }, this.delay);
        this.currentIndex = this.startIndex;
        this.running = true;
    }

    stop()
    {
        if(this.interval != null){ clearInterval(this.interval) };
        this.running = false;
        this.currentIndex = this.startIndex;
    }

    next()
    {
        this.currentIndex++;
        if(this.currentIndex >= this.endIndex)
        {
            if(!this.loop)
            {
                this.stop();
                // Callback is only called if the animation is stopped naturally.
                if(this.callback != null){ this.callback(); }
            }
            this.currentIndex = this.startIndex;
        }
    }

    setIndex(i)
    {
        if(i === -1){ i = this.endIndex; }

        i = Math.max(i, this.startIndex);
        i = Math.min(i, this.endIndex);
        
        this.currentIndex = i;
    }
    getIndex()
    {
        return this.currentIndex;
    }

    getLastIndex()
    {
        return this.endIndex;
    }

    getAllFrames()
    {
        return this.frames;
    }

    getFrame(i)
    {
        if(i == null){
            return this.frames[this.currentIndex];
        } else return this.frames[i];
    }

    isRunning()
    {
        return this.running;
    }

    setDelay(d)
    {
        this.delay = d;
    }

    setLoop(b)
    {
        this.loop = b;
    }
}
