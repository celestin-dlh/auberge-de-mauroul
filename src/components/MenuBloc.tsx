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
}

// Placeholder for translation function - you'll need to implement this
function t(lang: string, key: string): string {
  // This is a placeholder. You'll need to implement your i18n solution
  return key;
}

// Placeholder for language detection - you'll need to implement this
function getLangFromUrl(): string {
  // This is a placeholder. You'll need to implement language detection
  return "fr";
}

export default function MenuBloc({
  category,
  description,
  items,
}: MenuBlocProps) {
  // Split items into two equal columns
  const { leftItems, rightItems } = useMemo(() => {
    const midPoint = Math.ceil(items.length / 2);
    return {
      leftItems: items.slice(0, midPoint),
      rightItems: items.slice(midPoint),
    };
  }, [items]);

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-4 mt-8 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="9"
              className="rotate-180"
            >
              <path
                fill="none"
                stroke="#9B8579"
                strokeMiterlimit="10"
                d="M40.881 8.576L20.562.591.244 8.576"
              />
              <path
                fill="none"
                stroke="#9B8579"
                strokeMiterlimit="10"
                d="M40.881.591L20.562 8.576.243.591"
              />
            </svg>
            <h2 className="text-3xl font-cormorant">{category}</h2>
            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="9">
              <path
                fill="none"
                stroke="#9B8579"
                strokeMiterlimit="10"
                d="M40.881 8.576L20.562.591.244 8.576"
              />
              <path
                fill="none"
                stroke="#9B8579"
                strokeMiterlimit="10"
                d="M40.881.591L20.562 8.576.243.591"
              />
            </svg>
          </div>
          {description && (
            <p className="text-gray-600 text-center max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="space-y-8 px-4">
            {leftItems.map((item, index) => (
              <div key={item._id || index}>
                <div className="flex justify-between items-baseline gap-4">
                  <h6 className="text-xl font-cormorant">{item.title}</h6>
                  <div className="flex-1 border-b border-dotted border-gray-300 mx-4" />
                  <span className="text-[#9B8579]">{`${item.price}€`}</span>
                </div>
                <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="space-y-8 px-4">
            {rightItems.map((item, index) => (
              <div key={item._id || index + leftItems.length}>
                <div className="flex justify-between items-baseline gap-4">
                  <h6 className="text-xl font-cormorant">{item.title}</h6>
                  <div className="flex-1 border-b border-dotted border-gray-300 mx-4" />
                  <span className="text-[#9B8579]">{`${item.price}€`}</span>
                </div>
                <p className="text-gray-600 mt-2 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
