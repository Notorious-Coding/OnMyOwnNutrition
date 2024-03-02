import { Box, Slider, Typography } from "@mui/material";
import { useUserData } from "../../../../providers/userdata.provider";
import { useComponentScopedTranslation } from "../../../../providers/i18n.provider";

export default function CaloricDeficitQuestion() {
  const { userData, set } = useUserData();
  const { t } = useComponentScopedTranslation(CaloricDeficitQuestion);
  return (
    <Box>
      <Typography sx={{ mb: 4 }} color="text.secondary">
        {t("Explanation")}
      </Typography>
      <Slider
        sx={{ width: "90%" }}
        onChange={(e, v) => set({ ...userData, caloricDeficitInPercent: v as number })}
        value={userData.caloricDeficitInPercent}
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

      {userData.weightLoss != null && (
        <Typography>{t("WeightLoss", { percentage: userData.caloricDeficitInPercent, weightLoss: userData.weightLoss * 7 })}</Typography>
      )}
    </Box>
  );
}
