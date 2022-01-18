const randomize = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
};

const getNumber = (arr, draw) => {
  let getNewNum = randomize(1, 43);
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
    arr.reduce(sumThisUp, 0) + elm < 86 || arr.reduce(sumThisUp, 0) + elm > 129;
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

// const containsAll = (needles, haystack) => {
//   for (let i = 0; i < needles.length; i++) {
//     try {
//       return haystack.indexOf(needles[i]) == -1;
//     } catch (error) {
//       console.log(`You have an error: ${error}`);
//     }
//   }
//   return true;
// };

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
  return pix
  // let days = 0;

  // pix = typeof pix == "string" ? [pix.split(",").map(Number)] : pix;

  // while (true) {
  //   days++;
  //   let draw = createOneSet(true);
  //   for (let pick of pix) {
  //     if (containsAll(pick, draw)) {
  //       return days
  //     }
  //   }
  // }
};

exports.checkPicksStats = checkPicksStats;
exports.getMyPicks = getMyPicks;