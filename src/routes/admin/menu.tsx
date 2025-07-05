import { createFileRoute, Link } from "@tanstack/react-router";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../../../convex/_generated/api";
import MenuBloc from "@/components/admin/menu-bloc";
import { useMutation as useConvexMutation } from "convex/react";
import { Id } from "convex/_generated/dataModel";

export const Route = createFileRoute("/admin/menu")({
  component: MenuManagement,
});

// Zod schemas
const menuBlocSchema = z.object({
  category: z.string().min(1, "Le nom de la section est requis"),
  description: z.string().optional(),
  order: z.number().min(0, "L'ordre doit être positif"),
});

const menuItemSchema = z.object({
  title: z.string().min(1, "Le nom du plat est requis"),
  description: z.string().min(1, "La description est requise"),
  price: z.string().regex(/^(\d{1,2}|\d{1,2}\.\d{2})$/, "Le prix doit être au format XX.XX (ex: 12.00 ou 5)"),
  order: z.number().min(0, "L'ordre doit être positif"),
});

type MenuBlocFormData = z.infer<typeof menuBlocSchema>;
type MenuItemFormData = z.infer<typeof menuItemSchema>;

interface EditingBloc {
  _id?: string;
  category: string;
  description?: string;
  order: number;
}

interface EditingItem {
  _id?: string;
  title: string;
  description: string;
  price: string;
  order: number;
  blocId: string;
}

function MenuManagement() {
  const [editingBloc, setEditingBloc] = useState<EditingBloc | null>(null);
  const [editingItem, setEditingItem] = useState<EditingItem | null>(null);
  const [showBlocModal, setShowBlocModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);

  // React Hook Form for bloc
  const blocForm = useForm<MenuBlocFormData>({
    resolver: zodResolver(menuBlocSchema),
    defaultValues: {
      category: "",
      description: "",
      order: 0,
    },
  });

  // React Hook Form for item
  const itemForm = useForm<MenuItemFormData>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      order: 0,
    },
  });

  // Get menu data
  const { data: menuBlocs = [] } = useSuspenseQuery(
    convexQuery(api.menu.getMenuBlocs, {})
  );

  // Mutations
  const createMenuBloc = useConvexMutation(api.menu.createMenuBloc);
  const updateMenuBloc = useConvexMutation(api.menu.updateMenuBloc);
  const deleteMenuBloc = useConvexMutation(api.menu.deleteMenuBloc);
  const createMenuItem = useConvexMutation(api.menu.createMenuItem);
  const updateMenuItem = useConvexMutation(api.menu.updateMenuItem);
  const deleteMenuItem = useConvexMutation(api.menu.deleteMenuItem);

  const handleEditBloc = (bloc: EditingBloc) => {
    setEditingBloc(bloc);
    blocForm.reset({
      category: bloc.category,
      description: bloc.description || "",
      order: bloc.order,
    });
    setShowBlocModal(true);
  };

  const handleSaveBloc = async (data: MenuBlocFormData) => {
    // Trigger validation before submission
    const isValid = await blocForm.trigger();
    if (!isValid) {
      return;
    }

    try {
      if (editingBloc?._id) {
        await updateMenuBloc({
          id: editingBloc._id as Id<"menuBlocs">,
          category: data.category,
          description: data.description,
          order: data.order,
        });
      } else {
        await createMenuBloc({
          category: data.category,
          description: data.description,
          order: data.order,
        });
      }
      setEditingBloc(null);
      setShowBlocModal(false);
      blocForm.reset();
    } catch (error) {
      console.error("Error saving bloc:", error);
    }
  };

  const handleAddItem = (blocId: string) => {
    const bloc = menuBlocs.find((b) => b._id === blocId);
    if (!bloc) return;

    const maxOrder = Math.max(...bloc.items.map((i) => i.order), 0);
    const newItem = {
      title: "",
      description: "",
      price: "",
      order: maxOrder + 1,
      blocId,
    };
    
    setEditingItem(newItem);
    itemForm.reset({
      title: "",
      description: "",
      price: "",
      order: maxOrder + 1,
    });
    setShowItemModal(true);
  };

  const handleEditItem = (item: any, blocId: string) => {
    const editItem = { ...item, blocId };
    setEditingItem(editItem);
    itemForm.reset({
      title: item.title,
      description: item.description,
      price: item.price,
      order: item.order,
    });
    setShowItemModal(true);
  };

  const handleSaveItem = async (data: MenuItemFormData) => {
    if (!editingItem) return;

    // Trigger validation before submission
    const isValid = await itemForm.trigger();
    if (!isValid) {
      return;
    }

    try {
      if (editingItem._id) {
        await updateMenuItem({
          id: editingItem._id as Id<"menuItems">,
          title: data.title,
          description: data.description,
          price: data.price,
          order: data.order,
        });
      } else {
        await createMenuItem({
          menuBlocId: editingItem.blocId as Id<"menuBlocs">,
          title: data.title,
          description: data.description,
          price: data.price,
          order: data.order,
        });
      }
      setEditingItem(null);
      setShowItemModal(false);
      itemForm.reset();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const closeBlocModal = () => {
    setShowBlocModal(false);
    setEditingBloc(null);
    blocForm.reset();
  };

  const closeItemModal = () => {
    setShowItemModal(false);
    setEditingItem(null);
    itemForm.reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/admin">
              <h1 className="text-2xl cursor-pointer font-bold text-gray-800">
                Gestion du Menu
              </h1>
            </Link>

            <button
              onClick={() => {
                setEditingBloc({ category: "", description: "", order: menuBlocs.length });
                blocForm.reset({ category: "", description: "", order: menuBlocs.length });
                setShowBlocModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              + Nouvelle Section
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {menuBlocs.map((bloc) => (
            <MenuBloc
              key={bloc._id}
              {...bloc}
              isEditable={true}
              onEditBloc={handleEditBloc}
              onDeleteBloc={async (blocId) => {
                if (
                  confirm("Êtes-vous sûr de vouloir supprimer cette section ?")
                ) {
                  try {
                    await deleteMenuBloc({ id: blocId as Id<"menuBlocs"> });
                  } catch (error) {
                    console.error("Error deleting bloc:", error);
                  }
                }
              }}
              onAddItem={handleAddItem}
              onEditItem={handleEditItem}
              onDeleteItem={async (itemId) => {
                if (confirm("Êtes-vous sûr de vouloir supprimer ce plat ?")) {
                  try {
                    await deleteMenuItem({ id: itemId as Id<"menuItems"> });
                  } catch (error) {
                    console.error("Error deleting item:", error);
                  }
                }
              }}
            />
          ))}
        </div>

        {menuBlocs.length === 0 && (
          <div className="text-center py-12">
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
              Aucune section de menu
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Commencez par ajouter votre première section de menu.
            </p>
            <button
              onClick={() => {
                setEditingBloc({ category: "", description: "", order: 0 });
                blocForm.reset({ category: "", description: "", order: 0 });
                setShowBlocModal(true);
              }}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Créer la première section
            </button>
          </div>
        )}
      </main>

      {/* Bloc Modal */}
      {showBlocModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingBloc?._id ? "Modifier la section" : "Nouvelle section"}
            </h2>
            <form onSubmit={blocForm.handleSubmit(handleSaveBloc)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de la section
                </label>
                <input
                  type="text"
                  {...blocForm.register("category")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ex: Entrées, Plats, Desserts"
                />
                {blocForm.formState.errors.category && (
                  <p className="text-red-500 text-sm mt-1">
                    {blocForm.formState.errors.category.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (optionnel)
                </label>
                <textarea
                  {...blocForm.register("description")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ex: Nos spécialités de la maison..."
                  rows={3}
                />
                {blocForm.formState.errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {blocForm.formState.errors.description.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  {...blocForm.register("order", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {blocForm.formState.errors.order && (
                  <p className="text-red-500 text-sm mt-1">
                    {blocForm.formState.errors.order.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeBlocModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {editingBloc?._id ? "Modifier" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Item Modal */}
      {showItemModal && editingItem && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingItem._id ? "Modifier le plat" : "Nouveau plat"}
            </h2>
            <form onSubmit={itemForm.handleSubmit(handleSaveItem)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom du plat
                </label>
                <input
                  type="text"
                  {...itemForm.register("title")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ex: Foie gras de canard"
                />
                {itemForm.formState.errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {itemForm.formState.errors.title.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...itemForm.register("description")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ex: Accompagné de sa brioche toastée"
                  rows={3}
                />
                {itemForm.formState.errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {itemForm.formState.errors.description.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prix
                </label>
                <input
                  type="text"
                  {...itemForm.register("price")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ex: 24.00€ ou 5€"
                />
                {itemForm.formState.errors.price && (
                  <p className="text-red-500 text-sm mt-1">
                    {itemForm.formState.errors.price.message}
                  </p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  {...itemForm.register("order", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {itemForm.formState.errors.order && (
                  <p className="text-red-500 text-sm mt-1">
                    {itemForm.formState.errors.order.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={closeItemModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {editingItem._id ? "Modifier" : "Créer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}