import { Link } from "wouter";
import { 
  useGetAbout, 
  useGetStats, 
  useGetRecentActivity, 
  useListUpcomingActivities 
} from "@workspace/api-client-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { ArrowLeft, BookOpen, Newspaper, Calendar, ArrowUpLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: about, isLoading: isLoadingAbout } = useGetAbout();
  const { data: stats } = useGetStats();
  const { data: recentActivity } = useGetRecentActivity();
  const { data: upcomingActivities } = useListUpcomingActivities();

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {about?.heroImageUrl ? (
            <img src={about.heroImageUrl} alt="Hero" className="w-full h-full object-cover object-center" />
          ) : (
            <img src="/hero.png" alt="School Hero" className="w-full h-full object-cover object-center" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {isLoadingAbout ? (
            <div className="space-y-4 flex flex-col items-center">
              <Skeleton className="h-16 w-3/4 bg-primary/20" />
              <Skeleton className="h-6 w-1/2 bg-primary/10" />
            </div>
          ) : (
            <>
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-primary drop-shadow-sm leading-tight">
                {about?.schoolName || "مدرسة المستقبل المشرق"}
              </h1>
              <p className="text-xl md:text-2xl text-foreground/90 font-medium">
                {about?.tagline || "نحو مستقبل مشرق ومتميز لأبنائنا"}
              </p>
            </>
          )}
          
          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <Button asChild size="lg" className="text-lg rounded-full px-8 h-14 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all">
              <Link href="/about">تعرف علينا <ArrowLeft className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg rounded-full px-8 h-14 bg-background/80 backdrop-blur-sm border-2 border-primary/20 hover:bg-background hover:scale-105 transition-all">
              <Link href="/activities">الأنشطة القادمة</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-card p-6 rounded-2xl shadow-sm text-center space-y-2 border border-border/50 hover-elevate">
              <BookOpen className="w-8 h-8 mx-auto text-primary mb-4" />
              <div className="text-4xl font-bold text-foreground">{stats?.resourceCount || 0}</div>
              <div className="text-sm text-muted-foreground font-medium">مصادر تعليمية</div>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm text-center space-y-2 border border-border/50 hover-elevate">
              <Newspaper className="w-8 h-8 mx-auto text-secondary mb-4" />
              <div className="text-4xl font-bold text-foreground">{stats?.articleCount || 0}</div>
              <div className="text-sm text-muted-foreground font-medium">مقالات صحفية</div>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm text-center space-y-2 border border-border/50 hover-elevate">
              <Calendar className="w-8 h-8 mx-auto text-accent-foreground mb-4" />
              <div className="text-4xl font-bold text-foreground">{stats?.activityCount || 0}</div>
              <div className="text-sm text-muted-foreground font-medium">إجمالي الأنشطة</div>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-sm text-center space-y-2 border border-border/50 hover-elevate">
              <ArrowUpLeft className="w-8 h-8 mx-auto text-primary mb-4" />
              <div className="text-4xl font-bold text-foreground">{stats?.upcomingActivityCount || 0}</div>
              <div className="text-sm text-muted-foreground font-medium">أنشطة قادمة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Recent Activity Feed */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-3xl font-serif font-bold text-primary">آخر التحديثات</h2>
            </div>
            
            <div className="space-y-6">
              {recentActivity?.map((item) => (
                <div key={`${item.kind}-${item.id}`} className="group flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                    item.kind === 'resource' ? 'bg-blue-100 text-blue-600' :
                    item.kind === 'article' ? 'bg-orange-100 text-orange-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {item.kind === 'resource' && <BookOpen className="w-6 h-6" />}
                    {item.kind === 'article' && <Newspaper className="w-6 h-6" />}
                    {item.kind === 'activity' && <Calendar className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-border text-muted-foreground">
                        {item.kind === 'resource' ? 'مصدر جديد' : item.kind === 'article' ? 'مقال صحفي' : 'نشاط'}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(item.createdAt), "dd MMMM yyyy", { locale: ar })}
                      </span>
                    </div>
                    <Link 
                      href={item.kind === 'resource' ? '/resources' : item.kind === 'article' ? `/newspaper/${item.id}` : '/activities'}
                      className="block text-xl font-bold text-foreground group-hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                  </div>
                </div>
              ))}
              {recentActivity?.length === 0 && (
                <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
                  لا توجد تحديثات أخيرة
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Activities Sidebar */}
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-3xl font-serif font-bold text-secondary">الأنشطة القادمة</h2>
            </div>
            
            <div className="space-y-4">
              {upcomingActivities?.slice(0, 4).map((activity) => (
                <div key={activity.id} className="bg-card border rounded-xl overflow-hidden shadow-sm hover-elevate group">
                  {activity.imageUrl && (
                    <div className="h-32 w-full overflow-hidden">
                      <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-4 space-y-2">
                    <div className="text-primary font-bold text-sm">
                      {format(new Date(activity.date), "EEEE، dd MMMM yyyy", { locale: ar })}
                    </div>
                    <h3 className="font-bold text-lg leading-tight group-hover:text-secondary transition-colors">
                      <Link href="/activities">{activity.title}</Link>
                    </h3>
                    {activity.location && (
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        📍 {activity.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {upcomingActivities?.length === 0 && (
                <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
                  لا توجد أنشطة مجدولة قريباً
                </div>
              )}
            </div>
            
            <Button asChild variant="outline" className="w-full">
              <Link href="/activities">عرض كل الأنشطة</Link>
            </Button>
          </div>

        </div>
      </section>

      {/* Explore Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center max-w-3xl space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">اكتشف المزيد عن مدرستنا</h2>
          <p className="text-lg text-primary-foreground/80 leading-relaxed">
            نحن نوفر بيئة تعليمية محفزة تشجع على الإبداع والتميز. استكشف مصادرنا التعليمية، واقرأ أحدث أخبار المدرسة في صحيفتنا.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 font-bold rounded-full px-8">
              <Link href="/resources">المصادر التعليمية</Link>
            </Button>
            <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold rounded-full px-8">
              <Link href="/newspaper">صحيفة المدرسة</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}