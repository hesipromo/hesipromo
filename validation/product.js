const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePromoProductsInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.prevprice = !isEmpty(data.prevprice) ? data.prevprice : "";
  data.newprice = !isEmpty(data.newprice) ? data.newprice : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.location = !isEmpty(data.location) ? data.location : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Product name is required";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }
  if (Validator.isEmpty(data.prevprice)) {
    errors.prevprice = "Previous price field is required";
  }

  if (Validator.isEmpty(data.newprice)) {
    errors.newprice = "New price field is required";
  }
  if (Validator.isEmpty(data.category)) {
    errors.category = "Category field is required";
  }
  if (Validator.isEmpty(data.location)) {
    errors.location = "Location(s) field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
