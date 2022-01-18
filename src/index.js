import test from './scripts/hello.js';
import WordNode from './scripts/tree/WordNode.js';
import WordTree from './scripts/tree/WordTree.js';

function main()
{
    let t = new WordTree()
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
