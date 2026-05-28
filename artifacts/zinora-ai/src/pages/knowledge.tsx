import { useState } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { useListArticles, useListCategories, useCreateArticle } from "@workspace/api-client-react";
import { getListArticlesQueryKey, getListCategoriesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, BookOpen, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Knowledge() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: categories } = useListCategories();
  const { data: articles, isLoading } = useListArticles({
    search: search || undefined,
    category: activeCategory || undefined
  });

  const createMutation = useCreateArticle();

  // Create Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("general");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ data: { title, content, category, status: "published" } }, {
      onSuccess: () => {
        toast({ title: "Article created" });
        setIsCreateOpen(false);
        setTitle("");
        setContent("");
        queryClient.invalidateQueries({ queryKey: getListArticlesQueryKey() });
        queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() });
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
            <p className="text-muted-foreground mt-1">Manage articles that train your AI and help customers.</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="mr-2 h-4 w-4" /> New Article</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create Article</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={title} onChange={e=>setTitle(e.target.value)} required placeholder="How to reset password" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input value={category} onChange={e=>setCategory(e.target.value)} required placeholder="accounts" />
                </div>
                <div className="space-y-2">
                  <Label>Content (Markdown)</Label>
                  <Textarea value={content} onChange={e=>setContent(e.target.value)} required rows={10} placeholder="Write your article content here..." />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={createMutation.isPending}>Save & Publish</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex gap-6 flex-1 min-h-0">
          {/* Categories Sidebar */}
          <div className="w-64 flex-shrink-0 flex flex-col gap-2">
            <Button
              variant={activeCategory === null ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveCategory(null)}
            >
              <BookOpen className="mr-2 h-4 w-4" /> All Articles
            </Button>
            {categories?.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.slug ? "secondary" : "ghost"}
                className="justify-between"
                onClick={() => setActiveCategory(cat.slug)}
              >
                <span className="flex items-center"><FileText className="mr-2 h-4 w-4" /> {cat.name}</span>
                <Badge variant="outline" className="ml-2">{cat.articleCount}</Badge>
              </Button>
            ))}
          </div>

          {/* Main Area */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                className="pl-10"
                value={search}
                onChange={e=>setSearch(e.target.value)}
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 overflow-auto pb-6">
              {articles?.map(article => (
                <Card key={article.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className="text-xs bg-muted/50">{article.category}</Badge>
                      <Badge variant="secondary" className="text-[10px] uppercase bg-green-500/10 text-green-500 hover:bg-green-500/20">{article.status}</Badge>
                    </div>
                    <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{article.content}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">👀 {article.views} views</span>
                      <span>Updated {new Date(article.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
