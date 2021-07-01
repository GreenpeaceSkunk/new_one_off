import React, { FunctionComponent } from 'react';
import { css } from 'styled-components';
import { Wrapper, H1 } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import { Topic } from './Topic';
import {
  TopicBackground1,
  TopicBackground2,
  TopicBackground3,
  TopicBackground4,
  TopicBackground5,
  TopicBackground6,
  TopicBackground7,
  TopicBackground8,
} from '../../../assets/images';

const Topics: FunctionComponent<{}> = () => (
  <Wrapper>
    <H1
      customCss={css`
        width: 100%;
        text-align: center;
        font-family: ${({theme}) => theme.font.family.primary.light};
        text-transform: uppercase;
        font-size: ${pixelToRem(20)};
        padding: ${pixelToRem(32)} ${pixelToRem(16)};
        background: ${({theme}) => theme.color.primary.dark};
        color: ${({theme}) => theme.color.primary.normal};
        transition: all 250ms ease;

        @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
          color: ${props => props.theme.color.primary.dark};
          margin-top-top: ${pixelToRem(48)};
          font-size: ${pixelToRem(28)};
          background: transparent;
        }

      `}
    >Conocé en qué campañas estamos trabajando hoy</H1>
    <Wrapper
      customCss={css`
        display: flex;
        justify-content: center;
        flex-direction: row;
        flex-wrap: wrap;
        padding: ${pixelToRem(30)} ${pixelToRem(30)} ${pixelToRem(80)} ${pixelToRem(30)};

        @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
          align-items: flex-start;
          flex-wrap: nowrap;
        }
      `}>
      
      <Topic
        to={`https://www.greenpeace.org/argentina/campanas/oceanos/?utm_source=oneoffsk&utm_medium=footer&utm_campaign=oceanos`}
        title='Cuidar océanos y mares'
        description='Los océanos son vitales para nuestra vida: nos alimentan y regulan el clima.'
        pictureSmall={TopicBackground2}
        pictureLarge={TopicBackground7}
        
      />
      <Topic
        to={`https://www.greenpeace.org/argentina/campanas/bosques/?utm_source=oneoffsk&utm_medium=footer&utm_campaign=bosques`}
        title='Proteger bosques'
        description='Los bosques estabilizan el clima y mantienen la vida en la tierra.'
        pictureSmall={TopicBackground5}
        pictureLarge={TopicBackground8}
      />
      <Topic
        to={`https://www.greenpeace.org/argentina/campanas/contaminacion/?utm_source=oneoffsk&utm_medium=footer&utm_campaign=contaminacion`}
        title='Reducir la contaminación'
        description='Porque sabemos que un mundo sin contaminantes es posible.'
        pictureSmall={TopicBackground4}
        pictureLarge={TopicBackground3}
      />
      <Topic
        to={`https://www.greenpeace.org/argentina/campanas/climayenergia/?utm_source=oneoffsk&utm_medium=footer&utm_campaign=clima`}
        title='Clima y energía'
        description='Tenemos que evitar que la temperatura de nuestro planeta siga aumentando.'
        pictureSmall={TopicBackground1}
        pictureLarge={TopicBackground6}
      />
    </Wrapper>
  </Wrapper>
);

Topics.displayName = 'Topics';
export default Topics;

