'use strict'

var randomize = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  },
  getNumber = (arr, draw) => {
    var getNewNum = randomize(1, 43);
    if (!draw) {
      if (checkTens(arr, getNewNum)) {
        return false;
      } else if (checkAdj(arr, getNewNum)) {
        return false;
      } else if (outOfBounds(arr, getNewNum)) {
        return false;
      }
    }
    return getNewNum;
  },
  checkDuplicates = (arr, elm) => {
    return arr.indexOf(elm) == -1;
  },
  checkTens = (arr, elm) => {
    return arr.indexOf(elm - 10) != -1 || arr.indexOf(elm + 10) != -1;
  },
  checkAdj = (arr, elm) => {
    return arr.indexOf(elm - 1) != -1 || arr.indexOf(elm + 1) != -1;
  },
  outOfBounds = (arr, elm) => {
    arr.reduce(sumThisUp, 0) + elm < 86 || arr.reduce(sumThisUp, 0) + elm > 129;
  },
  sumThisUp = (accumulator, a) => {
    return accumulator + a;
  },
  createOneSet = draw => {
    let arr = [];

    while (arr.length < 5) {
      var newNumber = getNumber(arr, draw);

      if (checkDuplicates(arr, newNumber) && newNumber) {
        arr.push(newNumber);
      }
    }

    return arr.sort(function (a, b) {
      return a - b;
    });
  },
  containsAll = (needles, haystack) => {
    for (var i = 0; i < needles.length; i++) {
      if (haystack.indexOf(needles[i]) == -1) return false;
    }
    return true;
  },
  getMyPicks = tix => {
    let myPicks = [];
    while (myPicks.length < tix) {
      var newArr = createOneSet(false);
      if (checkDuplicates(myPicks, newArr)) {
        myPicks.push(newArr);
      }
    }
    return myPicks;
  },
  checkPicksStats = pix => {
    var days = 0;
    var draw = 0;
    var hit = false;

    pix = typeof pix == 'string' ? [pix.split(',').map(Number)] : pix

    do {
      days += 1;
      draw = createOneSet(true)
      for (let pick of pix) {
        if (containsAll(pick, draw)) {
          hit = true
        }
      }
    } while (hit == false)
    return days
  };

exports.getMyPicks = getMyPicks;
exports.checkPicksStats = checkPicksStats;
