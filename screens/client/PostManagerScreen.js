import React from "react";
import styles from "../../styles";
import { connect } from "react-redux";
import { filterByStatus } from "../../selectors/filterByStatus";
import PostManagerList from "../../components/postManager/PostManagerList";
import { fetchPostsOffers } from "../../redux/actions/postManager";
import { Text, View, ScrollView } from "react-native";

class PostManagerScreen extends React.Component {
  constructor(props) {
    super(props);
    state = {};
    this.props.fetchPostsOffers();
  }

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    // if(nextProps.user.posts !== this.props.user.posts){
    // }
  }

  render() {
    const array = this.props.postManager;

    return (
      <ScrollView
        onScroll={this.handleScroll}
        scrollEventThrottle={1000}
        style={styles.container}
      >
        <View style={[styles.container]}>
          {array.length > 0 ? (
            <PostManagerList posts={array} status={1} postsTitle={"Offers"} />
          ) : (
            <View>
              <Text>No Offers</Text>
            </View>
          )}
          <View />
        </View>
      </ScrollView>
    );
  }
}

mapStateToProps = state => {
  return {
    user: state.profile.user,
    posts: state.profilePosts,
    postManager: state.postManager
  };
};

const mapDispatchToProps = dispatch => ({
  fetchPostsOffers: () => dispatch(fetchPostsOffers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostManagerScreen);
