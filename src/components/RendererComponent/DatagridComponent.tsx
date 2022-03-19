import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { ListComponentProps } from "./ListComponent";
import { iHero } from "./RendererComponent";

const DatagridComponent = (props: ListComponentProps) => {
  return (
    <>
      <div className="subHeadlineBold">Datagrid</div>
      <DataGridElement {...props} />
    </>
  );
};
export default DatagridComponent;
const DataGridElement = (props: ListComponentProps) => {
  if (!props.data) return <></>;
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 32 },
    { field: "name", headerName: "Super Name", width: 150 },
    { field: "realName", headerName: "Real Name", width: 150 },
  ];
  const rows: any[] = props.data.map((hero: iHero) => {
    return {
      id: hero.id,
      name: hero.name,
      realName: hero.biography["full-name"],
    };
  });
  const gridClick = (e: any) => {
    if (e.row) {
      props.setActiveHero(e.row.id);
    }
  };
  return (
    <div className="datagrid">
      <DataGrid
        sx={{
          boxShadow: 2,
          "& .MuiDataGrid-row:hover": {
            color: "var(--theme-teritary)",
          },
        }}
        rows={rows}
        columns={columns}
        onRowClick={gridClick}
      />
    </div>
  );
};
