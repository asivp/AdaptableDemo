import { AgChartsEnterpriseModule } from 'ag-charts-enterprise';
import { type Module, AllEnterpriseModule, ValidationModule } from 'ag-grid-enterprise';

export const agGridModules: Module[] = [
  AllEnterpriseModule.with(AgChartsEnterpriseModule),
  ValidationModule,
];
