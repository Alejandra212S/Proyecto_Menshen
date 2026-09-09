import React, { useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "./src/firebase";

/* =========================================================
   ICONOS
========================================================= */

const Icon = ({ symbol, className = "" }) => (
  <span className={className} aria-hidden="true">
    {symbol}
  </span>
);

const Home = (props) => <Icon {...props} symbol="⌂" />;
const Monitor = (props) => <Icon {...props} symbol="▣" />;
const Mouse = (props) => <Icon {...props} symbol="◈" />;
const AlertTriangle = (props) => <Icon {...props} symbol="⚠" />;
const Grid = (props) => <Icon {...props} symbol="▦" />;
const RotateCcw = (props) => <Icon {...props} symbol="↻" />;
const CheckCircle = (props) => <Icon {...props} symbol="✓" />;
const Mail = (props) => <Icon {...props} symbol="✉" />;
const Search = (props) => <Icon {...props} symbol="⌕" />;
const Plus = (props) => <Icon {...props} symbol="＋" />;

/* =========================================================
   INFORMACIÓN DE NAVEGACIÓN
========================================================= */

const inventoryData = {
  inicio: {
    title: "Inicio",
    desc:
      "Bienvenido al sistema de inventario del área de TI. Aquí puedes consultar el estado de los equipos de cómputo, impresoras y telefonía.",
    icon: <Home />,
  },

  computadoras: {
    title: "Equipo de cómputo",
    desc:
      "Consulta el inventario técnico de PCs, laptops, tablets y monitores.",
    icon: <Monitor />,
  },

  licencias: {
    title: "Software y Licencias",
    desc:
      "Consulta y administra el software utilizado, sus licencias y fechas de renovación.",
    icon: <AlertTriangle />,
  },

  noFuncionales: {
    title: "Equipos Defectuosos",
    desc:
      "Consulta los equipos que presentan alguna falla.",
    icon: <Mouse />,
  },

  porArea: {
    title: "Equipos por área",
    desc:
      "Consulta la distribución de equipos por área.",
    icon: <Grid />,
  },

  recuperados: {
    title: "Equipos recuperados",
    desc:
      "Consulta los equipos que han sido reparados, vendidos o reasignados.",
    icon: <RotateCcw />,
  },

  Impresoras: {
    title: "Impresoras y Toners",
    desc:
      "Gestión de impresoras y consumibles.",
    icon: <RotateCcw />,
  },

  Telefonia: {
    title: "Telefonía",
    desc:
      "Gestión de teléfonos y dispositivos de comunicación.",
    icon: <CheckCircle />,
  },

  Poliza: {
    title: "Programas y pólizas de soporte",
    desc:
      "Gestión de programas y pólizas de soporte.",
    icon: <Mail />,
  },

  Articulos: {
    title: "Artículos",
    desc:
      "Gestión de artículos que se tienen en cada área designada.",
    icon: <Mail />,
  },

  Configuración: {
    title: "Configuración",
    desc:
      "Configuración del sistema.",
    icon: <Mail />,
  },
};

/* =========================================================
   NAVEGACIÓN
========================================================= */

const InventoryNavigation = ({
  inventoryData,
  activeTab,
  onChange,
}) => (
  <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-300 shadow-lg z-50">
    <div className="flex overflow-x-auto no-scrollbar justify-between items-center max-w-7xl mx-auto">
      {Object.entries(inventoryData).map(([key, section]) => {
        const isActive = activeTab === key;

        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`flex-1 min-w-[100px] py-3 px-2 flex flex-col items-center justify-center border-r border-dashed border-gray-300 transition-colors ${
              isActive
                ? "bg-gray-100 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="mb-1 text-lg">
              {section.icon}
            </div>

            <span className="text-[11px] leading-tight text-center">
              {section.title}
            </span>
          </button>
        );
      })}
    </div>
  </nav>
);

/* =========================================================
   TARJETA DE INVENTARIO
========================================================= */

const InventoryCard = ({
  item,
  index,
  onRetireEquipment,
  onRetireSoftware,
}) => {
  const isEquipment = Boolean(item.specs);
  const isSoftware = item.expiration !== undefined;

  return (
    <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-xs font-semibold text-blue-600 mb-2">
        {item.id}
      </div>

      <div className="flex justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">
            {item.name}
          </h3>

          {item.type && (
            <span className="text-xs text-gray-500">
              {item.type}
            </span>
          )}
        </div>

        {item.status && (
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 h-fit">
            {item.status}
          </span>
        )}
      </div>

      {isEquipment && (
        <>
          <div className="text-sm mb-3">
            <span className="text-gray-500">
              Área:
            </span>{" "}
            <strong>{item.area}</strong>
          </div>

          <div className="space-y-2">
            {item.specs?.map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between text-sm border-b pb-1"
              >
                <span className="text-gray-500">
                  {label}
                </span>

                <strong className="text-right">
                  {value}
                </strong>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-4 text-sm text-red-600 hover:text-red-800"
            onClick={() => onRetireEquipment(item.id)}
          >
            Eliminar equipo
          </button>
        </>
      )}

      {isSoftware && (
        <>
          <div className="text-sm mb-3">
            <span className="text-gray-500">
              Área:
            </span>{" "}
            <strong>{item.area || "Sin asignar"}</strong>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Proveedor
              </span>
              <strong>{item.provider || "-"}</strong>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Versión
              </span>
              <strong>{item.version || "-"}</strong>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">
                Vencimiento
              </span>
              <strong>
                {item.expiration || "Sin vencimiento"}
              </strong>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 text-sm text-red-600 hover:text-red-800"
            onClick={() => onRetireSoftware(item.id)}
          >
            Eliminar licencia
          </button>
        </>
      )}
    </div>
  );
};

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

function InventorySystem() {
  const [activeTab, setActiveTab] =
    useState("inicio");

  /* =========================
     EQUIPOS
  ========================= */

  const [equipmentList, setEquipmentList] =
    useState([]);

  const [equipmentSearch, setEquipmentSearch] =
    useState("");

  const [showEquipmentForm, setShowEquipmentForm] =
    useState(false);

  const [newEquipmentName, setNewEquipmentName] =
    useState("");

  const [newEquipmentType, setNewEquipmentType] =
    useState("PC de escritorio");

  const [newEquipmentArea, setNewEquipmentArea] =
    useState("");

  const [newEquipmentSpecs, setNewEquipmentSpecs] =
    useState({});

  /* =========================
     SOFTWARE
  ========================= */

  const [softwareList, setSoftwareList] =
    useState([]);

  const [softwareSearch, setSoftwareSearch] =
    useState("");

  const [showSoftwareForm, setShowSoftwareForm] =
    useState(false);

  const [newSoftware, setNewSoftware] =
    useState({
      name: "",
      type: "Suscripción",
      version: "",
      provider: "",
      area: "",
      expiration: "",
    });

  /* =========================================================
     CAMPOS TÉCNICOS
  ========================================================= */

  const specFields =
    newEquipmentType === "Monitor"
      ? [
          "Pantalla",
          "Resolución",
          "Conexiones",
          "Asignado a",
        ]
      : [
          "Procesador",
          "Memoria RAM",
          "Almacenamiento",
          "Sistema",
        ];

  /* =========================================================
     CARGAR EQUIPOS DESDE FIREBASE
  ========================================================= */

  const cargarEquipos = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "equipos")
      );

      const equipos = snapshot.docs.map(
        (documento) => ({
          id: documento.id,
          ...documento.data(),
        })
      );

      setEquipmentList(equipos);

    } catch (error) {
      console.error(
        "Error al cargar equipos:",
        error
      );

      alert(
        "No se pudieron cargar los equipos desde Firebase."
      );
    }
  };

  /* =========================================================
     CARGAR LICENCIAS DESDE FIREBASE
  ========================================================= */

  const cargarLicencias = async () => {
    try {
      const snapshot = await getDocs(
        collection(db, "licencias")
      );

      const licencias = snapshot.docs.map(
        (documento) => ({
          id: documento.id,
          ...documento.data(),
        })
      );

      setSoftwareList(licencias);

    } catch (error) {
      console.error(
        "Error al cargar licencias:",
        error
      );

      alert(
        "No se pudieron cargar las licencias desde Firebase."
      );
    }
  };

  /* =========================================================
     CARGAR DATOS AL INICIAR
  ========================================================= */

  useEffect(() => {
    cargarEquipos();
    cargarLicencias();
  }, []);

  /* =========================================================
     AGREGAR EQUIPO
  ========================================================= */

  const handleAddEquipment = async (event) => {
    event.preventDefault();

    if (!newEquipmentName.trim()) {
      return;
    }

    try {
      /*
       * Generamos el ID:
       * EQ-001
       * EQ-002
       * EQ-003
       */

      const numero =
        equipmentList.length + 1;

      const nuevoId =
        `EQ-${String(numero).padStart(3, "0")}`;

      const equipo = {
        name: newEquipmentName.trim(),

        type: newEquipmentType,

        status: "Disponible",

        area:
          newEquipmentArea.trim() ||
          "Sin asignar",

        specs: specFields.map(
          (field) => [
            field,
            newEquipmentSpecs[field]?.trim() || "",
          ]
        ),

        fechaRegistro:
          new Date().toISOString(),
      };

      /* Guardar en Firebase */

      await setDoc(
        doc(db, "equipos", nuevoId),
        equipo
      );

      /* Actualizar React */

      const nuevoEquipo = {
        id: nuevoId,
        ...equipo,
      };

      setEquipmentList(
        (currentEquipment) => [
          ...currentEquipment,
          nuevoEquipo,
        ]
      );

      /* Limpiar formulario */

      setNewEquipmentName("");
      setNewEquipmentArea("");
      setNewEquipmentSpecs({});
      setShowEquipmentForm(false);

      alert(
        `Equipo ${nuevoId} guardado correctamente.`
      );

    } catch (error) {
      console.error(
        "Error al guardar equipo:",
        error
      );

      alert(
        "No se pudo guardar el equipo en Firebase."
      );
    }
  };

  /* =========================================================
     ELIMINAR EQUIPO
  ========================================================= */

  const handleRetireEquipment = async (
    equipmentId
  ) => {
    if (!equipmentId) return;

    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este equipo?"
    );

    if (!confirmar) return;

    try {
      await deleteDoc(
        doc(db, "equipos", equipmentId)
      );

      setEquipmentList(
        (currentEquipment) =>
          currentEquipment.filter(
            (item) =>
              item.id !== equipmentId
          )
      );

    } catch (error) {
      console.error(
        "Error al eliminar equipo:",
        error
      );

      alert(
        "No se pudo eliminar el equipo."
      );
    }
  };

  /* =========================================================
     CAMBIAR DATOS DE SOFTWARE
  ========================================================= */

  const handleSoftwareChange = (
    field,
    value
  ) => {
    setNewSoftware(
      (currentSoftware) => ({
        ...currentSoftware,
        [field]: value,
      })
    );
  };

  /* =========================================================
     AGREGAR LICENCIA
  ========================================================= */

  const handleAddSoftware = async (
    event
  ) => {
    event.preventDefault();

    if (!newSoftware.name.trim()) {
      return;
    }

    try {
      const numero =
        softwareList.length + 1;

      const nuevoId =
        `SW-${String(numero).padStart(3, "0")}`;

      const licencia = {
        name:
          newSoftware.name.trim(),

        type:
          newSoftware.type,

        version:
          newSoftware.version.trim(),

        provider:
          newSoftware.provider.trim(),

        area:
          newSoftware.area,

        expiration:
          newSoftware.expiration,

        status:
          newSoftware.expiration &&
          newSoftware.expiration <
            new Date()
              .toISOString()
              .slice(0, 10)
            ? "Vencida"
            : "Vigente",

        fechaRegistro:
          new Date().toISOString(),
      };

      await setDoc(
        doc(db, "licencias", nuevoId),
        licencia
      );

      const nuevaLicencia = {
        id: nuevoId,
        ...licencia,
      };

      setSoftwareList(
        (currentSoftware) => [
          ...currentSoftware,
          nuevaLicencia,
        ]
      );

      setNewSoftware({
        name: "",
        type: "Suscripción",
        version: "",
        provider: "",
        area: "",
        expiration: "",
      });

      setShowSoftwareForm(false);

      alert(
        `Licencia ${nuevoId} guardada correctamente.`
      );

    } catch (error) {
      console.error(
        "Error al guardar licencia:",
        error
      );

      alert(
        "No se pudo guardar la licencia."
      );
    }
  };

  /* =========================================================
     ELIMINAR LICENCIA
  ========================================================= */

  const handleRetireSoftware = async (
    softwareId
  ) => {
    if (!softwareId) return;

    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar esta licencia?"
    );

    if (!confirmar) return;

    try {
      await deleteDoc(
        doc(db, "licencias", softwareId)
      );

      setSoftwareList(
        (currentSoftware) =>
          currentSoftware.filter(
            (item) =>
              item.id !== softwareId
          )
      );

    } catch (error) {
      console.error(
        "Error al eliminar licencia:",
        error
      );

      alert(
        "No se pudo eliminar la licencia."
      );
    }
  };

  /* =========================================================
     BÚSQUEDA
  ========================================================= */

  const visibleEquipment =
    equipmentList.filter((item) => {
      const texto =
        `${item.id} ${item.name} ${item.type} ${item.area}`
          .toLowerCase();

      return texto.includes(
        equipmentSearch.toLowerCase()
      );
    });

  const visibleSoftware =
    softwareList.filter((item) => {
      const texto =
        `${item.id} ${item.name} ${item.type} ${item.version} ${item.provider} ${item.area}`
          .toLowerCase();

      return texto.includes(
        softwareSearch.toLowerCase()
      );
    });

  /* =========================================================
     ESTADÍSTICAS
  ========================================================= */

  const statistics = useMemo(() => {
    const total = equipmentList.length;

    const disponibles =
      equipmentList.filter(
        (e) => e.status === "Disponible"
      ).length;

    const defectuosos =
      equipmentList.filter(
        (e) =>
          e.status === "Defectuoso" ||
          e.status === "Con defecto"
      ).length;

    const enUso =
      equipmentList.filter(
        (e) => e.status === "En uso"
      ).length;

    const activos =
      total - defectuosos;

    return {
      total,
      disponibles,
      defectuosos,
      enUso,
      activos,
    };
  }, [equipmentList]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      <InventoryNavigation
        inventoryData={inventoryData}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <header className="bg-blue-600 px-6 py-4 text-white shadow-md pt-28">
        <h1 className="text-2xl font-bold">
          menshen
        </h1>

        <p className="text-sm opacity-90">
          Sistema de inventario del área de TI
        </p>
      </header>

      <main className="p-6">
        <div className="max-w-6xl mx-auto">

          {/* =================================================
              ENCABEZADO
          ================================================= */}

          <header className="mb-6 border-b pb-4">

            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">

              {inventoryData[activeTab].icon}

              {inventoryData[activeTab].title}

            </h1>

            <p className="mt-3 text-sm text-gray-700">

              {inventoryData[activeTab].desc}

            </p>

          </header>

          {/* =================================================
              INICIO
          ================================================= */}

          {activeTab === "inicio" && (
            <section>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                <div className="bg-white rounded-xl border p-5 shadow-sm">
                  <span className="text-sm text-gray-500">
                    Equipos activos
                  </span>

                  <strong className="block text-3xl mt-2">
                    {statistics.activos}
                  </strong>
                </div>

                <div className="bg-white rounded-xl border p-5 shadow-sm">
                  <span className="text-sm text-gray-500">
                    Con defectos
                  </span>

                  <strong className="block text-3xl mt-2">
                    {statistics.defectuosos}
                  </strong>
                </div>

                <div className="bg-white rounded-xl border p-5 shadow-sm">
                  <span className="text-sm text-gray-500">
                    Disponibles
                  </span>

                  <strong className="block text-3xl mt-2">
                    {statistics.disponibles}
                  </strong>
                </div>

                <div className="bg-white rounded-xl border p-5 shadow-sm">
                  <span className="text-sm text-gray-500">
                    En uso
                  </span>

                  <strong className="block text-3xl mt-2">
                    {statistics.enUso}
                  </strong>
                </div>

              </div>

            </section>
          )}

          {activeTab === "computadoras" && (
            <section>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 text-gray-400" />
                  <input
                    value={equipmentSearch}
                    onChange={(event) => setEquipmentSearch(event.target.value)}
                    placeholder="Buscar equipo..."
                    className="w-full rounded-lg border px-10 py-2"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowEquipmentForm((value) => !value)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  <Plus /> Agregar equipo
                </button>
              </div>

              {showEquipmentForm && (
                <form onSubmit={handleAddEquipment} className="mb-6 grid gap-3 rounded-xl border bg-white p-5 shadow-sm sm:grid-cols-2">
                  <input required value={newEquipmentName} onChange={(event) => setNewEquipmentName(event.target.value)} placeholder="Nombre del equipo" className="rounded-lg border px-3 py-2" />
                  <select value={newEquipmentType} onChange={(event) => setNewEquipmentType(event.target.value)} className="rounded-lg border px-3 py-2">
                    <option>PC de escritorio</option>
                    <option>Laptop</option>
                    <option>Tablet</option>
                    <option>Monitor</option>
                  </select>
                  <input value={newEquipmentArea} onChange={(event) => setNewEquipmentArea(event.target.value)} placeholder="Área" className="rounded-lg border px-3 py-2" />
                  {specFields.map((field) => (
                    <input key={field} value={newEquipmentSpecs[field] || ""} onChange={(event) => setNewEquipmentSpecs((current) => ({ ...current, [field]: event.target.value }))} placeholder={field} className="rounded-lg border px-3 py-2" />
                  ))}
                  <button type="submit" className="rounded-lg bg-green-600 px-4 py-2 text-white sm:col-span-2">Guardar equipo</button>
                </form>
              )}

              {visibleEquipment.length ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {visibleEquipment.map((item, index) => (
                    <InventoryCard key={item.id} item={item} index={index} onRetireEquipment={handleRetireEquipment} onRetireSoftware={handleRetireSoftware} />
                  ))}
                </div>
              ) : <p className="rounded-xl border bg-white p-6 text-gray-500">No hay equipos registrados.</p>}
            </section>
          )}

          {activeTab === "licencias" && (
            <section>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input value={softwareSearch} onChange={(event) => setSoftwareSearch(event.target.value)} placeholder="Buscar licencia..." className="flex-1 rounded-lg border px-3 py-2" />
                <button type="button" onClick={() => setShowSoftwareForm((value) => !value)} className="rounded-lg bg-blue-600 px-4 py-2 text-white"><Plus /> Agregar licencia</button>
              </div>
              {showSoftwareForm && (
                <form onSubmit={handleAddSoftware} className="mb-6 grid gap-3 rounded-xl border bg-white p-5 sm:grid-cols-2">
                  {[["name", "Nombre"], ["version", "Versión"], ["provider", "Proveedor"], ["area", "Área"], ["expiration", "Vencimiento"]].map(([field, label]) => (
                    <input key={field} required={field === "name"} type={field === "expiration" ? "date" : "text"} value={newSoftware[field]} onChange={(event) => handleSoftwareChange(field, event.target.value)} placeholder={label} className="rounded-lg border px-3 py-2" />
                  ))}
                  <select value={newSoftware.type} onChange={(event) => handleSoftwareChange("type", event.target.value)} className="rounded-lg border px-3 py-2"><option>Suscripción</option><option>Perpetua</option></select>
                  <button type="submit" className="rounded-lg bg-green-600 px-4 py-2 text-white sm:col-span-2">Guardar licencia</button>
                </form>
              )}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{visibleSoftware.map((item, index) => <InventoryCard key={item.id} item={item} index={index} onRetireEquipment={handleRetireEquipment} onRetireSoftware={handleRetireSoftware} />)}</div>
              {!visibleSoftware.length && <p className="rounded-xl border bg-white p-6 text-gray-500">No hay licencias registradas.</p>}
            </section>
          )}

          {!['inicio', 'computadoras', 'licencias'].includes(activeTab) && (
            <section className="rounded-xl border bg-white p-8 text-center shadow-sm">
              <div className="mb-3 text-4xl">{inventoryData[activeTab].icon}</div>
              <p className="text-gray-600">Este módulo está listo para integrar su información.</p>
            </section>
          )}

        </div>
      </main>
    </div>
  );
}

export default InventorySystem;