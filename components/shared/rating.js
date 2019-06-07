import React, { Component } from "react";
import { connect } from "react-redux";
import { auth } from "../../config/config";
import { PropTypes } from "prop-types";
import StarRating from "react-native-star-rating";
import { Text, View, TouchableOpacity } from "react-native";
import { rateClient } from "../../redux/actions/rating";

class Rating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rate: this.props.rate,
      post: this.props.post,
      type: this.props.type,
      author: auth.currentUser.uid,
      rating: 5,
      createdAt: new Date().toLocaleString(),
      comment: ""
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      rating
    });
  }

  postRating() {
    // console.log(this.state);
    this.props.rateClient(this.state);
  }

  render() {
    return (
      <View>
        <StarRating
          disabled={false}
          emptyStar={"ios-star-outline"}
          fullStar={"ios-star"}
          halfStar={"ios-star-half"}
          iconSet={"Ionicons"}
          maxStars={5}
          rating={this.state.rating}
          selectedStar={rating => this.onStarRatingPress(rating)}
          fullStarColor={"yellow"}
        />
        <TouchableOpacity onPress={() => this.postRating()}>
          <Text>Submit </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Rating.propTypes = {
  post: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
};

mapDispatchToProps = dispatch => ({
  rateClient: payload => dispatch(rateClient(payload))
});

export default connect(
  undefined,
  mapDispatchToProps
)(Rating);
