import { Badge, Box, Card, CardContent, Tooltip, Typography } from "@mui/material";
import { useNutrition } from "../../../../providers/nutrition.provider";
import { useComponentScopedTranslation, useScopedTranslation } from "../../../../providers/i18n.provider";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { QuestionnaireStep, useStepper } from "../../../../providers/step.provider";
import { BiologicSex } from "../../../../entities/biologic-sex";
export function Resume() {
  const { tdeeWithDeficit, tdee, bmr, weightLoss, proteins, carbohydrates, fat, physicalInformation } = useNutrition();
  const { currentStep } = useStepper();
  const { t } = useComponentScopedTranslation(Resume);
  const { t: tSex } = useScopedTranslation("BiologicSex");
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {t("Title")}
        </Typography>

        {currentStep.key == QuestionnaireStep.Resume && (
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>{t("PhysicalInformation")}</Typography>
            <Typography>{t("Weight", { weight: physicalInformation?.weight })}</Typography>
            <Typography>{t("Height", { height: physicalInformation?.height })}</Typography>
            <Typography>{t("Age", { age: physicalInformation?.age })}</Typography>
            <Typography>{t("Sex", { sex: tSex(BiologicSex[physicalInformation!.sex]) })}</Typography>
          </Box>
        )}
        {bmr && currentStep.key >= QuestionnaireStep.BMR && (
          <ResumeSection tooltip={t("BmrTooltip", undefined, true)} label={t("BmrLabel")} description={t("Bmr", { ["bmr"]: bmr })} />
        )}
        {tdee && currentStep.key >= QuestionnaireStep.PhysicalActivity && (
          <ResumeSection tooltip={t("TdeeTooltip", undefined, true)} label={t("TdeeLabel")} description={t("Tdee", { ["tdee"]: tdee })} />
        )}
        {tdee && currentStep.key >= QuestionnaireStep.CaloricDeficit && (
          <ResumeSection
            tooltip={t("TdeeWithDeficitTooltip", undefined, true)}
            label={t("TdeeWithDeficitLabel")}
            description={t("TdeeWithDeficit", { ["tdeeWithDeficit"]: tdeeWithDeficit })}
          />
        )}
        {weightLoss && currentStep.key >= QuestionnaireStep.CaloricDeficit && (
          <ResumeSection
            tooltip={t("WeightLossTooltip", undefined, true)}
            label={t("WeightLossLabel")}
            description={t("WeightLoss", { ["weightLoss"]: Math.abs(Math.round(weightLoss * 7 * 100) / 100) })}
          />
        )}

        {currentStep.key >= QuestionnaireStep.NutrientDistribution && (
          <ResumeSection
            tooltip={t("NutrientDistributionTooltip", undefined, true)}
            label={t("NutrientDistributionLabel")}
            description={t("NutrientDistribution", { proteins, carbohydrates, fat })}
          />
        )}
      </CardContent>
    </Card>
  );
}

interface ResumeSectionProps {
  tooltip: string;
  label: string;
  description: string;
}
export function ResumeSection({ tooltip, label, description }: ResumeSectionProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box>
        <Badge
          badgeContent={
            <Tooltip
              title={
                <Typography sx={{ fontSize: 12 }}>
                  <span dangerouslySetInnerHTML={{ __html: tooltip }}></span>
                </Typography>
              }
            >
              <QuestionMarkIcon sx={{ height: 15, width: 15, backgroundColor: "primary.main", borderRadius: 15, ml: 1 }} />
            </Tooltip>
          }
        >
          <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
        </Badge>
      </Box>
      <Typography>{description}</Typography>
    </Box>
  );
}
