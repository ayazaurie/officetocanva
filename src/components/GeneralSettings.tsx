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



export default function GeneralSettings({x, y } : Coordinate){

    const defaultStartEndPoints = (() => ({x:y/8, y:7*y/8}));
    const defaultwidthPoints = (() => ({x: x/8, y:7*x/8}));
    const defaultGap = 6;
    const [startEndPoints,setStartEndPoints] = React.useState<Coordinate>(defaultStartEndPoints);
    const [widthPoints,setwidthPoints] = React.useState<Coordinate>((defaultwidthPoints));
    const [gapLength,setGapLength] = React.useState<number>(defaultGap);
    
    return (
        <div>
            <Box>
                <Rows spacing ="1u">
                    <FormField
                        label="Elements placement"
                        description = "Settings to control placed content area"
                        control = {(props) => (
                           
                                    <Columns spacing= "2u">
                                        <Column>
                                            <Rows spacing ="0.5u">
                                                <Column>
                                                
                                                    <Text
                                                        alignment="start"
                                                        size="medium"
                                                        tone="secondary"
                                                        > Textbox Width</Text>
                                                    <Button                                                                                ariaLabel="Togglr text alignment"
                                                            size="medium"
                                                            type="button"
                                                            variant="secondary"
                                                            onClick= {() => {}}
                                                            stretch = {false}
                                                        >Reset</Button>
                                                </Column>
                                            
                                            
                                                <Columns spacing="0.5u">
                                                    <Column width="1/2">
                                                        <NumberInput
                                                        {...props}
                                                        defaultValue={startEndPoints.x}
                                                        />    
                                                        
                                                    </Column>
                                                    <Column width="1/2">
                                                    <NumberInput
                                                        {...props}
                                                        defaultValue={startEndPoints.y}
                                                        />  
                                                    </Column>
                                                
                                                </Columns>
                                            </Rows>
                                        </Column>

                                        <Column>
                                            <Rows spacing ="0.5u">
                                                <Column>
                                                
                                                    <Text
                                                        alignment="start"
                                                        size="medium"
                                                        tone="secondary"
                                                        > Textbox Width</Text>
                                                </Column>
                                            
                                            
                                                <Columns spacing="0.5u">
                                                    <Column width="1/2">
                                                        <NumberInput
                                                        {...props}
                                                        defaultValue={startEndPoints.x}
                                                        />    
                                                        
                                                    </Column>
                                                    <Column width="1/2">
                                                    <NumberInput
                                                        {...props}
                                                        defaultValue={startEndPoints.y}
                                                        />  
                                                    </Column>
                                                
                                                </Columns>                                      
                                            </Rows>
                                        </Column>
                                </Columns>

                                 )}/>
                </Rows>
            </Box>
        </div>


                               
                            
    )

}