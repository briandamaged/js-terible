
const Predicates = {
  isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof(obj[Symbol.iterator]) === 'function';
  },

  /**
   * Typically, we tend to treat Strings differently than
   * other Iterables/Enumerables.  So, this function takes
   * that into consideration.
   */
  isPlural(obj) {
    return Predicates.isIterable(obj) && (typeof(obj) !== 'string');
  },


  isSingular(obj) {
    return !Predicates.isPlural(obj);
  },
}

module.exports = exports = Predicates;
