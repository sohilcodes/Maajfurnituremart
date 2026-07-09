import CategoryForm from "@/components/admin/category-form";

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-white mb-8">
        Add New Category
      </h1>
      <CategoryForm />
    </div>
  );
}
