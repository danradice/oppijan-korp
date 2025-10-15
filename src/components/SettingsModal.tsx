import { useState } from "react"

const SettingsModal = ({ initialSettings, isOpen, onSave, onClose }) => {

  const [tempSettings, setTempSettings] = useState(initialSettings);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 
  if (!isOpen) return null; // Hide when not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-96 p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Hakuasetukset</h2>

        {/* Settings Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium" htmlFor="min-pituus">min. pituus</label>
            <input
              name="minLength"
              value={tempSettings.minLength}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="maks-tulokset">maks. tulokset</label>
            <input
              name="maxSents"
              value={tempSettings.maxSents}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="tulokset-sivu">tulokset/sivu</label>
            <input
              name="sentsPerPage"
              value={tempSettings.sentsPerPage}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 mt-1"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => onSave(tempSettings)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tallenna
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
