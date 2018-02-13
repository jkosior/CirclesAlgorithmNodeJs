const Intersections = require("./intersections");
const Graph = require("./graph");

const intersection = Intersections.intersection;
const append = Intersections.append;
const app_key = Graph.app_key;




const point_in_circle = (arr, point) =>{
    let powx;
    let powy;
    let powr;
   
    return arr.filter(cir => {
        powx = Math.pow((cir.x - point.x), 2);
        powy = Math.pow((cir.y - point.y), 2);
        powr = Math.pow(cir.r, 2)
        return powx + powy <= powr;
    });

};

const recur = (prev, start, end, array) =>{
    if(intersection(start, end)){
        return true;
    } else {
        prev.push(start);
        let rest_array = not_in(array, prev);
        let filtered_rest = rest_array.filter(element => intersection(start, element));

        if(filtered_rest.length > 0){

            let checked_array = filtered_rest.map(element =>{
                return recur(prev, element, end, array);
            });

            if (filtered_rest.length === 1 && filtered_rest[0] === end && checked_array.includes(true)){
                return true;
            }else{
                return checked_array;
            }
            
        }else{
            return false;
        }
    }
};

const not_in = (arrFirst, arrSecond) => {
    return arrFirst.filter(x => !arrSecond.includes(x));
};

const algorithm = (array, points) =>{
    let start = points[0];
    let end = points[1];
    
    let possible = "bezpieczny przelot jest możliwy";
    let impossible = "bezpieczny przelot nie jest możliwy";

    let startIn = point_in_circle(array, start);
    let endIn = point_in_circle(array, end);
    
    if(startIn.length === 0 || endIn.length === 0) {
        return impossible;    
    }

    append(start, startIn[0]);
    append(endIn[0], end);
    app_key(`${end.x}${end.y}0`);

    return recur([], startIn[0], endIn[0] ,array) ? possible : impossible;

};

module.exports = {algorithm};