import React from "react";
import uuid from "uuid/v1";
import { FormSection, reduxForm } from "redux-form";
import { Text, View, TouchableOpacity } from "react-native";
import validate from "./Validate";
import styles from "../../styles";

import { PostFormMeta } from "./PostFormMeta";
import { PostFormLocation } from "./PostFormLocation";
import { PostFormDate } from "./PostFormDate";
import { PostFormOffer } from "./PostFormOffer";
import { postDraft } from "../../redux/actions/post";
import PostFormImages from "./PostFormImages";

const submit = (values, dispatch) => {
  console.log("submitting form", values);

  return dispatch(postDraft(values));
};

function PostFieldSets(props) {
  const { handleSubmit, valid, pristine, reset, submitting } = props;
  return (
    <View>
      <PostFormImages id={id} images={images} showDescription={false} />

      <FormSection name="meta">
        <PostFormMeta />
      </FormSection>

      <FormSection name="address">
        <PostFormLocation />
      </FormSection>

      <FormSection name="dateTime">
        <PostFormDate />
      </FormSection>

      <FormSection name="offer">
        <PostFormOffer />
      </FormSection>

      <TouchableOpacity onPress={handleSubmit(submit)} disabled={submitting}>
        <Text style={styles.button}>Preview</Text>
      </TouchableOpacity>
    </View>
  );
}

export default reduxForm({
  form: "post",
  initialValues: {
    id: uuid(),
    postState: 0,
    status: "draft",
    meta: {
      serviceCategory: 1
    },
    created_at: new Date().toLocaleString()
  },
  validate
})(PostFieldSets);
