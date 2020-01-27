// 属性对象
/**
 * 2.访问器属性
 * 访问器属性不包含数据值，在读取访问器属性时调用getter函数，在写入访问器属性时调用setter函数
 * 数据属性的4个描述其行为的特性
 * configurable:表示能否修改属性的特性或通过delete删除并重新定义属性，或能否把属性修改为访问性属性
 * enumerable:枚举，表示能否通过fon-in循环返回属性
 * get:在读取属性时调用的函数。默认值为undefined
 * set:在写入属性时调用的函数。默认值为undefined
 *
 * 访问器属性不能直接定义，必须使用Object.defineProperty(属性所在对象,属性的名字,描述符对象(上述4个之一或多个值))来定义
 */

var book = {
  _year: 2020,
  edition: 1
};

Object.defineProperty(book, "year", {
  get: function() {
    return this._year;
  },
  set: function(newValue) {
    if (newValue > 2020) {
      this._year = newValue;
      this.edition += newValue - 2020;
    }
  }
});

book.year = 2021;
console.log(book);
