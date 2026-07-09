"use client";

import DeleteGenericButton from "./delete-generic-button";
import { deleteTestimonial } from "@/actions/testimonials";

export default function DeleteTestimonialButton({ id }: { id: string }) {
  return <DeleteGenericButton onDelete={() => deleteTestimonial(id)} />;
}
