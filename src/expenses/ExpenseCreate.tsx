import { InputAdornment } from "@mui/material";
import {
  AutocompleteInput,
  Create,
  FormDataConsumer,
  RadioButtonGroupInput,
  ReferenceInput,
  required,
  SelectInput,
} from "react-admin";

import { NumberInput, SimpleForm, TextInput } from "react-admin";
import { oficinas } from "../utils/constants";

export const ExpenseCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <ReferenceInput
        source="idOperador"
        reference="drivers"
        filter={{ search: "/search/findByString" }}
        sort={{ field: "nombreCompleto", order: "ASC" }}
      >
        <AutocompleteInput
          label="Operador"
          source="id"
          validate={required()}
          helperText="Puede buscar usando nombre, unidad o clave del Operador"
        />
      </ReferenceInput>
      <SelectInput
        source="oficina"
        label="Oficina que solicita el gasto"
        choices={oficinas}
        validate={required()}
      />
      <RadioButtonGroupInput
        source="tipo"
        validate={required()}
        choices={[
          { id: "VIATICOS", name: "Viáticos" },
          { id: "MANIOBRAS", name: "Maniobras" },
          { id: "ESTADIAS", name: "Estadías" },
          { id: "TALLER", name: "Taller" },
          { id: "OTROS", name: "Otros" },
        ]}
      />
      <FormDataConsumer>
        {({ formData }) =>
          formData.tipo === "VIATICOS" ? (
            <TripInfoFields />
          ) : (
            <TextInput
              source="descripcion"
              label="Descripción"
              validate={required()}
            />
          )
        }
      </FormDataConsumer>

      <NumberInput
        source="cantidad"
        step={50}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          },
        }}
        validate={required()}
      />
      <TextInput source="observaciones" multiline={true} rows={2} />
    </SimpleForm>
  </Create>
);

const TripInfoFields = () => (
  <>
    <NumberInput source="idUnidad" validate={required()} />
    <NumberInput source="idRemolque" validate={required()} />
    <TextInput source="origen" validate={required()} />
    <TextInput source="destino" validate={required()} />
    <TextInput source="cliente" />
  </>
);
