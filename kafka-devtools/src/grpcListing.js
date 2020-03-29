module.exports = packageDefinition => {
  const services = {};
  const messages = [];

  Object.keys(packageDefinition).forEach(key => {
    const val = packageDefinition[key];
    if (!!val.type) {
      messages.push(val.type);
    } else {
      const service = {};
      services[key] = service;
      Object.keys(val).forEach(method => {
        let {
          path,
          requestStream,
          responseStream,
          originalName,
          requestType,
          responseType,
        } = val[method];
        requestType = requestType.type;
        responseType = responseType.type;
        service[method] = {
          path,
          requestStream,
          responseStream,
          originalName,
          requestType,
          responseType,
        };
      });
    }
  });
  return { services, messages };
};
