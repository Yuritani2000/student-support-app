import styled from 'styled-components';
import { isPropertySignature } from 'typescript';


/* StyledComponentsは、HTML要素にCSSライクな装飾を施して、JSXで使用できるようにしたもの。 */
/* propsを渡すことができ、見た目を動的に変更することができるのが特徴。 */

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
  width?: string;                 // 幅。stringなのでemやpxや%など好きに指定できる
  height?: string;                // 高さ stringなのでemやpxや%など好きに指定できる
  flexGrow?: number;              // FlexBox要素に入れたときの大きさの比率
  isHidden?: boolean;             // trueの時は見えなくなる（当たり判定は残る）
  noDisplay?: boolean;            // trueの時は見えないし、当たり判定も消える
  isClickable?: boolean;          // trueにするとカーソルを置いたときに指マークになる
  showBorder?: boolean;           // 枠線を表示するか
  borderTopWidth?: number;        // 上側の枠線の幅
  borderRightWidth?: number;      // 右側の枠線の幅
  borderBottomWidth?: number;     // 下の枠線の幅
  borderLeftWidth?: number;       // 左の枠線の幅
  borderColor?: string;           // 枠線の色
  backgroundColor?: string;       // 背景色（図形の色）
  margin?: string;                // 隣の要素の間隔'上 右 下 左'の順番で、pxやemなど単位を好きに指定する。
  enableShadow?: boolean;         // trueにすると影を描写する
  overflow?: string;              // 要素がはみ出したときの動作を記述する
  alignSelf?: string;             // FlexBox要素に入れたときに、どこに寄せるかを記述する。指定しないとFlexBoxで指定した設定になる
  borderRadius?: number;          // 角の丸みをpx単位で指定。
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
  width?: string;           // 幅
  height?: string;          // 高さ
  size?: string;            // 文字の大きさ。好きな単位で指定
  fontWeight?: string;      // 'bold'で太字。'normal'で普通の字。
  fontColor?: string;       // カラーコードで色を指定
  flexGrow?: number;        // FlexBox要素内に入れたときの大きさの比率
  isClickable?: boolean;    // trueにするとカーソルを合わせたときに指マークになる
  isHidden?: boolean;       // trueにするとみえなくなる（当たり判定は残る）
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
  width?: string;             // 幅。指定しないと親要素の幅いっぱいになる
  height?: string;            // 高さ。指定しないと親要素の幅いっぱいになる
  flexDirection?: string;     // 子要素を並べる向き。'row'で横並び。'column'で縦並び。初期値は'row'。
  alignItems?: string;        // 子要素をどこ寄りに整列するか指定。
  justifyContent?: string;    // 子要素の間隔をどのようにするか指定。詳しくはGoogle先生に
  flexGrow?: number;          // FlexBoxの子要素に置いたときの大きさの比率
  flexWrap?: string;          // 子要素が幅いっぱいに整列したら折り返すかどうかなどを指定。
  overflow?: string;          // 子要素があふれだしたときにどうするかを指定。
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
  width?: string;             // 幅。初期値300px
  height?: string;            // 高さ。初期値2em
  flexGrow?: number;          // FlexBoxの子要素に置いたときの大きさの比率
  warning?: boolean;          // trueにすると枠線を赤く染める
  backgroundColor?: string;   // 背景色。カラーコード指定
  borderRadius?: number;      // 角の丸み指定(px)
  isBorderHidden?: boolean;   // trueで枠線を非表示
  fontSize?: string;          // 入力される文字の大きさを指定
  borderColor?: string;       // 枠線の色を指定。初期値#000000（黒）
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
  width?: string;             // 幅
  height?: string;            // 高さ
  flexGrow?: number;          // FlexBoxの子要素に置いたときの大きさの比率。
  fontSize?: string;          // ボタンないテキストの大きさ
  fontWeight?: string;        // 'bold'でテキストが太字に
  fontColor?: string;         // フォント色をカラーコードで指定
  backgroundColor?: string;   // 背景色をカラーコードで指定
  disableShadow?: boolean;    // trueで影を「非表示」。StyledDivのenableShadowと逆なので注意
  borderRadius?: string;      // 角の丸み(px)
  enableHoverEvent?: boolean; // trueにするとhover時に青くなる
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
    background-color: ${props.enableHoverEvent ? '#87cefa' : props.backgroundColor ? props.backgroundColor  : '#d2d2d2' };
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

/* AbsoluteBoxの親要素に指定すると、AbsoluteBoxが、この要素を親要素として位置決定をする。 */
export const RelativeBox = styled.div<RelativeBoxProps>((props)=> `
  width: ${props.width ? props.width : '100%'};
  height: ${props.height ? props.height  : '100%'};
  position:relative;
`);

type AbsoluteBoxProps = {
  top?: string;           // 要素の上にどれくらいの空間を開けるか
  left?: string;          // 要素の左にどれくらいの空間を開けるか
  translateX?: number;    // 要素幅の何%位置をずらすか
  translateY?: number;    // 要素高さの何%位置をずらすか
  width?: string;         // 幅
  height?: string;        // 高さ
}

/* 要素を絶対一で指定したい時に使う。 */
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

/* コメントがない部分はStyledInputと同じ */
type StyledTextAreaProps = {
  width?: string;
  height?: string;
  flexGrow?: number;
  warning?: boolean;
  backgroundColor?: string;
  borderRadius?: number;
  isBorderHidden?: boolean;
  fontSize?: string;
  resize?: string;            // autoで自由自在に大きさ調整可能。noneで大きさ調整不可
  minWidth?: string;          // 最小幅
  minHeight?: string;         // 最大幅
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