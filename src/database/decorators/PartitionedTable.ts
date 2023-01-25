export const registeredPartitionedTables: { [name: string]: any } = {};

export type PartitionedTableOptions = {
  tableName: string;
  schema?: string;
  frequency?: 'yearly' | 'monthly' | 'daily';
};

export function PartitionedTable(options: PartitionedTableOptions) {
  return function (target: any) {
    registeredPartitionedTables[target.name] = options;
  };
}
