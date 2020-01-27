/**
 * 创建对象
 * 1.工厂模式：抽象了创建具体对象的过程，用函数来封装以特定借口创建对象的细节
 * 2.构造函数模式：创建特定类型的对象，定义自定义对象类型的属性和方法
 * 3.原型模式：
 */

// 工厂模式优点：解决了创建多个相似对象的问题
// 缺点：没有解决对象识别的问题(即怎么直到一个对象的类型)
function createPerson(name, age, job) {
  var o = new Object();
  o.name = name;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  };
  return o;
}

var person1 = createPerson("Lay", 30, "web engineer");
var person2 = createPerson("Summer", 29, "other");
console.log(person1, person2);

// 构造函数重写
// 优点：创建自定义的构造函数意味着将来可以将它的实例标识为一种特定的类型
// 缺点：创建了多份完成同样任务的Function实例
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function() {
    console.log(this.name);
  };
}

/**
 * 1.创建一个新对象
 * 2.将构造函数的作用域赋给新对象(this指向新对象)
 * 3.执行构造函数中的代码(为新对象添加属性和方法)
 * 4.返回新对象
 */

// 当作构造函数使用
var person = new Person("Lay", 30, "web engineer");
console.log(person);
// 新对象person既是Object的实例，也是Person的实例
console.log(person instanceof Person, person instanceof Object);

// 当作普通函数使用,添加到Global对象(浏览器为window)
Person("Lay", 30, "web engineer");
console.log(window.name);

// 在另一个对象的作用域中使用
var o = new Object();
Person.call(o, "Lay", 30, "web engineer");
console.log(o.name);
