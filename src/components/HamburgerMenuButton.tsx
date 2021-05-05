import React from 'react';
import styled from 'styled-components';
import { RelativeBox, AbsoluteBox, StyledDiv } from './StyledComponents';

type HamburgerMenuButtonProps = {
    isOpening: boolean;
}

const HamburgerMenuButton: React.FC<HamburgerMenuButtonProps> = (props) => {
    const { isOpening } = props;
    return (
        <HamburgerMenuButtonBase>
            <StyledDiv isHidden={isOpening}>
                <HamburgerIconElement1/>
                <HamburgerIconElement2/>
                <HamburgerIconElement3/>
            </StyledDiv>
            <StyledDiv isHidden={!isOpening}>
                <CloseIconElement1/>
                <CloseIconElement2/>
            </StyledDiv>
        </HamburgerMenuButtonBase>
    );
}

export default HamburgerMenuButton;

export const HamburgerMenuButtonBase = styled.div( () => `
  position: fixed;
  top: 0%;
  left: 0%;
  width: 80px;
  height: 80px;
  background-color: transparent;
  position: relative;
  z-index: 2;
  cursor: pointer;
`);

export const HamburgerIconElement1 = styled.div( () => `
    width: 60px;
    height: 3px;
    background-color: #000000;
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translate(-50%, -50%);
`);

export const HamburgerIconElement2 = styled.div( () => `
    width: 60px;
    height: 3px;
    background-color: #000000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`);

export const HamburgerIconElement3 = styled.div( () => `
    width: 60px;
    height: 3px;
    background-color: #000000;
    position: absolute;
    top: 75%;
    left: 50%;
    transform: translate(-50%, -50%);
`);

export const CloseIconElement1 = styled.div( () => `
    width: 60px;
    height: 3px;
    background-color: #000000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
`)

export const CloseIconElement2 = styled.div( () => `
    width: 60px;
    height: 3px;
    background-color: #000000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
`)