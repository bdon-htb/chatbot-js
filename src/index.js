import test from './scripts/hello.js';
import PatternNode from './scripts/tree/PatternNode.js';
import PatternTree from './scripts/tree/PatternTree.js';

function main()
{
    let t = new PatternTree()
    let patterns = [
        "HELLO THERE",
        "DO YOU HAVE A DOG",
        "DO YOU HAVE A CAT",
        "DO YOU HAVE A *",
        "WHAT IS YOUR NAME"
    ]

    for(let p of patterns)
    {
        t.insert(p.split(" "), ["test"])
    }

    console.log(t.stringify());
}

main();
