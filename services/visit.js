const Visit = require('../models/Visit');

/**
 * Save Visit to Database
 *
 * @function postVisit
 * @param {Object} data
 * @param {String} data.url The tier.app/*** URL
 * @param {Boolean} data.valid If url matched with a posted one
 * @param {String} data.ip The IP of the visitor
 * @param {Object} data.metadata Other metadata
 * @return {Promise}
 */
const postVisit = (data) =>
  new Promise((resolve, reject) => {
    const { url, valid, ip, metadata } = data;
    const visit = new Visit({ url, valid, ip, metadata });
    visit
      .save()
      .then((dbVisit) => resolve(dbVisit))
      .catch((err) => reject(err));
  });

const getVisitsFromUrl = (url) =>
  new Promise((resolve, reject) => {
    Visit.find({ url })
      .exec()
      .then((visitsRes) => resolve(visitsRes))
      .catch((err) => reject(err));
  });

module.exports = {
  postVisit,
  getVisitsFromUrl,
};
