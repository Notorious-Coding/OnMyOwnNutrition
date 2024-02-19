import { MandatoryIconedProps } from "../props/iconed.props";
import HtmlProps from "../props/html.props";
import toClassName from "../helpers/classnames.helper";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export abstract class BaseIcon {
  abstract getIcon(): React.JSX.Element;
}
export default function Icon({ icon, className, onClick }: MandatoryIconedProps & HtmlProps) {
  return (
    <div className={toClassName(className)} onClick={onClick}>
      {icon.getIcon()}
    </div>
  );
}

class RightArrowIcon extends BaseIcon {
  getIcon() {
    return <ArrowForwardIosIcon />;
  }
}

export const rightArrowIcon = new RightArrowIcon();
