/**
 * 寄生构造函数模式：
 * 基本思路是创建一个函数，作用仅仅是封装创建对象的代码，再返回新创建的对象
 * 看似是一个工厂函数？
 *
 * 注：
 * 返回的对象与构造函数或者与构造函数的原型属性之间没有关系；
 * 也就是说，构造函数返回的对象与在构造函数外部创建的对象一样；
 * 因此不能依赖instanceof操作符来确定对象类型
 * 所以不建议使用
 */
function Person(name, age, job) {
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function() {
    console.log(this.name);
  };
  return o;
}

var friend = new Person("Lay", 30, "web engineer");
friend.sayName();

/**
 * 使用场景：创建一个具有额外方法的特殊数组
 * 1.创建构造函数SpecialArray
 * 2.在函数内部创建数组
 * 3.用push()方法初始化数组的值
 * 4.给数组实例添加toPipedString方法(返回以竖线分割的数组值)
 * 5.将数组以函数值的形式返回
 */
function SpecialArray() {
  // 创建数组
  var values = new Array();
  // 添加值
  /**
   * 关于Function.prototype.apply()
   * var a = [];
   * a.push([1,2,3]) =>>> [[1,2,3]]
   * a.push.apply([1,2,3]) =>>> [1,2,3]
   * arguments为函数内的局部变量
   */
  values.push.apply(values, arguments);

  // 添加方法
  values.toPipedString = function() {
    return this.join("|");
  };

  // 返回数组
  return values;
}

var colors = new SpecialArray("red", "blue", "green");
console.log(colors.toPipedString()); // “red|blue|green”
