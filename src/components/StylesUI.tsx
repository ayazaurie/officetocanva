
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
    isBold?: boolean,
    isItalics?: boolean,
    isStrikethrough?: boolean,
    isList?: boolean,
    isUnderlined?: boolean,
    
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
    const [styleMods, setStyleMods] = React.useState<boolean[]>([isBold ?? false, isItalics ?? false, isStrikethrough ?? false, isUnderlined ?? false, isList ?? false, false, false]);
    

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

      
    const handleModClick = (index: number) => {
       
        setStyleMods((prev) => 
            prev.map((value : boolean, i) => (i === index ? !value : value))
        );
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
                                pressed = {styleMods[6]}
                                onClick={() => handleModClick(6)}
                                
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
                                color={styleColor}
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
                                pressed = {styleMods[0]}
                                onClick={() => handleModClick(0)}
                                
                            />

                        </Column>
                        <Column width="content">
                            <Button
                                ariaLabel="Toggle italics to style"
                                icon={() => <ItalicIcon />}
                                size="medium"
                                type="button"
                                variant="tertiary"
                                pressed = {styleMods[1]}
                                onClick={() => handleModClick(1)}
                            />
                        </Column>
                        <Column width="content">
                            <Button
                                ariaLabel="Toggle underlining to style"
                                icon={() => <UnderlineIcon />}
                                size="medium"
                                type="button"
                                variant="tertiary"
                                pressed = {styleMods[2]}
                                onClick={() => handleModClick(2)}
                            />
                        </Column>
                        <Column width="content">
                            <Button
                                ariaLabel="Toggle underlining to style"
                                icon={() => <StrikethroughIcon />}
                                size="medium"
                                type="button"
                                variant="tertiary"
                                pressed = {styleMods[3]}
                                onClick={() => handleModClick(3)}
                            />
                        </Column>
                        <Column width="content">
                            <Button
                                ariaLabel="Toggle underlining to style"
                                icon={() => <TextSizeIcon />}
                                size="medium"
                                type="button"
                                variant="tertiary"
                                pressed = {styleMods[4]}
                                onClick={() => handleModClick(4)}
                            />
                        </Column>
                        <Column width="content">
                            <Button
                                ariaLabel="Togglr text alignment"
                                icon={() => <TextAlignCenterIcon />}
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
                                pressed = {styleMods[5]}
                                onClick={() => handleModClick(5)}
                            />
                        </Column>
                        
                    </Columns>
                </Rows>

            </Box>
        </div >
    );
}