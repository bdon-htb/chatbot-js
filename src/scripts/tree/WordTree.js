import WordNode from './WordNode.js';

/** Class representing a tree containing pattern paths */
export default class WordTree {
    /**
     * Creates a tree.
    */
    constructor()
    {
        // Represents the top-level of the tree.
        this.children = new Map();
    }

    /**
     * Checks if node has any top-level children that contain word.
     * @param { String } word - The word to check for.
     * @return { Boolean } Returns true if node has child that has word. False otherwise.
    */
    hasChild(word)
    {
        return this.children.has(word);
    }

    /**
     * Gets and returns the top-level child of this tree that has word.
     * @param { String } word - The word to check for.
     * @return { WordNode | undefined } Returns top-level child node if it exists. Undefined otherwise.
    */
    getChild(word)
    {
        return this.children.get(word);
    }

    /**
     * Returns all children this node contains.
     * @return { Iterator } Returns child nodes.
    */
    getChildren()
    {
        return this.children.entries();
    }

    /**
     * Adds top-level child to this tree's children.
     * @param { WordNode } child - The child node to add.
    */
    addChild(child)
    {
        this.children.set(child.value, child);
    }

    /**
     * Performs a search on this tree. The tree will search for and return
     * the closest match of the passed pattern.
     * @param { String[] } pattern - A tokenized array of strings to search.
     * @return { WordNode | null } Returns nearest node if it exists. Otherwise null.
    */
    search(pattern)
    {
        let i = 0;
        let found = false;
        // Set starting node as top level node.
        let node =  this.getChild(pattern[i]);
        while(!found || i < pattern.length - 1)
        {
            // If we find a matching child, we search that one.
            if(node.hasChild(pattern[i + 1]))
            {
                node = node.getChild(pattern[i + 1]);
                i++;
            }
            // If we do not have a matching child, we return the current node
            // as the closest match.
            else {
                found = true;
            }
            // The leaf case is accounted for in the while loop.
        }
        return node;
    }

    /**
     * Inserts pattern into tree.
     * @param { String[] } pattern - A tokenized array of strings to insert as nodes.
     * @param { String[] } templates - An array of string templates to attach to the leaf node.
     * Precondition: pattern.length > 0
    */
    insert(pattern, templates)
    {
        let i=0;

        // Handle case where top level node doesn't already exist first.
        if(!this.hasChild(pattern[i]))
        {
            this.addChild(new WordNode(pattern[i]))
        }

        let node = this.getChild(pattern[i]);
        for(i; i < pattern.length - 1; i++)
        {
            // If the child doesn't already exist. We create one.
            if(!node.hasChild(pattern[i + 1]))
            {
                node.insert(new WordNode(pattern[i + 1]));
            }
            node = node.getChild(pattern[i + 1]);
        }

        // Once we've reached end of pattern add templates to leaf node.
        templates.forEach(t => node.addTemplate(t));
    }

    /**
     * Returns a "pretty" string representation of this tree for printing.
     * @return { String } String to return.
    */
    stringify()
    {
        return this._stringifyHelper(this.getChildren());
    }

    _stringifyHelper(children, depth=0, spaceChar="-")
    {
        let s = ""
        for(const [value, node] of children)
        {
            s +=  spaceChar.repeat(depth) + `${value}\n`;
            if(!node.isLeaf())
            {
                s = s + this._stringifyHelper(node.getChildren(), depth + 1, spaceChar)
            }
        }
        return s;
    }
}
