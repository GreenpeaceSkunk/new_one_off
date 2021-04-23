import { Wrapper } from '@bit/meema.ui-components.elements';
import { pixelToRem } from 'meema.utils';
import React from 'react';
import { css } from 'styled-components';

interface IProps {}
interface IState { hasError: boolean }

class ErrorBoundary extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.log(error);
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.log('Error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Wrapper
          customCss={css`
            padding: ${pixelToRem(50)};
          `}
        >Oops, algo salió mal..</Wrapper>
      )
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;