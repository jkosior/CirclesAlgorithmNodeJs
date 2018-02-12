const Intersections = require("./intersections");
const paths = Intersections.paths;

const graph = {};

const graph_builder = () =>{
    let key_arr = Object.keys(paths);
   
    console.log(paths)

    for(let i =0; i < key_arr.length; i++){
        for(let j =0; j < key_arr.length; j++){
            console.log(key_arr[i], key_arr[j])
            set_graph(key_arr[i], key_arr[j], graph);
        }
    }
    console.log(graph);
    return;
}

const set_graph = (key_a, key_b) =>{
    if(key_a === key_b || !paths[key_a].hasOwnProperty(key_b)){
        return;
    }
    
    let inner = Object.keys(paths[key_b]);
    
    graph[`${key_a}_${key_b}_int1`] = graph[`${key_a}_${key_b}_int1`] || {};
    
    if (typeof paths[key_a][key_b]["int2"] !== "undefined") {
        graph[`${key_a}_${key_b}_int2`] = graph[`${key_a}_${key_b}_int2`] || {};
    }
    

    let a_key;
    let b_key;

    for(let i = 0; i < inner.lenght; i++){
        a_key = paths[key_a][key_b];
        b_key = paths[key_b][inner[i]];

        graph[`${key_a}_${key_b}_int1`][`${key_b}_${inner[i]}_int1`] = 
            calculate_length(a_key["int1"], b_key["int1"]);
        
        if (typeof b_key["int2"] !== "undefined"){
            graph[`${key_a}_${key_b}_int1`][`${key_b}_${inner[i]}_int2`] =
                calculate_length(a_key["int1"], b_key["int2"]);
        }

        if(typeof a_key["int2"] !== "undefined"){
            graph[`${key_a}_${key_b}_int2`][`${key_b}_${inner[i]}_int1`] =
                calculate_length(a_key["int2"], b_key["int1"]);
        }

        if (typeof a_key["int2"] !== "undefined" && typeof b_key["int2"] !== "undefined") {
            graph[`${key_a}_${key_b}_int2`][`${key_b}_${inner[i]}_int2`] =
                calculate_length(a_key["int2"], b_key["int2"]);
        }

       
    }
    return;  
};

const calculate_length = (point1, point2) => {
    return Math.hypot((point1.x - point2.x), (point1.y - point2.y));
}


module.exports = {graph_builder};