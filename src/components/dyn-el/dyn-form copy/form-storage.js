const Person = {
  debug: true,
  state: {
    age: 6,
  },
  setAge(newVal) {
    if (this.debug) console.log('setAge triggered with ', newVal);
    this.state.age = newVal;
  },
};
export default Person;
