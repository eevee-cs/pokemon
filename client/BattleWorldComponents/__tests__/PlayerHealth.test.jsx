/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import PlayerHealth from '../PlayerHealth';

describe('React unit tests', () => {
  describe('PlayerHealth Component', () => {
    let wrapper;
    const props = {
      hp: 200,
      maxHP: 200,
    };

    beforeAll(() => {
      wrapper = shallow(<PlayerHealth {...props} />);
    });
  });
});
