import {
  AutocompleteInput,
  Edit,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { statusChoices } from "../utils/constants";

export const TripEdit = () => {
  return (
    <Edit mutationMode="pessimistic" redirect="list">
      <SimpleForm>
        <TextInput source="id" disabled />
        <SelectInput
          source="estatus"
          label="Estatus"
          choices={statusChoices}
          optionText="name"
          validate={required()}
        />
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
          />
        </ReferenceInput>
        <NumberInput source="idUnidad" validate={required()} />
        <NumberInput source="idRemolque" />
        <TextInput source="origen" validate={required()} />
        <TextInput source="destino" validate={required()} />
        <TextInput source="cliente" validate={required()} />
        <TextInput source="unidadEnvio" />
        <NumberInput source="importe" />
        <NumberInput source="kilometraje" />
      </SimpleForm>
    </Edit>
  );
};
