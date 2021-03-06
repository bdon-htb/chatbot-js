/** Class representing a single word token */
export default class PatternNode {
    /**
     * Create a node.
     * @param { String } value - The word assigned to this node.
    */
    constructor(value)
    {
        this.value = value;
        this.children = null;
        this.templates = null;
    }

    /**
     * Checks if node is a leaf.
     * @return { Boolean } Returns true if node has no children. False otherwise.
    */
    isLeaf()
    {
        return this.children == null;
    }

    /**
     * Checks if node has word set as its value.
     * @param { String } word - The word to check for.
     * @return { Boolean } Returns true if node contains word. False otherwise.
    */
    has(word)
    {
        return this.value === word;
    }

    /**
     * Checks if node has any children that contain word.
     * @param { String } word - The word to check for.
     * @return { Boolean } Returns true if node has child that has word. False otherwise.
    */
    hasChild(word)
    {
        if(!this.isLeaf())
        {
            return this.children.has(word);
        }
        return false;
    }

    /**
     * Checks and returns if this node has templates.
     * @return { Boolean } Returns true if node has any templates. False otherwise.
    */
    hasTemplates()
    {
        return this.templates != null;
    }

    /**
     * Gets and returns the child of this node that has word.
     * @param { String } word - The word to check for.
     * @return { PatternNode | null } Returns child node if it exists. Null otherwise.
    */
    getChild(word)
    {
        if(!this.isLeaf())
        {
            return this.children.get(word);
        }
        return null;
    }

    /**
     * Checks and returns all children this node contains.
     * @return { Iterator | null } Returns child nodes if they exists. Null otherwise.
    */
    getChildren()
    {
        if(!this.isLeaf())
        {
            return this.children.entries();
        }
        return null;
    }

    /**
     * Returns all the templates in this node.
     * @param { String[] | null }
    */
    getTemplates()
    {
        return this.templates;
    }

    /**
     * Adds child to this node's children.
     * @param { PatternNode } child - The child node to add.
    */
    insert(child)
    {
        if(this.children == null){ this.children = new Map() };
        this.children.set(child.value, child);
    }

    /**
     * Adds template to this node.
     * Note: only leaf nodes should have templates.
     * @param { String } template - The template to add.
    */
    addTemplate(template)
    {
        if(!this.hasTemplates()){ this.templates = [] };
        this.templates.push(template);
    }
}
