
const { useState } = React;

const inventoryData = {
  inicio: {
    title: "Inicio",
      desc: "Bienvendo al sistema de inventario del area de TI. Aqui puedes ver los estados de los equipos, ubicación y reportes de mantenimiento.",
    content: [
      { name: "Panel General de Equipos", desc: "Total de equipos: 24 | Activos: 18 | Con defectos: 6" },
       { name: "Equipos por departamento", desc: "Total de equipos: 56 | En uso: 18" },
        { name: "Tipo de Equipos", desc: "Total de equipos: 24 | Activos: 18 | Con defectos: 6" },
      {name: "Alertas Recientes", desc: "Reporte de mantenimiento pendiente para Impresora Epson" }
    ]
  },
  computadoras: {
    title: "Equipo de computo",
    desc: "PCs, laptops, Tablets y monitores.",

    content: [
      {name: "PC",desc: "Core i7, 16GB RAM | Estado: Operativo | Área: Administración" },
      {name:"Tablets", desc: "Core i7, 32GB RAM | Estado: Operativo | Área: Desarrollo" },
      {  name:"Monitores", desc: "Core i7, 32GB RAM | Estado: Operativo | Área: Desarrollo" }

    ]
  },
  licencias: {
    title: "Software y Licencias",
    desc: "Gestión de licencias de Software.",
    content: [
      { name: "Total Licencias", desc: "Tipo de licencia: | Asignado a: Juan Pérez" },
      { name: "En uso", desc: "100" },
      { name: "Disponibles", desc: "50" },
      { name: "Licencias próximas a vencer", desc: "Licencias adquiridas" }
    ]
  },
  noFuncionales: {
    title: "Equipos Defectuosos ",
    desc: "Para agregar un equipo con defectos debes de tomar una foto del equipo y subirla al sistema",
    
    content: [  
      { name: "Monitor Dell UltraSharp 24\"", desc: "Falla: Panel quemado | Estatus: Diagnosticado para baja" },
      { name: "Impresora Epson EcoTank L3150", desc: "Falla: Cabezal obstruido | Estatus: Pendiente de repuesto" }
    ]
  },
  porArea: {
    title: "Equipos por area",
    desc:"Descripción de los equipos por área ",
    content: [
      {name: "Departamento de Finanzas", desc: "1x Servidor Contable (Dell PowerEdge), 2x Laptops HP ProBook" },
      {name: "Departamento de Almacen", desc: "1x Servidor Contable (Dell PowerEdge), 2x Laptops HP ProBook" },
      {name: "Departamento Comercial", desc: "1x Servidor Contable (Dell PowerEdge), 2x Laptops HP ProBook" },
      {name: "Departamento de Compras", desc: "1x Servidor Contable (Dell PowerEdge), 2x Laptops HP ProBook" },
      {name: "Departamento de Mantenimiento", desc: "1x Servidor Contable (Dell PowerEdge), 2x Laptops HP ProBook" },
      {name: "Departamento de Finanzas", desc: "1x Servidor Contable (Dell PowerEdge), 2x Laptops HP ProBook" },
      {name: "Departamento Moldes", desc: "1x Servidor Contable (Dell PowerEdge), 2x Laptops HP ProBook" },
      {name: "Departamento de Producción", desc: "1x Servidor Contable (Dell PowerEdge), 2x Laptops HP ProBook" },
      { name: "Departamento de Calidad", desc: "2x Apple iMac 27\" M1, 1x Tableta Wacom Intuos" }
    ]
  },
  recuperados: {
    title: "Equipos recuperados",
    desc: "Descripción de los equipos que ha sido reparados, vendidos o reasignados a otra área",
    content: [

      {name: "HP EliteDesk 800 G4", desc: "Reparación: Cambio de SSD y Fuente | Estado: Vendido"},
      {name: "MacBook Pro 13\" 2020", desc: "Defecto: Pantalla rayada | Estado: En pruebas" }
    ]

  },
  buenEstado: {
    title: "Equipo en Buen estado",
    icon: <CheckCircle className="w-4 h-4" />,
    content: [
      { id: "SRV-MAIN-01", name: "Servidor HP ProLiant DL380", desc: "100% Funcional | Ubicación: Data Center" },
      { id: "TAB-PAD-01", name: "iPad Air 5ª Gen", desc: "Excelente estado | Asignado a: Gerencia" }
    ]
  },
  contact: {
    title: "Contact",
    icon: <Mail className="w-4 h-4" />,
    content: [
      { id: "CNT-01", name: "", desc: "Ext:  | Corrreo:" },
      { id: "CNT-02", name: "Proveedor Técnico (Dell)", desc: "Tel: +52 800-123-4567 " }
    ]
  }
};

function InventorySystem() {
  const [activeTab, setActiveTab] = useState('inicio');

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
      <main className="flex-1 p-6 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto">
          <header className="mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {inventoryData[activeTab].icon}
              {inventoryData[activeTab].title}
            </h1>
            {inventoryData[activeTab].desc && (
              <p className="mt-3 text-sm text-gray-700">{inventoryData[activeTab].desc}</p>
            )}
            <p className="text-sm text-gray-700 mt-2">
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-2">
            {inventoryData[activeTab].content.map((item) => (
              <div key={item.id} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-xs font-semibold text-blue-600 mb-1">{item.id}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-lg">
        <div className="flex overflow-x-auto no-scrollbar justify-between items-center max-w-7xl mx-auto">
          {Object.entries(inventoryData).map(([key, section]) => {
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 min-w-[100px] py-2 px-1 flex flex-col items-center justify-center border-r border-dashed border-gray-300 last:border-r-0 transition-colors ${isActive ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <div className="mb-1 text-gray-700">{section.icon}</div>
                <span className="text-[11px] leading-tight text-center">{section.title}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (ReactDOM.createRoot) {
  ReactDOM.createRoot(rootElement).render(<InventorySystem />);
} else {
  ReactDOM.render(<InventorySystem />, rootElement);
}

