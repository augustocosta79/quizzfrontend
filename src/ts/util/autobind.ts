export function Autobind(
    _target: any,
    _method: string,
    descriptor: PropertyDescriptor
  ) {
    let originalMethod = descriptor.value;
    let bindedMethod: PropertyDescriptor = {
      get() {
        return originalMethod.bind(this);
      },
    };
    return bindedMethod;
  }