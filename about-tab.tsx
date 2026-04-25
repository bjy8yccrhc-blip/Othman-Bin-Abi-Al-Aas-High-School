import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  useGetAbout, 
  useUpdateAbout,
  getGetAboutQueryKey
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Save } from "lucide-react";

const aboutSchema = z.object({
  schoolName: z.string().min(3, "اسم المدرسة مطلوب"),
  tagline: z.string().min(5, "الشعار مطلوب"),
  history: z.string().min(10, "التاريخ مطلوب"),
  mission: z.string().min(10, "الرسالة مطلوبة"),
  vision: z.string().min(10, "الرؤية مطلوبة"),
  principalName: z.string().min(3, "اسم المدير مطلوب"),
  principalMessage: z.string().min(10, "كلمة المدير مطلوبة"),
  contactEmail: z.string().email("البريد الإلكتروني غير صحيح"),
  contactPhone: z.string().min(5, "رقم الهاتف مطلوب"),
  address: z.string().min(5, "العنوان مطلوب"),
  heroImageUrl: z.string().url("الرابط غير صحيح").optional().or(z.literal("")),
});

type AboutFormValues = z.infer<typeof aboutSchema>;

export function AboutTab() {
  const queryClient = useQueryClient();
  const { data: about, isLoading } = useGetAbout();

  const updateMutation = useUpdateAbout({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetAboutQueryKey() });
        toast.success("تم تحديث معلومات المدرسة بنجاح");
      },
      onError: () => toast.error("حدث خطأ أثناء حفظ التحديثات"),
    }
  });

  const form = useForm<AboutFormValues>({
    resolver: zodResolver(aboutSchema),
    defaultValues: {
      schoolName: "",
      tagline: "",
      history: "",
      mission: "",
      vision: "",
      principalName: "",
      principalMessage: "",
      contactEmail: "",
      contactPhone: "",
      address: "",
      heroImageUrl: "",
    },
  });

  useEffect(() => {
    if (about) {
      form.reset({
        schoolName: about.schoolName,
        tagline: about.tagline,
        history: about.history,
        mission: about.mission,
        vision: about.vision,
        principalName: about.principalName,
        principalMessage: about.principalMessage,
        contactEmail: about.contactEmail,
        contactPhone: about.contactPhone,
        address: about.address,
        heroImageUrl: about.heroImageUrl || "",
      });
    }
  }, [about, form]);

  const onSubmit = (data: AboutFormValues) => {
    const payload = {
      ...data,
      heroImageUrl: data.heroImageUrl || null
    };
    updateMutation.mutate({ data: payload });
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-32 w-full md:col-span-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-serif font-bold text-primary">المعلومات العامة للمدرسة</h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <div className="bg-muted/20 p-6 rounded-2xl border space-y-6">
            <h3 className="text-lg font-bold">الهوية البصرية والعامة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="schoolName" render={({ field }) => (
                <FormItem>
                  <FormLabel>اسم المدرسة</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="tagline" render={({ field }) => (
                <FormItem>
                  <FormLabel>الشعار اللفظي (Slogan)</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="heroImageUrl" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>صورة الغلاف الرئيسية (اختياري)</FormLabel>
                  <FormControl><Input {...field} dir="ltr" className="text-left" placeholder="https://..." /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          <div className="bg-muted/20 p-6 rounded-2xl border space-y-6">
            <h3 className="text-lg font-bold">من نحن</h3>
            <FormField control={form.control} name="history" render={({ field }) => (
              <FormItem>
                <FormLabel>تاريخ المدرسة</FormLabel>
                <FormControl><Textarea {...field} rows={4} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="mission" render={({ field }) => (
                <FormItem>
                  <FormLabel>الرسالة</FormLabel>
                  <FormControl><Textarea {...field} rows={4} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="vision" render={({ field }) => (
                <FormItem>
                  <FormLabel>الرؤية</FormLabel>
                  <FormControl><Textarea {...field} rows={4} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          <div className="bg-muted/20 p-6 rounded-2xl border space-y-6">
            <h3 className="text-lg font-bold">الإدارة</h3>
            <FormField control={form.control} name="principalName" render={({ field }) => (
              <FormItem>
                <FormLabel>اسم مدير/مديرة المدرسة</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <FormField control={form.control} name="principalMessage" render={({ field }) => (
              <FormItem>
                <FormLabel>كلمة المدير</FormLabel>
                <FormControl><Textarea {...field} rows={5} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="bg-muted/20 p-6 rounded-2xl border space-y-6">
            <h3 className="text-lg font-bold">معلومات التواصل</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="contactEmail" render={({ field }) => (
                <FormItem>
                  <FormLabel>البريد الإلكتروني</FormLabel>
                  <FormControl><Input {...field} dir="ltr" className="text-left" type="email" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="contactPhone" render={({ field }) => (
                <FormItem>
                  <FormLabel>رقم الهاتف</FormLabel>
                  <FormControl><Input {...field} dir="ltr" className="text-left" /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              
              <FormField control={form.control} name="address" render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>العنوان الكامل</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          <div className="flex justify-end sticky bottom-4">
            <Button type="submit" size="lg" className="w-full sm:w-auto shadow-lg" disabled={updateMutation.isPending}>
              <Save className="ml-2 w-5 h-5" />
              {updateMutation.isPending ? "جاري الحفظ..." : "حفظ جميع التعديلات"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}