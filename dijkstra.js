const Graph = require("./graph");
const return_graph = Graph.ret_graph;

const gr = return_graph();

const start = '';

const get_start = (starting_key) =>{
    start = starting_key;
};

const dijkstra = () =>{
    
    const gr_keys = Object.keys(gr);
    let start_reg = new RegExp(`^${start}__`);
    const start_k = gr_keys.filter( key => key.match(start_reg) !== null);


};

module.exports = { 
    "dijkstra_algorithm":dijkstra,
    "get_start": get_start
};