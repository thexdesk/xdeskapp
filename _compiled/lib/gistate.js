export function giState(initialValue) {
  let useValue = initialValue;
  let listenersValue = [];
  let returning = useValue;
  const trick = (v) => {
    Object.assign(returning, {
      value: v
    });
    return Object.assign(v, {
      value: v,
      getValue
    });
  };
  const setValue = (v) => {
    const oldValue = useValue;
    useValue = trick(v);
    listenersValue.forEach((c) => c(useValue, oldValue));
    return useValue;
  };
  function getValue(listen) {
    listenersValue.push(listen);
    return useValue;
  }
  useValue = trick(useValue);
  returning = useValue;
  return [
    returning,
    setValue
  ];
}