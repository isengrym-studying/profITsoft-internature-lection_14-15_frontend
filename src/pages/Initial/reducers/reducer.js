const initialState = {
  availableItems: [
    'как+выучить+js',
    'somePath',
    'Картинка',
    'anotherPath',
  ],
  backendPages: [
    'books'
  ],
};

export default (state = initialState, {type, payload}) => {
  switch (type) {

    default: return state;
  }
}
