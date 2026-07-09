"use client";

import DeleteGenericButton from "./delete-generic-button";
import { deleteOffer } from "@/actions/offers";

export default function DeleteOfferButton({ offerId }: { offerId: string }) {
  return <DeleteGenericButton onDelete={() => deleteOffer(offerId)} />;
}
