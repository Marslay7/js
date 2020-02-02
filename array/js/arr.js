/**
 * 数组7君子
 * push
 * pop
 * shift
 * unshift
 * splice
 * sort
 * reverse
 */

// 创建一个空数组
var array = new Array();

/**
 * 数组元素的添加
 * pop 将一个或多个新元素添加到数组结尾，并返回数组新长度
 * unshirt 将一个或多个新元素添加到数组开始，数组中的元素自动后移，并返回数组新长度
 * splice 将一个或多个新元素插入到数组指定位置，插入位置的元素自动后移，返回"“
 */

array.push(1);
console.log(array); // [1]

array.unshift(2);
console.log(array); // [2,1]

array.splice(0, 0, 3);
console.log(array); // [3,2,1]

/**
 * 数组元素的删除
 * pop 移除数组最后一个元素并返回该元素值
 * shift 移除数组第一个元素并返回该元素值，数组中元素自动后移
 * splice 移除数组中指定位置开始的指定数量的元素，并以数组形式返回所移除的元素
 */
array.pop();
console.log(array); // [3,2]

array.shift();
console.log(array); // [2]

array.splice(0, 1);
console.log(array); // []

/**
 * 数组元素的排序
 * sort 顺序
 * reverse 倒序
 */
var array2 = [1, 2, 3, 4, 5, 6, 7];

array2.reverse();
console.log(array2); // [7,6,5,4,3,2,1]

array2.sort();
console.log(array2); // [1,2,3,4,5,6,7]
