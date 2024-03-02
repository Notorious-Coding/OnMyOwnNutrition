import { Box, Button, Typography } from "@mui/material";
import { FormData, useForm } from "../../../../hooks/useForm.hook";
import { useComponentScopedTranslation } from "../../../../providers/i18n.provider";
import FormTextField from "../../../text-field/form-text-field";
import { useUserData } from "../../../../providers/userdata.provider";
import { useEffect } from "react";
import { Diet, diets } from "../../../../entities/diets";

interface NutrientDistributionFormData {
  carbohydrates: FormData<number | null>;
  proteins: FormData<number | null>;
  fats: FormData<number | null>;
}

interface NutrientDistributionFormErrors {
  carbohydrates?: string;
  proteins?: string;
  fats?: string;
  global?: string;
}

function Validate(data: NutrientDistributionFormData) {
  let errors: NutrientDistributionFormErrors = {};

  if (data.carbohydrates.value == null) {
    errors.carbohydrates = "Les glucides sont obligatoires";
  }

  if (data.proteins.value == null) {
    errors.proteins = "Les protéines sont obligatoires";
  }

  if (data.fats.value == null) {
    errors.fats = "Les lipides sont obligatoires";
  }

  if (
    data.carbohydrates.value != null &&
    data.proteins.value != null &&
    data.fats.value != null &&
    data.fats.value + data.proteins.value + data.carbohydrates.value != 100
  ) {
    errors.global = "Le somme des nutriments doit être égale a 100%.";
    console.log(data.fats.value + data.proteins.value + data.carbohydrates.value);
  }

  return errors;
}

export default function NutrientDistributionQuestion() {
  const { userData, set } = useUserData();

  const { data, errors, setData } = useForm<NutrientDistributionFormData, NutrientDistributionFormErrors>(
    {
      carbohydrates: {
        value: userData.carbohydratesInPercent,
        touched: false,
      },
      proteins: {
        value: userData.proteinsInPercent,
        touched: false,
      },
      fats: {
        value: userData.fatsInPercent,
        touched: false,
      },
    },
    Validate
  );

  const { t } = useComponentScopedTranslation(NutrientDistributionQuestion);

  useEffect(() => {
    set({
      ...userData,
      fatsInPercent: data.fats.value,
      carbohydratesInPercent: data.carbohydrates.value,
      proteinsInPercent: data.proteins.value,
    });
  }, [data.carbohydrates.value, data.proteins.value, data.fats.value]);

  const applyDiet = (diet: Diet) => {
    setData({
      carbohydrates: {
        value: diet.carbohydrates,
        touched: data.carbohydrates.touched,
      },
      proteins: {
        value: diet.proteins,
        touched: data.proteins.touched,
      },
      fats: {
        value: diet.fats,
        touched: data.fats.touched,
      },
    });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography color="text.secondary">{t("Explanation")}</Typography>
      <Typography sx={{ fontSize: 15, mb: 4 }} color="error.main">
        {errors?.global}
      </Typography>
      <FormTextField
        data={data.carbohydrates}
        type="number"
        error={errors?.carbohydrates}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (Number.isNaN(value)) setData({ ...data, carbohydrates: { touched: true, value: null } });
          else setData({ ...data, carbohydrates: { touched: true, value } });
        }}
        label={t("Carbohydrates")}
      />
      <FormTextField
        data={data.proteins}
        type="number"
        error={errors?.proteins}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (Number.isNaN(value)) setData({ ...data, proteins: { touched: true, value: null } });
          else setData({ ...data, proteins: { touched: true, value } });
        }}
        label={t("Proteins")}
      />
      <FormTextField
        data={data.fats}
        type="number"
        error={errors?.fats}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (Number.isNaN(value)) setData({ ...data, fats: { touched: true, value: null } });
          else setData({ ...data, fats: { touched: true, value } });
        }}
        label={t("Fats")}
      />
      <Typography variant="h5">Diètes préconfigurées</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {diets.map((d) => {
          return (
            <Button key={d.label} onClick={() => applyDiet(d)}>
              {d.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
