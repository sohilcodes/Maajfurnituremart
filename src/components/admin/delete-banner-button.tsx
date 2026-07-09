"use client";

import DeleteGenericButton from "./delete-generic-button";
import { deleteBanner } from "@/actions/banners";

export default function DeleteBannerButton({ bannerId }: { bannerId: string }) {
  return <DeleteGenericButton onDelete={() => deleteBanner(bannerId)} />;
}
