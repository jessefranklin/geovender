import React from "./node_modules/react";
import { connect } from "./node_modules/react-redux";
import { ScrollView } from "react-native";
import PostFieldSets from "./PostFieldSets";

class ProfileDetails extends React.Component {
  state = {};

  componentWillMount() {}

  render() {
    const { navigation, edit, post } = this.props;

    return (
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <PostFieldSets name={"post"} navigation={navigation} edit={edit} />
      </ScrollView>
    );
  }
}

export default reduxForm({
  form: "profile",
  initialValues: {},
  validate,
  onSubmitSuccess: (result, dispatch, props) => {
    props.navigation.navigate("PreviewPost", {
      edit: true
    });
  }
})(ProfileDetails);

ProfileDetails = connect()(ProfileDetails);
