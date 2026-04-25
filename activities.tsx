import { useListActivities, useListUpcomingActivities } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format, isAfter, startOfDay } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Activities() {
  const { data: activities, isLoading } = useListActivities();
  const today = startOfDay(new Date());

  const upcomingActivities = activities?.filter(a => isAfter(new Date(a.date), today) || new Date(a.date).getTime() === today.getTime())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) || [];
    
  const pastActivities = activities?.filter(a => !isAfter(new Date(a.date), today) && new Date(a.date).getTime() !== today.getTime())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="space-y-4 text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-accent-foreground/10 rounded-full mb-4 text-accent-foreground">
          <Calendar className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">أنشطة المدرسة</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          جدول الأنشطة والفعاليات المدرسية القادمة والسابقة
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-card rounded-2xl p-6 border flex gap-6">
              <Skeleton className="h-32 w-32 rounded-xl shrink-0" />
              <div className="space-y-4 flex-1">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-16 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : activities?.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed">
          <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">لا توجد أنشطة</h3>
          <p className="text-muted-foreground">لم يتم جدولة أي أنشطة حتى الآن.</p>
        </div>
      ) : (
        <div className="space-y-16">
          {/* Upcoming Activities */}
          {upcomingActivities.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-3xl font-serif font-bold text-secondary border-b pb-4 flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
                أنشطة قادمة
              </h2>
              <div className="grid gap-6">
                {upcomingActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} isUpcoming />
                ))}
              </div>
            </section>
          )}

          {/* Past Activities */}
          {pastActivities.length > 0 && (
            <section className="space-y-8">
              <h2 className="text-3xl font-serif font-bold text-muted-foreground border-b pb-4">
                أنشطة سابقة
              </h2>
              <div className="grid gap-6">
                {pastActivities.map((activity) => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function ActivityCard({ activity, isUpcoming = false }: { activity: any, isUpcoming?: boolean }) {
  return (
    <div className={`bg-card border rounded-2xl overflow-hidden shadow-sm flex flex-col sm:flex-row transition-all hover-elevate ${isUpcoming ? 'border-primary/30 ring-1 ring-primary/10' : 'opacity-80 hover:opacity-100'}`}>
      {activity.imageUrl ? (
        <div className="h-48 sm:h-auto sm:w-64 overflow-hidden shrink-0">
          <img src={activity.imageUrl} alt={activity.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className={`h-48 sm:h-auto sm:w-64 flex items-center justify-center shrink-0 ${isUpcoming ? 'bg-primary/5 text-primary' : 'bg-muted text-muted-foreground'}`}>
          <Calendar className="w-16 h-16 opacity-50" />
        </div>
      )}
      
      <div className="p-6 flex-1 flex flex-col justify-center">
        <div className="flex flex-wrap gap-3 items-center mb-3">
          <Badge variant={isUpcoming ? "default" : "secondary"} className="text-sm px-3 py-1">
            {format(new Date(activity.date), "dd MMMM yyyy", { locale: ar })}
          </Badge>
          {isUpcoming && (
            <span className="text-xs font-bold text-destructive bg-destructive/10 px-2 py-1 rounded-full">
              قريباً
            </span>
          )}
        </div>
        
        <h3 className={`text-2xl font-bold font-serif mb-3 ${isUpcoming ? 'text-foreground' : 'text-foreground/80'}`}>
          {activity.title}
        </h3>
        
        <p className="text-muted-foreground leading-relaxed mb-4 flex-1">
          {activity.description}
        </p>
        
        {activity.location && (
          <div className="flex items-center gap-2 text-sm font-medium text-foreground/70">
            <MapPin className="w-4 h-4 text-primary" />
            {activity.location}
          </div>
        )}
      </div>
    </div>
  );
}