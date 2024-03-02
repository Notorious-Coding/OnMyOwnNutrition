import { Container, Grid } from "@mui/material";
import QuestionnaireStepper from "./questionnaire-stepper";
import Question from "./question";
import { QuestionnaireStep, useStepper } from "../../../providers/step.provider";
import BmrQuestion from "./bmr-question";
import { Resume } from "./resume";
import UserDataProvider from "../../../providers/userdata.provider";
import PhysicalActivityQuestion from "./physical-activity-question";
import CaloricDeficitQuestion from "./caloric-deficit-question";
import NutrientDistributionQuestion from "./nutrient-distribution-question";
import HomeQuestion from "./home-question";

export default function Home() {
  const { currentStep } = useStepper();

  const isResumeHidden = currentStep.key == QuestionnaireStep.Home;
  const isQuestionHidden = currentStep.key == QuestionnaireStep.Resume;
  return (
    <Container sx={{ p: 4 }}>
      <QuestionnaireStepper />
      <UserDataProvider>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          {currentStep.key != QuestionnaireStep.Resume && (
            <Grid item xs={12} md={isResumeHidden ? 12 : 8}>
              <Question title={currentStep.label} subtitle={currentStep.subtitle}>
                {currentStep.key == QuestionnaireStep.Home && <HomeQuestion />}
                {currentStep.key == QuestionnaireStep.BMR && <BmrQuestion />}
                {currentStep.key == QuestionnaireStep.PhysicalActivity && <PhysicalActivityQuestion />}
                {currentStep.key == QuestionnaireStep.CaloricDeficit && <CaloricDeficitQuestion />}
                {currentStep.key == QuestionnaireStep.NutrientDistribution && <NutrientDistributionQuestion />}
              </Question>
            </Grid>
          )}
          <Grid
            sx={{
              display: {
                xs: !isResumeHidden ? "block" : "none",
                md: !isResumeHidden ? "block" : "none",
              },
            }}
            item
            md={isQuestionHidden ? 12 : 4}
          >
            <Resume />
          </Grid>
        </Grid>
      </UserDataProvider>
    </Container>
  );
}
