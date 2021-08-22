module.exports = {
  showDate: function (date) {
    return new Date(date.getTime()).toISOString().split('T')[0]
  },
  isEqual: function (a, b, options) {
    if (a === b) {
      return options.fn(this)
    }
    return options.inverse(this)
  }
}
