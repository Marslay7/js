/**
 * 寄生式继承(与寄生构造函数和工厂模式类似)
 * 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来增强对象，最后像真是是它做了所有工作一样返回对象
 *
 * 使用场景：
 * 在主要考虑对象而不是自定义类型和构造函数的情况下
 *
 * 这个例子中，createAnother()函数接收参数original
 * 也就是将要作为新对象基础的对象
 * 接着把original传递给Object.create()函数，将返回的结果赋值给clone
 * 再为clone对象新增一个sayHi()方法
 * 最后返回clone对象
 */
function createAnother(original) {
  // 通过调用函数创建一个新对象
  var clone = Object.create(original);

  // 以某种方式来增强对象
  clone.sayHi = function() {
    console.log("Hi");
  };

  //  返回这个对象
  return clone;
}

var person = {
  name: "Lay",
  friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = createAnother(person);
anotherPerson.sayHi();
