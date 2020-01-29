/**
 * 小结
 */

/**
 * 问题一：借用构造函数是如何实现的，缺点是什么？
 *
 * 缺点是复用性差，方法都定义在构造函数内部
 */
function F() {
  this.colors = ["red", "blue", "green"];
}

function C() {
  F.call(this);
}

var test1 = new C();
test1.colors.push("white");

var test2 = new C();
console.log(test1.colors, test2.colors);

/**
 * 问题二：组合继承、寄生组合式继承区别是什么？
 *
 * 组合继承是最常用继承模式，寄生组合式继承是引用类型最理想的继承方式。
 *
 * 组合继承 = 原型链继承+借用构造函数继承
 * 优点：既通过在原型上定义方法实现了函数的复用，又能够保证每个实例都有自己的属性
 * 缺点：组合继承会调用2次超类型构造函数，会在子类的原型上添加不必要的、多余的属性
 *
 * 寄生组合式继承：优化组合继承
 * 优点：只调用1次超类型构造函数，避免了在子类的原型上添加不必要、多余的属性
 *      原型链保持不变
 */

/**
 * 问题三：原型式继承和寄生式继承的关系？
 *
 * 寄生式继承和原型式样继承紧密相关，
 * 寄生式继承的实现是在原型式基础上
 *
 * 原型式继承的实现创建了个object函数
 * 寄生式继承通过object函数实现
 * 也可以通过Object.create()新建一个新对象
 */

// 原型式继承
function object(o) {
  function F() {}
  f.prototype = o;
  return new F();
}

// 寄生式继承
function a(item) {
  var clone = object(item);
  clone.sayHi = function() {
    console.log("Hi");
  };
  return clone;
}
