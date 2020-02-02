/**
 * 定义多个属性
 * Object.defineProperties(对象,{})
 */
var book = {};

// 定义了2个数据属性(_year,editon)和1个访问器属性year
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

book = {
  year: 2021,
  edition: 1
};
console.log(book);
