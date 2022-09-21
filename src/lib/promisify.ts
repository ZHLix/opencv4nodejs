const isFn = (obj: unknown) => typeof obj === 'function'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isAsyncFn = (fn: (...args: any[]) => any) => fn.prototype.constructor.name.endsWith('Async')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const promisify = (fn: () => any) =>
  function (this: any, ...params: any[]) {
    if (isFn(params[params.length - 1])) {
      return fn.apply(this, params as any)
    }

    return new Promise((resolve, reject) => {
      const args = Array.prototype.slice.call(params)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args.push(function (err: Error, res: any) {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      })

      fn.apply(this, args as any)
    })
  }

export default <T extends Record<string, any>>(cv: T): T => {
  const fns = Object.keys(cv)
    .filter(k => isFn(cv[k]))
    .map(k => cv[k])
  const asyncFuncs = fns.filter(isAsyncFn)
  const clazzes = fns.filter(fn => !!Object.keys(fn.prototype).length)

  clazzes.forEach(clazz => {
    const protoFnKeys = Object.keys(clazz.prototype).filter(k => isAsyncFn(clazz.prototype[k]))
    protoFnKeys.forEach(k => (clazz.prototype[k] = promisify(clazz.prototype[k])))
  })

  asyncFuncs.forEach(fn => {
    // @ts-ignore
    cv[fn.prototype.constructor.name] = promisify(fn)
  })

  return cv
}
