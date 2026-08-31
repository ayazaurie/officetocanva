//TO DO:
// Add functionality
//     Bind Data
// Add Accessibility features
//      Tooltips
//      Tutorial

import {
    Button,
    Rows,
    Columns,
    Column,
    Box,
    NumberInput,
    FormField,
    Text,
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
    type DesignEditing,
    AppElementOptions,
    initAppElement,
} from "@canva/design";

import type { DesignMetadata, PageMetadata, ShapeElementAtPoint, ShapePath, ShapeViewBox } from '@canva/design';
import type { CanvaDesignAttributes, Coordinate } from "src/utils/interfaces";


import { useFeatureSupport } from "@canva/app-hooks"
import 'styles/components.css';
import { requestFontSelection } from "@canva/asset";
import type { Font } from "@canva/asset";
import * as  React from "react";
import { AppElementData } from "src/utils/interfaces";
import { start } from "repl";
import { Path } from "typescript";

const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
const sleepTime = 600;

export type AppElementChangeEvent = {
    data: AppElementData;
    update?: (opts: AppElementOptions<AppElementData>) => Promise<void>;
}

const handleSetup = async (startPoints: Coordinate,
    widthPoints: Coordinate,
    designSize: Coordinate) => {

    const colors = {
        left: "#142cff",
        right: "#ff1414",
        top: "#000000",
        bottom: "#ffffff",
        overlay: "#2d2d2d"
    }

    const marginsUI: AppElementData[] = [
        {
            paths: [
                {
                    d: `M 0 0 V ${designSize.y * 3} H 3 L 3 0 Z`,
                    fill: {
                        dropTarget: false,
                        color: colors.left,
                    },
                    stroke: {
                        weight: 4,
                        color: colors.left,
                        strokeAlign: "inset"
                    }
                },
            ],
            viewBox: {
                width: 4,
                height: designSize.y * 3,
                top: 0,
                left: 0,
            },
            width: 4,
            height: designSize.y * 3,
            rotation: 0,
            top: 0,
            left: widthPoints.x,

        },
        {
            paths: [
                {
                    d: `M 0 0 V ${designSize.y * 3} H 3 L 3 0 Z`,
                    fill: {
                        dropTarget: false,
                        color: colors.left,
                    },
                    stroke: {
                        weight: 4,
                        color: colors.left,
                        strokeAlign: "inset"
                    }
                },
            ],
            viewBox: {
                width: 4,
                height: designSize.y * 3,
                top: 0,
                left: 0,
            },
            width: 4,
            height: designSize.y * 3,
            rotation: 0,
            top: 0,
            left: widthPoints.x,
        },
        {
            paths: [
                {
                    d: `M 0 0 H ${designSize.x * 3} V 3 L 0 3 Z`,
                    fill: {
                        dropTarget: false,
                        color: colors.top,
                    },
                    stroke: {
                        weight: 4,
                        color: colors.top,
                        strokeAlign: "inset"
                    }
                },
            ],
            viewBox: {
                width: designSize.x * 3,
                height: 4,
                top: 0,
                left: 0,
            },
            width: designSize.x * 3,
            height: 4,
            rotation: 0,
            top: startPoints.x,
            left: 0,
        },
        {
            paths: [
                {
                    d: `M 0 0 H ${designSize.x * 3} V 3 L 0 3 Z`,
                    fill: {
                        dropTarget: false,
                        color: colors.bottom,
                    },
                    stroke: {
                        weight: 4,
                        color: colors.bottom,
                        strokeAlign: "inset"
                    }
                },
            ],
            viewBox: {
                width: designSize.x * 3,
                height: 4,
                top: 0,
                left: 0,
            },
            width: designSize.x * 3,
            height: 4,
            rotation: 0,
            top: startPoints.y,
            left: 0,
        },
        {
            paths: [
                {
                    d: `M 0 0 H ${designSize.x} V ${designSize.y} L 0 ${designSize.y} Z`,
                    fill: {
                        dropTarget: false,
                        color: colors.overlay,
                    },
                    stroke: {
                        weight: 4,
                        color: colors.overlay,
                        strokeAlign: "inset"
                    }
                },
            ],
            viewBox: {
                width: designSize.x,
                height: designSize.y,
                top: 0,
                left: 0,
            },
            width: designSize.x,
            height: designSize.y,
            rotation: 0,
            top: 0,
            left: 0,
        }
    ];

    const appElementClientLeft = initAppElement<AppElementData>({
       
        render: (data) => {
            const i = 0;
            if (marginsUI[i]) {
                return [
                    {
                        type: "shape",
                        viewBox: marginsUI[i].viewBox as ShapeViewBox,
                        paths: marginsUI[i].paths as ShapePath[],
                        top: marginsUI[i].top,
                        left: marginsUI[i].left,
                        width: marginsUI[i].width,
                        height: marginsUI[i].height,
                    }
                ]
            }
            return [{
                type: "shape",
                viewBox: {
                    width: 4,
                    height: designSize.y * 3,
                    top: 0,
                    left: 0,
                },
                paths: [
                    {
                        d: `M 0 0 V ${designSize.y * 3} H 3 L 3 0 Z`,
                        fill: {
                            dropTarget: false,
                            color: colors.left,
                        },
                        stroke: {
                            weight: 4,
                            color: colors.left,
                            strokeAlign: "inset"
                        }
                    },
                ],
                top: 0,
                left: 0,
                width: 100,
                height: 100,
            }]
        }

    });

    const appElementClientRight = initAppElement<AppElementData>({
       
        render: (data) => {
            const i = 1;
            if (marginsUI[i]) {
                return [
                    {
                        type: "shape",
                        viewBox: marginsUI[i].viewBox as ShapeViewBox,
                        paths: marginsUI[i].paths as ShapePath[],
                        top: marginsUI[i].top,
                        left: marginsUI[i].left,
                        width: marginsUI[i].width,
                        height: marginsUI[i].height,
                    }
                ]
            }
            return [{
                type: "shape",
                viewBox: {
                    width: 4,
                    height: designSize.y * 3,
                    top: 0,
                    left: 0,
                },
                paths: [
                    {
                        d: `M 0 0 V ${designSize.y * 3} H 3 L 3 0 Z`,
                        fill: {
                            dropTarget: false,
                            color: colors.left,
                        },
                        stroke: {
                            weight: 4,
                            color: colors.left,
                            strokeAlign: "inset"
                        }
                    },
                ],
                top: 0,
                left: 0,
                width: 100,
                height: 100,
            }]
        }

    });

    const appElementClientTop = initAppElement<AppElementData>({
       
        render: (data) => {
            const i = 2;
            if (marginsUI[i]) {
                return [
                    {
                        type: "shape",
                        viewBox: marginsUI[i].viewBox as ShapeViewBox,
                        paths: marginsUI[i].paths as ShapePath[],
                        top: marginsUI[i].top,
                        left: marginsUI[i].left,
                        width: marginsUI[i].width,
                        height: marginsUI[i].height,
                    }
                ]
            }
            return [{
                type: "shape",
                viewBox: {
                    width: 4,
                    height: designSize.y * 3,
                    top: 0,
                    left: 0,
                },
                paths: [
                    {
                        d: `M 0 0 V ${designSize.y * 3} H 3 L 3 0 Z`,
                        fill: {
                            dropTarget: false,
                            color: colors.left,
                        },
                        stroke: {
                            weight: 4,
                            color: colors.left,
                            strokeAlign: "inset"
                        }
                    },
                ],
                top: 0,
                left: 0,
                width: 100,
                height: 100,
            }]
        }

    });

    const appElementClientBottom = initAppElement<AppElementData>({
       
        render: (data) => {
            const i = 3;
            if (marginsUI[i]) {
                return [
                    {
                        type: "shape",
                        viewBox: marginsUI[i].viewBox as ShapeViewBox,
                        paths: marginsUI[i].paths as ShapePath[],
                        top: marginsUI[i].top,
                        left: marginsUI[i].left,
                        width: marginsUI[i].width,
                        height: marginsUI[i].height,
                    }
                ]
            }
            return [{
                type: "shape",
                viewBox: {
                    width: 4,
                    height: designSize.y * 3,
                    top: 0,
                    left: 0,
                },
                paths: [
                    {
                        d: `M 0 0 V ${designSize.y * 3} H 3 L 3 0 Z`,
                        fill: {
                            dropTarget: false,
                            color: colors.left,
                        },
                        stroke: {
                            weight: 4,
                            color: colors.left,
                            strokeAlign: "inset"
                        }
                    },
                ],
                top: 0,
                left: 0,
                width: 100,
                height: 100,
            }]
        }

    });

    const appElementClientOverlay = initAppElement<AppElementData>({
       
        render: (data) => {
            const i = 4;
            if (marginsUI[i]) {
                return [
                    {
                        type: "shape",
                        viewBox: marginsUI[i].viewBox as ShapeViewBox,
                        paths: marginsUI[i].paths as ShapePath[],
                        top: marginsUI[i].top,
                        left: marginsUI[i].left,
                        width: marginsUI[i].width,
                        height: marginsUI[i].height,
                    }
                ]
            }
            return [{
                type: "shape",
                viewBox: {
                    width: 4,
                    height: designSize.y * 3,
                    top: 0,
                    left: 0,
                },
                paths: [
                    {
                        d: `M 0 0 V ${designSize.y * 3} H 3 L 3 0 Z`,
                        fill: {
                            dropTarget: false,
                            color: colors.left,
                        },
                        stroke: {
                            weight: 4,
                            color: colors.left,
                            strokeAlign: "inset"
                        }
                    },
                ],
                top: 0,
                left: 0,
                width: 100,
                height: 100,
            }]
        }

    });

    





    // await addElementAtPoint(overlayBase);
    // await addElementAtPoint(leftLineBase);
    // await addElementAtPoint(rightLineBase);
    // await addElementAtPoint(topLineBase);
    // await addElementAtPoint(bottomLineBase);

    await openDesign({ type: "current_page" }, async (session) => {

        if (session.page.type !== "absolute") return;

        const overlay = session.page.elements.filter((element) => {
            if (element.type !== "shape") return false;

            return element.paths.toArray().some((path) => {
                const colorFill = path.fill.colorContainer?.ref;
                return colorFill?.type == "solid" && colorFill.color === colors.overlay;

            });
        });

        if (overlay.length > 0) {
            var times = 0;
            overlay.forEach((element) => {
                if (element.locked || element.type === "unsupported") return;
                element.transparency = 0.3;

                return;

            });

        }
        await sleep(sleepTime);


        const leftLine = session.page.elements.filter((element) => {
            if (element.type !== "shape") return false;

            return element.paths.toArray().some((path) => {
                const colorFill = path.fill.colorContainer?.ref;
                return colorFill?.type == "solid" && colorFill.color === colors.left;

            });
        });

        if (leftLine.length > 0) {
            var times = 0;
            leftLine.forEach((element) => {
                if (element.locked || element.type === "unsupported") return;
                element.top -= designSize.y;
                return;

            });

        }
        await sleep(sleepTime);


        const rightLine = session.page.elements.filter((element) => {
            if (element.type !== "shape") return false;

            return element.paths.toArray().some((path) => {
                const colorFill = path.fill.colorContainer?.ref;
                return colorFill?.type == "solid" && colorFill.color === colors.right;

            });
        });

        if (rightLine.length > 0) {
            rightLine.forEach((element) => {
                if (element.locked || element.type === "unsupported") return;
                element.top -= designSize.y;
            });

        }
        await sleep(sleepTime / 2);

        const topLine = session.page.elements.filter((element) => {
            if (element.type !== "shape") return false;

            return element.paths.toArray().some((path) => {
                const colorFill = path.fill.colorContainer?.ref;
                return colorFill?.type == "solid" && colorFill.color === colors.top;

            });
        });

        if (topLine.length > 0) {
            topLine.forEach((element) => {
                if (element.locked || element.type === "unsupported") return;
                element.left -= designSize.x;

            });

        }
        await sleep(sleepTime / 2);


        const bottomLine = session.page.elements.filter((element) => {
            if (element.type !== "shape") return false;

            return element.paths.toArray().some((path) => {
                const colorFill = path.fill.colorContainer?.ref;
                return colorFill?.type == "solid" && colorFill.color === colors.bottom;

            });
        });


        if (bottomLine.length > 0) {
            bottomLine.forEach((element) => {
                if (element.locked || element.type === "unsupported") {
                    console.log(`locked: ${element.locked} type: ${element.type}`);
                    return;
                }
                element.left -= designSize.x;

            });

        }


        await session.sync();

    });

}




export default function GeneralSettings(designSize: Coordinate) {

    const defaultStartEndPoints = (() => ({ x: designSize.y / 8, y: 7 * designSize.y / 8 }));
    const defaultwidthPoints = (() => ({ x: designSize.x / 8, y: 7 * designSize.x / 8 }));
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

                                                variant="secondary"
                                                onClick={() => handleSetup(
                                                    startEndPoints, widthPoints, designSize
                                                )}
                                                stretch={false}
                                            >Setup</Button>

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
                                                pressed={false}
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
                                            <Columns spacing="0.5u">
                                                <Column width="content">
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
                                                                    > Gap</Text>

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
                                                                    defaultValue={gapLength}
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