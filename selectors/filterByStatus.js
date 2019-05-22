import _ from "lodash";

export const filterByStatus = postItems => {
  const listCategory = _.groupBy(postItems, post => {
    return post.status;
  });
  return listCategory;
};
