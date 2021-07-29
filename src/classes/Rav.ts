export default class Rav<T> {
  rawValue: T
  listener: ((value: T, name?: string) => void)
  name?: string

  constructor (value: T, event: (value: T, name?: string) => void, name?: string) {
    this.listener = event
    this.rawValue = value
    this.name = name
  }

  set value (val: T) {
    this.rawValue = val
    this.listener(val, this.name)
  }

  get value (): T {
    return this.rawValue
  }
}
