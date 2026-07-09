import BannerForm from "@/components/admin/banner-form";

export default function NewBannerPage() {
  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-white mb-8">
        Add New Banner
      </h1>
      <BannerForm />
    </div>
  );
}
