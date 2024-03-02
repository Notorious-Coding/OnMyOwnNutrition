import { Box, Typography } from "@mui/material";
import { useComponentScopedTranslation } from "../../../../providers/i18n.provider";
import FormTextField from "../../../text-field/form-text-field";
import { FormData, useForm } from "../../../../hooks/useForm.hook";
import { useStepper } from "../../../../providers/step.provider";
import { useEffect } from "react";
import { IsEmail } from "../../../../helpers/string.helper";
import { useTimedOutEffect } from "../../../../hooks/useTimeoutEffect.hook";
import { useUserData } from "../../../../providers/userdata.provider";

interface HomeQuestionFormData {
  email: FormData<string | null>;
}

interface HomeQuestionFormErrors {
  emailError?: string;
}
function validate(data: HomeQuestionFormData): HomeQuestionFormErrors {
  const errors: HomeQuestionFormErrors = {};

  if (data.email.value == null) {
    errors.emailError = "L'email est obligatoire";
  }

  if (data.email.value != null && !IsEmail(data.email.value)) {
    errors.emailError = "Le format de l'email est invalide";
  }

  return errors;
}

export default function HomeQuestion() {
  const { t } = useComponentScopedTranslation(HomeQuestion);
  const { setCurrentStepValidity } = useStepper();
  const { userData, set } = useUserData();
  const { data, isFormValid, setData, errors } = useForm<HomeQuestionFormData, HomeQuestionFormErrors>(
    { email: { value: userData.email, touched: false } },
    validate
  );

  useEffect(() => {
    setCurrentStepValidity(isFormValid);
  }, [isFormValid]);

  useTimedOutEffect(
    300,
    () => {
      if (isFormValid && errors?.emailError == null && data.email.value != null) {
        set({ ...userData, email: data.email.value });
      }
    },
    [isFormValid, data.email.value]
  );

  return (
    <Box>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {t("Explanation")}
      </Typography>
      <FormTextField
        type="email"
        data={data.email}
        onChange={(e) => setData({ email: { value: e.target.value, touched: true } })}
        error={errors?.emailError}
        label={t("Email")}
      />
    </Box>
  );
}
