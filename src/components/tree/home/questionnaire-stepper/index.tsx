import { Box, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { useStepper } from "../../../../providers/step.provider";

export default function QuestionnaireStepper() {
  const { steps, currentStep } = useStepper();

  return (
    <Box>
      <Stepper activeStep={currentStep.key}>
        {steps.map((s, index) => {
          if (index == steps.length - 1) return;
          return (
            <Step key={s.label}>
              <StepLabel>
                <Typography sx={{ display: { xs: "none", md: "flex" } }}>{s.label}</Typography>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
