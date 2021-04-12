class A {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}


class B extends A{
  constructor(props) {
    super(props);
    console.log(this.props);
  }
}

new B(1,2)
