import React, { useMemo, useRef, useState } from 'react'
import { Box } from '@mui/material';
import AdaptableGrid from './IvpAdaptableGrid/RADAdaptableGrid';
import { ColDef, Column, GridApi, GridOptions, Module, RowHeightParams } from 'ag-grid-community';
import { Adaptable, AdaptableApi, AdaptableOptions, AdaptableReadyInfo, PredefinedConfig } from '@adaptabletools/adaptable-react-aggrid-cjs';
import 'ag-grid-enterprise';

const adaptableOptions: AdaptableOptions = {
    adaptableId: 'adaptableDemoId',
    dashboardOptions: {
        canFloat: false,
        customToolbars: [
        ]
    },
    autogeneratePrimaryKey: true,
    primaryKey: '',
    columnFilterOptions: {
        // autoApplyFilter: false
        valuesFilterOptions: {
            showCurrentlyFilteredValuesOnly: true
        }
    },
    predefinedConfig: {
        Dashboard: {
            IsCollapsed: true,
            ModuleButtons: [],
            Tabs: [],
        },
        Export: {
            CurrentReport: 'Current Data',
            CurrentDestination: 'Excel',
        },
        Layout: {
            CurrentLayout: 'default_Layout',
            Layouts: [
                {
                    Columns: ["ColumnA", "ColumnB", "ColumnC", "ColumnD"],
                    Name: 'default_Layout',
                    RowGroupedColumns: [],
                    AggregationColumns: {},
                    PinnedColumnsMap: {},
                    PivotColumns: []
                }
            ]
        },
    },
    entitlementOptions: {
        moduleEntitlements: [
            {
                adaptableModule: 'BulkUpdate',
                accessLevel: 'Hidden',
            },
            {
                adaptableModule: 'Layout',
                accessLevel: 'Full',
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
    },
    userInterfaceOptions: {
    },
    stateOptions: {
    },
    layoutOptions: {
        autoSizeColumnsInLayout: true,
        autoSizeColumnsInPivotLayout: true,
        autoSaveLayouts: false,
    },
    containerOptions: {
        adaptableContainer: "adaptableDiv",
        agGridContainer: 'vendorGridDiv'
    },
    exportOptions: {
        exportFormatType: {
            number: 'formattedValue',
            string: 'rawValue',
            date: 'formattedValue'
        }
    },
    quickSearchOptions: {
        quickSearchPlaceholder: "Search",
        filterResultsAfterQuickSearch: true
    },
};

const AdaptableGridRender = () => {
    const [gData, setGData] = useState<any>([
        {
            'ColumnA': "Value A1",
            'ColumnB': "Value A1",
            'ColumnC': "Value A1",
            'ColumnD': "Value A1",
        }, {
            'ColumnA': "Value A2",
            'ColumnB': "Value A2",
            'ColumnC': "Value A2",
            'ColumnD': "Value A2",
        }

    ]);
    const [currentRowTheme, setCurrentRowTheme] = useState<string>("cozy");
    const GridRef = useRef();
    const agGridModules: Module[] = [];
    console.log(GridRef.current);

    const gridOptions: GridOptions = {
        columnDefs: [
            { field: 'ColumnA', type: 'abColDefString', enableRowGroup: true },
            { field: 'ColumnB', type: 'abColDefString', enableRowGroup: true },
            { field: 'ColumnC', type: 'abColDefString', enableRowGroup: true },
            { field: 'ColumnD', type: 'abColDefString', enableRowGroup: true },

        ].map((c) => {
            //@ts-ignore
            c.filter = true;
            //@ts-ignore
            c.floatingFilter = true;
            //@ts-ignore
            c.enablePivot = true;
            //@ts-ignore
            c.enableValue = true;
            //@ts-ignore
            c.sortable = true;
            //@ts-ignore
            c.resizable = true;
            return c;
        }) as ColDef[]
        ,
        defaultColDef: {
            //@ts-ignore
            wrapHeaderText: true,
            //@ts-ignore
            autoHeaderHeight: true,
        },
        autoGroupColumnDef: useMemo<ColDef>(() => {
            return {
                minWidth: 200,
                valueGetter: (params) => {
                    return params.api.getRowGroupColumns().map((col: Column) => params.data ? params.data[col.getColId()] : []).join(' - ');
                }
            };
        }, []),
        rowData: gData,
        enableRangeSelection: true,
        sideBar: true,
        rowSelection: 'multiple',
        cacheQuickFilter: true,
        allowShowChangeAfterFilter: false,
        reactiveCustomComponents: true,
        showOpenedGroup: true,
        suppressAggFilteredOnly: true,
        pivotMaxGeneratedColumns: 50,
        // onPivotMaxColumnsExceeded: (params) => {
        //   console.log('from outside config');
        //   addToast({ severity: "error", title: "Warning", duration: 4000, message: "Maximum allowed pivot column count exceeded.", position: { horizontal: 'right', vertical: 'bottom' } });
        //   return false; // Prevents the pivot from being applied
        // }
    }


    const aggregateColumns = gridOptions.columnDefs!.filter((col: ColDef<any>) => col.type === 'numericColumn');
    let tempPreConfig: PredefinedConfig = adaptableOptions.predefinedConfig as PredefinedConfig;

    aggregateColumns.forEach((column: ColDef<any>) => {
        if (tempPreConfig.Layout?.Layouts && tempPreConfig.Layout?.Layouts.length > 0)
            tempPreConfig.Layout.Layouts[0].AggregationColumns![column.field!] = 'sum';
    });

    adaptableOptions.predefinedConfig = tempPreConfig;

    async function handleGridReady({ adaptableApi, agGridApi }: AdaptableReadyInfo) {
        console.log("Adaptable is ready");
    }

    return (
        <Box height={"80vh"} display={"flex"} justifyContent={"space-around"} width={'90%'}>
            {<AdaptableGrid ref={GridRef} adaptableOptions={adaptableOptions} gridOptions={gridOptions}>
                <Adaptable.Provider
                    // style={{ flex: 'none' }}
                    gridOptions={gridOptions}
                    adaptableOptions={adaptableOptions}
                    onAdaptableReady={handleGridReady}
                    modules={agGridModules}
                >
                    <Adaptable.UI style={{ flex: 'none' }} />
                    <div className="ag-theme-balham ag-theme-ivprad" style={{ flex: 1 }}>
                        {adaptableOptions != null && (
                            <Adaptable.AgGridReact
                                rowGroupPanelShow={"always"}
                                pivotPanelShow={"always"}
                                groupSelectsChildren={true}
                                groupSelectsFiltered={true}
                            />
                        )}
                    </div>
                    {/* <Adaptable.AgGridReact className="ag-theme-balham" /> */}
                </Adaptable.Provider>
            </AdaptableGrid>}
        </Box>
    )
}

export default AdaptableGridRender;