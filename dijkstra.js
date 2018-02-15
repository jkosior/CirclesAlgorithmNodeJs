const Graph = require("./graph");
const return_graph = Graph.ret_graph;

const gr = return_graph();

let start = '';

const get_start = (starting_key) =>{
    start = starting_key;
};

const dijkstra = () =>{
    
    const gr_keys = Object.keys(gr);
    let start_reg = new RegExp(`^${start}__`);
    console.log(start_reg);
    const start_k = gr_keys.filter( key => {
        console.log(key)
        return key.match(start_reg) !== null
    });
    console.log(start_k);


};

module.exports = { 
    "dijkstra_algorithm":dijkstra,
    "get_start": get_start
};