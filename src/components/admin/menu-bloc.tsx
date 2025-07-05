import { useMemo } from "react";

interface MenuItem {
  _id?: string;
  title: string;
  price: string;
  description: string;
  order: number;
}

interface MenuBlocProps {
  _id?: string;
  category: string;
  description?: string;
  items: MenuItem[];
  order: number;
  isEditable?: boolean;
  onEditBloc?: (bloc: {
    _id?: string;
    category: string;
    description?: string;
    order: number;
  }) => void;
  onDeleteBloc?: (blocId: string) => void;
  onAddItem?: (blocId: string) => void;
  onEditItem?: (item: MenuItem, blocId: string) => void;
  onDeleteItem?: (itemId: string) => void;
}

export default function MenuBloc({
  _id,
  category,
  description,
  items,
  order,
  isEditable = false,
  onEditBloc,
  onDeleteBloc,
  onAddItem,
  onEditItem,
  onDeleteItem,
}: MenuBlocProps) {
  // Split items into two equal columns for admin view
  const { leftItems, rightItems } = useMemo(() => {
    const midPoint = Math.ceil(items.length / 2);
    return {
      leftItems: items.slice(0, midPoint),
      rightItems: items.slice(midPoint),
    };
  }, [items]);

  const renderMenuItem = (item: MenuItem, index: number) => (
    <div
      key={item._id || index}
      className="border border-gray-200 rounded-lg p-4 bg-white"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h6 className="text-lg font-semibold text-gray-800">{item.title}</h6>
          <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
          <span className="text-[#9B8579] font-medium mt-2 inline-block">
            {item.price}
          </span>
        </div>
        {isEditable && (
          <div className="flex space-x-1">
            <button
              onClick={() => onEditItem?.(item, _id!)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded"
              title="Modifier le plat"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDeleteItem?.(item._id!)}
              className="p-2 text-red-600 hover:bg-red-50 rounded"
              title="Supprimer le plat"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="border border-gray-200 rounded-lg bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
        <div className="flex items-center gap-4">
          <span className="text-3xl text-black">#{order}</span>

          <div className="flex items-center gap-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {category}
              </h3>
              {description && (
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              )}
            </div>
            <span className="text-sm text-gray-500">
              ({items.length} plats)
            </span>
          </div>

          {isEditable && (
            <div className="flex space-x-2 ml-auto">
              <button
                onClick={() => onAddItem?.(_id!)}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                + Ajouter un plat
              </button>
              <button
                onClick={() =>
                  onEditBloc?.({ _id, category, description, order })
                }
                className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                title="Modifier la section"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              {_id && (
                <button
                  onClick={() => onDeleteBloc?.(_id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                  title="Supprimer la section"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {items.length === 0 ? (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Aucun plat
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Commencez par ajouter votre premier plat.
            </p>
            {isEditable && (
              <button
                onClick={() => onAddItem?.(_id!)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Ajouter le premier plat
              </button>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-4">
              {leftItems.map((item, index) => renderMenuItem(item, index))}
            </div>
            <div className="space-y-4">
              {rightItems.map((item, index) =>
                renderMenuItem(item, index + leftItems.length)
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
