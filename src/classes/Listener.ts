export default class Listener<T> {
  callbacks: ((data: T) => void)[] = []

  addEventListener (func: (data: T) => void): void {
    this.callbacks.push(func)
  }

  removeEventListener (func: (data: T) => void): void {
    this.callbacks = this.callbacks.filter(el => {
      return el !== func
    })
  }

  emit (data: T): void {
    this.callbacks.forEach(f => {
      f(data)
    })
  }
}
