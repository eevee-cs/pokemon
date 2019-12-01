/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import CharacterBox from '../CharacterBox';

describe('React unit tests', () => {
  describe('PlayerHealth Component', () => {
    let wrapper;
    const props = {
      getHealthPixels: () => true,
      isOpponent: true,
    };

    beforeAll(() => {
      wrapper = shallow(<CharacterBox {...props} />);
    });

    it('Renders a <h5> tag with className "frame__hp"', () => {
      expect(wrapper.type()).toEqual('h5');
      expect(wrapper.hasClass('frame__hp')).toEqual(true);
    });

    it('Should also render two <span> tags as children', () => {
      expect(wrapper.children()).toHaveLength(2);
    });

    it('Should display "hp" and "maxHP" props inside <span>', () => {
      expect(wrapper.find('.frame__current-hp').text()).toEqual('200/');
      expect(wrapper.find('.frame__max-hp').text()).toEqual('200');
    });

  });
});
