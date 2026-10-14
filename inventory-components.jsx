const InventoryNavigation = ({ inventoryData = {}, activeTab = 'inicio', onChange = () => {} }) => {
  const sections = Object.entries(inventoryData);

  return (
    <nav className="inventory-navigation" aria-label="Navegación del inventario">
      {sections.map(([key, section]) => (
        <button
          key={key}
          type="button"
          className={activeTab === key ? 'bg-gray-100' : ''}
          onClick={() => onChange(key)}
          aria-pressed={activeTab === key}
        >
          <div>{section.icon || '•'}</div>
          <span>{section.title || key}</span>
        </button>
      ))}
    </nav>
  );
};

const InventoryCard = ({
  item = {},
  activeTab,
  selectedSoftwareId,
  onSelectSoftware,
  onRetireEquipment,
  onChangeEquipmentStatus,
  onRetireSoftware,
  onChangeSoftwareStatus,
  onChangeDefectiveStatus,
  onChangeAreaStatus,
  onDeleteRecovered,
  onDeleteGeneric,
  onPrint,
}) => {
  const [isEditingSoftwareStatus, setIsEditingSoftwareStatus] = useState(false);
  const [pendingSoftwareStatus, setPendingSoftwareStatus] = useState(item.status || 'Vigente');
  const title = item.name || item.title || item.label || 'Registro';
  const status = item.status || item.condition || item.priority || item.action || item.type || 'Sin estado';
  const metadata = [];

  if (item.type) metadata.push(['Tipo', item.type]);
  if (item.area) metadata.push(['Área', item.area]);
  if (item.provider) metadata.push(['Proveedor', item.provider]);
  if (item.expiration) metadata.push(['Vence', item.expiration]);
  if (item.version) metadata.push(['Versión', item.version]);
  if (item.assignedTo) metadata.push(['Responsable', item.assignedTo]);
  if (item.problem) metadata.push(['Falla', item.problem]);
  if (item.notes) metadata.push(['Notas', item.notes]);
  if (item.serial) metadata.push(['Serie', item.serial]);
  if (item.quantity !== undefined) metadata.push(['Cantidad', item.quantity]);
  if (item.specs && typeof item.specs === 'object') {
    Object.entries(item.specs).forEach(([key, value]) => {
      if (value) metadata.push([key, value]);
    });
  }

  const isSelectedSoftware = activeTab === 'licencias' && selectedSoftwareId === item.id;

  return (
    <article className={`inventory-card ${isSelectedSoftware ? 'is-selected' : ''}`}>
      <div className="inventory-card-header">
        <div>
          <span className="inventory-card-kicker">{item.id || 'Registro'}</span>
          <h3>{title}</h3>
        </div>
        <span className="inventory-card-status">{status}</span>
      </div>

      <dl className="inventory-card-meta">
        {metadata.slice(0, isSelectedSoftware ? metadata.length : 3).map(([label, value]) => (
          <div key={`${label}-${value}`}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <div className="inventory-card-actions">
        {activeTab === 'licencias' && typeof onSelectSoftware === 'function' && (
          <button type="button" onClick={() => onSelectSoftware(isSelectedSoftware ? null : item.id)} className="inventory-card-button secondary" aria-expanded={isSelectedSoftware}>
            {isSelectedSoftware ? 'Ocultar detalle' : 'Ver detalle'}
          </button>
        )}
        {activeTab === 'computadoras' && typeof onChangeEquipmentStatus === 'function' && (
          <button type="button" onClick={() => onChangeEquipmentStatus(item.id, item.status === 'Disponible' ? 'En uso' : 'Disponible')} className="inventory-card-button primary">
            Cambiar estado
          </button>
        )}
        {activeTab === 'licencias' && typeof onChangeSoftwareStatus === 'function' && !isEditingSoftwareStatus && (
          <button type="button" onClick={() => { setPendingSoftwareStatus(item.status || 'Vigente'); setIsEditingSoftwareStatus(true); }} className="inventory-card-button primary">
            Actualizar
          </button>
        )}
        {activeTab === 'licencias' && typeof onChangeSoftwareStatus === 'function' && isEditingSoftwareStatus && (
          <div className="inventory-card-status-editor">
            <label>
              <span>Estado de la licencia</span>
              <select value={pendingSoftwareStatus} onChange={(event) => setPendingSoftwareStatus(event.target.value)}>
                <option>Vigente</option>
                <option>Próxima a vencer</option>
                <option>Vencida</option>
              </select>
            </label>
            <button type="button" onClick={() => { onChangeSoftwareStatus(item.id, pendingSoftwareStatus); setIsEditingSoftwareStatus(false); }} className="inventory-card-button primary">
              Guardar
            </button>
            <button type="button" onClick={() => setIsEditingSoftwareStatus(false)} className="inventory-card-button secondary">
              Cancelar
            </button>
          </div>
        )}
        {activeTab === 'noFuncionales' && typeof onChangeDefectiveStatus === 'function' && (
          <button type="button" onClick={() => onChangeDefectiveStatus(item.id, 'Revisado')} className="inventory-card-button primary">
            Revisado
          </button>
        )}
        {activeTab === 'porArea' && typeof onChangeAreaStatus === 'function' && (
          <button type="button" onClick={() => onChangeAreaStatus(item.id, 'Operativo')} className="inventory-card-button primary">
            Operativo
          </button>
        )}
        {activeTab === 'recuperados' && typeof onDeleteRecovered === 'function' && (
          <button type="button" onClick={() => onDeleteRecovered(item.id)} className="inventory-card-button danger">
            Eliminar
          </button>
        )}
        {(activeTab === 'Impresoras' || activeTab === 'Telefonia' || activeTab === 'Poliza' || activeTab === 'Articulos' || activeTab === 'Checklist' || activeTab === 'Configuración') && typeof onPrint === 'function' && (
          <button type="button" onClick={() => onPrint(item)} className="inventory-card-button secondary">
            Imprimir
          </button>
        )}
        {typeof onDeleteGeneric === 'function' && activeTab !== 'computadoras' && activeTab !== 'licencias' && activeTab !== 'recuperados' && (
          <button type="button" onClick={() => onDeleteGeneric(item.id, activeTab)} className="inventory-card-button danger">
            Borrar
          </button>
        )}
        {typeof onRetireEquipment === 'function' && activeTab === 'computadoras' && (
          <button type="button" onClick={() => onRetireEquipment(item.id)} className="inventory-card-button danger">
            Retirar
          </button>
        )}
        {typeof onRetireSoftware === 'function' && activeTab === 'licencias' && (
          <button type="button" onClick={() => onRetireSoftware(item.id)} className="inventory-card-button danger">
            Eliminar
          </button>
        )}
      </div>
    </article>
  );
};
