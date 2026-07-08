"use client";

import { useActionState } from "react";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { submitContactForm, type ContactFormState } from "@/actions/contact";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const initialState: ContactFormState = { success: false, message: "" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message);
        formRef.current?.reset();
      } else {
        toast.error(state.message);
      }
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div>
        <label className="text-sm font-medium text-white mb-2 block">Aapka Naam</label>
        <Input name="name" placeholder="Naam daalein" required />
      </div>

      <div>
        <label className="text-sm font-medium text-white mb-2 block">Phone Number</label>
        <Input name="phone" type="tel" placeholder="10 digit mobile number" required />
      </div>

      <div>
        <label className="text-sm font-medium text-white mb-2 block">Message</label>
        <textarea
          name="message"
          rows={5}
          placeholder="Aapko kis furniture mein interest hai?"
          required
          className="w-full px-4 py-2.5 rounded-lg bg-card border border-white/10 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary/50 resize-none"
        />
      </div>

      <Button type="submit" disabled={isPending} className="w-full group">
        {isPending ? "Bhej rahe hain..." : "Message Bhejein"}
        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  );
}
