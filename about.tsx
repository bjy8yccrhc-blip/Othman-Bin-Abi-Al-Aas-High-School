import { useGetAbout } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Target, History, GraduationCap, MapPin, Mail, Phone } from "lucide-react";

export default function About() {
  const { data: about, isLoading } = useGetAbout();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 space-y-12">
        <Skeleton className="w-full h-64 rounded-2xl" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/3" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          {about?.heroImageUrl ? (
            <img src={about.heroImageUrl} alt="عن المدرسة" className="w-full h-full object-cover object-center" />
          ) : (
            <div className="w-full h-full bg-primary/90"></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary drop-shadow-sm">
            نبذة عن المدرسة
          </h1>
          <p className="text-xl text-foreground/90 font-medium">
            تاريخ عريق ومستقبل مشرق
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Right Column: Mission, Vision, History */}
          <div className="space-y-12">
            {about?.history && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-700">
                <div className="flex items-center gap-3 border-b pb-2">
                  <div className="bg-primary/10 p-2 rounded-lg text-primary">
                    <History className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-primary">تاريخنا</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg text-justify whitespace-pre-wrap">
                  {about.history}
                </p>
              </div>
            )}

            {about?.mission && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-150">
                <div className="flex items-center gap-3 border-b pb-2">
                  <div className="bg-secondary/10 p-2 rounded-lg text-secondary">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-secondary">رسالتنا</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg text-justify whitespace-pre-wrap">
                  {about.mission}
                </p>
              </div>
            )}

            {about?.vision && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-700 delay-300">
                <div className="flex items-center gap-3 border-b pb-2">
                  <div className="bg-accent-foreground/10 p-2 rounded-lg text-accent-foreground">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-accent-foreground">رؤيتنا</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg text-justify whitespace-pre-wrap">
                  {about.vision}
                </p>
              </div>
            )}
          </div>

          {/* Left Column: Principal Message & Contact Info */}
          <div className="space-y-12">
            
            {about?.principalMessage && (
              <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-md relative hover-elevate animate-in fade-in slide-in-from-left-8 duration-700">
                <div className="absolute -top-6 -right-6 text-primary/10">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                  </svg>
                </div>
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full text-primary">
                      <GraduationCap className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-xl text-foreground">كلمة المدير</h3>
                      <p className="text-sm text-muted-foreground font-medium">{about.principalName}</p>
                    </div>
                  </div>
                  <p className="text-foreground/80 leading-relaxed text-lg italic whitespace-pre-wrap">
                    "{about.principalMessage}"
                  </p>
                </div>
              </div>
            )}

            <div className="bg-muted/30 rounded-3xl p-8 border border-border/50 animate-in fade-in slide-in-from-left-8 duration-700 delay-300">
              <h3 className="font-serif font-bold text-2xl text-foreground mb-6 border-b pb-4">معلومات التواصل</h3>
              <ul className="space-y-6">
                {about?.address && (
                  <li className="flex items-start gap-4">
                    <div className="bg-background p-2 rounded-lg shadow-sm text-primary shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm mb-1">العنوان</h4>
                      <p className="text-muted-foreground">{about.address}</p>
                    </div>
                  </li>
                )}
                {about?.contactEmail && (
                  <li className="flex items-start gap-4">
                    <div className="bg-background p-2 rounded-lg shadow-sm text-primary shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm mb-1">البريد الإلكتروني</h4>
                      <a href={`mailto:${about.contactEmail}`} className="text-muted-foreground hover:text-primary transition-colors dir-ltr block text-right">
                        {about.contactEmail}
                      </a>
                    </div>
                  </li>
                )}
                {about?.contactPhone && (
                  <li className="flex items-start gap-4">
                    <div className="bg-background p-2 rounded-lg shadow-sm text-primary shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground text-sm mb-1">رقم الهاتف</h4>
                      <a href={`tel:${about.contactPhone}`} className="text-muted-foreground hover:text-primary transition-colors dir-ltr block text-right">
                        {about.contactPhone}
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}