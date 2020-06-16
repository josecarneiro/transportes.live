export default (...classes) =>
  classes
    .filter(item => !!item)
    .reduce(
      (a, v) => ({
        ...a,
        ...(v && {
          ...(typeof v === 'string' && { [v]: true }),
          ...(v instanceof Array &&
            v.reduce((c, t) => ({ ...a, [t]: true }), {})),
          ...(typeof v === 'object' && !(v instanceof Array) && v)
        })
      }),
      {}
    );
