/**
 * 原型链：基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法
 *   构造函数、原型和实例的关系：
 *    每一个构造函数都有一个原型对象(构造函数.prototype)，
 *    原型对象都包含一个指向构造函数的指针(constructor属性)，
 *    而实例都包含一个指向原型对象的内部指针(__proto__)
 *
 * 原型链基本模式：
 * 以下代码定义了2个类型：SuperType(超类型即父类)和SubType(子类)
 * 每个类型分别有一个属性和一个方法
 * 主要区别是SubType继承了SubType
 *
 * 实现原理：
 * 通过创建SubType的实例，并将该实例赋给SubType.prototype
 * 本质上是重新原型对象，代之以一个新类型的实例
 * 也就是说，原来存在SubType的实例中属性和方法，现在也存在与SubType.prototype中
 *
 * 指向关系：
 * instance =>>> SubType.prototype =>>> SuperType.prototype
 * getSuperValue()方法仍然还在SuperType.prototype中，
 * 但property则位于SubType.prototype中(getiSuperValue()是原型方法，property是实例属性)
 *
 * 原型链存在的问题：
 * 1.包含引用类型值的原型(通过引用实例改变了原型中的值，也会影响其他实例)
 *   *这也就是为什么引用类型值要定义在构造函数中而非原型中的原因
 * 2.没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数
 */
function SuperType() {
  this.property = true;
}

SuperType.prototype.getSuperValue = function() {
  return this.property;
};

function SubType() {
  this.subproperty = true;
}

// 继承了SuperType
SubType.prototype = new SuperType();

SubType.prototype.getSuperValue = function() {
  return this.subproperty;
};

/**
 * instance,constructor指向SuperType
 * 因为SubType的原型指向了另一个对象SuperType.prototype,
 * 而SuperType.prototype的constructor属性指向的是SuperType
 */
var instance = new SubType();
console.log(
  "instance.constructor指向：" + instance.constructor,
  "SuperType.prototype.constructor指向：" + SuperType.prototype.constructor
);

/**
 * 默认的原型
 * 所有引用类型默认都继承了Object
 * 所有函数的默认原型都是Object的实例，
 * 所以所有自定义类型都会继承toString()、valueOf()等默认方法
 *
 * 继承关系：
 * Object =>>> SuperType =>>> SubType
 * 当调用instance.toString()，实际上调用的是保存在Object.prototype中的方法
 */
console.log(instance.toString());

/**
 * 确定原型和实例的关系
 * 方法一：instanceof
 * 方法二：isPrototypeOf(只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型)
 */

console.log(
  "instance是Object、SuperType、SubType的实例：" +
    (instance instanceof Object &&
      instance instanceof SuperType &&
      instance instanceof SubType)
);

console.log(
  "Object、SuperType、SubType是instance实例的原型：" +
    (Object.prototype.isPrototypeOf(instance) &&
      SuperType.prototype.isPrototypeOf(instance) &&
      SubType.prototype.isPrototypeOf(instance))
);

/**
 * 谨慎地定义方法
 * 给原型添加方法必须要先替换原型
 */

// 重写超类型中的方法
SubType.prototype.getSuperValue = function() {
  return false;
};

// 继承了SuperType
SubType.prototype = new SuperType();

/**
 * 使用字面量添加新方法，会导致上一行代码无效
 * 由于现在SubType.prototype包含的是一个Object的实例，而非SuperType的实例
 * 设想中的原型链已被切断
 * SubType和SuperType之间已经没有关系了
 */
SubType.prototype = {
  getSuperValue: function() {
    return this.subproperty;
  },
  someOtherMethod: function() {
    return false;
  }
};

/**
 * 原型链存在的问题
 * 1.包含引用类型值的原型(通过引用实例改变了原型中的值，也会影响其他实例)
 *   *这也就是为什么引用类型值要定义在构造函数中而非原型中的原因
 * 2.没有办法在不影响所有对象实例的情况下，给超类型的构造函数传递参数
 */
function SuperType1() {
  this.colors = ["red", "blue", "green"];
}

function SubType1() {}

// 继承了SuperType
SubType1.prototype = new SuperType1();

var instance1 = new SubType1();
instance1.colors.push("black");
console.log(instance1.colors);

var instance2 = new SubType1();
console.log(instance2.colors);
