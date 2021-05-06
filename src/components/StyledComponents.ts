import styled from 'styled-components';
import { isPropertySignature } from 'typescript';


type ParentProps = {
  width?: string;
  height?: string;
  margin?: string;
}

export const Parent = styled.div<ParentProps>((props)=> `
  width: ${props.width ? props.width : '100%'};
  height: ${props.height ? props.height : '100%'};
  margin: ${props.margin ? props.margin : 'auto'};
`);

export const Background = styled.div(()=> `
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #f5f5f5;
`);

type StyledDivProps = {
  width?: string;
  height?: string;
  flexGrow?: number;
  isHidden?: boolean;
  noDisplay?: boolean;
  isClickable?: boolean;
  showBorder?: boolean;
  borderTopWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderColor?: string;
  backgroundColor?: string;
  margin?: string;
  enableShadow?: boolean;
  overflow?: string;
  alignSelf?: string;
  borderRadius?: number;
}

export const StyledDiv = styled.div<StyledDivProps>((props)=> `
  width: ${props.width ? props.width : 'auto'};
  height: ${props.height ? props.height : 'auto'};
  flex-grow: ${props.flexGrow ? props.flexGrow : 0};
  box-sizing: border-box; 
  visibility: ${props.isHidden ? 'hidden' : 'visible'};
  display: ${props.noDisplay ? 'none' : 'block'};
  cursor: ${props.isClickable ? 'pointer' : 'default'};
  border: ${props.showBorder ? 'solid' : 'none'};
  border-top-width: ${props.borderTopWidth ? props.borderTopWidth + 'px' : (props.borderTopWidth === 0 ) ? '0px' : '1px'};
  border-right-width: ${props.borderRightWidth ? props.borderRightWidth + 'px' : (props.borderRightWidth === 0 ) ? '0px' : '1px'};
  border-bottom-width: ${props.borderBottomWidth ? props.borderBottomWidth + 'px' : (props.borderBottomWidth === 0 ) ? '0px' : '1px'};
  border-left-width: ${props.borderLeftWidth ? props.borderLeftWidth + 'px' : (props.borderLeftWidth === 0 ) ? '0px' : '1px'};
  border-color: ${props.borderColor ? props.borderColor : '#000000'};
  background-color: ${props.backgroundColor ? props.backgroundColor : 'transparent'};
  margin: ${props.margin ? props.margin : 'none'};
  box-shadow: ${props.enableShadow ? '0px 5px 10px rgba(0, 0, 0, 0.1)' : 'none'};
  overflow: ${props.overflow ? props.overflow : 'visible'};
  align-self: ${props.alignSelf ? props.alignSelf : 'auto'};
  border-radius: ${props.borderRadius ? props.borderRadius + 'px' : '0px'};
`)

type StyledTextProps = {
  width?: string;
  height?: string;
  size?: string;
  fontWeight?: string;
  fontColor?: string;
  flexGrow?: number;
  isClickable?: boolean;
  isHidden?: boolean;
}

export const StyledText = styled.div<StyledTextProps>((props)=> `
  width: ${props.width ? props.width : 'auto'};
  height: ${props.height ? props.height : 'auto'};
  font-size: ${props.size ? props.size : '1em'};
  font-weight: ${ props.fontWeight ? props.fontWeight : 'normal'};
  color: ${props.fontColor ? props.fontColor : '#000000'};
  flex-grow: ${props.flexGrow ? props.flexGrow : 0};
  cursor: ${props.isClickable ? 'pointer' : 'default'};
  visibility: ${props.isHidden ? 'hidden' : 'visible'};
`);

/* Styled-Componentsでは、呼び出し側のReactコンポーネントから、値を受け取って柔軟に装飾を変えることができるのが特徴。
   その際、受け取る変数の名前とデータ型の一覧を前もって定義し、下のように読み込む。 */
type FlexBoxProps = {
  width?: string;
  height?: string;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  flexGrow?: number;
  flexWrap?: string;
  overflow?: string;
}

/* ${}の中には、JSのようなコードを書いて、propsから受け取った値を記述する。 */
export const FlexBox = styled.div<FlexBoxProps>(props => `
  width: ${props.width ? props.width : '100%'};
  height: ${props.height ? props.height  : '100%'};
  display: flex;
  flex-direction: ${props.flexDirection ? props.flexDirection : 'row'};
  align-items: ${props.alignItems ? props.alignItems : 'flex-start'} ;
  justify-content: ${props.justifyContent ? props.justifyContent : 'flex-start'};
  flex-grow: ${props.flexGrow ? props.flexGrow : 0};
  box-sizing: border-box;
  flex-wrap: ${props.flexWrap ? props.flexWrap : 'nowrap'} ;
  overflow: ${props.overflow ? props.overflow : 'visible'};
`);

/* propsの型定義は、用途に応じて適当なものを選ぼう。 */
type StyledInputProps = {
  width?: string;
  height?: string;
  flexGrow?: number;
  warning?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  isBorderHidden?: boolean;
  fontSize?: string;
  borderColor?: string;
}

export const StyledInput = styled.input<StyledInputProps>((props)=> `
  width: ${props.width ? props.width : '300px'};
  height: ${props.height ? props.height : '2em'};
  flex-grow: ${props.flexGrow ? props.flexGrow : 0};
  border: ${props.isBorderHidden ? 'none' : 'solid'};
  border-width: 1px;
  border-radius: ${props.borderRadius ? props.borderRadius + 'px' :  ( props.borderRadius === 0 ) ? '0px' :'3px'};
  background-color: ${props.backgroundColor ? props.backgroundColor : '#fffff'};
  border-color: ${ props.warning ? '#ff0000' : '#000000'};
  box-sizing: border-box; 
  font-size: ${ props.fontSize ? props.fontSize : '1em'};
  border-color: ${props.borderColor ? props.borderColor : '#000000'};
`);

type StyledButtonProps = {
  width?: string;
  height?: string;
  flexGrow?: number;
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  backgroundColor?: string;
  disableShadow?: boolean;
  borderRadius?: string;
  enableHoverEvent?: boolean;
}

export const StyledButton = styled.button<StyledButtonProps>((props)=> `
  width: ${props.width ? props.width : 'auto'};
  height: ${props.height ? props.height : '2rem'};
  border: none;
  border-radius: 4px;
  background-color: ${props.backgroundColor ? props.backgroundColor : '#d2d2d2' };
  box-shadow: ${props.disableShadow ? 'none' : '0px 5px 10px rgba(0, 0, 0, 0.1)'};
  flex-grow: ${props.flexGrow ? props.flexGrow : 0};
  cursor: pointer;
  font-size: ${props.fontSize ? props.fontSize : '1em'};
  font-weight: ${ props.fontWeight ? props.fontWeight : 'normal'};
  color: ${props.fontColor ? props.fontColor : '#000000'};
  border-radius: ${props.borderRadius ? props.borderRadius : '0px'};
  &:hover{
    background-color: ${props.enableHoverEvent ? '#87cefa' : props.backgroundColor ? props.backgroundColor  : 'd2d2' };
  }
`);

export const ModalBase = styled.div(()=> `
    width: 11cm;
    height: 14cm;
    border-radius: 4px;
    border: none;
    background-color: #fefefe;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box; 
    margin: auto;
`);

type RelativeBoxProps = {
  width?: string;
  height?: string;
}

export const RelativeBox = styled.div<RelativeBoxProps>((props)=> `
  width: ${props.width ? props.width : '100%'};
  height: ${props.height ? props.height  : '100%'};
  position:relative;
`);

type AbsoluteBoxProps = {
  top?: string;
  left?: string;
  translateX?: number;
  translateY?: number;
  width?: string;
  height?: string;
}

export const AbsoluteBox = styled.div<AbsoluteBoxProps>((props)=> `
  width: ${props.width ? props.width : 'auto'};
  height: ${props.height ? props.height  : 'auto'};
  position: absolute;
  top: ${props.top ? props.top : '0%'};
  left: ${props.left ? props.left : '0%'};
  transform: translate( ${props.translateX ? props.translateX : 0 }%, ${props.translateY ? props.translateY : 0 }% );
`);

type HamburgerMenuBaseProps = {
  isClosed: boolean;
}

export const HamburgerMenuBase = styled.div<HamburgerMenuBaseProps>( (props) => `
  position: fixed;
  top: 0%;
  left:0%;
  width: 300px;
  height: 100vh;
  background-color: #fefefe;
  box-shadow: 1px 5px 10px rgba(0,0,0, 0.2); 
  display: ${props.isClosed ? 'none' : 'block'};
`);

type FlexBoxSpanProps = {
  width?: string;
  height?: string;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  flexGrow?: number;
}

/* ${}の中には、JSのようなコードを書いて、propsから受け取った値を記述する。 */
export const FlexBoxSpan = styled.span<FlexBoxProps>(props => `
  width: ${props.width ? props.width : '100%'};
  height: ${props.height ? props.height  : '100%'};
  display: flex;
  flex-direction: ${props.flexDirection ? props.flexDirection : 'row'};
  align-items: ${props.alignItems ? props.alignItems : 'flex-start'} ;
  justify-content: ${props.justifyContent ? props.justifyContent : 'flex-start'};
  flex-grow: ${props.flexGrow ? props.flexGrow : 0};
  box-sizing: border-box; 
`);

type HoverElementProps = {
  width?: string;
  zIndex?: number;
  backgroundColor?: string;
  disableShadow?: boolean;
  disabled?: boolean;
}

export const HoverElement = styled.div<HoverElementProps>( (props)=> `
  width: ${props.width ? props.width : '100%'};
  z-index: ${props.zIndex ? props.zIndex : '0'};
  background-color: ${props.backgroundColor ? props.backgroundColor : '#87cefa' };
  box-shadow: ${props.disableShadow ? 'none' : '0px 5px 10px rgba(0, 0, 0, 0.1)'};
  border: none;
  border-radius: 4px;
  visibility: hidden;
  &:hover{
    visibility: ${props.disabled ? 'none' : 'visible' };
  }
`);

type StyledTextAreaProps = {
  width?: string;
  height?: string;
  flexGrow?: number;
  warning?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  isBorderHidden?: boolean;
  fontSize?: string;
  resize?: string;
  minWidth?: string;
  minHeight?: string;
}

export const StyledTextArea = styled.textarea<StyledTextAreaProps>((props) => `
  width: ${props.width ? props.width : '300px'};
  height: ${props.height ? props.height : '2em'};
  flex-grow: ${props.flexGrow ? props.flexGrow : 0};
  border: ${props.isBorderHidden ? 'none' : 'solid'};
  border-width: 1px;
  border-radius: ${props.borderRadius ? props.borderRadius + 'px' :  ( props.borderRadius === 0 ) ? '0px' :'3px'};
  background-color: ${props.backgroundColor ? props.backgroundColor : '#fffff'};
  border-color: ${ props.warning ? '#ff0000' : '#000000'};
  box-sizing: border-box; 
  font-size: ${ props.fontSize ? props.fontSize : '1em'};
  resize: ${ props.resize ? props.resize : 'auto'};
  min-width: ${props.minWidth ? props.minWidth : '0px'};
  min-height: ${props.minHeight ? props.minHeight : '0px'};
  font-family: "メイリオ" ;
`);

export const HoverElement2 = styled.div(()=> `
  display: none;
  $:hover{
    display: block;
  }
`)

type StyledSelectProps = {
  width?: string;
  height?: string;
  flexGrow?: number;
  warning?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  isBorderHidden?: boolean;
  fontSize?: string;
  borderColor?: string;
}

export const StyledSelect = styled.select<StyledSelectProps>((props)=> `
  width: ${props.width ? props.width : '300px'};
  height: ${props.height ? props.height : '2em'};
  flex-grow: ${props.flexGrow ? props.flexGrow : 0};
  border: ${props.isBorderHidden ? 'none' : 'solid'};
  border-width: 1px;
  border-radius: ${props.borderRadius ? props.borderRadius + 'px' :  ( props.borderRadius === 0 ) ? '0px' :'3px'};
  background-color: ${props.backgroundColor ? props.backgroundColor : '#fffff'};
  border-color: ${ props.warning ? '#ff0000' : '#000000'};
  box-sizing: border-box; 
  font-size: ${ props.fontSize ? props.fontSize : '1em'};
  border-color: ${props.borderColor ? props.borderColor : '#000000'};
`);