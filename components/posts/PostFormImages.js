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

import { uploadImages } from "../../redux/actions/post";

class PostFormImages extends React.Component {
  state = {
    num: this.props.images.length,
    images: []
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.images !== this.props.images) {
    }
  }
  addImage = () => {
    const { id } = this.props;
    const { images } = this.state;
    this.props.dispatch(uploadImages(id, images));
  };

  nextPhoto() {
    var num = this.state.num;
    var length = this.props.images.length - 1;
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
    const { images } = this.state;
    return (
      <View>
        <TouchableOpacity onPress={() => this.nextPhoto()}>
          <ImageBackground
            style={styles.card}
            source={{ uri: this.props.images[this.state.num] }}
          >
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

export default connect()(PostFormImages);
