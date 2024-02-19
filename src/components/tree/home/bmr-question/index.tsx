import { Box } from "@mui/material";
import BiologicSexRadio from "../../../sex-radio";
import { useComponentScopedTranslation } from "../../../../providers/i18n.provider";
import { useNutrition } from "../../../../providers/nutrition.provider";
import { BiologicSex } from "../../../../entities/biologic-sex";
import { useEffect } from "react";
import { FormData, useForm } from "../../../../hooks/useForm.hook";
import { useStepper } from "../../../../providers/step.provider";
import FormTextField from "../../../text-field/form-text-field";

interface BmrQuestionFormData {
  weight: FormData<number | null>;
  height: FormData<number | null>;
  age: FormData<number | null>;
  sex: FormData<BiologicSex>;
}

interface BmrQuestionFormErrors {
  emptyWeight?: string;
  emptyHeight?: string;
  emptyAge?: string;
}

function Validate(data: BmrQuestionFormData): BmrQuestionFormErrors {
  let errors: BmrQuestionFormErrors = {};

  if (data.weight.value == null) errors.emptyWeight = "Le poids est obligatoire";

  if (data.height.value == null) errors.emptyHeight = "La taille est obligatoire";

  if (data.age.value == null) errors.emptyAge = "L'age est obligatoire";

  return errors;
}

export default function BmrQuestion() {
  const { t } = useComponentScopedTranslation(BmrQuestion);
  const { setCurrentStepValidity } = useStepper();
  const { setPhysicalInformation, physicalInformation } = useNutrition();

  let formData: BmrQuestionFormData;

  if (physicalInformation != null) {
    formData = {
      weight: { value: physicalInformation.weight, touched: false },
      height: { value: physicalInformation.height, touched: false },
      age: { value: physicalInformation.age, touched: false },
      sex: { value: physicalInformation.sex, touched: false },
    };
  } else {
    formData = {
      weight: { value: null, touched: false },
      height: { value: null, touched: false },
      age: { value: null, touched: false },
      sex: { value: BiologicSex.Male, touched: false },
    };
  }

  const { data, isFormValid, setData, errors } = useForm<BmrQuestionFormData, BmrQuestionFormErrors>(formData, Validate);

  useEffect(() => {
    if (data.weight.value != null && data.height.value != null && data.age.value != null && data.sex.value != null) {
      setPhysicalInformation({ weight: data.weight.value, height: data.height.value, age: data.age.value, sex: data.sex.value });
    } else {
      setPhysicalInformation(null);
    }
  }, [data]);

  useEffect(() => {
    setCurrentStepValidity(isFormValid);
  }, [isFormValid]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <BiologicSexRadio value={data.sex.value} onChange={(v) => setData({ ...data, sex: { value: v, touched: true } })} />
      <FormTextField<number | null>
        type="number"
        data={data.weight}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          if (Number.isNaN(value)) setData({ ...data, weight: { touched: true, value: null } });
          else setData({ ...data, weight: { touched: true, value } });
        }}
        label={t("Weight")}
        error={errors?.emptyWeight}
      />
      <FormTextField<number | null>
        type="number"
        label={t("Height")}
        data={data.height}
        error={errors?.emptyHeight}
        onChange={(e) => {
          const value = parseFloat(e.target.value);
          if (Number.isNaN(value)) setData({ ...data, height: { value: null, touched: true } });
          else setData({ ...data, height: { value, touched: true } });
        }}
      />
      <FormTextField<number | null>
        type="number"
        label={t("Age")}
        data={data.age}
        error={errors?.emptyAge}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (Number.isNaN(value)) setData({ ...data, age: { value: null, touched: true } });
          else setData({ ...data, age: { value, touched: true } });
        }}
      />
    </Box>
  );
}
