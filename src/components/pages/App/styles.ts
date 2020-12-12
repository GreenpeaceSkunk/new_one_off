import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  background: ${(props) => props.theme.text.color.primary.normal};
  min-height: 100vh;
`;

export const MainNavWrapper = styled.nav`
  position: absolute;
  display: inline-flex;
  justify-content: center;
  width: 100%;
  bottom: 0;
  background: ${({theme: {colorPrimary}}) => colorPrimary};

  a {
    padding: 1rem;

    &:hover {
      background: white;
    }
  }
`;

export const LeftSideWrapper = styled.div`
  display: flex;
  flex: 0 0 60vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  text-align: center;

  div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
    h1 {
      width: 100%;
      margin-bottom: 1rem;
      font-size: 2.4rem;
      color: white;
      font-family: 'Paytone-One-Regular', 'sans-serif';
    }

    img {
      width: 50%;
      height: auto;
    }
  }
`;

export const RightSideWrapper = styled.section`
  display: flex;
  background: ${({theme: {colorGray1}}) => colorGray1};
  width: 100%;
  padding: 2rem;
`;