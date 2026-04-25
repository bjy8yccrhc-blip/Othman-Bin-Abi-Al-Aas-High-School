import { useParams, Link } from "wouter";
import { useGetNewspaperArticle } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function NewspaperArticle() {
  const { id } = useParams<{ id: string }>();
  const { data: article, isLoading } = useGetNewspaperArticle(Number(id), { query: { enabled: !!id } });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-8">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-12 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-32" />
        </div>
        <Skeleton className="h-[400px] w-full rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg space-y-6">
        <h2 className="text-3xl font-bold text-foreground">المقال غير موجود</h2>
        <p className="text-muted-foreground text-lg">لم نتمكن من العثور على المقال الذي تبحث عنه. قد يكون قد تم حذفه أو الرابط غير صحيح.</p>
        <Button asChild>
          <Link href="/newspaper">العودة إلى الصحيفة</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Button asChild variant="ghost" className="mb-8 text-muted-foreground hover:text-primary">
        <Link href="/newspaper">
          <ArrowRight className="ml-2 w-4 h-4" />
          العودة إلى الأخبار
        </Link>
      </Button>

      <header className="space-y-6 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight">
          {article.title}
        </h1>
        
        <div className="flex items-center justify-center gap-6 text-muted-foreground font-medium">
          <span className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            {format(new Date(article.publishDate), "EEEE، dd MMMM yyyy", { locale: ar })}
          </span>
          <span className="flex items-center gap-2">
            <User className="w-5 h-5 text-secondary" />
            {article.author}
          </span>
        </div>
      </header>

      {article.coverImageUrl && (
        <div className="rounded-3xl overflow-hidden mb-12 shadow-md bg-muted">
          <img 
            src={article.coverImageUrl} 
            alt={article.title} 
            className="w-full max-h-[600px] object-cover"
          />
        </div>
      )}

      <div className="prose prose-lg md:prose-xl prose-stone mx-auto text-foreground/90 font-serif leading-relaxed text-justify whitespace-pre-wrap">
        <p className="lead text-2xl text-muted-foreground font-medium mb-8 pb-8 border-b">
          {article.excerpt}
        </p>
        
        {article.content.split('\n').map((paragraph, index) => (
          paragraph.trim() ? <p key={index}>{paragraph}</p> : <br key={index} />
        ))}
      </div>
    </article>
  );
}