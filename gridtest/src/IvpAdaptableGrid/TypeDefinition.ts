/* istanbul ignore file */

import { AdaptableOptions } from "@adaptabletools/adaptable-react-aggrid-cjs";
import { GridOptions } from "ag-grid-enterprise";

export type AdaptableGridProp = {
    adaptableOptions: AdaptableOptions,
    gridOptions: GridOptions,
    children?: React.ReactNode,
}