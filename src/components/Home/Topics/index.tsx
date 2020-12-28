import React, { FunctionComponent } from 'react';
import { css } from 'styled-components';
import Wrapper, { H1 } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'greenpeace-ui-themes';
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
} from '../../../lib/images';

const Topics: FunctionComponent<{}> = () => (
  <Wrapper>
    <H1
      customCss={css`
        width: 100%;
        text-align: center;
        font-family: ${props => props.theme.font.family.primary.light};
        text-transform: uppercase;
        font-size: ${pixelToRem(20)};
        padding: 2rem 1rem;
        background: ${props => props.theme.color.primary.dark};
        color: ${props => props.theme.color.primary.normal};
        transition: all 250ms ease;

        @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
          color: ${props => props.theme.color.primary.dark};
          padding-top: 3rem;
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

