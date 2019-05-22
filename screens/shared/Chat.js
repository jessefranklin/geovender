import React from "react";
import styles from "../../styles";
import { f } from "../../config/config";
import { sendNotification } from "../../redux/actions/profile";
import { connect } from "react-redux";
import { GiftedChat } from "react-native-gifted-chat";

class Chat extends React.Component {
  state = {
    messages: []
  };

  componentWillMount() {
    f.database()
      .ref(
        "cards/" +
          this.props.user.id +
          "/chats/" +
          this.props.navigation.state.params.user.id
      )
      .on("value", snap => {
        var items = [];

        snap.forEach(child => {
          let x = child.val();
          if (x._id != undefined) {
            item = child.val();
            items.push(item);
          }
        });

        this.setState({ messages: items.reverse() });
      });
  }

  onSend(messages = []) {
    this.props.dispatch(
      sendNotification(
        this.props.navigation.state.params.user.id,
        messages[0].user.name,
        messages[0].text
      )
    );
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    f.database()
      .ref(
        "cards/" +
          this.props.user.id +
          "/chats/" +
          this.props.navigation.state.params.user.id
      )
      .push(messages[0]);
    f.database()
      .ref(
        "cards/" +
          this.props.navigation.state.params.user.id +
          "/chats/" +
          this.props.user.id
      )
      .push(messages[0]);
  }

  render() {
    return (
      <View>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: this.props.user.id,
            name: this.props.user.name,
            avatar: this.props.user.photoUrl
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.profile.user
  };
}

export default connect(mapStateToProps)(Chat);
