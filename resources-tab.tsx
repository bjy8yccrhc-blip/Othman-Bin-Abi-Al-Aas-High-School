import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  useListResources, 
  useCreateResource, 
  useUpdateResource, 
  useDeleteResource,
  getListResourcesQueryKey,
  getListResourceCategoriesQueryKey,
  getGetStatsQueryKey,
  getGetRecentActivityQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Edit, Trash2, Plus, ExternalLink, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const resourceSchema = z.object({
  title: z.string().min(3, "العنوان يجب أن يكون 3 أحرف على الأقل"),
  description: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),
  category: z.string().min(2, "التصنيف مطلوب"),
  url: z.string().url("الرابط غير صحيح").optional().or(z.literal("")),
  imageUrl: z.string().url("رابط الصورة غير صحيح").optional().or(z.literal("")),
});

type ResourceFormValues = z.infer<typeof resourceSchema>;

export function ResourcesTab() {
  const queryClient = useQueryClient();
  const { data: resources, isLoading } = useListResources();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const createMutation = useCreateResource({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListResourcesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListResourceCategoriesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetRecentActivityQueryKey() });
        toast.success("تم إضافة المصدر بنجاح");
        setIsCreateOpen(false);
        form.reset();
      },
      onError: () => toast.error("حدث خطأ أثناء الإضافة"),
    }
  });

  const updateMutation = useUpdateResource({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListResourcesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListResourceCategoriesQueryKey() });
        toast.success("تم تحديث المصدر بنجاح");
        setEditingId(null);
        form.reset();
      },
      onError: () => toast.error("حدث خطأ أثناء التحديث"),
    }
  });

  const deleteMutation = useDeleteResource({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListResourcesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListResourceCategoriesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetRecentActivityQueryKey() });
        toast.success("تم حذف المصدر بنجاح");
        setDeletingId(null);
      },
      onError: () => toast.error("حدث خطأ أثناء الحذف"),
    }
  });

  const form = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      url: "",
      imageUrl: "",
    },
  });

  const onSubmit = (data: ResourceFormValues) => {
    // Convert empty strings to null for optional URL fields
    const payload = {
      ...data,
      url: data.url || null,
      imageUrl: data.imageUrl || null
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate({ data: payload });
    }
  };

  const handleEdit = (resource: any) => {
    form.reset({
      title: resource.title,
      description: resource.description,
      category: resource.category,
      url: resource.url || "",
      imageUrl: resource.imageUrl || "",
    });
    setEditingId(resource.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-primary">إدارة المصادر التعليمية</h2>
        
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) form.reset();
          if (open) setEditingId(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="ml-2 w-4 h-4" /> إضافة مصدر
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>إضافة مصدر تعليمي جديد</DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان المصدر</FormLabel>
                    <FormControl><Input {...field} placeholder="مثال: كتاب الرياضيات التفاعلي" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>التصنيف</FormLabel>
                    <FormControl><Input {...field} placeholder="مثال: الرياضيات، علوم، لغة عربية" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف المصدر</FormLabel>
                    <FormControl><Textarea {...field} placeholder="وصف تفصيلي للمصدر التعليمي" rows={3} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="url" render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط خارجي (اختياري)</FormLabel>
                    <FormControl><Input {...field} placeholder="https://..." dir="ltr" className="text-left" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط صورة (اختياري)</FormLabel>
                    <FormControl><Input {...field} placeholder="https://..." dir="ltr" className="text-left" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <DialogFooter className="pt-4">
                  <Button type="submit" disabled={createMutation.isPending} className="w-full">
                    {createMutation.isPending ? "جاري الحفظ..." : "حفظ المصدر"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-24 w-full rounded-xl" />)}
        </div>
      ) : resources?.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
          لا توجد مصادر مضافة بعد
        </div>
      ) : (
        <div className="grid gap-4">
          {resources?.map(resource => (
            <div key={resource.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl bg-card items-start sm:items-center justify-between hover-elevate">
              <div className="flex gap-4 items-center flex-1">
                {resource.imageUrl ? (
                  <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border">
                    <img src={resource.imageUrl} alt={resource.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 border text-muted-foreground">
                    <ImageIcon className="w-8 h-8 opacity-20" />
                  </div>
                )}
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{resource.title}</h3>
                    <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">
                      {resource.category}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-1">{resource.description}</p>
                  <div className="text-xs text-muted-foreground">
                    تاريخ الإضافة: {format(new Date(resource.createdAt), "dd MMMM yyyy", { locale: ar })}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0 justify-end">
                {resource.url && (
                  <Button asChild size="icon" variant="outline" className="text-blue-500">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer" title="فتح الرابط">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                )}
                
                <Dialog open={editingId === resource.id} onOpenChange={(open) => {
                  if (!open) {
                    setEditingId(null);
                    form.reset();
                  } else {
                    handleEdit(resource);
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="outline" className="text-primary">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]" dir="rtl">
                    <DialogHeader>
                      <DialogTitle>تعديل المصدر</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField control={form.control} name="title" render={({ field }) => (
                          <FormItem><FormLabel>عنوان المصدر</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="category" render={({ field }) => (
                          <FormItem><FormLabel>التصنيف</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                          <FormItem><FormLabel>وصف المصدر</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="url" render={({ field }) => (
                          <FormItem><FormLabel>رابط خارجي (اختياري)</FormLabel><FormControl><Input {...field} dir="ltr" className="text-left" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="imageUrl" render={({ field }) => (
                          <FormItem><FormLabel>رابط صورة (اختياري)</FormLabel><FormControl><Input {...field} dir="ltr" className="text-left" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <DialogFooter className="pt-4">
                          <Button type="submit" disabled={updateMutation.isPending} className="w-full">
                            {updateMutation.isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>

                <Dialog open={deletingId === resource.id} onOpenChange={(open) => !open && setDeletingId(null)}>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => setDeletingId(resource.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent dir="rtl">
                    <DialogHeader>
                      <DialogTitle>تأكيد الحذف</DialogTitle>
                      <DialogDescription>
                        هل أنت متأكد من رغبتك في حذف المصدر "{resource.title}"؟ لا يمكن التراجع عن هذا الإجراء.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2 justify-end sm:justify-start">
                      <Button variant="outline" onClick={() => setDeletingId(null)}>إلغاء</Button>
                      <Button variant="destructive" onClick={() => deleteMutation.mutate({ id: resource.id })} disabled={deleteMutation.isPending}>
                        {deleteMutation.isPending ? "جاري الحذف..." : "حذف"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}