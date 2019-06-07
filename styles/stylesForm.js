import React from "react";
import { StyleSheet } from "react-native";
import { hidden } from "ansi-colors";
const Dimensions = require("Dimensions");
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  h3: {
    fontSize: 18,
    fontWeight: "500",
    margin: 0,
    padding: 0,
    paddingLeft: 10,
    marginBottom: 20
  },
  formContainer: {
    marginBottom: 20,
    padding: 20
  },
  textdanger: {
    color: "red"
  },
  offerContainer: {
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 10,
    margin: 20,
    padding: 20
  },
  screenTitle: {
    fontSize: 35,
    textAlign: "center",
    margin: 10,
    color: "#FFF"
  },
  dateRow: {
    flexDirection: "row"
  },
  textInput: {
    height: 40,
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 18,
    color: "#333",
    flex: 1
  },
  totalOffer: {
    fontSize: 60,
    fontWeight: "900"
  },
  rateInput: {
    flex: 1,
    height: 40,
    width: deviceWidth * 0.4,
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 18,
    color: "#333"
  },
  selectInput: {
    height: 40,
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#FFF",
    paddingTop: 0,
    marginBottom: 10
  },
  datePicker: {
    height: 40,
    flex: 1,
    width: deviceWidth * 0.3,
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 3,
    backgroundColor: "#FFF",
    paddingHorizontal: 0,
    marginBottom: 10
  },
  button: {
    backgroundColor: "#FD6592",
    borderRadius: 3,
    height: 40,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});

module.exports = styles;
