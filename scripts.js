var randomize = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  },
  getNumber = function (arr, draw) {
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
  checkDuplicates = function (arr, elm) {
    return arr.indexOf(elm) == -1;
  },
  checkTens = function (arr, elm) {
    return arr.indexOf(elm - 10) != -1 || arr.indexOf(elm + 10) != -1;
  },
  checkAdj = function (arr, elm) {
    return arr.indexOf(elm - 1) != -1 || arr.indexOf(elm + 1) != -1;
  },
  outOfBounds = function (arr, elm) {
    arr.reduce(sumThisUp, 0) + elm < 86 || arr.reduce(sumThisUp, 0) + elm > 129;
  },
  sumThisUp = function (accumulator, a) {
    return accumulator + a;
  },
  createOneSet = function (draw) {
    arr = [];

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
  containsAll = function (needles, haystack) {
    for (var i = 0; i < needles.length; i++) {
      if (haystack.indexOf(needles[i]) == -1) return false;
    }
    return true;
  },
  getMyPicks = function (tix) {
    var myPicks = [];
    while (myPicks.length < tix) {
      var newArr = createOneSet(false);
      if (checkDuplicates(myPicks, newArr)) {
        myPicks.push(newArr);
      }
    }
    return myPicks;
  },
  checkPicksStats = function (pix) {
    var days = 0;
    var draw = 0;
    var hit = false;

    pix = typeof pix == 'string' ? [pix.split(',').map(Number)] : pix

    do {
      days += 1;
      draw = createOneSet(true)
      for (pick of pix) {
        if (containsAll(pick, draw)) {
          hit = true
        }
      }
    } while (hit == false)
    return days
  };

exports.getMyPicks = getMyPicks;
exports.checkPicksStats = checkPicksStats;
