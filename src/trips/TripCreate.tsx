import {
  SimpleForm,
  NumberInput,
  TextInput,
  Create,
  ReferenceInput,
  required,
  AutocompleteInput,
} from "react-admin";

export const TripCreate = () => (
  <Create redirect="list">
    <SimpleForm>
      <ReferenceInput
        source="idOperador"
        reference="drivers"
        filter={{ search: "/search/findByString" }}
        sort={{ field: "nombreCompleto", order: "ASC" }}
      >
        <AutocompleteInput label="Operador" source="id" validate={required()} />
      </ReferenceInput>
      <NumberInput source="idUnidad" validate={required()} />
      <NumberInput source="idRemolque" step={1} />
      <TextInput source="origen" validate={required()} />
      <TextInput source="destino" />
      <TextInput source="cliente" validate={required()} />
      <TextInput source="unidadEnvio" />
    </SimpleForm>
  </Create>
);
