import { Box, Slider, Typography } from "@mui/material";
import { PhysicalActivity } from "../../../../entities/physical-activity";
import { useScopedTranslation } from "../../../../providers/i18n.provider";
import { useNutrition } from "../../../../providers/nutrition.provider";

export default function PhysicalActivityQuestion() {
  const { physicalActivity, setPhysicalActivity } = useNutrition();

  return (
    <Box sx={{ height: 300, mt: 4 }}>
      <Slider
        sx={{
          '& input[type="range"]': {
            WebkitAppearance: "slider-vertical",
          },
        }}
        onChange={(e, v) => setPhysicalActivity(v as number)}
        orientation="vertical"
        value={physicalActivity}
        max={4}
        valueLabelDisplay="auto"
        size="medium"
        marks={[
          { value: PhysicalActivity.Sedentary, label: <Mark activity={PhysicalActivity.Sedentary} /> },
          { value: PhysicalActivity.SlightlyActive, label: <Mark activity={PhysicalActivity.SlightlyActive} /> },
          { value: PhysicalActivity.ModeratelyActive, label: <Mark activity={PhysicalActivity.ModeratelyActive} /> },
          { value: PhysicalActivity.VeryActive, label: <Mark activity={PhysicalActivity.VeryActive} /> },
          { value: PhysicalActivity.ExtremelyActive, label: <Mark activity={PhysicalActivity.ExtremelyActive} /> },
        ]}
      />
    </Box>
  );
}

export function Mark({ activity }: { activity: PhysicalActivity }) {
  const { t } = useScopedTranslation("PhysicalActivity");

  return (
    <Box>
      <Typography color="text.primary">{t(PhysicalActivity[activity])}</Typography>
      <Typography sx={{ fontSize: 12 }} color="text.secondary">
        {t(PhysicalActivity[activity] + "Description")}
      </Typography>
    </Box>
  );
}
