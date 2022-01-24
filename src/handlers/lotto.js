const helpers = require("./helpers");

exports.version = "1.0.0";

exports.handle_pick_request = (req, res) => {
    generate_pick((err, pick) => {
        if (err) {
            helpers.send_failure(res, 500, err);
            return;
        }
        helpers.send_success(res, { pick: pick });
    });
};

const generate_pick = (callback) => {
    let pick = [];
    try {
        while (pick.length <= 5) {
            const draw = randomize(1, 43);
            pick.push(draw);
        }
    } catch (error) {
        callback(helpers.make_error("Errow with pick", JSON.stringify(error)));
    }
    callback(null, pick);
};

const randomize = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    // Test bounds
    if (isNaN(min) || isNaN(max)) throw "Bounds must be integers!";
    if (min > max) throw "Min is higher than Max!";
    if (min <= 0 || max <= 0) throw "Bounds cannot be less than 0!"
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

const checkDuplicates = (arr, elm) => arr.indexOf(elm) == -1;

const checkTens = (arr, elm) => {
    try {
        arr.indexOf(elm - 10) != -1 || arr.indexOf(elm + 10) != -1;
    } catch (error) {
        console.log(`You have an error: ${error}`);
    }
};

const checkAdj = (arr, elm) => {
    try {
        arr.indexOf(elm - 1) != -1 || arr.indexOf(elm + 1) != -1;
    } catch (error) {
        console.log(`You have an error: ${error}`);
    }
};

const outOfBounds = (arr, elm) => {
    try {
        arr.reduce(sumThisUp, 0) + elm < 86 ||
            arr.reduce(sumThisUp, 0) + elm > 129;
    } catch (error) {
        console.log(`You have an error: ${error}`);
    }
};

const sumThisUp = (accumulator, a) => accumulator + a;

const createOneSet = (draw) => {
    let arr = [];

    while (arr.length < 5) {
        const newNumber = getNumber(arr, draw);

        if (checkDuplicates(arr, newNumber) && newNumber) {
            arr.push(newNumber);
        }
    }

    return arr.sort(function (a, b) {
        return a - b;
    });
};

const containsAll = (needles, haystack) => {
    for (let i = 0; i < needles.length; i++) {
        if (haystack.indexOf(needles[i]) == -1) return false;
    }
    return true;
};

const getMyPicks = (tix) => {
    let myPicks = [];
    while (myPicks.length < tix) {
        const newArr = createOneSet(false);
        if (checkDuplicates(myPicks, newArr)) {
            myPicks.push(newArr);
        }
    }
    return myPicks;
};

const checkPicksStats = (pix) => {
    let days = 0;

    pix = typeof pix == "string" ? [pix.split(",").map(Number)] : pix;

    do {
        days++;
        let draw = createOneSet(true);
        for (let pick of pix) {
            if (containsAll(pick, draw)) {
                return days;
            }
        }
    } while (true);
};
