const Graph = require("./graph");
const return_graph = Graph.ret_graph;

const gr = return_graph();

let start = '';
let end = '';

const get_start_end = (starting_key, ending_key) =>{
    start = starting_key;
    end = ending_key;
};

const dijkstra = () =>{
    
    const gr_keys = Object.keys(gr);
    const start_reg = new RegExp(`^${start}__`);
    const end_reg = new RegExp(`__${end}__`);
    console.log
    const start_k = gr_keys.filter( key => key.match(start_reg) !== null)[0];
    const end_k = gr_keys.filter(key => key.match(end_reg) !== null)[0];

    console.log(gr)

    const costs = Object.assign(
        {finish: Infinity}, gr[start_k]
    );

    const parents = {
        finish: end_k};

    for(let child in gr[start_k]){
        parents[child] = start_k;
    }

    const processed = [];

    let node = lowestCostNode(costs, processed);


    while (node) {

        let cost = costs[node];
        let children = gr[node];
        for (let n in children) {
            // console.log(n);
           
            let newCost = parseFloat(cost + children[n]);
            
            if (!costs[n]) {
                costs[n] = newCost;
                parents[n] = node;
            }
            if (costs[n] > newCost) {
                costs[n] = newCost;
                parents[n] = node;
            }
        }
        processed.push(node);
        node = lowestCostNode(costs, processed);
    }

    let opt_path = ["end"];

    let parent = parents.finish;

    while(parent){
        opt_path.push(parent);
        parent = parents[parent];
    }
    
    opt_path.reverse();

    console.log(opt_path, costs);

};

const lowestCostNode = (costs, processed) => {
    return Object.keys(costs).reduce((lowest, node) => {
        // console.log(lowest, node);
        if (lowest === null || costs[node] < costs[lowest]) {
            if (!processed.includes(node)) {
                lowest = node;
            }
        }
        return lowest;

    }, null);
};

module.exports = { 
    "dijkstra_algorithm":dijkstra,
    "get_start_end": get_start_end
};