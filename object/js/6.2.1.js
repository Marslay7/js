/**
 * 工厂模式：抽象了创建具体对象的过程，用函数来封装以特定借口创建对象的细节
 * 优点：解决了创建多个相似对象的问题
 * 缺点：没有解决对象识别的问题(即怎样知道一个对象的类型)
 */
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
console.log("person1:" + person1, "person2:" + person2);
