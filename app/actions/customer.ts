"use server";

import { saveEdit } from "@/lib/edits";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateCustomer(id: string, formData: FormData) {
  const updates = {
    status: formData.get("status") as string,
    assignedStaff: formData.get("assignedStaff") as string,
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    product: formData.get("product") as string,
    memo: formData.get("memo") as string,
    phoneMemo: formData.get("phoneMemo") as string,
    lineName: formData.get("lineName") as string,
    lineId: formData.get("lineId") as string,
  };
  await saveEdit(id, updates);
  revalidatePath(`/customers/${id}`);
  revalidatePath("/");
  redirect(`/customers/${id}`);
}
