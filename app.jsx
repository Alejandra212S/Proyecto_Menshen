
const { useState } = React;


const Icon = ({ symbol, className = '' }) => <span className={className} aria-hidden="true">{symbol}</span>;
const Home = (props) => <Icon {...props} symbol="☉" />;
const Monitor = (props) => <Icon {...props} symbol="➣" />;
const Mouse = (props) => <Icon {...props} symbol="⋙" />;
const AlertTriangle = (props) => <Icon {...props} symbol="⋗" />;
const Grid = (props) => <Icon {...props} symbol="⦾" />;
const RotateCcw = (props) => <Icon {...props} symbol="↻" />;
const CheckCircle = (props) => <Icon {...props} symbol="✓" />;
const Mail = (props) => <Icon {...props} symbol="く" />;
const Search = (props) => <Icon {...props} symbol="⌕" />;
const Plus = (props) => <Icon {...props} symbol="＋" />;
const Archive = (props) => <Icon {...props} symbol="▣" />;

const inventoryData = {
  inicio: {
    title: "Inicio",
    desc: "Bienvenido al sistema de inventario del area de TI. Aqui puedes ver los estados de los equipos de computo, impresoras y telefonia.",
    icon: <Home className="w-4-h-412/" />,
    metrics: [
      { label: "Equipos activos", tone: "gray" },
      { label: "Con defectos", tone: "gray" },
      { label: "En uso", tone: "gray" },
      { label:"Disponibles", tone :"gray"}
    ],
    content: [
      { id: "inicio-01", name: "Panel General de Equipos", desc: "Total de equipos:  | Activos:  | Con defectos: " },
      { id: "inicio-02", name: "Telefonia", desc: "Total de equipos:  | En uso: " },
      { id: "inicio-03", name: "Tipo de Equipos", desc: "Total de equipos: o | Activos:  | Con defectos: " },
      { id: "inicio-04", name: "Impresoras", desc: "Reporte de toners, cartuchos y mantenimiento" }
    ]
  },
  computadoras: {
    title: "Equipo de computo",
    desc: "Consulta el inventario técnico de PCs, laptops, tablets y monitores.",
    icon: <Monitor className="w-4-h-412/" />,

    content: [
      
    ]
  },
  licencias: {
    title: "Software y Licencias",
    desc: "Gestión de licencias de Software.",
     icon: <AlertTriangle className="w-4-h-412/" />,
    content: [
      //{ name: "Total Licencias", desc: "Tipo de licencia: | Asignado a: Juan Pérez" },
      //{ name: "En uso", desc: "100" },
      //{ name: "Disponibles", desc: "50" },
      //{ name: "Licencias próximas a vencer", desc: "Licencias adquiridas" }
    ]
  },
  noFuncionales: {
    title: "Equipos Defectuosos ",
    desc: "Para agregar un equipo con defectos debes de tomar una foto del equipo y subirla al sistema",
     icon: <Mouse className="w-4-h-412/" />,
    content: [
      //{ name: "Monitor Dell UltraSharp 24\"", desc: "Falla: Panel quemado | Estatus: Diagnosticado para baja" },
      //{ name: "Impresora Epson EcoTank L3150", desc: "Falla: Cabezal obstruido | Estatus: Pendiente de repuesto" }
    ]
  },
  porArea: {
    title: "Equipos por area",
    desc:"Descripción de los equipos por área ",
     icon: <Grid className="w-4-h-412/" />,
    content: [
    ]
  },
  recuperados: {
    title: "Equipos recuperados",
    desc: "Descripción de los equipos que han sido reparados, vendidos o reasignados a otra área",
    icon: <RotateCcw className="w-4-h-412/" />,
    content: [

    ]


  },
  Impresoras: {
    title: "Impresoras y Toners",
    desc: "Gestión de impresoras y consumibles.",
    icon: <RotateCcw className="w-4-h-412/" />,

    content: [
    ]
  },
  Telefonia: {
    title: "Telefonía",
    desc:"Gestión de telefonos y dispositivos de comunicación.",
    icon: <CheckCircle className="w-4-h-412/" />,
   
    content: [
    ]
  },
  Poliza: {
    title: "Programas y polizas de soporte",
    desc: "Gestión de programas y polizas de soporte.",
    icon: <Mail className="w-4-h-412/" />,

    content: [
    ]
  },
  Articulos: {
    title: "Artículos",
    desc: "Gestión de articlos que se tiene en cada area desginada",
    icon: <Mail className="w-4-h-412/" />,

    content: [
    ]
  },
  Configuración: {
    title: "Configuración",
    desc: "Configuración del sistema.",
    icon: <Mail className="w-4-h-412/" />,

    content: [
    ]
  }
};

function InventorySystem() {
  const [activeTab, setActiveTab] = useState('inicio');
  const [equipmentList, setEquipmentList] = useState(inventoryData.computadoras.content);
  const [equipmentSearch, setEquipmentSearch] = useState('');
  const [selectedEquipmentId, setSelectedEquipmentId] = useState(null);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  const [newEquipmentName, setNewEquipmentName] = useState('');
  const [newEquipmentType, setNewEquipmentType] = useState('PC de escritorio');
  const [newEquipmentArea, setNewEquipmentArea] = useState('');
  const isHome = activeTab === 'inicio';
  const visibleEquipment = equipmentList.filter((item) => {
    const searchableText = `${item.id} ${item.name} ${item.type} ${item.area}`.toLowerCase();
    return searchableText.includes(equipmentSearch.toLowerCase());
  });

  const handleAddEquipment = (event) => {
    event.preventDefault();
    if (!newEquipmentName.trim()) return;

    const newEquipment = {
      id: `EQ-${String(equipmentList.length + 1).padStart(3, '0')}`,
      name: newEquipmentName.trim(),
      type: newEquipmentType,
      status: 'Disponible',
      area: newEquipmentArea.trim() || 'Sin asignar',
      specs: [
        ['Procesador', 'Pendiente de registrar'],
        ['Memoria RAM', 'Pendiente de registrar'],
        ['Almacenamiento', 'Pendiente de registrar'],
        ['Sistema', 'Pendiente de registrar']
      ]
    };

    setEquipmentList((currentEquipment) => [...currentEquipment, newEquipment]);
    setNewEquipmentName('');
    setNewEquipmentArea('');
    setShowEquipmentForm(false);
    setSelectedEquipmentId(newEquipment.id);
  };

  const handleRetireEquipment = () => {
    if (!selectedEquipmentId) return;
    setEquipmentList((currentEquipment) => currentEquipment.filter((item) => item.id !== selectedEquipmentId));
    setSelectedEquipmentId(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
      <header className="bg-blue-600 px-6 py-4 text-white shadow-md">
        <h1 className="text-2xl font-bold">menshen</h1>
      </header>
      <main className="flex-1 p-6 overflow-y-auto pt-28 pb-6">
        <div className="max-w-5xl mx-auto">
          <header className="page-header mb-6 border-b pb-4">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {inventoryData[activeTab].icon}
              {inventoryData[activeTab].title}
            </h1>
            {inventoryData[activeTab].desc && (
              <p className="mt-3 text-sm text-gray-700">{inventoryData[activeTab].desc}</p>
            )}
          </header>

          {isHome ? (
            <section className="home-shell">
              <div className="home-hero">
                <div className="hero-copy">
                  <span className="home-label">Resumen general</span>
                  <h2>Estado operativo del área de TI</h2>
                  <p>
                    Puedes monitorear el estado de los equipos, revisar ckecklist de mantenimiento y
                    revisar rápidamente la operación del inventario.
                  </p>
                </div>

                <div className="hero-stats">
                  {inventoryData.inicio.metrics.map((metric) => (
                    <div key={metric.label} className={`metric-card metric-${metric.tone}`}>
                      <span>{metric.label}</span>
                      <strong>{metric.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="dashboard-visuals">
                <article className="chart-card status-chart-card">
                  <div className="chart-heading">
                    <div>
                      <span className="chart-kicker">Indicadores</span>
                      <h3>Estado de los equipos</h3>
                    </div>
                    <span className="chart-period">Este mes</span>
                  </div>
                  <div className="bar-chart" aria-label="Gráfico de estado de los equipos">
                    {[{ label: "Activos", tone: "blue" }, { label: "En uso", tone: "green" }, { label: "Disponibles", tone: "violet" }, { label: "Defectuosos", tone: "amber" }].map((item) => (
                      <div className="bar-item" key={item.label}>
                        <div className="bar-value">{item.value}%</div>
                        <div className="bar-track"><div className={`bar-fill bar-${item.tone}`} style={{ height: `${item.value}%` }} /></div>
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="chart-card asset-mix-card">
                  <div className="chart-heading">
                    <div>
                      <span className="chart-kicker">Inventario</span>
                      <h3>Distribución por tipo</h3>
                    </div>
                  </div>
                  <div className="mix-content">
                    <div className="donut-chart" aria-label="Distribución del inventario por tipo"><span>0<small>equipos</small></span></div>
                    <div className="legend-list">
                      <div><i className="legend-dot dot-blue" />Computadoras <strong>%</strong></div>
                      <div><i className="legend-dot dot-green" />Telefonía <strong>%</strong></div>
                      <div><i className="legend-dot dot-violet" />Impresoras <strong>%</strong></div>
                      <div><i className="legend-dot dot-amber" />Otros <strong>%</strong></div>
                    </div>
                  </div>
                </article>
              </div>

              <div className="home-grid">
                {inventoryData[activeTab].content.map((item, index) => (
                  <div key={item.id || `${item.name}-${index}`} className="feature-card">
                    <div className="feature-badge">{item.id}</div>
                    <h3>{item.name}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : (
            <>
              {activeTab === 'computadoras' && (
                <section className="equipment-actions" aria-label="Acciones del inventario de equipos">
                  <div className="equipment-action-heading">
                    <div>
                      <span className="chart-kicker">Inventario de hardware</span>
                      <h2>Equipos registrados</h2>
                    </div>
                    <span className="equipment-count">{visibleEquipment.length} equipos</span>
                  </div>
                  <div className="equipment-action-row">
                    <label className="equipment-search">
                      <Search />
                      <span className="sr-only">Buscar equipos</span>
                      <input
                        type="search"
                        value={equipmentSearch}
                        onChange={(event) => setEquipmentSearch(event.target.value)}
                        placeholder="Buscar por nombre, ID, tipo o área"
                      />
                    </label>
                    <button type="button" className="equipment-action-button button-primary" onClick={() => setShowEquipmentForm((isOpen) => !isOpen)}>
                      <Plus /> Agregar equipo
                    </button>
                    <button type="button" className="equipment-action-button button-danger" onClick={handleRetireEquipment} disabled={!selectedEquipmentId}>
                      <Archive /> Dar de baja
                    </button>
                  </div>
                  {showEquipmentForm && (
                    <form className="equipment-form" onSubmit={handleAddEquipment}>
                      <input value={newEquipmentName} onChange={(event) => setNewEquipmentName(event.target.value)} placeholder="Nombre o modelo" aria-label="Nombre o modelo" required />

                      <select value={newEquipmentType} onChange={(event) => setNewEquipmentType(event.target.value)} aria-label="Tipo de equipo">
                        <option value="">Selecciona el tipo de equipo</option>
                        <option>PC de escritorio</option>
                        <option>Laptop</option>
                        <option>Tablet</option>
                        <option>Monitor</option>
                      </select>

                     
                      <select value={newEquipmentArea} onChange={(event) => setNewEquipmentArea(event.target.value)} aria-label="Área asignada" required>
                        <option value="">Selecciona un área</option>
                        <option>Almacén</option>
                        <option>Calidad</option>
                        <option>Comercial</option>
                        <option>Compras</option>
                        <option>Finanzas</option>
                        <option>Mantenimiento</option>
                        <option>Moldes</option>
                        <option>Producción</option>
                        <option>Recursos Humanos</option>
                        <option>Sistemas</option>
                      </select>




                      <button type="submit" className="equipment-form-submit">Guardar equipo</button>
                    </form>
                  )}
                  {!selectedEquipmentId && <p className="equipment-action-help">Selecciona una ficha para habilitar la baja del equipo.</p>}
                </section>
              )}
              <div className={`grid gap-4 md:grid-cols-2 ${activeTab === 'computadoras' ? 'equipment-grid' : ''}`}>
              {(activeTab === 'computadoras' ? visibleEquipment : inventoryData[activeTab].content).map((item, index) => (
                <div key={item.id || `${item.name}-${index}`} onClick={() => item.specs && setSelectedEquipmentId(item.id)} className={`p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${item.specs ? 'equipment-card' : ''} ${selectedEquipmentId === item.id ? 'equipment-card-selected' : ''}`}>
                  <div className="text-xs font-semibold text-blue-600 mb-1">{item.id}</div>
                  <div className="equipment-card-heading">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      {item.type && <span className="equipment-type">{item.type}</span>}
                    </div>
                    {item.status && <span className={`equipment-status status-${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span>}
                  </div>
                  {item.specs ? (
                    <>
                      <div className="equipment-meta"><span>Área</span><strong>{item.area}</strong></div>
                      <dl className="equipment-specs">
                        {item.specs.map(([label, value]) => (
                          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
                        ))}
                      </dl>
                    </>
                  ) : <p className="text-sm text-gray-600">{item.desc}</p>}
                </div>
              ))}
              </div>
            </>
          )}
        </div>
      </main>
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-300 shadow-lg z-50">
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