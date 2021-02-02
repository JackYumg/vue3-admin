// import { ElMessageBox } from 'element-plus';

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $alert: typeof ElMessageBox.alert;
//   }
// }

import 'vue';
import { VNodeChild } from '@vue/runtime-core';
import { HTMLAttributes } from '@vue/runtime-dom';

/**
 * jsx component compatible template
 */

export type JsxNode = VNodeChild | JSX.Element;

export interface SlotDirective {
  [name: string]: () => JsxNode;
}

type JsxComponentCustomProps = {
  vModel?: unknown;
  vModels?: unknown[];
  vCustom?: unknown[];
  vShow?: boolean;
  vHtml?: JsxNode;
  vSlots?: SlotDirective;
} & Omit<HTMLAttributes, 'innerHTML'> & {
    innerHTML?: JsxNode;
  };

declare module '@vue/runtime-core' {
  interface ComponentCustomProps extends JsxComponentCustomProps {
    onClick?: () => any;
    vSlots?: {
      [eleName: string]: JSX.Element;
    };
    // [eleName: string]: any;
  }
}
