import React from "react";
import {
    Button,
    Rows,
    Columns,
    Column,
    Box,
    Button,
    Select,
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
    Text,
} from "@canva/app-ui-kit";

export default function StylesUI({ styleName,
    textSize,
    color,
    allign,
    font,
    isBold,
    isItalics,
    isStrikethrough,
    isIgnore,
}) {
    return (
        <div className="styles-UI">
            <Rows>
                <Box>

                    <Columns>
                        <Column>
                            <Text
                                alignment="start"
                                size="medium"
                                variant="bold"
                            >
                                {styleName}
                            </Text>
                        </Column>
                        <Column>

                        </Column>
                    </Columns>
                </Box>
            </Rows>
        </div >
    )
}