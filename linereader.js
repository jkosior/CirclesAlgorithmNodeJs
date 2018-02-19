const readline = require("readline");
const {algorithm} = require("./algorithms");
const verify = require("./verify");
const Graph = require("./graph");
const Dijkstra = require("./dijkstra");

const graph_builder = Graph.graph;
const dijkstra_algorithm = Dijkstra.dijkstra_algorithm;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let points = [];
let extra_points = [];
let extra_points_max = 2;
let max;

const line_reader = () => {
    
    rl.question("Ile jest nadajników?", answer => catcher("max", answer));

    rl.on("line", (answer) => {
        let type = points.length >= max ? "extra_point" : "point";
        catcher(type, answer);
        if (extra_points.length === 2) rl.close();
    });

    rl.on("close", () => {
        
        const posbility = algorithm(points, extra_points);
        
        graph_builder();

        const output_data = dijkstra_algorithm();

        console.log("Przetwarzam dane………");
        console.log(posbility);
        

        console.log("Najkrótsza trasa : "+ output_data.path);
        console.log("Całkowita trasa przelotu: " + output_data.cost);
        return;
    });


};

const catcher = (type, input) => {

    if (type === "max") {
        max = verify.number(input);
        console.log("podaj dane nadajnika: ");

    } else if (type === "point" || type === "extra_point") {

        if (points.length < max) {
            let vfd_circle = verify.arguments(input.split(" "), 3);
            
            points.push({
                x: vfd_circle[0],
                y: vfd_circle[1],
                r: vfd_circle[2]
            });
            points.length < max ? console.log("podaj dane nadajnika: ") : console.log("podaj współrzędne punktu startowego: ");

        } else if (type === "extra_point" && extra_points.length < extra_points_max) {

            let vfd_point = verify.arguments(input.split(" "), 2);
            extra_points.push({
                x: vfd_point[0],
                y: vfd_point[1]
            });
            extra_points.length < 2 ? console.log("podaj współrzędne punktu końcowego: ") : '';
        
        }
    }else{
        
        console.log("Too many");
        rl.close();
    }

};

module.exports = {line_reader}