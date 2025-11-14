import React, { useEffect, forwardRef, useState } from "react";
import "@adaptabletools/adaptable-react-aggrid-cjs/index.css";
import "@adaptabletools/adaptable-react-aggrid-cjs/themes/dark.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { AdaptableStateFunctionConfig, PredefinedConfig } from "@adaptabletools/adaptable-react-aggrid-cjs";
import { AdaptableGridProp } from "./TypeDefinition";

const AdaptableGrid = forwardRef(({ adaptableOptions, gridOptions, children }: AdaptableGridProp, ref) => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState<string>("");

  const [adaptableGridState, setAdaptableGridState] = useState<any>({ adaptableOptions: null, gridOptions: null, adaptableViewInfo: [] });

  async function prepareAdaptableOptions() {

    gridOptions.getContextMenuItems ??= (params: any) => { return ["copy", "copyWithHeaders", "paste"]; };

    gridOptions.statusBar = gridOptions.statusBar ?? {
      statusPanels: [
        { statusPanel: "agTotalRowCountComponent", align: "left" },
        { statusPanel: "agSelectedRowCountComponent", align: 'center' },
        { statusPanel: "agFilteredRowCountComponent", align: "right" },
        {
          key: 'Adaptable Status Panel Center1',
          statusPanel: 'AdaptableStatusPanel',
          align: 'center',
        },
        {
          key: 'Layout Status Panel',
          statusPanel: 'AdaptableStatusPanel',
          align: 'center',
        },
      ],
    };

    gridOptions.pivotMaxGeneratedColumns = gridOptions.pivotMaxGeneratedColumns ?? 250;

    gridOptions.onPivotMaxColumnsExceeded = gridOptions.onPivotMaxColumnsExceeded ?? ((params: any) => {
      return false; // Prevents the pivot from being applied
    });

    adaptableOptions.stateOptions = {
      applyState: (state: any) => {
        delete state.viewId;
        return state;
      },
      saveState: (
        state: any,
        { adaptableStateKey }: AdaptableStateFunctionConfig
      ) => {
        const result = state;
        result.viewId = adaptableStateKey;
        return result;
      },
    };

    adaptableOptions.userName = "TestUser";
    adaptableOptions.settingsPanelOptions = {
      alwaysShowInDashboard: adaptableOptions.settingsPanelOptions?.alwaysShowInDashboard ?? true,
      navigation: {
        items: [
          'GridInfo',
          'Dashboard',
          'ToolPanel',
          'StatusBar',
          'StateManagement',
          '-',
          'Alert',
          'CalculatedColumn',
          'ConditionalStyle',
          'CustomSort',
          'DataSet',
          // 'Export',
          'Filter',
          'FlashingCell',
          'FormatColumn',
          'FreeTextColumn',
          'Layout',
          'PlusMinus',
          'Query',
          'QuickSearch',
          'Schedule',
          'Shortcut',
          '-',
          'SystemStatus',
          'DataChangeHistory',
          'TeamSharing',
          //'Theme',
        ],
      },
    };

    adaptableOptions.entitlementOptions = {
      moduleEntitlements: [
        {
          adaptableModule: 'BulkUpdate',
          accessLevel: 'Hidden',
        },
        {
          adaptableModule: 'Layout',
          accessLevel: 'ReadOnly',
        },
        {
          adaptableModule: 'PlusMinus',
          accessLevel: 'Hidden',
        },
        {
          adaptableModule: 'Schedule',
          accessLevel: 'Hidden',
        },
      ]
    };
    let predefinedconfig = adaptableOptions.predefinedConfig as PredefinedConfig;
    predefinedconfig.StatusBar = predefinedconfig.StatusBar ??
    {
      StatusBars: [
        {
          Key: 'Adaptable Status Panel Center1',
          StatusBarPanels: ['CellSummary', 'ColumnFilter'],
        }, {
          Key: 'Layout Status Panel',
          StatusBarPanels: ['Layout'],
        }
      ],
    };
    predefinedconfig.Theme = {
      UserThemes: [
        {
          Name: "ivprad",
          Description: "RAD Theme",
          AgGridClassName: "ag-theme-balham",
        },
      ],
      CurrentTheme: "ivprad",
    };


    window.localStorage.removeItem(adaptableOptions.adaptableId!);

    setAdaptableGridState({
      adaptableOptions: adaptableOptions,
      gridOptions: gridOptions,
    });
  }

  useEffect(() => {
    prepareAdaptableOptions();
  }, [currentLoggedInUser]);

  return (
    <div className="AdaptableGridContainer">
      <div id={"TestID"} style={{ display: "flex", flexFlow: "column", height: "100%", position: "relative" }}
      >
        {adaptableGridState.adaptableOptions != null && (children)}
      </div>
    </div>
  );
});

export default AdaptableGrid;
