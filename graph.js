const Intersections = require("./intersections");
const paths = Intersections.paths;

let extra_key;
const graph = {};

const graph_builder = () =>{
    
    const key_arr = Object.keys(paths);

    for(let i =0; i < key_arr.length; i++){
        for(let j =0; j < key_arr.length; j++){
            if(key_arr[i] !== key_arr[j]){
                set_graph(key_arr[i], key_arr[j]);
            }
            
        }
    }
};

const set_graph = (key_a, key_b) =>{
    let a_key = paths[key_a];
    let b_key = paths[key_b];

    if (typeof a_key === "undefined" || typeof b_key === "undefined" ){
        return;
    }

    let a_key_values = Object.keys(a_key)
    let b_key_values = Object.keys(b_key)

    if (a_key_values.length === 0 || b_key_values === 0){
        return;
    }

    let a_key_helper = a_key[a_key_values];
    
    if(typeof a_key_helper === "undefined"){
        return;
    }

    let a_key_itns = Object.keys(a_key_helper);

    a_key_itns.forEach(itn =>{

        if(key_b in a_key){

            graph[`${key_a}__${key_b}__${itn}`] = graph[`${key_a}__${key_b}__${itn}`] || {};

            for(var i = 0; i < b_key_values.length; i++){

                if (itn !== "end"){
                    let b_k = b_key[b_key_values[i]];

                    if (b_k === "end") {
                        return;
                    }

                    for(el in b_k){
                        
                        graph[`${key_a}__${key_b}__${itn}`][`${key_b}__${b_key_values[i]}__${el}`] =
                            calculate_length(a_key_helper[itn], b_k[el]);
                            
                    }

                }
            }
            
        }
    });

};

const calculate_length = (point1, point2) => {
    return Math.hypot((point1.x - point2.x) - (point1.y, point2.y));
}

const return_graph = () =>{
    graph_builder();
    return graph;
};

const append_key = (key) => {
    paths[key] = {
         "end": "end"
    };
};




module.exports = {
    "graph": graph_builder,
    "app_key": append_key,
    "ret_graph": return_graph
};