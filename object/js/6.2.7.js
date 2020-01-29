/**
 * 稳妥构造函数模式：
 * 所谓稳妥对象，指的是没有公共属性，而且其方法也不引用this的对象。
 * 适用环境：一些安全的环境中(环境中会禁止使用this和new，或者在防止数据被其他应用程序改动时使用)
 *
 * 与寄生构造函数的区别：
 * 1.新创建的对象的实例方法不引用this
 * 2.不使用new操作符调用构造函数
 */

// 在这种模式下，只有sayName()方法可以访问name的值
function Person(name, age, job) {
  // 创建要返回的对象
  var o = new Object();

  // 可以在这里定义私有变量和函数

  // 添加方法
  o.sayName = function() {
    console.log(name);
  };

  // 返回对象
  return o;
}

var friend = Person("Lay", 30, "web engineer");
friend.sayName();
