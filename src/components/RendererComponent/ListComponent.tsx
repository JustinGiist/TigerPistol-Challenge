import { useMemo } from "react";
import { iHero } from "./RendererComponent";

export interface ListComponentProps {
  data: any;
  setActiveHero: (id: string) => void;
  heroMap: Map<string, iHero> | undefined;
}
const ListComponent = (props: ListComponentProps) => {
  return (
    <>
      <div className="subHeadlineBold">CardList</div>
      <ListElement {...props} />
    </>
  );
};
export default ListComponent;
const ListElement = (props: ListComponentProps) => {
  const listElement = useMemo(() => {
    return (
      <div className="listContent">
        {props.data &&
          props.data.map((hero: iHero, i: number) => {
            return (
              <div
                key={i + hero.name}
                className={"heroListItem" + (i % 2 === 1 ? " odd" : "")}
                onClick={() => {
                  props.setActiveHero(hero.id);
                }}
              >
                <div className="headlineFive">{hero.id || "No ID"}</div>
                <div className="headlineFive">
                  {hero.name || "No Super Name"}
                </div>
                <div className="headlineFive">
                  {hero.biography["full-name"] || "No Real Name"}
                </div>
              </div>
            );
          })}
      </div>
    );
  }, [props.data]);
  return (
    <>
      <div
        className={"heroListItem"}
        style={{
          background: "var(--theme-super-gradient)",
          color: "white",
          cursor: "default",
        }}
      >
        <div className="headlineFive">ID</div>
        <div className="headlineFive">SUPER NAME</div>
        <div className="headlineFive">REAL NAME</div>
      </div>
      {listElement}
    </>
  );
};
