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
    ReloadIcon,
    Accordion,
    AccordionItem,
    InfoIcon,
} from "@canva/app-ui-kit";

import {
    openDesign,
    addElementAtCursor,
    addElementAtPoint,
    addPage,
    createRichtextRange,
    TextElement,
} from "@canva/design";

import type { DesignMetadata, PageMetadata } from '@canva/design';
import type { CanvaDesignAttributes, Coordinate } from "src/utils/interfaces";

import { useFeatureSupport } from "@canva/app-hooks"
import 'styles/components.css';
import { requestFontSelection } from "@canva/asset";
import type { Font } from "@canva/asset";
import * as  React from "react";



export default function GeneralSettings({ x, y }: Coordinate) {

    const defaultStartEndPoints = (() => ({ x: y / 8, y: 7 * y / 8 }));
    const defaultwidthPoints = (() => ({ x: x / 8, y: 7 * x / 8 }));
    const defaultGap = 6;
    const [startEndPoints, setStartEndPoints] = React.useState<Coordinate>(defaultStartEndPoints);
    const [widthPoints, setwidthPoints] = React.useState<Coordinate>((defaultwidthPoints));
    const [gapLength, setGapLength] = React.useState<number>(defaultGap);

    return (
        <div>
            <Box>
                <Rows spacing="1u">
                    <FormField
                        label="Elements placement"
                        description="Settings to control placed content area"
                        control={(props) => (
                            <Box>
                                <Rows spacing="1u">
                                    {/* Set up buttons*/}

                                    <Columns spacing="1u" align="start">
                                        <Column width="content">
                                            <Button ariaLabel="Toggle text alignment"
                                                size="medium"
                                                type="button"

                                                variant="secondary"
                                                onClick={() => { }}
                                                stretch={false}
                                            >Setup</Button>

                                        </Column>
                                        <Column width="content">
                                            <Button ariaLabel="Reset Placement Settings"
                                                size="medium"
                                                type="button"
                                                icon={() => <ReloadIcon />}
                                                variant="secondary"
                                                onClick={() => { }}
                                                stretch={false}
                                                tooltipLabel="Reset to default"
                                            ></Button>

                                        </Column>
                                        <Column width="content">
                                            <Button ariaLabel="Toggle text alignment"
                                                size="medium"
                                                type="button"

                                                variant="primary"
                                                onClick={() => { }}
                                                stretch={false}
                                            >Update</Button>

                                        </Column>
                                        
                                        <Column>
                                            <Button ariaLabel="Placement Info"
                                                
                                                type="button"
                                                icon={() => <InfoIcon />}
                                                variant="tertiary"
                                                onClick={() => { }}
                                                stretch={false}
                                                pressed = {false}
                                                tooltipLabel="Press for helps"
                                            ></Button>
                                        </Column>
                                    </Columns>

                                    {/* Advanced Options */}
                                    <Accordion dividers={false}  >
                                        <AccordionItem title="Advanced Options" >
                                            <Columns spacing="1.5u">
                                                <Column>
                                                    <Rows spacing="0.5u">
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
                                                                        alignment="start"
                                                                        size="small"
                                                                        tone="secondary"
                                                                    > Vertical Start/End</Text>

                                                                </div>

                                                            </Column>
                                                            <Column>
                                                                <Button ariaLabel="Toggle text alignment"
                                                                    size="medium"
                                                                    type="button"
                                                                    icon={() => <ReloadIcon />}
                                                                    variant="tertiary"
                                                                    onClick={() => { }}
                                                                    stretch={false}
                                                                ></Button>

                                                            </Column>
                                                        </Columns>
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
                                                    <Rows spacing="0.5u">
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
                                                                        alignment="start"
                                                                        size="small"
                                                                        tone="secondary"
                                                                    > Horizontal Start/End</Text>

                                                                </div>

                                                            </Column>
                                                            <Column>
                                                                <Button ariaLabel="Toggle text alignment"
                                                                    size="medium"
                                                                    type="button"
                                                                    icon={() => <ReloadIcon />}
                                                                    variant="tertiary"
                                                                    onClick={() => { }}
                                                                    stretch={false}
                                                                ></Button>

                                                            </Column>
                                                        </Columns>
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
                                        </AccordionItem>
                                    </Accordion>



                                </Rows>
                            </Box>

                        )} />
                </Rows>
            </Box>
        </div>




    )

}