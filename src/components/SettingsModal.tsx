import { useState } from "react"

const SettingsModal = ({ initialSettings, isOpen, onSave, onClose }) => {

  const [tempSettings, setTempSettings] = useState(initialSettings);


  const handleChange = (e) => {
    const { name, value } = e.target;
    let numValue = Number(value);

    // Cap maxSents to prevent API abuse
    if (name === 'maxSents' && numValue > 50) {
      numValue = 50;
    }

    setTempSettings((prev) => ({
      ...prev,
      [name]: numValue,
    }));
  };
 
  if (!isOpen) return null; // Hide when not open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-60 sm:max-w-[500px] p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Hakuasetukset</h2>

        {/* Settings Form */}
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-stretch">
          <div className="flex flex-col w-[60%] sm:flex-1 sm:min-w-0">
            <label className="block text-sm font-medium mb-1" htmlFor="min-pituus">min. pituus</label>
            <input
              type="number"
              name="minLength"
              value={tempSettings.minLength}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div className="flex flex-col w-[60%] sm:flex-1 sm:min-w-0">
            <label className="block text-sm font-medium mb-1" htmlFor="maks-tulokset">maks. tulokset</label>
            <input
              type="number"
              name="maxSents"
              value={tempSettings.maxSents}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
          <div className="flex flex-col w-[60%] sm:flex-1 sm:min-w-0">
            <label className="block text-sm font-medium mb-1" htmlFor="tulokset-sivu">tulokset/sivu</label>
            <input
              type="number"
              name="sentsPerPage"
              value={tempSettings.sentsPerPage}
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-center sm:justify-end">
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
