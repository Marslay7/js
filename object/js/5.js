/**
 * 读取属性的特征
 * Object.getOwnPropertyDescriptor(属性所在对象,属性名称)可以取得给定属性的描述符，返回值是一个对象
 * 如果是数据属性，这个对象的属性有(configurable、enumerable、get、set)
 * 如果是访问器熟悉过，这个对象的属性有(configurable、enumerable、writable、value)
 */
var book = {};
Object.defineProperties(book, {
  _year: {
    writable: true,
    value: 2020
  },
  edition: {
    writable: true,
    value: 1
  },
  year: {
    get: function() {
      return this._year;
    },
    set: function(newVal) {
      if (newVal > 2020) {
        edition += newVal - 2020;
      }
    }
  }
});

var descriptor = Object.getOwnPropertyDescriptor(book, "_year");
console.log(descriptor);
