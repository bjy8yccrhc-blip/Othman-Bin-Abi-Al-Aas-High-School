import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  useListNewspaperArticles, 
  useCreateNewspaperArticle, 
  useUpdateNewspaperArticle, 
  useDeleteNewspaperArticle,
  getListNewspaperArticlesQueryKey,
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
import { Edit, Trash2, Plus, Image as ImageIcon } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const articleSchema = z.object({
  title: z.string().min(5, "العنوان يجب أن يكون 5 أحرف على الأقل"),
  author: z.string().min(2, "اسم الكاتب مطلوب"),
  publishDate: z.string().min(1, "تاريخ النشر مطلوب"),
  excerpt: z.string().min(10, "المقتطف يجب أن يكون 10 أحرف على الأقل"),
  content: z.string().min(50, "محتوى المقال يجب أن يكون 50 حرف على الأقل"),
  coverImageUrl: z.string().url("رابط الصورة غير صحيح").optional().or(z.literal("")),
});

type ArticleFormValues = z.infer<typeof articleSchema>;

export function NewspaperTab() {
  const queryClient = useQueryClient();
  const { data: articles, isLoading } = useListNewspaperArticles();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const createMutation = useCreateNewspaperArticle({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListNewspaperArticlesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetRecentActivityQueryKey() });
        toast.success("تم إضافة المقال بنجاح");
        setIsCreateOpen(false);
        form.reset();
      },
      onError: () => toast.error("حدث خطأ أثناء الإضافة"),
    }
  });

  const updateMutation = useUpdateNewspaperArticle({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListNewspaperArticlesQueryKey() });
        toast.success("تم تحديث المقال بنجاح");
        setEditingId(null);
        form.reset();
      },
      onError: () => toast.error("حدث خطأ أثناء التحديث"),
    }
  });

  const deleteMutation = useDeleteNewspaperArticle({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListNewspaperArticlesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetRecentActivityQueryKey() });
        toast.success("تم حذف المقال بنجاح");
        setDeletingId(null);
      },
      onError: () => toast.error("حدث خطأ أثناء الحذف"),
    }
  });

  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      author: "",
      publishDate: format(new Date(), "yyyy-MM-dd"),
      excerpt: "",
      content: "",
      coverImageUrl: "",
    },
  });

  const onSubmit = (data: ArticleFormValues) => {
    const payload = {
      ...data,
      coverImageUrl: data.coverImageUrl || null,
      publishDate: new Date(data.publishDate).toISOString()
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate({ data: payload });
    }
  };

  const handleEdit = (article: any) => {
    form.reset({
      title: article.title,
      author: article.author,
      publishDate: format(new Date(article.publishDate), "yyyy-MM-dd"),
      excerpt: article.excerpt,
      content: article.content,
      coverImageUrl: article.coverImageUrl || "",
    });
    setEditingId(article.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-primary">إدارة المقالات الصحفية</h2>
        
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) form.reset();
          if (open) setEditingId(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="ml-2 w-4 h-4" /> إضافة مقال
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto" dir="rtl">
            <DialogHeader>
              <DialogTitle>إضافة مقال جديد</DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem className="sm:col-span-2">
                      <FormLabel>عنوان المقال</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="author" render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم الكاتب</FormLabel>
                      <FormControl><Input {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="publishDate" render={({ field }) => (
                    <FormItem>
                      <FormLabel>تاريخ النشر</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                
                <FormField control={form.control} name="excerpt" render={({ field }) => (
                  <FormItem>
                    <FormLabel>مقتطف (يظهر في القائمة)</FormLabel>
                    <FormControl><Textarea {...field} rows={2} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="content" render={({ field }) => (
                  <FormItem>
                    <FormLabel>محتوى المقال الكامل</FormLabel>
                    <FormControl><Textarea {...field} rows={8} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="coverImageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط صورة الغلاف (اختياري)</FormLabel>
                    <FormControl><Input {...field} dir="ltr" className="text-left" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <DialogFooter className="pt-4 sticky bottom-0 bg-background/90 backdrop-blur pb-2">
                  <Button type="submit" disabled={createMutation.isPending} className="w-full">
                    {createMutation.isPending ? "جاري الحفظ..." : "حفظ المقال"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
        </div>
      ) : articles?.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
          لا توجد مقالات مضافة بعد
        </div>
      ) : (
        <div className="grid gap-4">
          {articles?.map(article => (
            <div key={article.id} className="flex flex-col sm:flex-row gap-4 p-4 border rounded-xl bg-card items-start sm:items-center justify-between hover-elevate">
              <div className="flex gap-4 items-center flex-1">
                {article.coverImageUrl ? (
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border">
                    <img src={article.coverImageUrl} alt={article.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center shrink-0 border text-muted-foreground">
                    <ImageIcon className="w-8 h-8 opacity-20" />
                  </div>
                )}
                
                <div className="space-y-1">
                  <h3 className="font-bold text-lg">{article.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                    <span>الكاتب: {article.author}</span>
                    <span>النشر: {format(new Date(article.publishDate), "dd MMMM yyyy", { locale: ar })}</span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{article.excerpt}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0 justify-end">
                <Dialog open={editingId === article.id} onOpenChange={(open) => {
                  if (!open) {
                    setEditingId(null);
                    form.reset();
                  } else {
                    handleEdit(article);
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="outline" className="text-primary">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto" dir="rtl">
                    <DialogHeader>
                      <DialogTitle>تعديل المقال</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        {/* Same form fields as create */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem className="sm:col-span-2"><FormLabel>عنوان المقال</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="author" render={({ field }) => (
                            <FormItem><FormLabel>اسم الكاتب</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="publishDate" render={({ field }) => (
                            <FormItem><FormLabel>تاريخ النشر</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                        </div>
                        <FormField control={form.control} name="excerpt" render={({ field }) => (
                          <FormItem><FormLabel>مقتطف</FormLabel><FormControl><Textarea {...field} rows={2} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="content" render={({ field }) => (
                          <FormItem><FormLabel>محتوى المقال الكامل</FormLabel><FormControl><Textarea {...field} rows={8} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="coverImageUrl" render={({ field }) => (
                          <FormItem><FormLabel>رابط صورة الغلاف (اختياري)</FormLabel><FormControl><Input {...field} dir="ltr" className="text-left" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <DialogFooter className="pt-4 sticky bottom-0 bg-background/90 backdrop-blur pb-2">
                          <Button type="submit" disabled={updateMutation.isPending} className="w-full">
                            {updateMutation.isPending ? "جاري الحفظ..." : "حفظ التعديلات"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>

                <Dialog open={deletingId === article.id} onOpenChange={(open) => !open && setDeletingId(null)}>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => setDeletingId(article.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent dir="rtl">
                    <DialogHeader>
                      <DialogTitle>تأكيد الحذف</DialogTitle>
                      <DialogDescription>
                        هل أنت متأكد من رغبتك في حذف المقال "{article.title}"؟ لا يمكن التراجع عن هذا الإجراء.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2 justify-end sm:justify-start">
                      <Button variant="outline" onClick={() => setDeletingId(null)}>إلغاء</Button>
                      <Button variant="destructive" onClick={() => deleteMutation.mutate({ id: article.id })} disabled={deleteMutation.isPending}>
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