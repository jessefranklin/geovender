import React, { PureComponent } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import Dates from "./Dates";

const { width: screenWidth } = Dimensions.get("window");

const formatMonth = date => date.format("MMMM");

const formatYear = date => date.format("YYYY");

export default class Calendar extends PureComponent {
  static defaultProps = {
    showDaysBeforeCurrent: 3,
    showDaysAfterCurrent: 10
  };

  _scrollView;

  constructor(props) {
    super(props);
    this.state = {
      allDatesHaveRendered: false,
      currentDateIndex: props.showDaysBeforeCurrent,
      dates: this.getDates(),
      dayWidths: undefined,
      scrollPositionX: 0,
      visibleMonths: undefined,
      visibleYears: undefined
    };
  }

  getDates = () => {
    const {
      currentDate,
      showDaysBeforeCurrent,
      showDaysAfterCurrent
    } = this.props;

    const startDay = moment(currentDate || undefined).subtract(
      showDaysBeforeCurrent + 1,
      "days"
    );
    const totalDaysCount = showDaysBeforeCurrent + showDaysAfterCurrent + 1;

    return [...Array(totalDaysCount)].map(_ => startDay.add(1, "day").clone());
  };

  getVisibleDates = () => {
    const { dates, dayWidths, scrollPositionX } = this.state;

    if (!dayWidths) {
      return;
    }

    let datePositionX = 0;
    let firstVisibleDateIndex = undefined;
    let lastVisibleDateIndex = undefined;

    Object.values(dayWidths).some((width, index) => {
      if (
        firstVisibleDateIndex === undefined && // not set yet
        datePositionX >= scrollPositionX // first date visible
      ) {
        firstVisibleDateIndex = index > 0 ? index - 1 : index;
      }

      if (
        lastVisibleDateIndex === undefined && // not set yet
        datePositionX >= scrollPositionX + screenWidth // first date not visible behind the right edge
      ) {
        lastVisibleDateIndex = index;
      }

      datePositionX += width;

      return !!(firstVisibleDateIndex && lastVisibleDateIndex);
    });

    return dates.slice(firstVisibleDateIndex, lastVisibleDateIndex);
  };

  getVisibleMonthAndYear = () => {
    const { dates, visibleMonths, visibleYears } = this.state;

    if (!visibleMonths || !visibleYears) {
      if (dates) {
        const firstDate = dates[0];
        return `${formatMonth(firstDate)}, ${formatYear(firstDate)}`;
      }
      return undefined;
    }

    if (visibleYears.length === 1) {
      return `${visibleMonths.join(" – ")},  ${visibleYears[0]}`;
    }

    return visibleMonths
      .map((month, index) => `${month}, ${visibleYears[index]}`)
      .join(" – ");
  };

  updateVisibleMonthAndYear = () => {
    const { allDatesHaveRendered } = this.state;

    if (!allDatesHaveRendered) {
      return;
    }

    const visibleDates = this.getVisibleDates();

    if (!visibleDates) {
      return;
    }

    let visibleMonths = [];
    let visibleYears = [];

    visibleDates.forEach(date => {
      const month = formatMonth(date);
      const year = formatYear(date);
      if (!visibleMonths.includes(month)) {
        visibleMonths.push(month);
      }
      if (!visibleYears.includes(year)) {
        visibleYears.push(year);
      }
    });

    this.setState({
      visibleMonths,
      visibleYears
    });
  };

  scrollToCurrentDay = () => {
    const { allDatesHaveRendered, currentDateIndex, dayWidths } = this.state;

    if (
      !allDatesHaveRendered ||
      currentDateIndex === undefined ||
      currentDateIndex === null
    ) {
      return;
    }

    const dayWidthsArray = Object.values(dayWidths);
    const allDaysWidth = dayWidthsArray.reduce(
      (total, width) => width + total,
      0
    );
    const currentDayWidth = dayWidthsArray[currentDateIndex];
    const minX = 0;
    const maxX = allDaysWidth > screenWidth ? allDaysWidth - screenWidth : 0; // no scrolling if there's nowhere to scroll

    let scrollToX;

    scrollToX =
      dayWidthsArray
        .slice(0, currentDateIndex + 1)
        .reduce((total, width) => width + total, 0) -
      screenWidth / 2 -
      currentDayWidth / 2;

    if (scrollToX < minX) {
      scrollToX = 0;
    } else if (scrollToX > maxX) {
      scrollToX = maxX;
    }

    this._scrollView.scrollTo({ x: scrollToX });
  };

  onSelectDay = index => {
    const { dates } = this.state;
    const { onSelectDate } = this.props;
    console.log(onSelectDate);
    this.setState({ currentDateIndex: index }, this.scrollToCurrentDay);
    onSelectDate(dates[index]);
  };

  onRenderDay = (index, width) => {
    const { dayWidths } = this.state;
    const { showDaysBeforeCurrent, showDaysAfterCurrent } = this.props;

    const allDatesHaveRendered =
      dayWidths &&
      Object.keys(dayWidths).length >=
        showDaysBeforeCurrent + showDaysAfterCurrent;

    this.setState(
      prevState => ({
        allDatesHaveRendered,
        dayWidths: {
          ...prevState.dayWidths,
          [index]: width
        }
      }),
      () => {
        if (allDatesHaveRendered) {
          this.scrollToCurrentDay();
          this.updateVisibleMonthAndYear();
        }
      }
    );
  };

  onScroll = event => {
    const {
      nativeEvent: {
        contentOffset: { x }
      }
    } = event;
    this.setState({ scrollPositionX: x }, this.updateVisibleMonthAndYear);
  };

  render() {
    const { dates, currentDateIndex } = this.state;
    const visibleMonthAndYear = this.getVisibleMonthAndYear();

    return (
      <View>
        <Text style={styles.visibleMonthAndYear}>{visibleMonthAndYear}</Text>
        <ScrollView
          ref={scrollView => {
            this._scrollView = scrollView;
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={100}
          onScroll={this.onScroll}
        >
          <Dates
            dates={dates}
            currentDateIndex={currentDateIndex}
            onSelectDay={this.onSelectDay}
            onRenderDay={this.onRenderDay}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  visibleMonthAndYear: {
    color: "rgba(255, 255, 255, 0.5)",
    paddingHorizontal: 15,
    textAlign: "left"
  }
});
