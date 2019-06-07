import React from "react";
import { connect } from "react-redux";
import { ScrollView } from "react-native";
import PostFieldSets from "./PostFieldSets";

class PostForm extends React.Component {
  state = {};

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.post !== this.props.post) {
      if (this.props.edit) {
        // this.setState({ ...nextProps.post, postState: 0 });
      }
    }

    if (nextProps.form !== this.props.form) {
      // console.log(nextProps.form);
    }
  }

  render() {
    const { navigation, edit, status, post } = this.props;

    if (edit) {
      return (
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <PostFieldSets
            name={"post"}
            initialValues={post}
            status={"published"}
            navigation={navigation}
            edit={edit}
          />
        </ScrollView>
      );
    } else {
      return (
        <ScrollView keyboardShouldPersistTaps={"handled"}>
          <PostFieldSets name={"post"} navigation={navigation} edit={edit} />
        </ScrollView>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    form: state.form.post,
    post: state.post
  };
}

export default connect(mapStateToProps)(PostForm);
