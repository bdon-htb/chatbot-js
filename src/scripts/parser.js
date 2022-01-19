import PatternTree from './tree/PatternTree.js';

/** Class handles compiling ALIZA data files into trees */
export default class Parser {
    fileExtension = '.alzml';

    /**
     * Sends a request to get the aliza file in url.
     * @param { String } url - url of the file to get.
     * @return { Promise } Returns the promise containing the request. Rejects on network error. Resolves on load. Promise passes the request.
    */
    get(url)
    {
        if(!url.endsWith(this.fileExtension)){ throw new Error(`url does not point to valid ALIZA file: ${this.fileExtension}`) };
        return new Promise( (resolve, reject) => {
            let req = new XMLHttpRequest();
            // Aliza files should be parsed as xml regardless of file .ext
            req.overrideMimeType('text/xml');
            req.open('GET', url);
            req.onload = () => resolve(req);
            req.onerror = () => reject(req);
            req.send();
        });
    }
    /**
     * Loads aliza file from url and returns it as an xml object.
     * @param { String } url - url of the file to load.
     * @return { XMLDocument } Returns the XMLDocument object representing the file.
    */
    async load(url)
    {
        const throwError = (msg) => { throw new Error(`Error while loading file: ${msg}`) };
        // The context of the promise's .this() should be the XMLHttpRequest according to mdn.
        // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequestEventTarget/onload
        return await this.get(url)
        .then((req) => {
            // Throw an error if the request wasn't successful.
            if(req.status >= 200 && req.status < 300){ return req.responseXML; }
            else throwError(req.statusText);
        })
        // Catch network errors.
        .catch((req) => throwError(req.statusText));
    }

    /**
     * Tokenizes input into an array of words and returns it.
     * @param { String } s - String input to tokenize.
     * @return { String[] } Returns tokenized array of strings.
    */
    tokenize(s)
    {
        s.replace('/\r?\n|\r/g', '')
        return s.split(' ')
    }

    /**
     * Compiles contents of file into a PatternTree and returns it.
     * @param { XMLDocument } file - File to compile.
     * @return { PatternTree } Returns compiled file as PatternTree.
    */
    compile(file)
    {
        let patternTree = new PatternTree();
        let alizaTag = file.firstChild;
        for(const ioTag of alizaTag.children)
        {
            let inputPatterns = [];
            let templates = [];
            for(const child of ioTag.children)
            {
                if(child.tagName === 'in'){ inputPatterns.push(this.tokenize(child.textContent)); }
                else if(child.tagName === 'out'){ templates.push(child.textContent); }
            }

            inputPatterns.forEach( pattern => patternTree.insert(pattern, templates));
        }
        return patternTree;
    }

    async loadAndCompile(url)
    {
        let file = await this.load(url);
        return this.compile(file);
    }
}
