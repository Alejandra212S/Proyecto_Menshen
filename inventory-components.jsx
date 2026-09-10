/* Componentes visuales de la aplicación. La lógica y el estado permanecen en app.jsx. */

const InventoryCard = ({ item, index, selectedEquipmentId, selectedSoftwareId, onSelectEquipment, onSelectSoftware, onRetireEquipment, onRetireSoftware, onDeleteRecovered, onDeleteGeneric, onPrint, onChangeEquipmentStatus, onChangeSoftwareStatus }) => {
  const isEquipment = Boolean(item.specs);
  const isSoftware = item.expiration !== undefined;
  const isRecovered = item.status === 'Recuperado';
  const isPrinter = Boolean(item.toner);
  const isGeneric = Boolean(item.id) && !isEquipment && !isSoftware && !isRecovered;
  const isSelected = selectedEquipmentId === item.id || selectedSoftwareId === item.id;

  return (
    <div
      key={item.id || `${item.name}-${index}`}
      onClick={() => isEquipment ? onSelectEquipment(item.id) : isSoftware && onSelectSoftware(item.id)}
      className={`p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${isEquipment || isSoftware || isRecovered || isPrinter ? 'equipment-card' : ''} ${isSelected ? 'equipment-card-selected' : ''}`}
    >
      <div className="text-xs font-semibold text-blue-600 mb-1">{item.id}</div>
      <div className="equipment-card-heading">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
          {item.type && <span className="equipment-type">{item.type}</span>}
        </div>
        {item.status && (isEquipment ? (
          <select
            className={`equipment-status equipment-status-select status-${item.status.toLowerCase().replace(' ', '-').replace('ñ', 'n')}`}
            value={item.status}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => onChangeEquipmentStatus(item.id, event.target.value)}
            aria-label={`Cambiar estado de ${item.name}`}
          >
            <option>Disponible</option>
            <option>En uso</option>
            <option>Operativo</option>
            <option>Dañado</option>
          </select>
        ) : isSoftware ? (
          <select
            className={`equipment-status equipment-status-select status-${item.status.toLowerCase().replaceAll(' ', '-').replace('ó', 'o')}`}
            value={item.status}
            onClick={(event) => event.stopPropagation()}
            onChange={(event) => onChangeSoftwareStatus(item.id, event.target.value)}
            aria-label={`Cambiar estado de ${item.name}`}
          >
            <option>Vigente</option>
            <option>Próxima a vencer</option>
            <option>Vencida</option>
            <option>Vendida</option>
          </select>
        ) : <span className={`equipment-status status-${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span>)}
      </div>
      {isEquipment ? (
        <>
          <div className="equipment-meta"><span>Área</span><strong>{item.area}</strong></div>
          <dl className="equipment-specs">
            {(Array.isArray(item.specs) ? item.specs : Object.entries(item.specs || {})).map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
          <button type="button" className="equipment-delete-button" onClick={(event) => { event.stopPropagation(); onRetireEquipment(item.id); }}>
            Eliminar equipo
          </button>
        </>
      ) : isRecovered ? (
        <>
          <div className="equipment-meta"><span>Área</span><strong>{item.area}</strong></div>
          <dl className="equipment-specs">
            <div><dt>Acción</dt><dd>{item.action}</dd></div>
            <div><dt>Condición</dt><dd>{item.condition}</dd></div>
            {item.notes && <div><dt>Notas</dt><dd>{item.notes}</dd></div>}
          </dl>
          <button type="button" className="license-delete-button" onClick={(event) => { event.stopPropagation(); onDeleteRecovered(item.id); }}>
            Eliminar registro
          </button>
        </>
      ) : isSoftware ? (
        <>
          <div className="equipment-meta"><span>Área</span><strong>{item.area}</strong></div>
          <dl className="equipment-specs">
            <div><dt>Proveedor</dt><dd>{item.provider}</dd></div>
            <div><dt>Versión</dt><dd>{item.version}</dd></div>
            <div><dt>Vencimiento</dt><dd>{item.expiration || 'Sin vencimiento'}</dd></div>
          </dl>
          <button type="button" className="license-delete-button" onClick={(event) => { event.stopPropagation(); onRetireSoftware(item.id); }}>
            Eliminar licencia
          </button>
        </>
      ) : isPrinter ? (
        <>
          <div className="equipment-meta"><span>Área</span><strong>{item.area || 'Sin asignar'}</strong></div>
          <div className="toner-panel" aria-label={`Niveles de tóner de ${item.name}`}>
            {[
              ['magenta', 'Magenta', '#d946ef'],
              ['negro', 'Negro', '#1f2937'],
              ['cian', 'Cian', '#0891b2'],
              ['amarillo', 'Amarillo', '#eab308'],
            ].map(([key, label, color]) => {
              const level = Math.max(0, Math.min(100, Number(item.toner[key] || 0)));
              return (
                <div className="toner-row" key={key}>
                  <span className="toner-label"><i style={{ backgroundColor: color }} />{label}</span>
                  <div className="toner-track"><span className="toner-fill" style={{ width: `${level}%`, backgroundColor: color }} /></div>
                  <strong>{level}%</strong>
                </div>
              );
            })}
          </div>
          <div className="printer-meta-line">Impresiones registradas: <strong>{item.impresiones || 0}</strong></div>
          <button type="button" className="printer-print-button" onClick={(event) => { event.stopPropagation(); onPrint(item); }}>
            Registrar impresión (-1% por color)
          </button>
          <button type="button" className="license-delete-button" onClick={(event) => { event.stopPropagation(); onDeleteGeneric(item.id); }}>
            Eliminar impresora
          </button>
        </>
      ) : isGeneric ? (
        <>
          <dl className="equipment-specs">
            {Object.entries(item)
              .filter(([key, value]) => !['id', 'name', 'status', 'fechaRegistro'].includes(key) && value !== '' && value !== undefined)
              .map(([key, value]) => (
                <div key={key}><dt>{key}</dt><dd>{String(value)}</dd></div>
              ))}
          </dl>
          <button type="button" className="license-delete-button" onClick={(event) => { event.stopPropagation(); onDeleteGeneric(item.id); }}>
            Eliminar registro
          </button>
        </>
      ) : <p className="text-sm text-gray-600">{item.desc}</p>}
    </div>
  );
};

const InventoryNavigation = ({ inventoryData, activeTab, onChange }) => (
  <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-300 shadow-lg z-50">
    <div className="flex overflow-x-auto no-scrollbar justify-between items-center max-w-7xl mx-auto">
      {Object.entries(inventoryData).map(([key, section]) => {
        const isActive = activeTab === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`flex-1 min-w-[100px] py-2 px-1 flex flex-col items-center justify-center border-r border-dashed border-gray-300 last:border-r-0 transition-colors ${isActive ? 'bg-gray-100 text-blue-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <div className="mb-1 text-gray-700">{section.icon}</div>
            <span className="text-[11px] leading-tight text-center">{section.title}</span>
          </button>
        );
      })}
    </div>
  </nav>
);
