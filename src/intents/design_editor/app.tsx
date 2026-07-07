import { useFeatureSupport, useSelection, useTable } from "@canva/app-hooks";
import React, { useRef } from "react";
import { Button, Rows, Text } from "@canva/app-ui-kit";
import type { DesignEditing, InlineFormatting } from "@canva/design";
import {
  openDesign,
  addElementAtCursor,
  addElementAtPoint,
  addPage,
  createRichtextRange,
  TableElement,
  Cell,
} from "@canva/design";
import { requestOpenExternalUrl, notification } from "@canva/platform";
import { FormattedMessage, useIntl } from "react-intl";
import * as styles from "styles/components.css";
import { useState, useEffect } from "react";
import { findFonts } from "@canva/asset";


export const DOCS_URL = "https://www.canva.dev/docs/apps/";

interface DocumentChildren {
  type: string;
  text?: string;
  formatting?: {
    bold?: boolean;
    italic?: boolean;
    font?: string;
  };
  children?: DocumentChildren[];
  metadata?: {
    style?: string;
    row?: number;
    col?: number;
  };
}

interface DocumentParagraph {
  type: string;
  text: string;
  children: DocumentChildren[];
  metadata?: {
    style?: string;
  };
}

enum Operation {
  NONE,
  UPDATE,
  FLIP,
  DELETE,
  INSERT,
  GROUP,
  INSERT_AND_GROUP,
}

export const App = () => {
  const [operation, setOperation] = useState<Operation>(Operation.NONE);
  const [error, setError] = useState<string | undefined>(undefined);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handlebuttonClick = () => {
    fileInputRef.current?.click();
  };

  const isSupported = useFeatureSupport();
  const addElement = [addElementAtPoint, addElementAtCursor].find((fn) =>
    isSupported(fn),
  );

  const onClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const jsonString = e.target?.result as string;
      try {
        const parsedata = JSON.parse(jsonString);
        const contentArray = parsedata.content as DocumentParagraph[];
        jsonToCanva(contentArray);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    reader.readAsText(file);
  };

  async function checkPageCompatibility() {
    await openDesign({ type: "current_page" }, async (session) => {
      console.log(`The current page is ${session.page.type}`);
    });
  }

  const openExternalUrl = async (url: string) => {
    const response = await requestOpenExternalUrl({
      url,
    });

    if (response.status === "aborted") {
      // user decided not to navigate to the link
    }
  };

  const intl = useIntl();

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  // Main app, have to refractor into better arquitecture
  const jsonToCanva = async (parsedData: DocumentParagraph[]) => {


    const { fonts } = await findFonts();

    const elementsPerPageLimit = 8; //Number of elements before page jump, will refractor to a more sophisticated ssystem later
    const startTopPos = 170; //Start position where to place elements
    const startLeftPos = 65; // Start position where to place elements
    const elementWidth = 695; // How much widdth the text element will have
    const elementGap = 120; // Space betwween place elements, will refractor later.
    const h1Size = 30.7;
    const h2Size = 17.3;
    const textSize = 17.3;
    const titleRowColor = "#102b42";
    const cellColor = "#ffffff";

    let elementCount = 0;
    let currentTopPos = startTopPos;
    //Canva has a limit of 20 editor requests every 10 seconds, timer is to not trigger failsafe.
    const sleepTime = 501;

    for (const content of parsedData) {
      if (content.type !== "paragraph" && content.type !== "heading" && content.type !== "table") continue;
      if (elementCount > 0 && elementCount % elementsPerPageLimit === 0) {
        await addPage();
        await sleep(sleepTime);
        currentTopPos = startTopPos;
      }
      if (content.metadata?.style === "Heading1") {
        console.log("HEADING 1 DETECTED");
        await addElementAtPoint({
          type: "text",
          children: [content.text],
          fontSize: h1Size,
          fontWeight: "bold",
          textAlign: "start",
          top: currentTopPos,
          left: startLeftPos,
          width: elementWidth,
        });
        currentTopPos += elementGap;
        elementCount++;
        await sleep(sleepTime);

        continue;
      } else if (content.metadata?.style === "Heading2") {
        console.log("HEADING2 DETECTED")

        await addElementAtPoint({
          type: "text",
          children: [content.text],
          fontSize: h2Size,
          fontWeight: "bold",
          textAlign: "start",
          top: currentTopPos,
          left: startLeftPos,
          width: elementWidth,
        });
        currentTopPos += elementGap;
        elementCount++;
        await sleep(sleepTime);
        continue;

      }
      else if (content.metadata?.style === "Heading3") {
        console.log("HEADING3 DETECTED")
        await addElementAtPoint({
          type: "text",
          children: [content.text],
          fontSize: h2Size,
          fontWeight: "bold",
          textAlign: "start",
          top: currentTopPos,
          left: startLeftPos,
          width: elementWidth,
        });
        currentTopPos += elementGap;
        elementCount++;
        await sleep(sleepTime);
        continue;
      }
      // else if (content.type === "table") {

      //   const rowAmount = content.children.length;
      //   const lastRow = content.children[rowAmount - 1];
      //   const cellAmount = lastRow?.children?.length;

      //   var lastCel;
      //   if (cellAmount && lastRow.children && lastRow)
      //     lastCel = lastRow.children[cellAmount - 1];
      //   var colAmount = lastCel?.metadata?.col;
      //   if (colAmount) colAmount += 1;
      //   if(!cellAmount) continue;
      //   await notification.addToast({ messageText: rowAmount.toString() });
        
      //   const tableRows = [];

      //   for (const rows of content.children) {
      //     const rowCells = [];
      //     if (rows.children)
      //       for (const cells of rows.children) {
      //         if (cells.children)
      //           for (const cell of cells.children) {
                
      //             var cellRow = cell.metadata?.row;
      //             var cellCol = cell.metadata?.col;
      //             if (cellRow && cellCol) {
      //               cellRow += 1;
      //               cellCol += 1;
      //               }
      //             const textContent = cell.text || "";
      //             var fill = cellColor;
      //             if(cellRow === 1) fill = titleRowColor;
                
      //             rowCells.push({ 
      //               type: "string" as const,
      //               value: textContent,
      //               fillColor: titleRowColor,
      //             });
      //             }
                
      //       }
      //       tableRows.push({cells: rowCells});
      //   }

      //   const tableElement: TableElement = {
      //     type: 'table', 
      //     rows: tableRows,
      //   }
      //   await addElementAtPoint(tableElement);
        

      // }
      else if (!content.metadata?.style) {

        const paragraphRange = createRichtextRange();

        for (const child of content.children) {
          //If the child's formatting has bold/italic, style it's text as bold/italic, otherwise make it normal text
          const canvaStyles: InlineFormatting = {
            fontWeight: child.formatting?.bold ? "bold" : "normal",
            fontStyle: child.formatting?.italic ? "italic" : "normal",
          };

          if (child.text && child.text.length > 0) //Makes sure that the string isn't empty
            paragraphRange.appendText(child.text, canvaStyles);

        }
        //Makes sure it's not an empty child
        if (paragraphRange.readPlaintext().length > 0) {
          const textLength = paragraphRange.readPlaintext().length;
          paragraphRange.formatParagraph(
            { index: 0, length: textLength },
            {
              fontSize: textSize,
            },
          );
          await addElementAtPoint({
            type: "richtext",
            range: paragraphRange,
            top: currentTopPos,
            left: startLeftPos,
            width: elementWidth,
          });
        }
        else {
          continue;
        }

        currentTopPos += elementGap;
        elementCount++;
        await sleep(sleepTime);
        continue;
      }


    }
  };

  return (
    <div className={styles.scrollContainer}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        style={{ display: "none" }}
        accept=".json"
      />
      <Rows spacing="2u">
        <Text>
          <FormattedMessage
            defaultMessage="
              Simple tool to import .docx data into canva.
            "
            description="Instructions for how to make changes to the app. Do not translate <code>src/app.tsx</code>."
            values={{
              code: (chunks) => <code>{chunks}</code>,
            }}
          />
        </Text>
        <Button
          variant="primary"
          onClick={onClick}
          disabled={!addElement}
          tooltipLabel={
            !addElement
              ? intl.formatMessage({
                defaultMessage:
                  "This feature is not supported in the current page",
                description:
                  "Tooltip label for when a feature is not supported in the current design",
              })
              : undefined
          }
          stretch
        >
          {intl.formatMessage({
            defaultMessage: "Choose .json document",
            description:
              "Button text to do something cool. Creates a new text element when pressed.",
          })}
        </Button>
        <Button variant="secondary" onClick={() => openExternalUrl(DOCS_URL)}>
          {intl.formatMessage({
            defaultMessage: "Open Canva Apps SDK docs",
            description:
              "Button text to open Canva Apps SDK docs. Opens an external URL when pressed.",
          })}
        </Button>
      </Rows>
    </div>
  );
};
