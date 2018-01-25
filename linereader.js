const readline = require("readline");
const {algorithm} = require("./algorithms");

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
        console.log("Przetwarzam dane………");
        console.log(algorithm(points, extra_points));
        return;
    });


};

const catcher = (type, input) => {

    if (type === "max") {
        max = parseInt(input);
        console.log("podaj dane nadajnika: ");

    } else if (type === "point" || type === "extra_point") {

        if (points.length < max) {
            input = input.split(" ");
            points.push({
                x: parseInt(input[0]),
                y: parseInt(input[1]),
                r: parseInt(input[2])
            });
            points.length < max ? console.log("podaj dane nadajnika: ") : console.log("podaj współrzędne punktu startowego: ");

        } else if (type === "extra_point" && extra_points.length < extra_points_max) {

            input = input.split(" ");
            extra_points.push({
                x: parseInt(input[0]),
                y: parseInt(input[1])
            });
            extra_points.length < 2 ? console.log("podaj współrzędne punktu końcowego: ") : '';
        
        }
    } else {

        console.error("Too many!!!");
        rl.close();
    }

};

module.exports = {line_reader}