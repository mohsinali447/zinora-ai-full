import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import {
  useListConversations,
  useGetConversation,
  useListMessages,
  useSendMessage,
  useUpdateConversation,
  useCreateConversation
} from "@/lib/hooks";
import { getListConversationsQueryKey, getListMessagesQueryKey } from "@/lib/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Loader2, Bot, User, CheckCircle2, MessageSquare, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";


import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";

export default function Conversations() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");
const [localMessages, setLocalMessages] = useState<any[]>([]);
const [isCreateOpen, setIsCreateOpen] = useState(false);

const [customerName, setCustomerName] = useState("");
const [customerEmail, setCustomerEmail] = useState("");
const [subject, setSubject] = useState("");
const [channel, setChannel] = useState("chat");
const messagesEndRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const { data: conversations, isLoading: isListLoading } = useListConversations({
    status: statusFilter === "all" ? undefined : statusFilter,
    search: search || undefined
  });

  const { data: activeConversation, isLoading: isConvLoading } = useGetConversation(selectedId!, {
    query: { enabled: !!selectedId }
  });

  const { data: messages, isLoading: isMsgsLoading } = useListMessages(selectedId!, {
    query: { enabled: !!selectedId }
  });

  console.log("MESSAGES DATA", JSON.stringify(messages, null, 2));

const [isTyping, setIsTyping] = useState(false);
useEffect(() => {
  messagesEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });
}, [messages]);

 
  const updateMutation = useUpdateConversation();
  const createConversationMutation = useCreateConversation();
  const sendMessageMutation = useSendMessage();


  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedId) return;

const tempMessage = {
  id: Date.now(),
  conversationId: selectedId,
  content: newMessage,
  sender: "Customer",
  senderType: "customer",
  isAi: false,
  timestamp: new Date().toISOString(),
};

setLocalMessages((prev) => [...prev, tempMessage]);

    setIsTyping(true);

    sendMessageMutation.mutate({ id: selectedId, data: { content: newMessage } }, {
      onSuccess: () => {
       
        setNewMessage("");
        setLocalMessages([]);
        setIsTyping(false);

        
        queryClient.refetchQueries({
  queryKey: getListMessagesQueryKey(selectedId)
});
        queryClient.invalidateQueries({ queryKey: getListMessagesQueryKey(selectedId) });

    
        queryClient.invalidateQueries({ queryKey: getListConversationsQueryKey() });
      }
    });
  };

  const markResolved = () => {
    if (!selectedId) return;
    updateMutation.mutate({ id: selectedId, data: { status: "resolved" } }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListConversationsQueryKey() });
      }
    });
  };

const handleCreateConversation = () => {
  if (!customerName || !customerEmail || !subject) return;

  createConversationMutation.mutate(
    {
      data: {
        customerName,
        customerEmail,
        subject,
        channel,
      },
    },

    {
      onSuccess: (conversation) => {
        
        queryClient.invalidateQueries({
          queryKey: getListConversationsQueryKey(),
        });

        setSelectedId(conversation.id);
        setIsCreateOpen(false);

        setCustomerName("");
        setCustomerEmail("");
        setSubject("");
        setChannel("chat");
      },
   onError: (error) => {
      console.error("CREATE ERROR", error);
      alert(`CREATE ERROR: ${error}`);
    },
  }
);
};
const allMessages = [...(messages || []), ...localMessages];
  return (
    <DashboardLayout>

<Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>New Conversation</DialogTitle>
    </DialogHeader>

    <div className="space-y-4">
      <div>
        <Label>Customer Name</Label>
        <Input
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="John Smith"
        />
      </div>

      <div>
        <Label>Email</Label>
        <Input
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          placeholder="john@example.com"
        />
      </div>

      <div>
        <Label>Subject</Label>
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Support Request"
        />
      </div>
    </div>

    <DialogFooter>
      <Button
        variant="outline"
        onClick={() => setIsCreateOpen(false)}
      >
        Cancel
      </Button>

      <Button
        onClick={handleCreateConversation}
        disabled={createConversationMutation.isPending}
      >
        {createConversationMutation.isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Create"
        )}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      <div className="flex h-[calc(100vh-8rem)] rounded-xl border bg-background overflow-hidden shadow-sm">
        {/* Left Pane - List */}
        <div className="w-1/3 flex flex-col border-r min-w-[300px]">
          <div className="p-4 border-b space-y-4">
            <div className="flex items-center justify-between">
  <h2 className="font-semibold text-lg">Inbox</h2>

  <Button
    size="sm"
    onClick={() => setIsCreateOpen(true)}
  >
    <Plus className="h-4 w-4 mr-2" />
    New
  </Button>
</div>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="open">Open</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <ScrollArea className="flex-1">
            {isListLoading ? (
              <div className="p-4 space-y-4 flex justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : conversations?.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedId(conv.id)}
                className={`flex flex-col gap-2 p-4 cursor-pointer hover:bg-muted/50 transition-colors border-b ${selectedId === conv.id ? 'bg-muted/50' : ''}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{conv.customerName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{conv.customerName}</span>
                      <span className="text-xs text-muted-foreground">{conv.subject}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted-foreground">{new Date(conv.lastMessageAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    {conv.unreadCount > 0 && (
                      <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center rounded-full">
                        {conv.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1">{conv.lastMessage}</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant={conv.status === 'resolved' ? 'secondary' : 'outline'} className="text-[10px] capitalize">
                    {conv.status}
                  </Badge>
                  {conv.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-[10px] bg-primary/10 text-primary hover:bg-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Right Pane - Chat */}
        <div className="flex-1 flex flex-col bg-muted/10 relative">
          {selectedId ? (
            <>
              {/* Header */}
              <div className="h-16 flex items-center justify-between px-6 border-b bg-background">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>{activeConversation?.customerName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{activeConversation?.customerName}</h3>
                    <p className="text-xs text-muted-foreground">{activeConversation?.subject}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={markResolved} disabled={activeConversation?.status === 'resolved'}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Mark Resolved
                  </Button>
                </div>
              </div>

              {/* Messages */}
              
              <ScrollArea className="flex-1 p-6">
                <div className="space-y-6 flex flex-col">
                  {isMsgsLoading ? (
                     <div className="flex justify-center p-4">
                       <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                     </div>
                  ) : allMessages.map((msg) => (
                    <div
  key={msg.id}
className={`flex w-full items-end ${
  msg.isAi || msg.senderType === 'agent'
    ? 'justify-start'
    : 'justify-end'
}`}
>
   {!(msg.isAi || msg.senderType === 'agent') && (
  <Avatar className="h-8 w-8">
    <AvatarFallback>
      {msg.sender.charAt(0)}
    </AvatarFallback>
  </Avatar>
)}
                      <div className={`flex flex-col gap-1 max-w-[70%] ${
  msg.isAi || msg.senderType === 'agent'
    ? 'items-start'
    : 'items-end'
}`}>
                       <div
  className={`p-3 rounded-2xl break-words ${
    msg.isAi || msg.senderType === 'agent'
  ? 'bg-background border rounded-bl-sm shadow-sm'
  : 'bg-primary text-primary-foreground rounded-br-sm'
  }`}
>
                          <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                        </div>
                        <span className="text-[10px] text-muted-foreground px-1">
                          {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                    </div>
                  ))}
{isTyping && (
  <div className="text-sm text-muted-foreground italic px-2">
    Zinora AI is typing...
  </div>
)}

                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t bg-background">
                <form onSubmit={handleSend} className="flex items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!newMessage.trim() || sendMessageMutation.isPending}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
