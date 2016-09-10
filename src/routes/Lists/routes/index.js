import React from 'react';

import List from './List';

export default (store) => ({
  childRoutes: [
    List(store)
  ]
})
