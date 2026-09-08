/* Componentes visuales de la aplicación. La lógica y el estado permanecen en app.jsx. */

const InventoryCard = ({ item, index, selectedEquipmentId, selectedSoftwareId, onSelectEquipment, onSelectSoftware, onRetireEquipment, onRetireSoftware }) => {
  const isEquipment = Boolean(item.specs);
  const isSoftware = item.expiration !== undefined;
  const isSelected = selectedEquipmentId === item.id || selectedSoftwareId === item.id;

  return (
    <div
      key={item.id || `${item.name}-${index}`}
      onClick={() => isEquipment ? onSelectEquipment(item.id) : isSoftware && onSelectSoftware(item.id)}
      className={`p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow ${isEquipment || isSoftware ? 'equipment-card' : ''} ${isSelected ? 'equipment-card-selected' : ''}`}
    >
      <div className="text-xs font-semibold text-blue-600 mb-1">{item.id}</div>
      <div className="equipment-card-heading">
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
          {item.type && <span className="equipment-type">{item.type}</span>}
        </div>
        {item.status && <span className={`equipment-status status-${item.status.toLowerCase().replace(' ', '-')}`}>{item.status}</span>}
      </div>
      {isEquipment ? (
        <>
          <div className="equipment-meta"><span>Área</span><strong>{item.area}</strong></div>
          <dl className="equipment-specs">
            {item.specs.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
          <button type="button" className="equipment-delete-button" onClick={(event) => { event.stopPropagation(); onRetireEquipment(item.id); }}>
            Eliminar equipo
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
