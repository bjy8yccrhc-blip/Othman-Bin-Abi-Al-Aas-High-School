import { useGetMe, useGetStats } from "@workspace/api-client-react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Newspaper, Calendar, Settings } from "lucide-react";

import { ResourcesTab } from "@/components/admin/resources-tab";
import { NewspaperTab } from "@/components/admin/newspaper-tab";
import { ActivitiesTab } from "@/components/admin/activities-tab";
import { AboutTab } from "@/components/admin/about-tab";

export default function Admin() {
  const { data: me, isLoading: isLoadingMe } = useGetMe({ query: { retry: false, retryOnMount: false } });
  const { data: stats } = useGetStats();

  if (isLoadingMe) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="flex items-center gap-2 text-primary">
          <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="font-bold">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (!me || me.role !== "admin") {
    return (
      <div className="container mx-auto px-4 py-24 max-w-md">
        <Alert variant="destructive" className="border-2 text-center p-8 bg-destructive/5 rounded-2xl">
          <AlertTriangle className="h-12 w-12 mx-auto text-destructive mb-4" />
          <AlertTitle className="text-2xl font-bold font-serif mb-2 text-destructive">غير مصرح لك بالوصول</AlertTitle>
          <AlertDescription className="text-muted-foreground text-lg mb-6">
            هذه الصفحة مخصصة لمديري الموقع فقط.
          </AlertDescription>
          <Button asChild className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90">
            <a href="/">العودة للصفحة الرئيسية</a>
          </Button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="mb-10">
        <h1 className="text-3xl font-bold font-serif text-primary mb-2">لوحة المشرف</h1>
        <p className="text-muted-foreground">إدارة محتوى الموقع: المصادر، المقالات، الأنشطة، والمعلومات العامة.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-card border rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-primary mb-1">{stats?.resourceCount || 0}</div>
          <div className="text-sm font-medium text-muted-foreground">مصادر</div>
        </div>
        <div className="bg-card border rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-secondary mb-1">{stats?.articleCount || 0}</div>
          <div className="text-sm font-medium text-muted-foreground">مقالات</div>
        </div>
        <div className="bg-card border rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-accent-foreground mb-1">{stats?.activityCount || 0}</div>
          <div className="text-sm font-medium text-muted-foreground">أنشطة</div>
        </div>
        <div className="bg-card border rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-destructive mb-1">{stats?.upcomingActivityCount || 0}</div>
          <div className="text-sm font-medium text-muted-foreground">قادمة</div>
        </div>
      </div>

      {/* Tabs for Content Management */}
      <Tabs defaultValue="resources" className="w-full" dir="rtl">
        <TabsList className="w-full justify-start h-auto flex-wrap p-1 bg-muted/50 rounded-xl mb-8">
          <TabsTrigger value="resources" className="px-6 py-3 text-base rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <BookOpen className="w-5 h-5 ml-2" />
            المصادر التعليمية
          </TabsTrigger>
          <TabsTrigger value="newspaper" className="px-6 py-3 text-base rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <Newspaper className="w-5 h-5 ml-2" />
            المقالات الصحفية
          </TabsTrigger>
          <TabsTrigger value="activities" className="px-6 py-3 text-base rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <Calendar className="w-5 h-5 ml-2" />
            الأنشطة
          </TabsTrigger>
          <TabsTrigger value="about" className="px-6 py-3 text-base rounded-lg data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm">
            <Settings className="w-5 h-5 ml-2" />
            عن المدرسة
          </TabsTrigger>
        </TabsList>
        
        <div className="bg-card border rounded-2xl p-6 shadow-sm min-h-[500px]">
          <TabsContent value="resources" className="m-0">
            <ResourcesTab />
          </TabsContent>
          
          <TabsContent value="newspaper" className="m-0">
            <NewspaperTab />
          </TabsContent>
          
          <TabsContent value="activities" className="m-0">
            <ActivitiesTab />
          </TabsContent>
          
          <TabsContent value="about" className="m-0">
            <AboutTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}