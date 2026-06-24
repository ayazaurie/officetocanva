import { useFeatureSupport } from "@canva/app-hooks";
import React, {useRef} from "react";
import { Button, Rows, Text } from "@canva/app-ui-kit";
import { addElementAtCursor, addElementAtPoint } from "@canva/design";
import { requestOpenExternalUrl } from "@canva/platform";
import { FormattedMessage, useIntl } from "react-intl";
import * as styles from "styles/components.css";
import { parseDocument } from "scripts/parser/DocumentParser";

export const DOCS_URL = "https://www.canva.dev/docs/apps/";

export const App = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handlebuttonClick = () => {
    fileInputRef.current?.click();
  }
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;
      const documentAst = await parseDocument(file);

  };

  const isSupported = useFeatureSupport();
  const addElement = [addElementAtPoint, addElementAtCursor].find((fn) =>
    isSupported(fn),
  );

  const onClick = () => {
    if (!addElement) {
      return;
    }

    addElement({
      type: "text",
      children: ["Hello world!"],
    });
  };

  const openExternalUrl = async (url: string) => {
    const response = await requestOpenExternalUrl({
      url,
    });

    if (response.status === "aborted") {
      // user decided not to navigate to the link
    }
  };

  const intl = useIntl();

  async function arrangeContentOnCanva(ast: any) {
    const nodes = ast.content || ast;
    for(const node of nodes)
    {
      if(node == null) return;
      switch (node.type)
      {
        case "paragraph":
          let canvaFontSize = 13; 
          let isBold = false;
          let isItalic = false;
          if (node.style === "Ttulo1")
          {
            canvaFontSize = 23;
            isBold = true;
          }
          else if (node.style === "Ttulo2"){
            isBold = true;
          }
          await addElement({
            type:"text",
            children: [node.text || ""],
            fontSize: canvaFontSize,
            fontWeight: isBold ? "bold" : "normal"
          });

    }
  }

  return (
    <div className={styles.scrollContainer}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style ={{display: 'none'}}
        accept=".docx, .json"
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
          onClick={handlebuttonClick}
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
            defaultMessage: "Choose .docx document",
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
}
