/**
 * 创建对象
 * 1.工厂模式：抽象了创建具体对象的过程，用函数来封装以特定借口创建对象的细节
 * 2.构造函数模式：创建特定类型的对象，定义自定义对象类型的属性和方法
 * 3.原型模式：我们创建的每一个函数都有一个prototype属性；
 *   这个属性是一个指针，指向一个对象，这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法；
 *   prototype属性是通过调用构造函数创建的那个对象实例的原型对象，使用原型对象的好处是让所有对象实例共享它所包含的属性和方法；
 *   换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中
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
console.log("person1:" + person1, "person2:" + person2);

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
console.log("当作构造函数使用：" + person);
// 新对象person既是Object的实例，也是Person的实例
console.log(
  "新对象person既是Object的实例:" + (person instanceof Person),
  "也是Person的实例" + (person instanceof Object)
);

// 当作普通函数使用,添加到Global对象(浏览器为window)
Person("Lay", 30, "web engineer");
console.log(window.name);

// 在另一个对象的作用域中使用
var o = new Object();
Person.call(o, "Lay", 30, "web engineer");
console.log(o.name);

// 原型模式
function PersonProto() {}

PersonProto.prototype.name = "Lay";
PersonProto.prototype.age = 30;
PersonProto.prototype.job = "web engineer";
PersonProto.prototype.sayName = function() {
  console.log(this.name);
};

var personProto1 = new PersonProto();
personProto1.sayName();

var personProto2 = new PersonProto();
// true,说明personProto1和personProto2访问的是同一组属性和同一个sayName()函数
console.log(
  "personProto1和personProto2访问的是同一个sayName()函数" +
    (personProto1.sayName == personProto2.sayName)
);

/**
 * 理解原型对象
 * 只要创建一个函数，就会创建一个prototype属性，这个属性指向函数的原型对象；
 * 所有原型对象都会自动获得一个constructor(构造函数)属性，这个属性是一个指向prototype属性所在函数的指针
 * 即PersonProto.prototype.constructor指向PersonProto
 * 在上面的案例中，PersonProto.prototype.constructor指向PersonProto,而这个构造函数还可以继续为原型对象添加属性和方法
 * 当调用构造函数创建一个新实例后，该实例内部将包含一个指针[[Prototype]]，指向构造函数的原型对象，可以通过__proto__访问
 * 即personProto1.__proto__指向PersonProto.prototype
 */
console.log(personProto1.__proto__, PersonProto.prototype);

/**
 * 通过isPrototypeOf()方法来验证
 * 如果personProto1.__proto__指向调用isPrototypeOf()方法的对象PersonProto.prototype
 * 因为如果personProto1内部有一个指向PersonProto.prototype的指针,那么返回true
 */
console.log(
  "验证PersonProto是personProto1的原型：" +
    PersonProto.prototype.isPrototypeOf(personProto1)
);

/**
 * 通过Object.getPrototypeOf()方法获取原型对象
 *
 */
console.log(
  "验证实例personProto1的原型对象是否为PersonPhoto：",
  Object.getPrototypeOf(personProto1) == PersonProto.prototype
);

/**
 * 多个对象实例共享原型所保存的属性和方法的基本原理：
 * 1.解析器访问实例personPhoto1中有没有sayName()属性，如果有则返回值，如果没有则往上级搜素
 * 2.解析器继续访问personPhoto1的原型Person.prototype有没有sayName()属性，如果有就则返回，没有则抛出错误
 * 也就是说在调用实例属性或者方法的时候，会先后执行两次搜索
 *
 * 下方案例中给personPhoto1.name重新复制，从而屏蔽了默认值，在实例personPhoto1中搜索到想要的属性值，直接返回
 * personPhoto2则依然经过2次搜索，在原型PersonProto上返回属性值
 * 当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性；
 * *但是这个属性只会阻止访问原型中的那个属性，不会修改原型中的那个属性
 * 不过使用delete操作符则可以完全删除实例属性，从而能够重新访问原型中的属性(先赋值后删除的操作)
 *
 * 使用hasOwnProperty()方法可以检测一个属性是存在于实例中，还是存在于原型中；此方法只在给定属性存在于对象实例中才返回true
 *
 * 原型与in操作符
 * in操作符会在通过对象能够访问给定属性时返回true，无论该属性存在于实例中还是原型中
 */
console.log(
  "personProto1实例中有定义name属性：" + personProto1.hasOwnProperty("name")
);

personProto1.name = "Summer";
console.log("来自实例：" + personProto1.name, "来自原型：" + personProto2.name);
console.log(
  "personProto1实例中有定义name属性：" + personProto1.hasOwnProperty("name")
);

delete personProto1.name;
console.log("来自原型：" + personProto1.name);
console.log(
  "personProto1实例中有定义name属性：" + personProto1.hasOwnProperty("name")
);

/**
 * 封装函数：
 * 同时使用hasOwnProperty()方法和in操作符，就可以确定该属性到底是存在于对象中，还是原型中
 * 由于in操作符只要通过对象能够访问到属性就返回true,
 * hasOwnProperty()方法只有属性存在于实例中才返回true,
 * 因此只要in操作符返回true && hasOwnProperty()返回false
 * 即true && false(返回false),就可以确定属性是原型中的属性
 */
function hasPrototypeProperty(object, name) {
  return !object.hasOwnProperty(name) && name in object;
}

var personProto = new PersonProto();
console.log(
  "属性name是原型中的属性：" + hasPrototypeProperty(personProto, "name")
);

personProto.name = "Summer";
console.log(
  "属性name是原型中的属性：" + hasPrototypeProperty(personProto, "name")
);

/**
 * 使用Object.keys()取得对象上所有可枚举的实例属性，接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组
 * 使用Object.getOwnPropertyNames()取得所有实例属性，无论它是否可枚举
 * *constructor不可枚举
 */
var keys = Object.keys(PersonProto.prototype);
console.log("可枚举的实例属性为：" + keys);

var keys2 = Object.getOwnPropertyNames(PersonProto.prototype);
console.log("所有实例属性为：" + keys2);

/**
 * 更简单的原型语法
 * 将SimplePerson.prototype设置为一个以对象字面量形式创建的新对象
 * 因为每创建一个函数就会同时创建它的prototype对象，这里本质上是重写了SimplePerson默认的prototype对象；
 * 因为此constructor就变成了新对象的constructor属性(指向Object函数)，不再指向SimplePerson
 * consructor指向设置如下
 * *注：以这种方式重设constructor熟悉过会导致它的Enumerable特性被设置为true(默认情况下，原生的constructor属性是不可枚举的)
 */
function SimplePerson() {}

SimplePerson.prototype = {
  constructor: SimplePerson, //设置constructor指向SimplePerson
  name: "Lay",
  age: 30,
  job: "web engineer",
  sayName: function() {
    console.log(this.name);
  }
};

var friend = new SimplePerson();
console.log(friend.constructor); // 这里指向SimplePerson

// 重设构造函数,使constructor属性不可枚举
Object.defineProperty(SimplePerson.prototype, "constructor", {
  enumerable: false,
  value: SimplePerson
});

/**
 * 原型的动态性
 * 1.上方创建了SimperPerson实例friend
 * 2.在SimplePerson原型上新增sayHi()方法
 */
SimplePerson.prototype.sayHi = function() {
  console.log("HI");
};

friend.sayHi();

/**
 * 原生对象的原型
 * 例如：Object、Array、String...
 */
console.log(Array.prototype);

// 通过原生对象的原型定义新方法(不建议使用)
String.prototype.startsWith = function(text) {
  return this.indexOf(text) == 0;
};

var msg = "Hello World";
console.log(msg.startsWith("Hello"));

/**
 * 原型模式的缺点：
 * 1.没有为构造函数传递初始化参数，导致所有实例在默认情况下都将取得相同的属性只
 * 2.如果原型上一个属性值为数组，实例1向数组中添加元素，实例2也会共享(不合理)
 * 3.无法向构造函数传递参数
 */
