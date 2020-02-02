/**
 * 寄生组合式继承(引用类型最理想的继承范式)
 * 即通过借用构造函数来继承属性，通过原型链的混成形式来继承方法
 *
 * 基本思路：
 * 本质上，就是使用寄生式继承来继承超类型的原型，然后将结果指定给子类型的原型
 *
 * 优势：
 * 1.高效率(只调用了一次SuperType构造函数)，因此避免了在Subtype.prototype上面创建不必要的、多余的属性
 * 2.原型链保持不变
 */
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

SuperType.prototype.sayName = function() {
  console.log(this.name);
};

function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

inheritPrototype(SubType, SuperType);

SubType.prototype.sayAge = function() {
  console.log(this.age);
};

var instance = new SubType("Lay", 30);
instance.sayName();
instance.sayAge();

/**
 * 寄生组合式继承最简单形式
 * inheritPrototype()函数接收两个参数
 * subType：子类型构造函数
 * superType：超类型构造函数
 *
 * 实现步骤：
 * 1.创建对象(创建超类型原型的一个副本)
 * 2.增强对象(为创建的副本添加constructor属性，弥补因重写原型而失去的默认的constructor属性)
 * 3.指定对象(将新创建的对象赋值给子类型的原型)
 */
function inheritPrototype(subType, superType) {
  // 创建对象
  var prototype = Object.create(superType.prototype);

  // 增强对象
  prototype.constructor = subType;

  // 指定对象
  subType.prototype = prototype;
}
