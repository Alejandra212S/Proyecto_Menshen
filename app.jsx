
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
      {  name: "Panel General de Equipos", desc: "Total de equipos:  | Activos:  | Con defectos: " },
      {  name: "Telefonia", desc: "Total de equipos:  | En uso: " },
      {  name: "Tipo de Equipos", desc: "Total de equipos: o | Activos:  | Con defectos: " },
      {  name: "Impresoras", desc: "Reporte de toners, cartuchos y mantenimiento" }
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
    desc: "Consulta y administra el software utilizado, sus licencias y fechas de renovación.",
     icon: <AlertTriangle className="w-4-h-412/" />,
    content: [

    ]
  },
  noFuncionales: {
    title: "Equipos Defectuosos ",
    desc: "Para agregar un equipo con defectos debes de tomar una foto del equipo y subirla al sistema",
     icon: <Mouse className="w-4-h-412/" />,
    content: [
 
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
  const [newEquipmentSpecs, setNewEquipmentSpecs] = useState({});
  const [softwareList, setSoftwareList] = useState(inventoryData.licencias.content);
  const [softwareSearch, setSoftwareSearch] = useState('');
  const [selectedSoftwareId, setSelectedSoftwareId] = useState(null);
  const [showSoftwareForm, setShowSoftwareForm] = useState(false);
  const [newSoftware, setNewSoftware] = useState({ name: '', type: 'Suscripción', version: '', provider: '', area: '', expiration: '' });
  const isHome = activeTab === 'inicio';
  const specFields = newEquipmentType === 'Monitor'
    ? ['Pantalla', 'Resolución', 'Conexiones', 'Asignado a']
    : ['Procesador', 'Memoria RAM', 'Almacenamiento', 'Sistema'];
  const visibleEquipment = equipmentList.filter((item) => {
    const searchableText = `${item.id} ${item.name} ${item.type} ${item.area}`.toLowerCase();
    return searchableText.includes(equipmentSearch.toLowerCase());
  });
  const visibleSoftware = softwareList.filter((item) => {
    const searchableText = `${item.id} ${item.name} ${item.type} ${item.version} ${item.provider} ${item.area}`.toLowerCase();
    return searchableText.includes(softwareSearch.toLowerCase());
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
      specs: specFields.map((field) => [field, newEquipmentSpecs[field].trim()])
    };

    setEquipmentList((currentEquipment) => [...currentEquipment, newEquipment]);
    setNewEquipmentName('');
    setNewEquipmentArea('');
    setNewEquipmentSpecs({});
    setShowEquipmentForm(false);
    setSelectedEquipmentId(newEquipment.id);
  };

  const handleRetireEquipment = (equipmentId = selectedEquipmentId) => {
    if (!equipmentId) return;
    setEquipmentList((currentEquipment) => currentEquipment.filter((item) => item.id !== equipmentId));
    setSelectedEquipmentId(null);
  };

  const handleSoftwareChange = (field, value) => {
    setNewSoftware((currentSoftware) => ({ ...currentSoftware, [field]: value }));
  };

  const handleAddSoftware = (event) => {
    event.preventDefault();
    if (!newSoftware.name.trim()) return;

    const software = {
      id: `SW-${String(softwareList.length + 1).padStart(3, '0')}`,
      name: newSoftware.name.trim(),
      type: newSoftware.type,
      version: newSoftware.version.trim(),
      provider: newSoftware.provider.trim(),
      area: newSoftware.area,
      expiration: newSoftware.expiration,
      status: newSoftware.expiration && newSoftware.expiration < new Date().toISOString().slice(0, 10) ? 'Vencida' : 'Vigente'
    };

    setSoftwareList((currentSoftware) => [...currentSoftware, software]);
    setNewSoftware({ name: '', type: 'Suscripción', version: '', provider: '', area: '', expiration: '' });
    setShowSoftwareForm(false);
    setSelectedSoftwareId(software.id);
  };

  const handleRetireSoftware = (softwareId = selectedSoftwareId) => {
    if (!softwareId) return;
    setSoftwareList((currentSoftware) => currentSoftware.filter((item) => item.id !== softwareId));
    setSelectedSoftwareId(null);
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
                  </div>
                  {showEquipmentForm && (
                    <form className="equipment-form" onSubmit={handleAddEquipment}>
                      <div className="equipment-form-header">
                        <div>
                          <span className="chart-kicker">Nuevo registro</span>
                          <h3>Información del equipo</h3>
                        </div>
                        <span className="equipment-form-required">* Campos obligatorios</span>
                      </div>
                      <div className="equipment-form-fields">
                        <label className="equipment-form-field">
                          <span>Nombre o modelo <b>*</b></span>
                          <input value={newEquipmentName} onChange={(event) => setNewEquipmentName(event.target.value)} placeholder="Ej. Dell Opti 7090" required />
                        </label>
                        <label className="equipment-form-field">
                          <span>Tipo de equipo <b>*</b></span>
                          <select value={newEquipmentType} onChange={(event) => setNewEquipmentType(event.target.value)} required>
                            <option>Selecciona una opción</option>
                            <option>Laptop</option>
                            <option>Tablet</option>
                            <option>Monitor</option>
                          </select>
                        </label>
                        <label className="equipment-form-field">
                          <span>Área asignada <b>*</b></span>
                          <select value={newEquipmentArea} onChange={(event) => setNewEquipmentArea(event.target.value)} required>
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
                        </label>
                      </div>
                      <div className="equipment-spec-form-fields">
                        <div className="equipment-spec-heading">
                          <div>
                            <span className="chart-kicker">Ficha técnica</span>
                            <p>Especificaciones del equipo</p>
                          </div>
                          <span>{newEquipmentType}</span>
                        </div>
                        {specFields.map((field) => (
                          <label className="equipment-form-field" key={field}>
                            <span>{field} <b>*</b></span>
                            <input
                              value={newEquipmentSpecs[field] || ''}
                              onChange={(event) => setNewEquipmentSpecs((currentSpecs) => ({ ...currentSpecs, [field]: event.target.value }))}
                              placeholder={`${field.toLowerCase()}`}
                              required
                            />
                          </label>
                        ))}
                      </div>
                      <div className="equipment-form-footer">
                        <p>El equipo se registrará inicialmente con estado <strong>Disponible</strong>.</p>
                        <button type="submit" className="equipment-form-submit"><Plus /> Guardar equipo</button>
                      </div>
                    </form>
                    
                  )}
                </section>
              )}
              {activeTab === 'licencias' && (
                <section className="equipment-actions" aria-label="Acciones del inventario de software y licencias">
                  <div className="equipment-action-heading">
                    <div>
                      <span className="chart-kicker">Inventario de software</span>
                      <h2>Licencias registradas</h2>
                    </div>
                    <span className="equipment-count">{visibleSoftware.length} licencias</span>
                  </div>
                  <div className="equipment-action-row">
                    <label className="equipment-search">
                      <Search />
                      <span className="sr-only">Buscar software</span>
                      <input
                        type="search"
                        value={softwareSearch}
                        onChange={(event) => setSoftwareSearch(event.target.value)}
                        placeholder="Buscar por nombre, versión, proveedor o área"
                      />
                    </label>
                    <button type="button" className="equipment-action-button button-primary" onClick={() => setShowSoftwareForm((isOpen) => !isOpen)}>
                      <Plus /> Agregar licencia
                    </button>
                  </div>
                  {showSoftwareForm && (
                    <form className="equipment-form" onSubmit={handleAddSoftware}>
                      <div className="equipment-form-header">
                        <div>
                          <span className="chart-kicker">Nuevo registro</span>
                          <h3>Información de las licencias</h3>
                        </div>
                        <span className="equipment-form-required">* Campos obligatorios</span>
                      </div>
                      <div className="equipment-form-fields">
                        <label className="equipment-form-field">
                          <span>Nombre del software <b>*</b></span>
                          <input value={newSoftware.name} onChange={(event) => handleSoftwareChange('name', event.target.value)} placeholder="Ej. Microsoft 365" required />
                        </label>
                        <label className="equipment-form-field">
                          <span>Tipo de licencia <b>*</b></span>
                          <select value={newSoftware.type} onChange={(event) => handleSoftwareChange('type', event.target.value)} required>
                            <option>Selecciona una opción</option>
                             <option>Suscripción</option>
                            <option>Perpetua</option>
                            <option>Open source</option>
                            <option>Prueba</option>
                          </select>
                        </label>
                        <label className="equipment-form-field">
                          <span>Versión <b>*</b></span>
                          <input value={newSoftware.version} onChange={(event) => handleSoftwareChange('version', event.target.value)} placeholder="Ej. 2026" required />
                        </label>
                        <label className="equipment-form-field">
                          <span>Proveedor <b>*</b></span>
                          <input value={newSoftware.provider} onChange={(event) => handleSoftwareChange('provider', event.target.value)} placeholder="Ej. Microsoft" required />
                        </label>
                        <label className="equipment-form-field">
                          <span>Área asignada <b>*</b></span>
                          <select value={newSoftware.area} onChange={(event) => handleSoftwareChange('area', event.target.value)} required>
                            <option value="">Selecciona un área</option>
                            <option>Almacén</option>
                            <option>Calidad</option>
                            <option>Comercial</option>
                            <option>Compras</option>
                            <option>Finanzas</option>
                            <option>Mantenimiento</option>
                            <option>Producción</option>
                            <option>Recursos Humanos</option>
                            <option>Sistemas</option>
                          </select>
                        </label>
                        <label className="equipment-form-field">
                          <span>Fecha de vencimiento</span>
                          <input type="date" value={newSoftware.expiration} onChange={(event) => handleSoftwareChange('expiration', event.target.value)} />
                        </label>
                      </div>
                      <div className="equipment-form-footer">
                        <p>La licencia se registrará inicialmente con estado <strong>Vigente</strong>.</p>
                        <button type="submit" className="equipment-form-submit"><Plus /> Guardar licencia</button>
                      </div>
                    </form>
                  )}
                </section>
              )}
              <div className={`grid gap-4 md:grid-cols-2 ${activeTab === 'computadoras' ? 'equipment-grid' : ''} ${activeTab === 'licencias' ? 'software-grid' : ''}`}>
                {(activeTab === 'computadoras' ? visibleEquipment : activeTab === 'licencias' ? visibleSoftware : inventoryData[activeTab].content).map((item, index) => (
                  <InventoryCard
                    key={item.id || `${item.name}-${index}`}
                    item={item}
                    index={index}
                    selectedEquipmentId={selectedEquipmentId}
                    selectedSoftwareId={selectedSoftwareId}
                    onSelectEquipment={setSelectedEquipmentId}
                    onSelectSoftware={setSelectedSoftwareId}
                    onRetireEquipment={handleRetireEquipment}
                    onRetireSoftware={handleRetireSoftware}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <InventoryNavigation inventoryData={inventoryData} activeTab={activeTab} onChange={setActiveTab} />
    </div>

    
  );
  
}


const rootElement = document.getElementById('root');
if (ReactDOM.createRoot) {
  ReactDOM.createRoot(rootElement).render(<InventorySystem />);
} else {
  ReactDOM.render(<InventorySystem />, rootElement);
}
 