
interface StatsBoxProps {
  sents: any[];
  page: number;
  sentsPerPage: number;
  corpus: string;
}

const StatsBox = ({ sents, page, sentsPerPage, corpus }: StatsBoxProps) => {
  const start = sents.length === 0 ? 0 : page * sentsPerPage + 1;
  const end = Math.min((page + 1) * sentsPerPage, sents.length);
  return (
    <div className='w-4/5 max-w-3xl mt-5 mx-auto px-3 py-2 border rounded-md shadow-sm'>
      <div className="flex justify-around items-center w-full">
        <div className="flex flex-col items-center text-center sm:flex-row sm:space-x-2 sm:text-left sm:items-baseline">
          <span className="text-xs text-gray-500 font-medium">Lauseita:</span>
          <span className="text-lg font-semibold sm:ml-1">{sents.length}</span>
        </div>
        <div className="flex flex-col items-center text-center sm:flex-row sm:space-x-2 sm:text-left sm:items-baseline">
          <span className="text-xs text-gray-500 font-medium">Näytetään:</span>
          <span className="text-lg font-semibold sm:ml-1">{start} - {end}</span>
        </div>
        <div className="flex flex-col items-center text-center sm:flex-row sm:space-x-2 sm:text-left sm:items-baseline">
          <span className="text-xs text-gray-500 font-medium">Korpus:</span>
          <span className="text-lg font-semibold sm:ml-1">{corpus}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsBox;

