const verify = {
    
    number: function(element) {
        let number = parseFloat(element.replace(/,/g, "."));
        if(isNaN(number)){
            throw new Error("given element is not a number");
        }
        return number;
    },

    arguments: function(arr, lgh){
        if(arr.length < lgh){
            throw new Error("not enough params");
        } else if (arr.length > lgh){
            throw new Error("too many params");
        }
        return arr.map(param => this.number(param));
    }

}


module.exports = verify;