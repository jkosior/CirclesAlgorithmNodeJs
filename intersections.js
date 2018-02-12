const paths = {};

const intersection = (first, second) => {
    let two_centre = Math.hypot((first.x - second.x), (first.y - second.y));
    let two_radius = first.r + second.r;

    if (two_centre <= two_radius) {
        points_of_intersection(first, second, two_centre);
        console.log(paths);
        return true;
    }

    return false;
};


/**
 * Based on:
 * 
 * (x - x1)^2 + (y - y1)^2 = r1^2
 * (x - x2)^2 + (y - y2)^2 = r2^2
 * 
 */

const points_of_intersection = (first, second, R) => {
    let index = first.x + "" + first.y + "" + first.r;

    let Radius2 = Math.pow(R, 2);
    let Radius4 = Math.pow(R, 4);

    let f_radius2 = Math.pow(first.r, 2);
    let s_radius2 = Math.pow(second.r, 2);

    let sf_radius = (f_radius2 - s_radius2);

    let help_a = sf_radius / (2 * Radius2);
    let help_b = Math.sqrt(2 * (f_radius2 + s_radius2) / Radius2 - Math.pow(sf_radius, 2) / Radius4 - 1);

    let fx = (first.x + second.x) / 2 + help_a * (second.x - first.x);
    let gx = help_b * (second.y - first.y) / 2;

    let intersection1_x = fx + gx;
    let intersection2_x = fx - gx;

    let fy = (first.y + second.y) / 2 + help_a * (second.y - first.y);
    let gy = help_b * (first.x - second.x) / 2;

    let intersection1_y = fy + gy;
    let intersection2_y = fy - gy;

    return intersection1_x !== intersection2_x && intersection1_y !== intersection2_y ?
        
        paths[index] = {
            "int1": {
                x: intersection1_x,
                y: intersection1_y
            },
            "int2": {
                x: intersection2_x,
                y: intersection2_y
            }
        } :
        
        paths[index] = {
            "int0": {
                x: intersection1_x,
                y: intersection1_y
            }
        };

};

module.exports = {intersection};