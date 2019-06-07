import _ from "lodash";

export const filterForEvents = eventItems => {
  let events = [];
  Object.keys(eventItems).map((key, value) => {
    events.push(eventItems[key]);
  });

  return events;
};
