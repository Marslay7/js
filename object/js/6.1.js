// 理解对象
// 此例中创建了一个person对象，并为它添加了3个属性和一个方法，sayName()方法中的this.name将被解析为person.name
var person = new Object();
person.name = "Lay";
person.age = 30;
person.job = "web engineer";

person.sayName = function() {
  console.log(this.name);
};

// 方法调用
person.sayName();

// 对象字面量语法可写成：
var person = {
  name: "Lay",
  age: 30,
  job: "web engineer",
  sayName: function() {
    console.log(this.name);
  }
};

person.sayName();
