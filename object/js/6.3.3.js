/**
 * 组合继承(伪经典继承),最常用继承模式
 * 基本思路：使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承
 * 这样既通过在原型上定义方法实现了函数的复用，又能够保证每个实例都有它自己的属性
 *
 * 缺点：
 * 无论什么情况下，都会调用两次超类型构造函数
 * 一次是在创建子类型原型的时候，
 * 另一次是在子类型构造函数内部
 *
 * SuperType构造函数定义了2个属性：name和colors
 * SuperType的原型定义了1个方法：sayName()
 * SubType构造函数在调用SuperType构造函数时传入了name参数，同时也定义了自己的age属性
 * SubType的原型成为SuperType的实例
 * 在该新原型上新增sayAge()方法
 * 这样一来，就可以让两个不同的SubType实例既分别拥有自己属性(包括colors)，又可以使用相同方法了
 */
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
  console.log(this.name);
};

function SubType(name, age) {
  // 继承属性
  SuperType.call(this, name); // 第二次调用SuperType()

  this.age = age;
}

// 继承方法
SubType.prototype = new SuperType(); // 第一次调用SuperType()
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
  console.log(this.age);
};

var instance1 = new SubType("Lay", 30);
instance1.colors.push("black");
console.log(instance1.colors);
instance1.sayName();
instance1.sayAge();

var instance2 = new SubType("Summer", 28);
console.log(instance2.colors);
instance2.sayName();
instance2.sayAge();
