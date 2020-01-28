/**
 * 组合使用构造函数模式和原型模式
 * 构造函数模式用于定义实例属性
 * 原型模式用于定义方法和共享属性
 * 这样每个实例都会有自己的一份实例属性的副本，同时又共享着对方法的引用；最大限度节约了内存
 * 另外，这种混合模式还支持向构造函数传递参数
 * 这种构造函数与原型混成的模式，是目前使用最广泛、认同度最高的一种创建自定义类型的方法(默认模式)
 */
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.friends = ["Shelby", "Court"];
}

Person.prototype = {
  constructor: Person,
  sayName: function() {
    console.log(this.name);
  }
};

var person1 = new Person("Lay", 30, "web engineer");
var person2 = new Person("Summer", 28, "other");

person1.friends.push("Scott");

console.log("person1.friends:" + person1.friends);
console.log("person2.friends:" + person2.friends);
console.log(
  "person1.friends == person2.friends:" + (person1.friends == person2.friends)
);
console.log(
  "person1.sayName == person2.sayName:" + (person1.sayName == person2.sayName)
);
