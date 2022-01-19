import test from './scripts/hello.js';
import Parser from './scripts/Parser.js';
import PatternNode from './scripts/tree/PatternNode.js';
import PatternTree from './scripts/tree/PatternTree.js';

async function main()
{
    // let t = new PatternTree()
    // let patterns = [
    //     "HELLO THERE".split(" "),
    //     "DO YOU HAVE A DOG".split(" "),
    //     "DO YOU HAVE A CAT".split(" "),
    //     "DO YOU HAVE A *".split(" "),
    //     "WHAT IS YOUR NAME".split(" ")
    // ]
    //
    // for(let p of patterns)
    // {
    //     t.insert(p, ["test"])
    // }
    //
    // console.log(t.stringify());
    //
    // let p = patterns[1];
    // console.log(t.search(p));
    // p = "DO YOU HAVE".split(" ");
    // console.log(t.search(p));
    let p = new Parser();
    let t = await p.loadAndCompile('/data/data_set.alzml');
    console.log(t.stringify());
}

main();
