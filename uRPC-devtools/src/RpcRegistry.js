class RpcRegistry {
  constructor() {
    // TODO: non-memory support
    this.methods = {};
  }
  async registerAll(rpcMethodSpecs) {
    rpcMethodSpecs.forEach((spec) => this.register(spec));
  }
  async register(rpcMethodSpec) {
    this.methods[rpcMethodSpec.key] = rpcMethodSpec;
  }
  async getMethods() {
    return this.methods;
  }
  async getMethod(methodKey) {
    return this.methods[methodKey];
  }
}

RpcRegistry.rpcRegistry = new RpcRegistry();

module.exports = RpcRegistry;
