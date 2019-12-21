/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow } from 'enzyme';
import CharacterBox from '../CharacterBox';

describe('React unit tests', () => {
  describe('PlayerHealth Component', () => {
    let wrapper;
    const props = {
      pokemon: {
        name: 'Pikachu',
        hp: 100,
        maxHP: 150,
      },
      getHealthPixels: () => true,
      isOpponent: true,
    };

    beforeAll(() => {
      wrapper = shallow(<CharacterBox {...props} />);
    });

    it('Renders a <article> tag with className "frame__box--opponent"', () => {
      expect(wrapper.type()).toEqual('article');
      expect(wrapper.hasClass('frame__box--opponent')).toEqual(true);
    });

    it('Should also render two <section> tags as children', () => {
      expect(wrapper.children()).toHaveLength(2);
      expect(wrapper.childAt(0).type()).toEqual('section');
      expect(wrapper.childAt(1).type()).toEqual('section');
    });

    it('First <section> tag should have a className "frame__info"', () => {
      expect(wrapper.childAt(0).hasClass('frame__info')).toEqual(true);
      // expect(wrapper.find('.frame__max-hp').text()).toEqual('200');
    });

    it('Should render a pokemon\'s name in a <h5> tag', () => {
      expect(wrapper.find('.frame__name').text()).toEqual('Pikachu');
      expect(wrapper.find('.frame__name').type()).toEqual('h5');
    });
  });
});
