import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useComponentScopedTranslation, useScopedTranslation } from "../../providers/i18n.provider";
import HtmlProps from "../../props/html.props";
import { BiologicSex } from "../../entities/biologic-sex";

export interface BiologicSexRadioProps extends HtmlProps {
  value: BiologicSex;
  onChange: (value: BiologicSex) => void;
}
export default function BiologicSexRadio({ value, onChange }: BiologicSexRadioProps) {
  const { t } = useScopedTranslation("BiologicSex");
  const { t: tComp } = useComponentScopedTranslation(BiologicSexRadio);
  return (
    <FormControl sx={{ pb: 2, pt: 2 }}>
      <FormLabel id="demo-radio-buttons-group-label">{tComp("Gender")}</FormLabel>
      <RadioGroup
        value={value}
        name="radio-buttons-group"
        onChange={(e) => {
          const value: BiologicSex = parseInt(e.target.value);
          onChange(value);
        }}
      >
        <FormControlLabel value={BiologicSex.Male} control={<Radio />} label={t(BiologicSex[BiologicSex.Male])} />
        <FormControlLabel value={BiologicSex.Female} control={<Radio />} label={t(BiologicSex[BiologicSex.Female])} />
      </RadioGroup>
    </FormControl>
  );
}
