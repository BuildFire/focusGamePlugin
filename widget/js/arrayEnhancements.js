/**
 * Created by danielhindi on 1/10/18.
 */

function rnd(max){
    return Math.round(Math.random() * max);
}

Array.prototype.clone = function() {
    return this.slice(0);
};

Array.prototype.shuffle= function () {
    var array=this.clone();
    var newArray=[];
    while (array.length) {
        if (array.length == 1)
            newArray.push(array.pop());
        else {
            newArray.push(array.splice(rnd (array.length-1), 1)[0]);
        }
    }
    return newArray;
};

Array.prototype.randomPop = function() {
    return this.splice(rnd(this.length),1)[0];
};

Array.prototype.randomPick = function() {
    return this[rnd(this.length-1)]
};