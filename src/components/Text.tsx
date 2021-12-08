import styled from 'styled-components';

const StyledTitle = styled.h1`
  font-size: 100px;
  font-family: 'Source Serif Pro', serif;

  @media (max-width: 768px) {
    font-size: 40px;
    text-align: center;
  }
`;

const PCSS = `
font-family: 'IBM Plex Sans', sans-serif;
font-weight: 300;
margin-bottom: 50px;

@media (max-width: 768px) {
  font-size: 14px;
}
`;

const StyledP = styled.p`
  ${PCSS}
  text-align: center;
  width: 40%;
`;

const StyledIntroP = styled.p`
  ${PCSS}
  text-align: center;
  width: 70%;
`;

const StyledLeftP = styled.p`
  ${PCSS}
  text-align: left;
  width: 100%;
`;

const StyledHeader = styled.p`
  font-size: 30px;
  font-family: 'Source Serif Pro', serif;
  width: 70%;
  padding-left: 10%;
  padding-right: 10%;

  @media (max-width: 768px) {
    font-size: 14px;
    width: unset;
  }
`;

export const Title = ({ text }: { text: string }) => {
  return <StyledTitle>{text}</StyledTitle>;
};

export const P = ({ children }: { children: React.ReactNode }) => {
  return <StyledP>{children}</StyledP>;
};

export const LeftP = ({ children }: { children: React.ReactNode }) => {
  return <StyledLeftP>{children}</StyledLeftP>;
};

export const IntroP = ({ children }: { children: React.ReactNode }) => {
  return <StyledIntroP>{children}</StyledIntroP>;
};

export const Header = ({ children }: { children: React.ReactNode }) => {
  return <StyledHeader>{children}</StyledHeader>;
};
