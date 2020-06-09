exports.transformToJSONObject = (object, hide = []) =>
  JSON.parse(
    JSON.stringify(object, (key, value) =>
      hide.includes(key) ? undefined : value
    )
  );
