import { Pencil, Trash2 } from "lucide-react";

const ItemCard = ({ title, image, details, onEdit, onDelete }) => {
  return (
    <div className="bg-white text-black rounded-xl p-4 w-64">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="flex gap-2">
          <Pencil
            className="cursor-pointer text-purple-700"
            onClick={onEdit}
          />
          <Trash2
            className="cursor-pointer text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
      <img src={image} alt={title} className="w-full h-40 object-cover rounded" />
      <div className="mt-2 text-sm space-y-1">
        {details.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
};

export default ItemCard;