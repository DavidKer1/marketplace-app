import styled from 'styled-components/native';

export const BackgoundImage = styled.ImageBackground.attrs(props => ({
  imageStyle: {
    width: '300%',
    height: '300%',
    transform: [
      {
        translateX: props.translateIn.inX,
      },
      {
        translateY: props.translateIn.inY,
      },
      {
        rotate: '-45deg',
      },
    ],
  },
}))`
  position: absolute;
  top: 0;
  left: 0;
  flex: 1;
  width: 100%;
  height: 100%;
  opacity: .02;
`;
