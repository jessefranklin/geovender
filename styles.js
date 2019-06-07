import React from "react";
import { StyleSheet } from "react-native";
const Dimensions = require("Dimensions");
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const MARGIN_SMALL = 8;
const MARGIN_LARGE = 16;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8e8"
  },
  containerTop: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: "#e8e8e8"
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    alignSelf: "center"
  },
  button: {
    height: 36,
    backgroundColor: "#48BBEC",
    borderColor: "#48BBEC",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 0,
    padding: 20,
    backgroundColor: "#ffffff"
  },
  header: {
    height: 200
  },
  avatarContainer: {
    width: 130,
    height: 130,
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },
  selectInput: {
    flexDirection: "row",
    height: 36,
    borderWidth: 1,
    borderRadius: 4,
    padding: MARGIN_SMALL,
    marginTop: MARGIN_LARGE,
    backgroundColor: "#FFFFFF"
  },
  body: {
    marginTop: 40
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30
  },
  calloutContent: {
    flex: 1,
    padding: 10
  },
  name: {
    fontSize: 28,
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    marginTop: 10
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center"
  },
  swipelist: {
    width: deviceWidth
  },
  color: {
    color: "#df4723"
  },
  logo: {
    width: 100,
    height: 45,
    marginTop: 70
  },
  nav: {
    width: 100,
    height: 55,
    textAlign: "center",
    marginTop: 70
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 45,
    margin: 10,
    backgroundColor: "#fff"
  },
  imgRow: {
    flexWrap: "wrap",
    flexDirection: "row",
    padding: 15
  },
  textInput: {
    width: deviceWidth,
    padding: 15,
    backgroundColor: "#fff",
    height: 100
  },
  textInputForm: {
    width: deviceWidth * 0.95,
    left: 10,
    padding: 5,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#fff",
    borderWidth: 1,
    marginBottom: 10,
    borderColor: "#ccc"
  },
  bold: {
    padding: 10,
    fontSize: 18,
    fontWeight: "bold"
  },
  eyebrow: {
    fontSize: 12
  },
  title: {
    fontSize: 18,
    fontWeight: "bold"
  },
  mapButton: {
    position: "absolute",
    bottom: 40,
    left: 40,
    right: 40
  },
  markerText: {
    color: "#fff"
  },
  marker: {
    backgroundColor: "green",
    borderRadius: 5,
    padding: 5
  },
  button: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#df4723",
    textAlign: "center",
    color: "#df4723",
    padding: 15,
    margin: 15,
    fontSize: 18,
    fontWeight: "bold"
  },
  card: {
    width: deviceWidth,
    height: deviceHeight * 0.4
  },
  cardDescription: {
    padding: 15,
    justifyContent: "flex-end",
    flex: 1
  },
  cardInfo: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10
  },
  calloutView: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 10,
    width: deviceWidth * 0.8,
    position: "absolute",
    bottom: 60,
    marginTop: 20
  },
  calloutSearch: {
    borderColor: "transparent",
    marginLeft: 10,
    width: "90%",
    marginRight: 10,
    height: 40,
    borderWidth: 0.0
  },
  listItem: {
    height: 75,
    alignItems: "center",
    justifyContent: "center"
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20
  },
  listItem: {
    height: 75,
    justifyContent: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    padding: 20
  },
  listItemOffer: {
    height: 100,
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    fontFamily: "Roboto",
    justifyContent: "center",
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    padding: 20,
    marginHorizontal: 20,
    width: deviceWidth * 0.9,
    overflow: "hidden",
    borderRadius: 15
  },
  swipeRowOffer: {},
  rowOffer: {
    fontFamily: "RobotoBold",
    fontSize: 40,
    letterSpacing: -1,
    fontWeight: "600"
  },
  statusBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "green",
    color: "#fff",
    overflow: "hidden",
    borderRadius: 5,
    padding: 5
  },
  listTitle: {
    fontSize: 20,
    fontWeight: "600",
    margin: 0
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
    color: "white"
  },
  leftSwipeItemText: {
    fontSize: 24,
    fontWeight: "200"
  },
  swipeIcon: {
    width: 40,
    height: 40
  },
  leftSwipeItemSubText: {
    fontSize: 14,
    fontWeight: "200",
    color: "grey"
  },
  swipeRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 50
  },
  title1: {
    fontSize: 20,
    fontWeight: "200"
  },
  titleContainer: {
    padding: 20
  },
  lightgrey: {
    backgroundColor: "lightgrey"
  },
  red: {
    backgroundColor: "red"
  }
});

module.exports = styles;
