import styled from 'styled-components';
import React from 'react';

type CheckButtonProps ={
    width?: string;
    height?: string;
    isChecked: boolean;
}

const CheckButton:React.FC<CheckButtonProps> = (props) => {
    const{  width,
            height,
            isChecked} = props;
    return (
        <StyledDiv width={width}
                    height={height}>
            <CheckElement1 isHidden={!isChecked}/>
            <CheckElement2 isHidden={!isChecked}/>
            <CheckBox isHidden={isChecked}/>
        </StyledDiv>
    )
}

export default CheckButton;

type StyledDivProps ={
    width?: string;
    height?: string;
}

const StyledDiv = styled.div<StyledDivProps>((props)=> `
    width: ${props.width ? props.width : 'auto'};
    height: ${props.height ? props.height  : 'auto'};
    background-color: transparent;
    position: relative;
`);

const CheckElement1 = styled.div<{isHidden: boolean}>((props)=> `
    width: 30px;
    height: 3px;
    background-color: #000000;
    position: absolute;
    top: 40%;
    left: 40%;
    transform: translate( 0%, 0%) rotate(-45deg);
    display: ${props.isHidden ? 'none' : 'block'}
`)

const CheckElement2 = styled.div<{isHidden: boolean}>((props)=> `
    width: 15px;
    height: 3px;
    background-color: #000000;
    position: absolute;
    top: 47%;
    left: 30%;
    transform: translate( 0%, 0%) rotate(-135deg);
    display: ${props.isHidden ? 'none' : 'block'}
`)

const CheckBox = styled.div<{isHidden: boolean}>((props)=> `
    width: 20px;
    height: 20px;
    border: solid;
    border-width: 2px;
    border-color: #000000;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    display: ${props.isHidden ? 'none' : 'block'};
`);