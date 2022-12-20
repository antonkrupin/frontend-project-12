import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './channelsReducer.js';
import messagesReducer from './messagesReducer.js';
import modalsReducer from './modalsReducer.js';
// import errorsReducer from './errorsReducer.js';
// import statusReducer from './statusReducer.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
    // errors: errorsReducer,
    // status: statusReducer,
  },
});
