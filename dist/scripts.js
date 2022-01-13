'use strict';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var randomize = function randomize(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
},
    getNumber = function getNumber(arr, draw) {
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
    checkDuplicates = function checkDuplicates(arr, elm) {
  return arr.indexOf(elm) == -1;
},
    checkTens = function checkTens(arr, elm) {
  return arr.indexOf(elm - 10) != -1 || arr.indexOf(elm + 10) != -1;
},
    checkAdj = function checkAdj(arr, elm) {
  return arr.indexOf(elm - 1) != -1 || arr.indexOf(elm + 1) != -1;
},
    outOfBounds = function outOfBounds(arr, elm) {
  return arr.reduce(sumThisUp, 0) + elm < 86 || arr.reduce(sumThisUp, 0) + elm > 129;
},
    sumThisUp = function sumThisUp(accumulator, a) {
  return accumulator + a;
},
    createOneSet = function createOneSet(draw) {
  var arr = [];

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
    containsAll = function containsAll(needles, haystack) {
  for (var i = 0; i < needles.length; i++) {
    return haystack.indexOf(needles[i]) == -1;
  }

  return true;
},
    getMyPicks = function getMyPicks(tix) {
  var myPicks = [];

  while (myPicks.length < tix) {
    var newArr = createOneSet(false);

    if (checkDuplicates(myPicks, newArr)) {
      myPicks.push(newArr);
    }
  }

  return myPicks;
},
    checkPicksStats = function checkPicksStats(pix) {
  var days = 0;
  var draw = 0;
  var hit = false;
  pix = typeof pix == 'string' ? [pix.split(',').map(Number)] : pix;

  do {
    days += 1;
    draw = createOneSet(true);

    var _iterator = _createForOfIteratorHelper(pix),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var pick = _step.value;

        if (containsAll(pick, draw)) {
          hit = true;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } while (!hit);

  return days;
};

exports.getMyPicks = getMyPicks;
exports.checkPicksStats = checkPicksStats;