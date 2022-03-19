import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import "./RendererComponent.scss";
import React from "react";
import { CircularProgress } from "@material-ui/core";
import ListComponent from "./ListComponent";

const HeroCard = React.lazy(() => import("../HeroCard/HeroCard"));
const ModalComponent = React.lazy(
  () => import("../ModalComponent/ModalComponent")
);
const DatagridComponent = React.lazy(() => import("./DatagridComponent"));
const GridComponent = React.lazy(() => import("./GridComponent"));

export interface iHero {
  id: string;
  name: string;
  appearance: {
    ["eye-color"]: string;
    gender: string;
    ["hair-color"]: string;
    height: string[];
    race: string;
    weight: string[];
  };
  biography: {
    aliases: string[];
    alignment: string;
    ["alter-egos"]: string;
    ["first-appearance"]: string;
    ["full-name"]: string;
    ["place-of-birth"]: string;
    publisher: string;
  };
  connections: {
    ["group-affiliation"]: string[];
    relatives: string;
  };
  image: {
    url: string;
  };
  powerstats: {
    combat: string;
    durability: string;
    intelligence: string;
    power: string;
    speed: string;
    strength: string;
  };
  work: {
    base: string;
    occupation: string;
  };
}
enum ActiveTab {
  List,
  Grid,
  DataGrid,
}
interface RendererComponentProps {}
const RendererComponent = (props: RendererComponentProps) => {
  const tabs = ["List", "Grid", "DataGrid"];
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.List);
  const [heroMap, setHeroMap] = useState<Map<string, iHero>>();
  const [activeHero, innerSetActiveHero] = useState<iHero | undefined>(
    undefined
  );
  const [data, setData] = useState<any>();
  const scrollRef = useRef<any>(undefined);
  const getData = useCallback(async () => {
    fetch("https://tppublic.blob.core.windows.net/test-data/super-heroes.json")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setData(data);
          setHeroMap(getMap(data));
        }
      });
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);
  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, [activeTab]);
  const closeFunction = () => {
    setActiveHero(undefined);
  };
  const setActiveHero = (id: string | undefined) => {
    if (id) {
      if (!heroMap) {
        const newMap = getMap(data);
        const hero = newMap?.get(id);
        innerSetActiveHero(hero);
        return;
      }
      const hero = heroMap?.get(id);
      innerSetActiveHero(hero);
    } else {
      innerSetActiveHero(undefined);
    }
  };
  const getMap = (data: iHero[]) => {
    const tempMap = new Map<string, iHero>();
    data.forEach((hero: iHero) => {
      tempMap.set(hero.id, hero);
    });
    return tempMap;
  };
  const fallback = (
    <div className="fullContainer">
      <div className="center">
        <CircularProgress />
      </div>
    </div>
  );
  return (
    <>
      <div className="fullContainer">
        <div className="top">
          <div className="headlineOne">Tiger Pistol Code Challenge</div>
          <div className="tabs">
            {tabs.map((tab, i) => {
              return (
                <div
                  key={i + tab}
                  className={
                    "tab subHeadlineMedium" + (activeTab === i ? " active" : "")
                  }
                  onClick={() => {
                    setActiveTab(i);
                  }}
                >
                  {tab}
                </div>
              );
            })}
          </div>
        </div>
        <div className="bottom" ref={scrollRef}>
          <Suspense fallback={fallback}>
            <div
              className={"content " + ActiveTab[activeTab].toLocaleLowerCase()}
            >
              <div className="headlineTwo">SUPER HERO NEWS</div>
              {activeTab === ActiveTab.List && (
                <ListComponent
                  data={data}
                  setActiveHero={setActiveHero}
                  heroMap={heroMap}
                />
              )}
              {activeTab === ActiveTab.Grid && (
                <GridComponent data={data} setActiveHero={setActiveHero} />
              )}
              {activeTab === ActiveTab.DataGrid && (
                <DatagridComponent
                  data={data}
                  setActiveHero={setActiveHero}
                  heroMap={heroMap}
                />
              )}
            </div>
          </Suspense>
        </div>
      </div>
      {activeHero && (
        <Suspense fallback={fallback}>
          <ModalComponent closeFunction={closeFunction}>
            <HeroCard hero={activeHero} closeFunction={closeFunction} />
          </ModalComponent>
        </Suspense>
      )}
    </>
  );
};
export default RendererComponent;
