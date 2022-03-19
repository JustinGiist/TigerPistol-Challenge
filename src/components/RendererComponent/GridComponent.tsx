import React from "react";
import { useMemo } from "react";
import { iHero } from "./RendererComponent";
const ImageComponent = React.lazy(() => import("./ImageComponent"));
export interface GridComponentProps {
  data: any;
  setActiveHero: (id: string) => void;
}
const GridComponent = (props: GridComponentProps) => {
  const gridElement = useMemo(() => {
    return (
      <div className="gridContent">
        {props.data &&
          props.data.map((hero: iHero, i: number) => {
            return <GridItem props={props} hero={hero} i={i} />;
          })}
      </div>
    );
  }, [props.data]);
  return (
    <>
      <div className="subHeadlineBold">Grid View</div>
      {gridElement}
    </>
  );
};
export const GridItem = ({
  props,
  hero,
  i,
}: {
  props: GridComponentProps;
  hero: iHero;
  i: number;
}) => {
  return (
    <div
      key={i + hero.name}
      className="heroGridItem"
      onClick={() => {
        props.setActiveHero(hero.id);
      }}
    >
      <div className="imageWrapper">{<ImageComponent hero={hero} />}</div>
      <div className="headlineThree">{hero.name || "No Super Name"}</div>
    </div>
  );
};
export default GridComponent;
