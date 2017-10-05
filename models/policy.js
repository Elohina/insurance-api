var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PolicySchema = Schema(
  {
    id: {type: String, required: true, max: 16, index: true},
    amountInsured: {type: Number, required: true, max: 100},
    email: {type: String, required: true},
    inceptionDate: {type: Date, required: true},
    installmentPayment: Boolean,
    clientId: {type: String, required: true, max: 16}
  }
);

PolicySchema.index({id: 1});

module.exports = mongoose.model("Policy", PolicySchema);
