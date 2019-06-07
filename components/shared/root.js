import React from "react";
import { PropTypes } from "prop-types";
import { View } from "react-native";

const Root = ({ children }) => <View className="container">{children}</View>;
Root.propTypes = {
  children: PropTypes.node.isRequired
};
export default Root;
