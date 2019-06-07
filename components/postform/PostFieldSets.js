import React from "react";
import uuid from "uuid/v4";
import { connect } from "react-redux";
import { auth } from "../../config/config";
import { FormSection, reduxForm, change, formValueSelector } from "redux-form";
import { Text, View, TouchableOpacity } from "react-native";

import moment from "moment";
import validate from "./Validate";
import styles from "../../styles";

import { PostFormMeta } from "./PostFormMeta";
import { PostFormLocation } from "./PostFormLocation";
import { PostFormDate } from "./PostFormDate";
import { PostFormOffer } from "./PostFormOffer";
import { postDraft } from "../../redux/actions/post";
import PostFormImages from "./PostFormImages";

const submit = (values, dispatch) => {
  if (values.offer.arrangement == 1) {
    values.offer.total = values.offer.hours * values.offer.rate;
  } else {
    values.offer.total = values.offer.rate;
  }
  dispatch(postDraft(values));
};

const start = moment();
const remainder = 30 - (start.minute() % 30);

const dateTime = moment(start)
  .add(remainder, "minutes")
  .format("h:mm:ss a");

class PostFieldSets extends React.Component {
  componentWillMount() {
    if (!this.props.edit) {
      this.props.dispatch(change("post", "id", uuid()));
    }
    this.props.dispatch(change("post", "author", auth.currentUser.uid));
  }
  render() {
    const { handleSubmit, submitting } = this.props;
    const { initialValues, edit, status } = this.props;
    return (
      <View>
        <PostFormImages
          id={initialValues.id}
          images={initialValues.images}
          status={initialValues.status}
          edit={edit}
          showDescription={false}
        />

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

        {!edit ? (
          <TouchableOpacity
            onPress={handleSubmit(submit)}
            disabled={submitting}
          >
            <Text style={styles.button}>Preview</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleSubmit(submit)}
            disabled={submitting}
          >
            <Text style={styles.button}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default reduxForm({
  form: "post",
  initialValues: {
    id: uuid(),
    postState: 0,
    images: " ",
    status: "draft",
    meta: {
      serviceCategory: "General",
      description: "zzz"
    },
    offer: {
      arrangement: 0
    },
    dateTime: {
      fulfillmentType: "ASAP",
      startDate: moment().format("YYYY-MM-DD"),
      startTime: dateTime
    },
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    destroyOnUnmount: false,
    created_at: new Date().toLocaleString()
  },
  validate,
  onSubmitSuccess: (result, dispatch, props) => {
    props.navigation.navigate("PreviewPost", {
      edit: true
    });
  }
})(PostFieldSets);

const selector = formValueSelector("post");

PostFieldSets = connect(state => {
  initialValues: state.form.post;
  return {
    rate: selector(state, "offer.rate"),
    arrangement: selector(state, "offer.arrangement")
  };
})(PostFieldSets);
