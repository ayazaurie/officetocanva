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
    FormField,
    Text,
    ListBulletLtrIcon,
    TextAlignLeftIcon,
    TextAlignCenterIcon,
    TextAlignRightIcon,
    TextAlignJustifyIcon,
    AlignLeftIcon,
    ColorSelector,
} from "@canva/app-ui-kit";

import {
  openDesign,
  addElementAtCursor,
  addElementAtPoint,
  addPage,
  createRichtextRange,
  TextElement,
} from "@canva/design";

import type {DesignMetadata, PageMetadata} from '@canva/design';
import type { CanvaDesignAttributes , Coordinate} from "src/utils/interfaces"; 

import {useFeatureSupport} from "@canva/app-hooks"
import 'styles/components.css';
import { requestFontSelection } from "@canva/asset";
import type {Font} from "@canva/asset";
import * as  React from "react";



export default function GeneralSettings(designDimentions : Coordinate){

    const defaultStartEndPoints = (() => ({x:designDimentions.y/8, y:7*designDimentions.y/8}));
    const defaultWidthPointL = (() => ({x: designDimentions.x/8, y:designDimentions.y/8}));
    const defaultWidthPointR = (() => ({x: 7*designDimentions.x/8, y:designDimentions.y/8}));
    const defaultGap = 6;
    const [startEndPoint,setStartEndPoint] = React.useState<Coordinate>(defaultStartEndPoints);
    const [widthPointL,setWidthPointL] = React.useState<Coordinate>((defaultWidthPointL));
    const [widthPointR,setWidthPointR] = React.useState<Coordinate>((defaultWidthPointR));
    const [gapLength,setGapLength] = React.useState<number>(defaultGap);
    
    return (
        <div>
            <Box>
                <Rows spacing ="1u">
                    <FormField
                        label="Textbox width settings"
                        description = "Settings to control placed content width"
                        control = {(props) => (
                            <Columns spacing= "0.5u">
                                <Column>
                                    <NumberInput
                                    {...props}
                                    defaultValue={widthPointL.x}
                                    />    
                                    <NumberInput
                                    {...props}
                                    defaultValue={widthPointL.y}
                                    />  
                                </Column>
                            </Columns>
                            
                        )}
                    /> 
                </Rows>
            </Box>
        </div>
    )

}