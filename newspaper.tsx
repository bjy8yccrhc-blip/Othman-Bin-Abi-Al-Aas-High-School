import { useListNewspaperArticles } from "@workspace/api-client-react";
import { Link } from "wouter";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { Newspaper as NewspaperIcon, Calendar, User } from "lucide-react";

export default function Newspaper() {
  const { data: articles, isLoading } = useListNewspaperArticles();

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="space-y-4 text-center mb-16">
        <div className="inline-flex items-center justify-center p-3 bg-secondary/10 rounded-full mb-4 text-secondary">
          <NewspaperIcon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary">صحيفة المدرسة</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          آخر الأخبار والمقالات والفعاليات في مجتمعنا المدرسي
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-64 w-full rounded-2xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      ) : articles?.length === 0 ? (
        <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed">
          <NewspaperIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">لا توجد مقالات</h3>
          <p className="text-muted-foreground">لم يتم نشر أي مقالات صحفية حتى الآن.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles?.map((article, index) => (
            <Link key={article.id} href={`/newspaper/${article.id}`} className="group flex flex-col bg-card rounded-2xl overflow-hidden border shadow-sm hover-elevate">
              {article.coverImageUrl ? (
                <div className="h-64 w-full overflow-hidden relative">
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
                  <img src={article.coverImageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              ) : (
                <div className="h-64 w-full bg-muted flex items-center justify-center text-muted-foreground">
                  <NewspaperIcon className="w-16 h-16 opacity-20" />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(article.publishDate), "dd MMMM yyyy", { locale: ar })}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {article.author}
                  </span>
                </div>
                <h2 className="text-2xl font-bold font-serif mb-3 group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h2>
                <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                  {article.excerpt}
                </p>
                <div className="text-secondary font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                  اقرأ المزيد <span>←</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}