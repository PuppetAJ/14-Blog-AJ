// Export helper functions
module.exports = {
  // format_date function, using date constructor to create a formatted date in MM/DD/YY format
  format_date: date => {
  return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
    date
  ).getFullYear()}`;
  },

  // format_plural function, takes a word and amount and if the amount isn't one then it adds an s to the end of the word
  format_plural: (word, amount) => {
    if(amount !== 1) {
      return `${word}s`;
    }

    return word;
  }
}