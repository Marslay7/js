/**
 * 原型式继承
 * 借助原型可以基于已有的对象创建新对象
 *
 * 基本实现：
 * 在object()函数内部，先创建一个临时性的构造函数
 * 然后将传入的对象作为这个构造函数的原型
 * 最后返回这个临时类型的一个新实例
 * 从本质上讲，object()对传入其中的对象执行了一次浅复制
 *
 * 规范化：
 * Object.create(a,b)
 * a:一个用作新对象原型的对象
 * b:一个为新对象定义额外属性的对象(可选)
 *
 * Object.create()方法的第二个参数和Object.defineProperties()方法的第二个参数格式相同(字面量)
 * 每个属性都通过自己的描述符定义，以这种方式指定的任何属性都会覆盖原型对象上的同名属性
 */
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var person = {
  name: "Lay",
  friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = Object.create(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = Object.create(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person.friends);

// Object.create()方法的第二个参数使用
var anotherPerson1 = Object.create(person, {
  name: {
    value: "Greg"
  }
});

console.log(anotherPerson1.name);
