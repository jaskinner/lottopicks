var randomize = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  },
  getNumber = function (arr, getPicks) {
    var getNewNum = randomize(1, 43);
    if (getPicks) {
      if (checkTens(arr, getNewNum)) {
        return false;
      } else if (checkNext(arr, getNewNum)) {
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
  checkNext = function (arr, elm) {
    return arr.indexOf(elm - 1) != -1 || arr.indexOf(elm + 1) != -1;
  },
  outOfBounds = function (arr, elm) {
    arr.reduce(sumThisUp, 0) + elm < 86 || arr.reduce(sumThisUp, 0) + elm > 129;
  },
  sumThisUp = function (accumulator, a) {
    return accumulator + a;
  },
  createLottoPicks = function () {
    arr = [];

    while (arr.length < 5) {
      var newNumber = getNumber(arr, false);

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
      if ($.inArray(needles[i], haystack) == -1) return false;
    }
    return true;
  },
  fillParent = function () {
    var parentArr = [];
    var number = 0;
    while (parentArr.length < (365 * 15)) {
      var newArr = createLottoPicks();
      number += 1;
      if (checkDuplicates(parentArr, newArr)) {
        parentArr.push(newArr);
      }
      if (
        containsAll([8, 13, 26, 30, 38], newArr) ||
        containsAll([10, 16, 22, 33, 37], newArr) ||
        containsAll([12, 14, 20, 33, 41], newArr)
      ) {
        console.log(number);
        return false;
      }
    }
    return parentArr;
  };

this.fillParent();
