import { Box, Button, Typography } from "@mui/material";
import { FormData, useForm } from "../../../../hooks/useForm.hook";
import { useComponentScopedTranslation } from "../../../../providers/i18n.provider";
import FormTextField from "../../../text-field/form-text-field";
import { useNutrition } from "../../../../providers/nutrition.provider";
import { useEffect } from "react";

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
export interface Diet {
  label: string;
  carbohydrates: number;
  proteins: number;
  fats: number;
}

export default function NutrientDistributionQuestion() {
  const diets: Diet[] = [
    {
      label: "Equilibré",
      carbohydrates: 35,
      proteins: 30,
      fats: 35,
    },
    {
      label: "Prise de masse",
      carbohydrates: 50,
      proteins: 40,
      fats: 10,
    },
    {
      label: "Cétogène",
      carbohydrates: 10,
      proteins: 40,
      fats: 50,
    },
    {
      label: "Hyperproteinés",
      carbohydrates: 10,
      proteins: 65,
      fats: 25,
    },
    {
      label: "Sportif de haut niveau",
      carbohydrates: 50,
      proteins: 30,
      fats: 20,
    },
  ];
  const { data, errors, setData } = useForm<NutrientDistributionFormData, NutrientDistributionFormErrors>(
    {
      carbohydrates: {
        value: diets[0].carbohydrates,
        touched: false,
      },
      proteins: {
        value: diets[0].proteins,
        touched: false,
      },
      fats: {
        value: diets[0].fats,
        touched: false,
      },
    },
    Validate
  );

  const { t } = useComponentScopedTranslation(NutrientDistributionQuestion);
  const { setCarbohydratesInPercent, setFatInPercent, setProteinsInPercent } = useNutrition();

  useEffect(() => {
    if (data.carbohydrates.value != null) setCarbohydratesInPercent(data.carbohydrates.value);
  }, [data.carbohydrates.value]);

  useEffect(() => {
    if (data.proteins.value != null) setProteinsInPercent(data.proteins.value);
  }, [data.proteins.value]);

  useEffect(() => {
    if (data.fats.value != null) setFatInPercent(data.fats.value);
  }, [data.fats.value]);

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
          return <Button onClick={() => applyDiet(d)}>{d.label}</Button>;
        })}
      </Box>
    </Box>
  );
}
