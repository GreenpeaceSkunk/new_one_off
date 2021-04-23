import React from 'react';
import { Wrapper, H1, Span, A } from '@bit/meema.ui-components.elements';
import { css } from 'styled-components';
import { pixelToRem } from 'greenpeace-ui-themes';

export const Topic: React.FunctionComponent<{
  to: string;
  title: string;
  description: string;
  pictureLarge: string;
  pictureSmall: string;
}> = ({
  to,
  title,
  description,
  pictureSmall,
  pictureLarge,
}) => {
  return (
    <A
      href={to}
      customCss={css`
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1rem;
        margin-bottom: 1rem;
        flex-basis: 100%;
        transition: all 250ms ease;
        cursor: pointer;

        &:hover {
          .picture-large, .picture-small {
            background-size: 120%;
          }
        }

        @media (min-width: ${props => pixelToRem(props.theme.responsive.desktop.minWidth)}) {
          flex-basis: 25%;
        }

        @media (min-width: ${props => pixelToRem(props.theme.responsive.tablet.minWidth)}) {
          flex-basis: 50%;
        }
      `}
    >
      <Wrapper
        customCss={css`
          position: relative;
          margin-bottom: 7rem;
          display: flex;
          justify-content: center;
        `}
      >
        <Wrapper
          className='picture-large'
          customCss={css`
            height: ${pixelToRem(188)};
            width: ${pixelToRem(188)};
            border-style: solid;
            border-width: ${pixelToRem(12)};
            border-color: ${(props) => props.theme.color.primary.normal};
            border-radius: 50%;
            background-image: url(${pictureLarge});
            background-position: center;
            background-size: 100%;
            background-repeat: no-repeat;
            transition: all 250ms ease;
            margin-left: ${pixelToRem(70)};
          `}
        />

        <Wrapper
          className='picture-small'
          customCss={css`
            position: absolute;
            height: ${pixelToRem(140)};
            width: ${pixelToRem(140)};
            border-style: solid;
            border-width: ${pixelToRem(12)};
            border-color: white;
            border-radius: 50%;
            background-image: url(${pictureSmall});
            background-position: center;
            background-size: 100%;
            background-repeat: no-repeat;
            transition: all 250ms ease;
            top: ${pixelToRem(120)};
            left: calc(50% - ${pixelToRem(140)});
            z-index: 1;
        `} />

      </Wrapper>
      <Wrapper>
        <H1
          customCss={css`
            font-family: ${(props) => props.theme.font.family.primary.normal};
            color: ${(props) => props.theme.color.primary.dark};
            text-transform: uppercase;
            text-align: center;
            font-size: ${pixelToRem(20)};
            margin-bottom: 1rem;
          `}
        >{title}</H1>
        <Span
          customCss={css`
            display: inline;
            padding: 0.5rem 0.5rem;
            padding-left: 0;
            padding-right: 0;
            background: ${(props) => props.theme.color.primary.dark};
            color: white;
            font-size: ${pixelToRem(16)};
            line-height: 170%;
            box-decoration-break: clone;
             word-wrap: break-word;
             box-shadow: 10px 0 0 ${(props) => props.theme.color.primary.dark}, -10px 0 0 ${(props) => props.theme.color.primary.dark};
          `}
        >{description}</Span>
      </Wrapper>
    </A>
  )
}
