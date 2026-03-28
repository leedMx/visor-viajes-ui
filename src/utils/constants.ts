export const statusChoices = [
  { id: "FUERA_DE_PROCESO", name: "Fuera de proceso" },
  { id: "DUPLICADO_POR_GASTO", name: "Duplicado por viáticos"},
  { id: "CARGANDO_CON_CLIENTE", name: "Cargando con cliente" },
  { id: "DETENCION_AUTORIZADA", name: "Detencion autorizada" },
  { id: "DETENCION_NO_AUTORIZADA", name: "Detencion no autorizada" },
  { id: "PERNOCTA", name: "Pernocta" },
  { id: "RESGUARDO", name: "Resguardo" },
  { id: "REVISION_RETEN_ADUANA", name: "Revision, Retén, Aduana" },
  { id: "DESCARGANDO_CON_CLIENTE", name: "Descargando con cliente" },
  { id: "EN_RECOLECCION", name: "En recolección" },
  { id: "REPARTOS", name: "Repartos" },
  { id: "ESPERA_DESCARGA", name: "Esperando descarga" },
  { id: "EN_TRAYECTO", name: "En trayecto" },
  { id: "TERMINADO", name: "Terminado" },
];

export const statusToColor: Record<
  string,
  "default" | "success" | "warning" | "error" | "info"
> = {
  EN_TRAYECTO: "success",
  CARGANDO_CON_CLIENTE: "success",
  DESCARGANDO_CON_CLIENTE: "success",
  EN_RECOLECCION: "success",
  REPARTOS: "success",
  REVISION_RETEN_ADUANA: "warning",
  DETENCION_AUTORIZADA: "warning",
  ESPERA_DESCARGA: "warning",
  DETENCION_NO_AUTORIZADA: "error",
  PERNOCTA: "info",
  RESGUARDO: "info",
};

export const oficinas = [
  { id: "CULIACAN", name: "Culiacán" },
  { id: "GUADALAJARA", name: "Guadalajara" },
  { id: "HERMOSILLO", name: "Hermosillo" },
  { id: "LEON", name: "León" },
  { id: "MEXICALI", name: "Mexicali" },
  { id: "MEXICO", name: "México" },
  { id: "MOCHIS", name: "Mochis" },
  { id: "TIJUANA", name: "Tijuana" },
];
