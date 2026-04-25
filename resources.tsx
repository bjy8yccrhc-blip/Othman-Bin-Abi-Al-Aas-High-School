import { useState } from "react";
import { 
  useListResources, 
  useListResourceCategories 
} from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ExternalLink, BookOpen, Filter } from "lucide-react";

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: categories, isLoading: isLoadingCategories } = useListResourceCategories();
  
  // Only pass category if selected
  const queryParams = selectedCategory ? { category: selectedCategory } : {};
  const { data: resources, isLoading: isLoadingResources } = useListResources(queryParams);

  // Filter by search query locally
  const filteredResources = resources?.filter(resource => 
    resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    resource.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-7xl">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary">المصادر التعليمية</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          مكتبة شاملة من الموارد التعليمية لدعم رحلة الطالب الأكاديمية
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 shrink-0 space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-lg flex items-center gap-2 border-b pb-2">
              <Filter className="w-5 h-5 text-primary" />
              تصفية حسب التصنيف
            </h3>
            
            {isLoadingCategories ? (
              <div className="space-y-2">
                {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-8 w-full" />)}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "ghost"}
                  className="justify-start text-right"
                  onClick={() => setSelectedCategory(null)}
                >
                  الكل
                </Button>
                {categories?.map((cat) => (
                  <Button
                    key={cat.category}
                    variant={selectedCategory === cat.category ? "default" : "ghost"}
                    className="justify-start text-right"
                    onClick={() => setSelectedCategory(cat.category)}
                  >
                    <span className="flex-1">{cat.category}</span>
                    <Badge variant="secondary" className="ml-2">{cat.count}</Badge>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input 
              type="search" 
              placeholder="ابحث في المصادر..." 
              className="pl-4 pr-10 bg-background"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Resources Grid */}
          {isLoadingResources ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-card p-5 rounded-2xl border space-y-4">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-16 w-full" />
                </div>
              ))}
            </div>
          ) : filteredResources?.length === 0 ? (
            <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground">لم يتم العثور على مصادر تطابق بحثك أو التصفية الحالية.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources?.map((resource) => (
                <div key={resource.id} className="bg-card border rounded-2xl overflow-hidden shadow-sm hover-elevate group flex flex-col">
                  {resource.imageUrl && (
                    <div className="h-40 w-full overflow-hidden border-b">
                      <img src={resource.imageUrl} alt={resource.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-5 flex-1 flex flex-col">
                    <Badge className="w-fit mb-3 bg-secondary text-secondary-foreground hover:bg-secondary/80">
                      {resource.category}
                    </Badge>
                    <h3 className="font-bold text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-muted-foreground text-sm flex-1 mb-4">
                      {resource.description}
                    </p>
                    {resource.url && (
                      <Button asChild variant="outline" className="w-full mt-auto group/btn">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          تصفح المصدر <ExternalLink className="ml-2 w-4 h-4 text-muted-foreground group-hover/btn:text-primary transition-colors" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}