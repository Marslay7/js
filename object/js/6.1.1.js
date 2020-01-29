/**
 * 属性对象
 * 1.数据属性
 * 数据属性的4个描述其行为的特性
 * configurable:表示能否修改属性的特性或通过delete删除并重新定义属性，或能否把属性修改为访问性属性
 * enumerable:枚举，表示能否通过fon-in循环返回属性
 * writable:表示能否修改属性的值
 * value:包含这个属性的数据值，读取属性值的时候，从这里读；写入属性值的时候，把新值保存到这个位置；这个特性的默认值为undefined
 *
 * 通过Object.defineProperty(属性所在对象,属性的名字,描述符对象(上述4个之一或多个值))修改属性默认的特性
 */

// 设置对象person的name属性的特性值只读，不可修改；
// 一旦把属性定义为不可配置的，就在也不能把它变回可配置的了(重复使用Object.defineProperty()设置无效)
// 如果尝试重新赋值，在非严格模式下，赋值操作将被忽略；
// 在严格模式下抛出错误:Uncaught TypeError: Cannot assign to read only property 'name' of object '#<Object>'
"use strict";
var person = {};
Object.defineProperty(person, "name", {
  writable: false,
  value: "Lay"
});

console.log(person.name);

// 抛出错误:Uncaught TypeError: Cannot redefine property: name
Object.defineProperty(person, "name", {
  writable: true,
  value: "Lay"
});

person.name = "Summer";
console.log(person.name);

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
