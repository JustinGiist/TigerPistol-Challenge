import Icon from "../Icon";
import ImageComponent from "../RendererComponent/ImageComponent";
import { iHero } from "../RendererComponent/RendererComponent";
import "./HeroCard.scss";
interface HeroCardProps {
  hero: iHero;
  closeFunction: () => void;
}
const HeroCard = (props: HeroCardProps) => {
  const getColors = (value: any) => {
    if (value === "null") return " red";
    const number = parseInt(value);
    if (!isNaN(number)) {
      if (value > 70) {
        return " green";
      } else if (value > 40) {
        return " orange";
      }
      return " red";
    }
    return "";
  };
  const EntryElement = ({
    label,
    bodyText,
    isTopSection,
  }: {
    label: string;
    bodyText: any;
    isTopSection?: boolean;
  }) => {
    return (
      <div
        className={
          isTopSection
            ? "flex" + (isTopSection ? getColors(bodyText) : "")
            : "flexColumn"
        }
      >
        <div className="subHeadlineBold">{label}</div>
        <div className={"bodyMedium "}>{bodyText}</div>
      </div>
    );
  };
  const powerstats = Object.entries(props.hero.powerstats).map((key, value) => {
    return (
      <EntryElement
        key={value + key[0]}
        label={key[0]}
        bodyText={key[1]}
        isTopSection={true}
      />
    );
  });
  const appearances = Object.entries(props.hero.appearance).map(
    (key, value) => {
      return (
        <EntryElement key={value + key[0]} label={key[0]} bodyText={key[1]} />
      );
    }
  );
  const biography = Object.entries(props.hero.biography).map((key, value) => {
    return (
      <EntryElement key={value + key[0]} label={key[0]} bodyText={key[1]} />
    );
  });
  const connections = Object.entries(props.hero.connections).map(
    (key, value) => {
      return (
        <EntryElement key={value + key[0]} label={key[0]} bodyText={key[1]} />
      );
    }
  );
  const work = Object.entries(props.hero.work).map((key, value) => {
    return (
      <EntryElement key={value + key[0]} label={key[0]} bodyText={key[1]} />
    );
  });
  return (
    <div className="heroCard">
      <CloseComponent closeFunction={props.closeFunction} />
      <div className="headlineOne">{props.hero.name}</div>
      <div className="top">
        <div className="heroCardImage">
          {<ImageComponent hero={props.hero} />}
        </div>
        <div className="heroCardItem">
          <div className="headlineOne">Power Stats</div>
          {powerstats}
        </div>
      </div>

      <div className="heroCardContent">
        <div className="heroCardItem">
          <div className="headlineOne">Appearance</div>
          {appearances}
        </div>
        <div className="heroCardItem">
          <div className="headlineOne">Biography</div>
          {biography}
        </div>
        <div className="heroCardItem">
          <div className="headlineOne">Connections</div>
          {connections}
        </div>
        <div className="heroCardItem">
          <div className="headlineOne">Work</div>
          {work}
        </div>
      </div>
    </div>
  );
};
export default HeroCard;
const CloseComponent = ({ closeFunction }: { closeFunction: () => void }) => {
  return (
    <div className="closePositioner" onClick={closeFunction}>
      <div className="close">
        <Icon icon="Close" />
      </div>
    </div>
  );
};
