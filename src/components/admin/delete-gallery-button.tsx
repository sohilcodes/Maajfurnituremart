"use client";

import DeleteGenericButton from "./delete-generic-button";
import { deleteGalleryImage } from "@/actions/gallery";

export default function DeleteGalleryButton({ imageId }: { imageId: string }) {
  return <DeleteGenericButton onDelete={() => deleteGalleryImage(imageId)} />;
}
