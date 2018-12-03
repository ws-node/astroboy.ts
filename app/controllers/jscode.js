const { BaseClass } = require("../../src");
const OldService = require("../services/old");

class JsCOntroller extends BaseClass {

  constructor(ctx) {
    super(ctx);
  }

  Get() {
    const { id, name } = this.ctx.query;
    const old = new OldService(this.ctx);
    this.ctx.type = "application/json";
    this.ctx.body = JSON.stringify({
      id,
      name,
      url: old.getUrl()
    });
  }

}

module.exports = JsCOntroller;
