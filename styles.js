import React from 'react';
import { StyleSheet } from 'react-native';
var Dimensions = require('Dimensions');
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8'
  },
  swipelist: {
    width: deviceWidth
  },
  color: {
    color: '#df4723'
  },
  logo: {
    width: 100, 
    height: 45,
    marginTop: 70
  },
  nav: {
    width: 100, 
    height: 55,
    textAlign: 'center',
    marginTop: 70
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 45,
    margin: 10,
    backgroundColor: '#fff',
  },
  imgRow: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    padding: 15,
  },
  textInput: {
    width: deviceWidth,
    padding: 15,
    backgroundColor: '#fff',
    height: 100
  },
  textInputForm: {
    width: deviceWidth * .95,
    left: 10,
    padding: 5,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#ccc'
  },
  bold: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  eyebrow: {
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapButton: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40
  },
  markerText: {
    color: '#fff'
  },
  marker:{
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 5
  },
  button: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#df4723',
    textAlign: 'center',
    color: '#df4723',
    padding: 15,
    margin: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    width: deviceWidth,
    height: deviceHeight*.4
  },
  cardDescription: {
    padding: 15,
    justifyContent: 'flex-end',
    flex: 1,
  },
  cardInfo: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  listItem: {
    height: 75,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20
  },
  listItem: {
    height: 75,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    padding: 20
  },
  leftSwipeItem: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 20
  },
  rightSwipeItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    color: 'white'
  },
  leftSwipeItemText: {
    fontSize: 24,
    fontWeight: '200'
  },
  leftSwipeItemSubText: {
    fontSize: 18,
    fontWeight: '200',
    color: 'grey'
  },
  swipeRow: {

  },
  title1: {
    fontSize: 20,
    fontWeight: '200'
  },
  titleContainer: {
    padding: 20
  },  
  lightgrey: {
    backgroundColor: 'lightgrey'
  },
  red: {
    backgroundColor: 'red'
  }
})

module.exports = styles