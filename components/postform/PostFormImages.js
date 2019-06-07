import React from "react";
import styles from "../../styles";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { connect } from "react-redux";
import { change } from "redux-form";
import { uploadImages } from "../../redux/actions/post";

class PostFormImages extends React.Component {
  state = {
    num: this.props.images.length - 1 || 0,
    images: this.props.edit ? this.props.images : []
  };

  componentWillMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.post.images !== this.props.post.images) {
      this.setState({ images: nextProps.post.images });
      this.props.dispatch(change("post", "images", nextProps.post.images));
    }
  }
  addImage = () => {
    const { id, status } = this.props;

    const img = this.state.images === " " ? [] : this.state.images;
    this.props.dispatch(uploadImages(id, status, img));
  };

  nextPhoto() {
    var num = this.state.num;
    var length = this.state.images.length - 1 || 0;
    if (num >= length) {
      this.setState({ num: 0 });
    } else {
      num += 1;
      this.setState({ num: num });
    }
  }

  deleteImage() {
    this.self.props.dispatch(deleteImage(this.self.props.images, this.key));
  }
  render() {
    const { showDescription } = this.props;
    const { images, num } = this.state;
    return (
      <View>
        <TouchableOpacity onPress={() => this.nextPhoto()}>
          <ImageBackground style={styles.card} source={{ uri: images[num] }}>
            <Button
              onPress={this.addImage.bind(this)}
              style={[styles.button, { position: "absolute", bottom: 0 }]}
              icon={{
                name: "camera",
                size: 15,
                color: "white"
              }}
              title="Take a photo"
            />
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}

mapStateToProps = state => {
  return {
    post: state.form
  };
};

export default connect(mapStateToProps)(PostFormImages);
