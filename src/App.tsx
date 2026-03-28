import {
  Admin,
  EditGuesser,
  Resource,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./config/Layout";
import { authProvider } from "./config/authProvider";
import { dataProvider } from "./config/dataProvider";
import { TripCreate } from "./trips/TripCreate";
import { TripList } from "./trips/TripList";
import { TripShow } from "./trips/TripShow";
import { TripEdit } from "./trips/TripEdit";
import polyglotI18nProvider from "ra-i18n-polyglot";
import spanishMessages from "./i18n/es";
import { TriplogList } from "./tripLogs/TripLogsList";
import { DriverCreate } from "./driver/DriverCreate";
import { DriverList } from "./driver/DriverList";
import { DriverShow } from "./driver/DriverShow";
import { DriverEdit } from "./driver/DriverEdit";
import { VehicleList } from "./vehicles/VehicleList";
import { VehicleShow } from "./vehicles/VehicleShow";
import { VehicleCreate } from "./vehicles/VehicleCreate";
import { VehicleEdit } from "./vehicles/VehicleEdit";
import { TrailerList } from "./trailers/TrailerList";
import { TrailerShow } from "./trailers/TrailerShow";
import { TrailerEdit } from "./trailers/TrailerEdit";
import { TrailerCreate } from "./trailers/TrailerCreate";
import { VehiclestatusList } from "./vehicleStatus/VehicleStatusList";
import { LocationList } from "./locations/LocationList";
import { brandLightTheme, brandDarkTheme } from "./utils/brandTheme";
import AssessmentIcon from "@mui/icons-material/Assessment";
import UpdateIcon from "@mui/icons-material/Update";
import RouteIcon from "@mui/icons-material/Route";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import LocationOn from "@mui/icons-material/LocationOn";
import PaidIcon from "@mui/icons-material/Paid";
import { ExpenseList } from "./expenses/ExpenseList";
import { ExpenseCreate } from "./expenses/ExpenseCreate";
import { ExpenseShow } from "./expenses/ExpenseShow";
import { ExpenseEdit } from "./expenses/ExpenseEdit";
import 'leaflet/dist/leaflet.css';
// import { Dashboard } from "./dashboard/FleetMapCard";

const i18nProvider = polyglotI18nProvider(() => spanishMessages, "es");

export const App = ({ store }: { store: any }) => (
  <Admin
    layout={Layout}
    // theme={brandLightTheme}
    // darkTheme={brandDarkTheme}
    authProvider={authProvider}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
    // dashboard={Dashboard}
    store={store}
  >
    <Resource
      name="trips"
      options={{ label: "Viajes" }}
      list={TripList}
      edit={TripEdit}
      show={TripShow}
      create={TripCreate}
      icon={RouteIcon}
    />
    <Resource
      name="vehicleStatus"
      options={{ label: "Rol" }}
      list={VehiclestatusList}
      icon={AssessmentIcon}
    />
    <Resource
      name="expenses"
      options={{ label: "Gastos" }}
      list={ExpenseList}
      show={ExpenseShow}
      edit={ExpenseEdit}
      create={ExpenseCreate}
      icon={PaidIcon}
    />
    <Resource
      name="drivers"
      options={{ label: "Operadores" }}
      list={DriverList}
      show={DriverShow}
      edit={DriverEdit}
      create={DriverCreate}
      recordRepresentation={(d) =>
        `${String(d.id).padStart(4, "0")} - ${d.nombreCompleto}`
      }
      icon={PersonIcon}
    />
    <Resource
      name="vehicles"
      options={{ label: "Unidades" }}
      list={VehicleList}
      show={VehicleShow}
      edit={VehicleEdit}
      create={VehicleCreate}
      recordRepresentation={(v) => `TR-${String(v.id).padStart(3, "0")}`}
      icon={DirectionsCarFilledIcon}
    />
    <Resource
      name="trailers"
      options={{ label: "Remolques" }}
      list={TrailerList}
      show={TrailerShow}
      edit={TrailerEdit}
      create={TrailerCreate}
      icon={LocalShippingIcon}
    />
    <Resource
      name="locations"
      options={{ label: "Ubicaciones" }}
      list={LocationList}
      icon={LocationOn}
    />
    <Resource
      name="tripLogs"
      options={{ label: "Actualizaciones" }}
      list={TriplogList}
      show={ShowGuesser}
      edit={EditGuesser}
      icon={UpdateIcon}
    />
  </Admin>
);
