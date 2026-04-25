import React from "react";
import { Link, useLocation } from "wouter";
import { useGetMe, useGetAbout } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { useAuth, useClerk } from "@clerk/react";
import { LogOut, User, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Layout({ children }: { children: React.ReactNode }) {
  const { data: me } = useGetMe({ query: { retry: false, retryOnMount: false } });
  const { data: about } = useGetAbout();
  const { isSignedIn } = useAuth();
  const { signOut } = useClerk();
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isAdmin = me?.role === "admin";
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "عن المدرسة", href: "/about" },
    { label: "المصادر", href: "/resources" },
    { label: "الصحيفة", href: "/newspaper" },
    { label: "الأنشطة", href: "/activities" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background text-foreground font-sans selection:bg-primary/20" dir="rtl">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <img src={`${basePath}/logo.svg`} alt="شعار المدرسة" className="h-12 w-12 group-hover:scale-105 transition-transform duration-300" />
            <div>
              <h1 className="font-serif font-bold text-xl text-primary">{about?.schoolName || "موقع المدرسة"}</h1>
              {about?.tagline && <p className="text-xs text-muted-foreground hidden sm:block">{about.tagline}</p>}
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive ? 'bg-primary/10 text-primary' : 'text-foreground/80 hover:bg-muted hover:text-foreground'}`}>
                  {link.label}
                </Link>
              );
            })}
            {isAdmin && (
              <Link href="/admin" className="px-4 py-2 rounded-full text-sm font-bold text-secondary hover:bg-secondary/10 transition-all">
                لوحة المشرف
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isSignedIn ? (
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="icon" onClick={() => signOut()} className="text-muted-foreground hover:text-destructive">
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">تسجيل الخروج</span>
                </Button>
                <div className="flex items-center gap-2 bg-muted/50 py-1.5 px-3 rounded-full">
                  <span className="text-sm font-medium">{me?.firstName || "مستخدم"}</span>
                  <Avatar className="h-8 w-8 border border-primary/20">
                    <AvatarImage src={me?.imageUrl || ""} />
                    <AvatarFallback className="bg-primary/10 text-primary"><User className="h-4 w-4" /></AvatarFallback>
                  </Avatar>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setLocation("/sign-in")} className="font-medium">تسجيل الدخول</Button>
                <Button onClick={() => setLocation("/sign-up")} className="font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90">إنشاء حساب</Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background p-4 animate-in slide-in-from-top-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="px-4 py-3 rounded-lg text-base font-medium bg-muted/30 hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className="px-4 py-3 rounded-lg text-base font-bold bg-secondary/10 text-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  لوحة المشرف
                </Link>
              )}
            </nav>
            <div className="mt-6 pt-4 border-t flex flex-col gap-3">
              {isSignedIn ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={me?.imageUrl || ""} />
                      <AvatarFallback><User className="h-5 w-5" /></AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{me?.firstName || "مستخدم"} {me?.lastName || ""}</p>
                      <p className="text-xs text-muted-foreground">{isAdmin ? "مشرف" : "طالب/ولي أمر"}</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full justify-start text-destructive" onClick={() => { signOut(); setMobileMenuOpen(false); }}>
                    <LogOut className="h-4 w-4 ml-2" /> تسجيل الخروج
                  </Button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => { setLocation("/sign-in"); setMobileMenuOpen(false); }}>تسجيل الدخول</Button>
                  <Button onClick={() => { setLocation("/sign-up"); setMobileMenuOpen(false); }} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">إنشاء حساب</Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="bg-primary text-primary-foreground mt-auto py-12 border-t-4 border-secondary">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-full">
                <img src={`${basePath}/logo.svg`} alt="شعار المدرسة" className="h-8 w-8" />
              </div>
              <h3 className="font-serif font-bold text-2xl">{about?.schoolName || "مدرسة المستقبل"}</h3>
            </div>
            <p className="text-primary-foreground/80 max-w-sm">
              {about?.tagline || "نحو مستقبل مشرق ومتميز لأبنائنا"}
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg border-b border-primary-foreground/20 pb-2 inline-block">روابط سريعة</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-primary-foreground/80 hover:text-secondary transition-colors inline-flex items-center gap-1 before:content-['›'] before:text-secondary before:font-bold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg border-b border-primary-foreground/20 pb-2 inline-block">تواصل معنا</h4>
            <ul className="space-y-3 text-primary-foreground/80">
              {about?.address && <li className="flex items-start gap-2"><span>📍</span> <span>{about.address}</span></li>}
              {about?.contactEmail && <li className="flex items-center gap-2"><span>✉️</span> <a href={`mailto:${about.contactEmail}`} className="hover:text-secondary dir-ltr">{about.contactEmail}</a></li>}
              {about?.contactPhone && <li className="flex items-center gap-2"><span>📞</span> <a href={`tel:${about.contactPhone}`} className="hover:text-secondary dir-ltr">{about.contactPhone}</a></li>}
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-6 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} {about?.schoolName || "مدرسة المستقبل"}. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}