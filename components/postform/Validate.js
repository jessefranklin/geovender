const validate = values => {
  const errors = {
    meta: {},
    offer: {}
  };
  if (values.meta && !values.meta.title) {
    errors.meta.title = "Title Required";
  }
  if (values.meta && !values.meta.subtitle) {
    errors.meta.subtitle = "Required";
  }

  if (values.offer && !values.offer.rate) {
    errors.offer.rate = "Required";
  }

  if (values.offer && !values.offer.hours) {
    errors.offer.hours = "Required";
  }

  return errors;
};

export default validate;
