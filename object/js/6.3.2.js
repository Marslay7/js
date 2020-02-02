/**
 * 借用构造函数(伪造对象或经典继承)
 * 基本思想：即在子类型构造函数的内部调用超类型构造函数
 * 通过使用apply()和call()方法可以在(将来)新创建的对象上执行构造函数
 * 优势：即可以在子类型构造函数中向超类型构造函数传递参数
 * 劣势：方法都在构造函数中定义，无法复用
 *      在超类型的原型中定义的方法，对子类型而言不可见，结果所有类型都只能使用构造函数模式
 */
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

/**
 * 这里实际上是在(未来将要)新创建的SubType实例的环境下调用了SuperType构造函数
 * 这样一来，就会在新的SubType对象上执行SuperType()函数中定义的所有对象初始化代码
 * 结果，SubType的每个实例就都会具有自己的colors属性的副本了
 */
function SubType() {
  // 继承了SuperType,同时传递参数
  SuperType.call(this, "Lay");

  // 实例属性
  this.age = 30;
}

var instance1 = new SubType();
instance1.colors.push("black");
console.log(instance1.colors);

var instance2 = new SubType();
console.log(instance2.colors);

var instance = new SubType();
console.log(instance.name, instance.age);
