import React from "react";
import styles from "../../styles";
import { Text, ScrollView, TouchableOpacity } from "react-native";
import PostDetail from "./PostDetail";

export const PostPreviewContents = (statePreview, toEdit, toPublish) => (
  <ScrollView>
    <PostDetail state={statePreview} />
    <Text>{statePreview.images}</Text>
    <TouchableOpacity onPress={() => toEdit()}>
      <Text style={styles.button}>Edit</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => toPublish()}>
      <Text style={styles.button}>Publish</Text>
    </TouchableOpacity>
  </ScrollView>
);
