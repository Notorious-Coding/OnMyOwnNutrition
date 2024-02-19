import { Container, Grid } from "@mui/material";
import QuestionnaireStepper from "./questionnaire-stepper";
import Question from "./question";
import { QuestionnaireStep, useStepper } from "../../../providers/step.provider";
import BmrQuestion from "./bmr-question";
import { Resume } from "./resume";
import NutritionProvider from "../../../providers/nutrition.provider";
import PhysicalActivityQuestion from "./physical-activity-question";
import CaloricDeficitQuestion from "./caloric-deficit-question";
import NutrientDistributionQuestion from "./nutrient-distribution-question";

export default function Home() {
  const { currentStep } = useStepper();
  return (
    <Container sx={{ p: 4 }}>
      <QuestionnaireStepper />
      <NutritionProvider>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {currentStep.key != QuestionnaireStep.Resume && (
            <Grid item xs={12} md={8}>
              <Question title={currentStep.label}>
                {currentStep.key == QuestionnaireStep.BMR && <BmrQuestion />}
                {currentStep.key == QuestionnaireStep.PhysicalActivity && <PhysicalActivityQuestion />}
                {currentStep.key == QuestionnaireStep.CaloricDeficit && <CaloricDeficitQuestion />}
                {currentStep.key == QuestionnaireStep.NutrientDistribution && <NutrientDistributionQuestion />}
              </Question>
            </Grid>
          )}
          <Grid
            sx={{ display: { xs: currentStep.key == QuestionnaireStep.Resume ? "block" : "none", md: "block" } }}
            item
            md={currentStep.key == QuestionnaireStep.Resume ? 12 : 4}
          >
            <Resume />
          </Grid>
        </Grid>
      </NutritionProvider>
    </Container>
  );
}
