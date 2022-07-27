import React from 'react';
import { act } from 'react-dom/test-utils';

export const wait = (timeout = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });

export const actWait = async (timeout = 0) => {
  await act(async () => {
    await wait(timeout);
  });
};
