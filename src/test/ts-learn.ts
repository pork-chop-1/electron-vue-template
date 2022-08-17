interface Generic<T> {
  value: T;
  getValue: () => T
}

class GClass<T> implements Generic<T> {
  constructor(v: T) {
    this.value = v
  }
  value: T;
  getValue() {
    return this.value
  }
}

const o = new GClass(12)
o.getValue()



interface Length {
  length: number
}
function getLength<T extends Length>(o: T) {
  return o.length
}




interface Person {
  name: string;
  age: number;
  location: object;
}
type o = keyof Person
type o2 = Person[keyof Person]
type v = keyof { [v: string]: never }

const person: Person = {
  name: 'a',
  age: 1,
  location: {}
}
function getProperty<T, V extends keyof T>(o: T, k: V) {
  return o[k]
}
getProperty(person, 'name')


interface Dictionary {
  [key: string]: any
}
interface Session {
  body: Dictionary
}
const ctx: Session = {
  body: {
    a: 1,
    b: '2'
  }
}


interface StringMap<T = number> {
  [key: string]: T
}
type MapMember<T> = T extends StringMap<infer V> ? V : never
const map1: StringMap = {
  a: 1
}
const member1: MapMember<typeof map1> = 1


type PromiseType<T> = T extends Promise<infer V> ? V : never
const v = new Promise<string>(() => '')
type getType2 = PromiseType<typeof v>

// test tools
const obj1 = {
  name: '',
  age: 1
}
const obj2 = {
  name: '',
  other: false
}
type Partial1 = Partial<typeof obj1>
type MyPartial<T> = {
  [k in keyof T]-?: T[k]
}
type Partial2 = Partial<typeof obj1>
type tmp1 = keyof any


interface GenerateC<T> {
  new(): T
}
interface Point {
  x: number;
  y: number;
}
interface PointConstructor {
  new(x: number, y: number): Point;
}
class Point2D implements Point {
  readonly x: number;
  readonly y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
function newPoint(
  pointConstructor: PointConstructor,
  x: number,
  y: number
): Point {
  return new pointConstructor(x, y);
}
const point: Point = newPoint(Point2D, 1, 2);
class GenericCreator<T> {
  create<T>(c: { new(a: number): T; }, num: number): T {
    return new c(num);
  }
}

