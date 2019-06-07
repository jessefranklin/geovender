import React from "react";
import { connect } from "react-redux";
import { publishPost } from "../../redux/actions/post";
import styles from "../../styles";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import PostDetail from "../post/PostDetail";

class PostPreview extends React.Component {
  state = {};

  componentDidMount() {
    console.log(this.props.post);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.post !== this.props.post) {
      console.log(nextProps.post);
    }
  }

  toEdit = () => {};

  toPublish = () => {
    this.props.dispatch(publishPost(this.props.post));
    this.props.navigation.navigate("Posts");
  };

  render() {
    const { post } = this.props;
    const { goBack, navigate } = this.props.navigation;
    const edit = this.props.navigation.getParam("edit", false);
    return (
      <ScrollView>
        <PostDetail state={post} />
        <Text>
          {post.images} tdryffyydr {edit}
        </Text>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
        >
          <Text style={styles.button}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.toPublish()}>
          <Text style={styles.button}>Publish</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    post: state.form.post.values
  };
}

export default connect(mapStateToProps)(PostPreview);
