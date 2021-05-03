import React from 'react';
import { HamburgerMenuBase, FlexBox, RelativeBox, AbsoluteBox, StyledText, HoverElement } from './StyledComponents';
import HamburgerMenuButton from './HamburgerMenuButton';

const Frame7: React.FC = () => {
    return (
        <RelativeBox>
            <HamburgerMenuButton isOpening={true}/>
            <HamburgerMenuBase isClosed={false}>
                <RelativeBox>
                    <AbsoluteBox width='70%' height='50%' top='50%' left='50%' translateX={-50} translateY={-50}>
                        <FlexBox 
                                    flexDirection='column'
                                    justifyContent='space-around'>
                            <HoverElement>
                                <StyledText size='1.5em' width='100%' isClickable={true}>
                                    時間割
                                </StyledText>
                            </HoverElement>
                            <HoverElement>
                                <StyledText size='1.5em' width='100%' isClickable={true}>
                                    カレンダー
                                </StyledText>
                            </HoverElement>
                            <HoverElement>
                                <StyledText size='1.5em' width='100%' isClickable={true}>
                                    メモ帳
                                </StyledText>
                            </HoverElement>
                            <HoverElement>
                                <StyledText size='1.5em' width='100%' isClickable={true}>
                                    課題一覧
                                </StyledText>
                            </HoverElement>
                            <HoverElement>
                                <StyledText size='1.5em' width='100%' isClickable={true}>
                                    科目一覧
                                </StyledText>
                            </HoverElement>
                        </FlexBox>
                    </AbsoluteBox>
                    <AbsoluteBox width='9em' top='98%' left='98%' translateX={-100} translateY={-100}>
                        <HoverElement backgroundColor='#d2d2d2'>
                            <StyledText size='1.5em' isClickable={true}>
                                サインアウト
                            </StyledText>
                        </HoverElement>
                    </AbsoluteBox>
                </RelativeBox>
            </HamburgerMenuBase>
        </RelativeBox>
        
    )
}

export default Frame7;