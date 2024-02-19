import { Box, Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import HtmlProps from "../../../../props/html.props";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useComponentScopedTranslation } from "../../../../providers/i18n.provider";
import { useStepper } from "../../../../providers/step.provider";
export interface QuestionProps extends HtmlProps {
  title: string;
}
export default function Question({ children, title }: QuestionProps) {
  const { t } = useComponentScopedTranslation(Question);
  const { isFirstStep, isLastStep, currentStep, nextStep, previousStep } = useStepper();
  return (
    <Card elevation={4} sx={{ p: 1 }}>
      <CardContent>
        <Typography variant="h5">{title}</Typography>
        <Box sx={{ pb: 2 }}>{children}</Box>
      </CardContent>
      <CardActions>
        <Button disabled={isFirstStep} onClick={previousStep} variant="outlined" size="medium" startIcon={<ArrowBackIosIcon />}>
          {t("Previous")}
        </Button>
        <Button
          disabled={isLastStep || !currentStep.isStepValid}
          onClick={nextStep}
          variant="contained"
          size="medium"
          endIcon={<ArrowForwardIosIcon />}
        >
          {t("Continue")}
        </Button>
      </CardActions>
    </Card>
  );
}
