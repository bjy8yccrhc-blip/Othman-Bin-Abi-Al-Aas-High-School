import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  useListActivities, 
  useCreateActivity, 
  useUpdateActivity, 
  useDeleteActivity,
  getListActivitiesQueryKey,
  getListUpcomingActivitiesQueryKey,
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
import { Edit, Trash2, Plus, Image as ImageIcon, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { format, isAfter, startOfDay } from "date-fns";
import { ar } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

const activitySchema = z.object({
  title: z.string().min(3, "العنوان يجب أن يكون 3 أحرف على الأقل"),
  description: z.string().min(10, "الوصف يجب أن يكون 10 أحرف على الأقل"),
  date: z.string().min(1, "التاريخ مطلوب"),
  location: z.string().optional().or(z.literal("")),
  imageUrl: z.string().url("رابط الصورة غير صحيح").optional().or(z.literal("")),
});

type ActivityFormValues = z.infer<typeof activitySchema>;

export function ActivitiesTab() {
  const queryClient = useQueryClient();
  const { data: activities, isLoading } = useListActivities();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const createMutation = useCreateActivity({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListActivitiesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListUpcomingActivitiesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetRecentActivityQueryKey() });
        toast.success("تم إضافة النشاط بنجاح");
        setIsCreateOpen(false);
        form.reset();
      },
      onError: () => toast.error("حدث خطأ أثناء الإضافة"),
    }
  });

  const updateMutation = useUpdateActivity({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListActivitiesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListUpcomingActivitiesQueryKey() });
        toast.success("تم تحديث النشاط بنجاح");
        setEditingId(null);
        form.reset();
      },
      onError: () => toast.error("حدث خطأ أثناء التحديث"),
    }
  });

  const deleteMutation = useDeleteActivity({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListActivitiesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListUpcomingActivitiesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetStatsQueryKey() });
        queryClient.invalidateQueries({ queryKey: getGetRecentActivityQueryKey() });
        toast.success("تم حذف النشاط بنجاح");
        setDeletingId(null);
      },
      onError: () => toast.error("حدث خطأ أثناء الحذف"),
    }
  });

  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: "",
      description: "",
      date: format(new Date(), "yyyy-MM-dd"),
      location: "",
      imageUrl: "",
    },
  });

  const onSubmit = (data: ActivityFormValues) => {
    const payload = {
      ...data,
      location: data.location || null,
      imageUrl: data.imageUrl || null,
      date: new Date(data.date).toISOString()
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate({ data: payload });
    }
  };

  const handleEdit = (activity: any) => {
    form.reset({
      title: activity.title,
      description: activity.description,
      date: format(new Date(activity.date), "yyyy-MM-dd"),
      location: activity.location || "",
      imageUrl: activity.imageUrl || "",
    });
    setEditingId(activity.id);
  };

  const today = startOfDay(new Date());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-serif font-bold text-primary">إدارة الأنشطة المدرسية</h2>
        
        <Dialog open={isCreateOpen} onOpenChange={(open) => {
          setIsCreateOpen(open);
          if (!open) form.reset();
          if (open) setEditingId(null);
        }}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Plus className="ml-2 w-4 h-4" /> إضافة نشاط
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]" dir="rtl">
            <DialogHeader>
              <DialogTitle>إضافة نشاط جديد</DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField control={form.control} name="title" render={({ field }) => (
                  <FormItem>
                    <FormLabel>عنوان النشاط</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem>
                      <FormLabel>تاريخ النشاط</FormLabel>
                      <FormControl><Input type="date" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                      <FormLabel>المكان (اختياري)</FormLabel>
                      <FormControl><Input {...field} placeholder="المسرح، الملعب..." /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                
                <FormField control={form.control} name="description" render={({ field }) => (
                  <FormItem>
                    <FormLabel>تفاصيل النشاط</FormLabel>
                    <FormControl><Textarea {...field} rows={3} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <FormField control={form.control} name="imageUrl" render={({ field }) => (
                  <FormItem>
                    <FormLabel>رابط صورة (اختياري)</FormLabel>
                    <FormControl><Input {...field} dir="ltr" className="text-left" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                
                <DialogFooter className="pt-4">
                  <Button type="submit" disabled={createMutation.isPending} className="w-full">
                    {createMutation.isPending ? "جاري الحفظ..." : "حفظ النشاط"}
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
      ) : activities?.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
          لا توجد أنشطة مضافة بعد
        </div>
      ) : (
        <div className="grid gap-4">
          {activities?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(activity => {
            const isUpcoming = isAfter(new Date(activity.date), today) || new Date(activity.date).getTime() === today.getTime();
            
            return (
            <div key={activity.id} className={`flex flex-col sm:flex-row gap-4 p-4 border rounded-xl items-start justify-between hover-elevate ${isUpcoming ? 'bg-card border-primary/20' : 'bg-muted/30'}`}>
              <div className="flex gap-4 items-start flex-1">
                {activity.imageUrl ? (
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border">
                    <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center shrink-0 border text-muted-foreground">
                    <ImageIcon className="w-8 h-8 opacity-20" />
                  </div>
                )}
                
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className={`font-bold text-lg leading-none ${isUpcoming ? '' : 'text-muted-foreground'}`}>{activity.title}</h3>
                    {isUpcoming && <Badge variant="default" className="text-[10px] h-5 px-1.5">قادم</Badge>}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {format(new Date(activity.date), "dd MMMM yyyy", { locale: ar })}
                    </span>
                    {activity.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {activity.location}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-1">{activity.description}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 w-full sm:w-auto mt-2 sm:mt-0 justify-end">
                <Dialog open={editingId === activity.id} onOpenChange={(open) => {
                  if (!open) {
                    setEditingId(null);
                    form.reset();
                  } else {
                    handleEdit(activity);
                  }
                }}>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="outline" className="text-primary">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]" dir="rtl">
                    <DialogHeader>
                      <DialogTitle>تعديل النشاط</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                        <FormField control={form.control} name="title" render={({ field }) => (
                          <FormItem><FormLabel>عنوان النشاط</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <FormField control={form.control} name="date" render={({ field }) => (
                            <FormItem><FormLabel>تاريخ النشاط</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="location" render={({ field }) => (
                            <FormItem><FormLabel>المكان (اختياري)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                          )} />
                        </div>
                        <FormField control={form.control} name="description" render={({ field }) => (
                          <FormItem><FormLabel>تفاصيل النشاط</FormLabel><FormControl><Textarea {...field} rows={3} /></FormControl><FormMessage /></FormItem>
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

                <Dialog open={deletingId === activity.id} onOpenChange={(open) => !open && setDeletingId(null)}>
                  <DialogTrigger asChild>
                    <Button size="icon" variant="outline" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => setDeletingId(activity.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent dir="rtl">
                    <DialogHeader>
                      <DialogTitle>تأكيد الحذف</DialogTitle>
                      <DialogDescription>
                        هل أنت متأكد من رغبتك في حذف النشاط "{activity.title}"؟ لا يمكن التراجع عن هذا الإجراء.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-2 justify-end sm:justify-start">
                      <Button variant="outline" onClick={() => setDeletingId(null)}>إلغاء</Button>
                      <Button variant="destructive" onClick={() => deleteMutation.mutate({ id: activity.id })} disabled={deleteMutation.isPending}>
                        {deleteMutation.isPending ? "جاري الحذف..." : "حذف"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )})}
        </div>
      )}
    </div>
  );
}