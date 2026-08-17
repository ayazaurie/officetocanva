
import {
    Button,
    Rows,
    Columns,
    Column,
    Box,
    Select,
    CustomizableSelect,
    IconElement,
    Switch,
    ItalicIcon,
    TextColorIcon,
    TextSizeIcon,
    UnderlineIcon,
    StrikethroughIcon,
    BoldIcon,
    FontIcon,
    EyeIcon,
    MoreHorizontalIcon,
    NumberInput,
    Text,
    ListBulletLtrIcon,
    TextAlignLeftIcon,
    TextAlignCenterIcon,
    TextAlignRightIcon,
    TextAlignJustifyIcon,
    AlignLeftIcon,
    ColorSelector,
} from "@canva/app-ui-kit";

import {useFeatureSupport} from "@canva/app-hooks"
import 'styles/components.css'
import { requestFontSelection } from "@canva/asset";
import type {Font} from "@canva/asset";
import * as  React from "react";

interface StyleUIProps {
    styleName:string,
    textSize: number,
    color: string,
    align: string,
    isBold: boolean,
    isItalics: boolean,
    isStrikethrough: boolean,
    isList: boolean,
    isUnderlined: boolean,
    
}

export default function StylesUI({
    styleName, textSize, color, align, isBold, isItalics, isStrikethrough, isList, isUnderlined
}: StyleUIProps){
    
 

    const isSupported = useFeatureSupport();

    const [selectedFont,setSelectedFont] = React.useState<Font | undefined>();
    const [fontButtonText, setFontButtonText] = React.useState<string>("Select Font");
    const [styleTextSize, setStyleTextSize] = React.useState<number>(textSize);
    const [styleColor, setStyleColor] = React.useState<string>(color);
    const [styleAlign, setStyleAlign] = React.useState<string>(align);
    const [styleIsBold, setStyleIsBold] = React.useState<boolean>(isBold);
    const [styleIsItalics, setStyleIsItalics] = React.useState<boolean>(isItalics);
    const [styleIsStrike, setStyleIsStrike] = React.useState<boolean>(isStrikethrough);
    const [styleIsUnderlined, setStyleIsUnderlined] = React.useState<boolean>(isUnderlined);
    const [styleIsIgnored, setStyleIsIgnored] = React.useState<boolean>(false);
    const [styleIsMayus, setStyleIsMayus] = React.useState<boolean>(false);
    const [styleIsList, setStyleIsList] = React.useState<boolean>(isList);
    

    async function handleFontClick() {
        if(isSupported(requestFontSelection))
        {
            const fontResponse = await requestFontSelection({
                selectedFontRef: selectedFont?.ref,
            });

            if (fontResponse.type !== "completed") {
                return;
        }
        setSelectedFont(fontResponse.font)
        setFontButtonText(fontResponse.font.name);
        return;
      }
    }

    async function handleNumberChange(value :number | undefined) {
        if(isSupported(requestFontSelection)) {
            setStyleTextSize(value || 12);
        }
    }
    async function handleColorChange (value : string) {
        if(isSupported(requestFontSelection)) {
            setStyleColor(value || "#000000");
        }
    }

    async function handleBoldClick() {
        switch(styleIsBold)
        {
            case false:
                setStyleIsBold(true);
                break;
            case true:
                setStyleIsBold(false);
                break;
            default:
                break;
        }
    }
    async function handleItalicsClick() {
        switch(styleIsItalics)
        {
            case false:
                setStyleIsItalics(true);
                break;
            case true:
                setStyleIsItalics(false);
                break;
            default:
                break;
        }
    }

    async function handleStrikeClick() {
        switch(styleIsBold)
        {
            case false:
                setStyleIsStrike(true);
                break;
            case true:
                setStyleIsStrike(false);
                break;
            default:
                break;
        }
    }

    async function handleIgnoredClick() {
        switch(styleIsBold)
        {
            case false:
                setStyleIsIgnored(true);
                break;
            case true:
                setStyleIsIgnored(false);
                break;
            default:
                break;
        }
    }
    async function handleIsMayusClick() {
        switch(styleIsBold)
        {
            case false:
                setStyleIsMayus(true);
                break;
            case true:
                setStyleIsMayus(false);
                break;
            default:
                break;
        }
    }
    async function handleIsListClick() {
        switch(styleIsBold)
        {
            case false:
                setStyleIsList(true);
                break;
            case true:
                setStyleIsList(false);
                break;
            default:
                break;
        }
    }
    async function handleIsUnderlinedClick() {
        switch(styleIsBold)
        {
            case false:
                setStyleIsUnderlined(true);
                break;
            case true:
                setStyleIsUnderlined(false);
                break;
            default:
                break;
        }
    }


    return (
        <div>
            <Box>

                <Rows spacing="1u">
                    <Columns spacing="0.5u">
                        <Column width="content">
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%'

                            }}>
                                <Text
                                    alignment="center"
                                    size="large"
                                    variant="bold"
                                    tone="secondary"
                                    >
                                    {styleName}
                                </Text>
                            </div>
                        </Column>
                        <Column width="content">
                            <Button
                                ariaLabel="Toggle style parsing"
                                icon={() => <EyeIcon />}
                                size="medium"
                                type="button"
                                variant="tertiary"
                                pressed = {styleIsIgnored}
                                onClick= {handleIgnoredClick}
                                
                            />
                        </Column>


                    </Columns>
                    <Columns spacing="0.5u">
                        <Column width="content">
                            <Button
                                ariaLabel="Togglr text alignment"
                                size="medium"
                                type="button"
                                variant="secondary"
                                onClick={handleFontClick}
                                stretch = {false}
                            >{fontButtonText}</Button>
                                                 </Column>
                        <Column width="fluid">
                            <NumberInput
                                decrementAriaLabel="Decrease text size by one"
                                defaultValue={styleTextSize}
                                hasSpinButtons
                                step={1}
                                incrementAriaLabel="Increase text size by one"
                                onChange={handleNumberChange}
                            />

                        </Column>
                        <Column width="content">
                            <ColorSelector
                                color="#000000"
                                onChange={handleColorChange}
                                triggerMode="swatch"
                            />
                        </Column>


                    </Columns>
                    <Columns spacing="0.5u">
                        <Column width="content">
                            <Button
                                ariaLabel="Toggle bolding style"
                                icon={() => <BoldIcon />}
                                size="medium"
                                type="button"
                                variant="tertiary"
                                onClick={handleBoldClick}
                                pressed = {styleIsBold}
                                
                            />

                        </Column>
                        <Column width="content">
                            <Button
                                ariaLabel="Toggle italics to style"
                                icon={() => <ItalicIcon />}
                                size="medium"
                                type="button"
                                variant="tertiary"
                                pressed = {styleIsItalics}
                                onClick= {handleItalicsClick}
                            />
                        </Column>
                        <Column width="content">
                            <Button
                                ariaLabel="Toggle underlining to style"
                                icon={() => <UnderlineIcon />}
                                size="medium"
                                type="button"
                                variant="tertiary"
                                pressed = {styleIsUnderlined}
                                onClick= {handleIsUnderlinedClick}
                            />
                        </Column>
                        <Column width="content">
                            <Button
                                ariaLabel="Toggle underlining to style"
                                icon={() => <StrikethroughIcon />}
                                size="medium"
                                type="button"
                                variant="tertiary"

                            />
                        </Column>
                        <Column width="content">
                            <Button
                                ariaLabel="Toggle underlining to style"
                                icon={() => <TextSizeIcon />}
                                size="medium"
                                type="button"
                                variant="tertiary"
                                pressed = {styleIsMayus}
                                onClick= {handleIsMayusClick}
                            />
                        </Column>
                        <Column width="content">
                            <Button
                                ariaLabel="Togglr text alignment"
                                icon={() => <TextAlignCenterIcson />}
                                size="medium"
                                type="button"
                                variant="tertiary"
                             
                            />
                        </Column>
                        <Column width="content">
                            <Button
                                ariaLabel="Toggle list options"
                                icon={() => <ListBulletLtrIcon/>}
                                size="medium"
                                type="button"
                                variant="tertiary"
                                pressed = {styleIsList}
                                onClick= {handleIsListClick}
                            />
                        </Column>
                        
                    </Columns>
                </Rows>

            </Box>
        </div >
    );
}