const validate = values => {
  const errors = {
    meta: {}
  };
  if (values.meta && !values.meta.title) {
    errors.meta.title = "Title Required";
  }
  if (values.meta && !values.meta.subtitle) {
    errors.meta.subtitle = "Required";
  }

  return errors;
};

export default validate;
