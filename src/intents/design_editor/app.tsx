import { useFeatureSupport } from "@canva/app-hooks";
import React, { useRef } from "react";
import { Button, Rows, Text } from "@canva/app-ui-kit";
import type { DesignEditing, InlineFormatting } from "@canva/design";
import { openDesign, addElementAtCursor, addElementAtPoint, addPage, createRichtextRange } from "@canva/design";
import { requestOpenExternalUrl } from "@canva/platform";
import { FormattedMessage, useIntl } from "react-intl";
import * as styles from "styles/components.css";
import { useState } from "react";
import { findFonts } from "@canva/asset";


export const DOCS_URL = "https://www.canva.dev/docs/apps/";

interface DocumentChildren {
  type: string;
  text: string;
  formatting?: {
    bold?: boolean;
    italic?: boolean;
    font?: string;
  }
  metadata?: {
    style?: string;
  }
}

interface DocumentParagraph {
  type: string;
  text: string;
  children: DocumentChildren[];
  metadata?: {
    style?: string;
  }
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
  }


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
    }

    reader.readAsText(file);
  };

  async function checkPageCompatibility() {
    await openDesign({ type: "current_page" }, async (session) => {
      console.log(`The current page is ${session.page.type}`);
    })
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

  const jsonToCanva = async (parsedData: DocumentParagraph[]) => {

    const { fonts } = await findFonts();


    const elementsPerPageLimit = 5;
    const startTopPos = 170;
    const startLeftPos = 83;
    const elementWidth = 695;
    const elementGap = 18;
    const h1Size = 23;
    const h2Size = 13;
    const textSize = 13;

    let elementCount = 0;
    let currentTopPos = startTopPos;


    for (const paragraph of parsedData) {
      if (paragraph.type !== 'paragraph') continue;
      if (elementCount > 0 && elementCount % elementsPerPageLimit === 0) {
        await addPage();
        currentTopPos = startTopPos;
      }
      if (paragraph.metadata?.style === "Ttulo1") {
        addElementAtPoint({
          type: "text",
          children: [paragraph.text],
          fontSize: h1Size,
          fontWeight: "bold",
          textAlign: "start",
          top: currentTopPos,
          left: startLeftPos,
          width: elementWidth,
        });
        continue;

      } else if (paragraph.metadata?.style === "Ttulo2") {
        addElementAtPoint({
          type: "text",
          children: [paragraph.text],
          fontSize: h2Size,
          fontWeight: "bold",
          textAlign: "start",
          top: currentTopPos,
          left: startLeftPos,
          width: elementWidth,

        });
        continue;
      }
      else if (paragraph.metadata?.style) {
        const paragraphRange = createRichtextRange();
        for (const child of paragraph.children) {
          const canvaStyles: InlineFormatting = {};
          if (child.formatting) {
            if (child.formatting.bold) {
              canvaStyles.fontWeight = "bold";
            }
            if (child.formatting.italic) {
              canvaStyles.fontStyle = "italic";
            }

            // if(child.formatting.font)
            // {
            //   const matchedFont = fonts.find((f) => f.name.toLowerCase() === child.formatting!.font!.toLowerCase());

            //   if (matchedFont)
            //   {
            //     canvaStyles.fontRef = matchedFont.ref;
            //   } else {
            //     console.warn(`Font "${child.formatting.font}" isn't available in Canva. Falling back.`);
            //   }

            // }
          }

          paragraphRange.appendText(child.text, canvaStyles);
          const textLength = paragraphRange.readPlaintext().length;
          paragraphRange.formatParagraph({ index: 0, length: textLength },
            {
              fontSize: textSize,
            })
        }
        await addElementAtPoint({
          type: "richtext",
          range: paragraphRange,
          top: currentTopPos,
          left: startLeftPos,
          width: elementWidth,

        });

      }
      currentTopPos += elementGap;
      elementCount++;
    }
  }


  return (
    <div className={styles.scrollContainer}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        style={{ display: 'none' }}
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

