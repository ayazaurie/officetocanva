//Utility interfaces
export interface CanvaDesignAttributes {
    isAbsolute: boolean,
    isUniform?: boolean,
    x?: number,
    y?: number,
}
export interface Coordinate {
    x: number,
    y: number,
}

//Placement logic interfaces
export interface DocumentChildren {
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

export interface DocumentParagraph {
  type: string;
  text: string;
  children: DocumentChildren[];
  metadata?: {
    style?: string;
  };
}

export interface ParagraphStyle {
  style: string;
  textSize: number;
  color: string;
  allign: string;
  font: string;
  bold: boolean;
  italics: boolean;
  underline: boolean;
  strikethrough: boolean;
  ignore: boolean;
}

export type UIState = {
  paths: {
    d: string;
    fill: {
      dropTarget: boolean;
      color: string;
    };
  }[];
  viewBox: {
    width: number;
    height: number;
    top: number;
    left: number;
  };

};

export type AppElementData = {
   
        paths: [
            {
                d: string,
                fill: {
                    dropTarget: boolean,
                    color: string,
                },
                stroke: {
                    weight: number,
                    color: string,
                    strokeAlign: string
                }
            },
        ];
        viewBox: {
            width: number,
            height: number,
            top: number,
            left: number,
        };
        width: number;
        height: number;
        rotation: number;
        top: number;
        left: number;
};

export type AppElementDataRevised = {
  d: string;
  color: string;
  vWidth: number;
  vHeight: number;
  vTop: number;
  vLeft: number;
  width: number;
  height: number;
  rotation: number;
  top: number;
  left: number;
  opacity?: number;
}

