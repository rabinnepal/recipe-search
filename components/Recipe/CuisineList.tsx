import { FC, useState } from "react";

interface Area {
  strArea: string;
}

interface CuisineListProps {
  areas: Area[];
  selectedArea: string | null;
  onAreaChange: (area: string | null) => void;
}

const Label: FC<{ htmlFor: string; children: React.ReactNode }> = ({
  htmlFor,
  children,
}) => (
  <label htmlFor={htmlFor} className="flex items-center gap-2">
    {children}
  </label>
);

const Checkbox: FC<{
  id: string;
  checked: boolean;
  onChange: () => void;
}> = ({ id, checked, onChange }) => (
  <input
    type="checkbox"
    id={id}
    className="form-checkbox rounded-full"
    checked={checked}
    onChange={onChange}
  />
);

const CuisineList: FC<CuisineListProps> = ({
  areas,
  selectedArea,
  onAreaChange,
}) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => setShowMore(!showMore);
  const visibleAreas = showMore ? areas : areas.slice(0, 10);

  const handleAreaChange = (area: string) => {
    // Toggle selection if the clicked area is already selected
    onAreaChange(selectedArea === area ? null : area);
  };

  return (
    <div>
      <h3 className="mb-2 text-sm font-medium">Cuisine</h3>
      <div className="grid gap-2">
        {visibleAreas.map((area) => (
          <Label key={area.strArea} htmlFor={area.strArea}>
            <Checkbox
              id={area.strArea}
              checked={selectedArea === area.strArea}
              onChange={() => handleAreaChange(area.strArea)}
            />{" "}
            {area.strArea}
          </Label>
        ))}
      </div>
      {areas.length > 10 && (
        <button
          onClick={toggleShowMore}
          className="mt-2 text-blue-500 hover:underline"
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default CuisineList;
