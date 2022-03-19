import { useMemo, useState } from "react";
import Icon from "../Icon";
import { iHero } from "./RendererComponent";
interface ImageComponentProps {
  hero: iHero;
}
const ImageComponent = (props: ImageComponentProps) => {
  const [error, setError] = useState<boolean>(false);
  const imageElement = useMemo(() => {
    return !error ? (
      <img src={props.hero.image.url} onError={() => setError(true)} />
    ) : (
      <div className="noImageWrapper">
        <Icon icon="NoImage" />
        <div className="subtext">No Image Found</div>
      </div>
    );
  }, [error]);
  return imageElement;
};
export default ImageComponent;
