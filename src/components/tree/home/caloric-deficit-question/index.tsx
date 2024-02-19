import { Box, Slider, Typography } from "@mui/material";
import { useNutrition } from "../../../../providers/nutrition.provider";
import { useComponentScopedTranslation } from "../../../../providers/i18n.provider";

export default function CaloricDeficitQuestion() {
  const { caloricDeficit, setCaloricDeficit, weightLoss } = useNutrition();
  const { t } = useComponentScopedTranslation(CaloricDeficitQuestion);
  return (
    <Box sx={{ mt: 4 }}>
      <Slider
        onChange={(e, v) => setCaloricDeficit(v as number)}
        value={caloricDeficit}
        max={30}
        min={1}
        size="medium"
        step={1}
        valueLabelDisplay="auto"
        valueLabelFormat={(value: number) => value + "%"}
        marks={[
          { value: 1, label: "1%" },
          { value: 30, label: "30%" },
        ]}
      />

      {weightLoss != null && <Typography>{t("WeightLoss", { weightLoss: weightLoss * 7 })}</Typography>}
    </Box>
  );
}
