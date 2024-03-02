import { Badge, Box, Card, CardContent, Tooltip, Typography } from "@mui/material";
import { useUserData } from "../../../../providers/userdata.provider";
import { useComponentScopedTranslation, useScopedTranslation } from "../../../../providers/i18n.provider";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { QuestionnaireStep, useStepper } from "../../../../providers/step.provider";
import { BiologicSex } from "../../../../entities/biologic-sex";
import { Round } from "../../../../helpers/math.helper";
export function Resume() {
  const { userData } = useUserData();
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
            <Typography sx={{ fontStyle: "italic" }}>{t("Weight", { weight: Round(userData.weight!, 2) })}</Typography>
            <Typography sx={{ fontStyle: "italic" }}>{t("Height", { height: Round(userData.height!, 2) })}</Typography>
            <Typography sx={{ fontStyle: "italic" }}>{t("Age", { age: userData.age })}</Typography>
            <Typography sx={{ fontStyle: "italic" }}>{t("Sex", { sex: tSex(BiologicSex[userData.sex!]) })}</Typography>
          </Box>
        )}

        {userData.basalMetabolicRate && currentStep.key > QuestionnaireStep.BMR && (
          <ResumeSection
            tooltip={t("BmrTooltip", undefined, true)}
            label={t("BmrLabel")}
            description={t("Bmr", { ["bmr"]: Round(userData.basalMetabolicRate, 2) })}
          />
        )}
        {userData.totalDailyEnergyExpenditure && currentStep.key > QuestionnaireStep.PhysicalActivity && (
          <ResumeSection
            tooltip={t("TdeeTooltip", undefined, true)}
            label={t("TdeeLabel")}
            description={t("Tdee", { ["tdee"]: Round(userData.totalDailyEnergyExpenditure, 2) })}
          />
        )}
        {userData.tdeeWithDeficit && currentStep.key > QuestionnaireStep.CaloricDeficit && (
          <ResumeSection
            tooltip={t("TdeeWithDeficitTooltip", undefined, true)}
            label={t("TdeeWithDeficitLabel")}
            description={t("TdeeWithDeficit", { ["tdeeWithDeficit"]: Round(userData.tdeeWithDeficit, 2) })}
          />
        )}

        {userData.weightLoss && currentStep.key > QuestionnaireStep.CaloricDeficit && (
          <ResumeSection
            tooltip={t("WeightLossTooltip", undefined, true)}
            label={t("WeightLossLabel")}
            description={t("WeightLoss", { ["weightLoss"]: Math.abs(Math.round(userData.weightLoss! * 7 * 100) / 100) })}
          />
        )}

        {currentStep.key > QuestionnaireStep.NutrientDistribution && (
          <ResumeSection
            tooltip={t("NutrientDistributionTooltip", undefined, true)}
            label={t("NutrientDistributionLabel")}
            description={t("NutrientDistribution", {
              proteins: Round(userData.proteins!, 2),
              carbohydrates: Round(userData.carbohydrates!, 2),
              fat: Round(userData.fats!, 2),
            })}
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
