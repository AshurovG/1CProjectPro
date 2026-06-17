import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { SimpleAvatar, SimpleAvatarFallback } from "./SimpleAvatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Send,
  MoreVertical,
  Search,
  Pin,
  Users,
  Hash,
  Bell,
  Archive,
  Plus,
} from "lucide-react";
import { ChevronDown } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  type: 'channel' | 'direct';
  unread: number;
  lastMessage: string;
  timestamp: string;
  members?: number;
  pinned?: boolean;
}

interface Message {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  reactions?: { emoji: string; count: number }[];
}

const channels: Channel[] = [
  {
    id: "1",
    name: "общие-объявления",
    type: "channel",
    unread: 3,
    lastMessage: "Важное обновление по проекту",
    timestamp: "10:30",
    members: 24,
    pinned: true,
  },
  {
    id: "2",
    name: "разработка",
    type: "channel",
    unread: 12,
    lastMessage: "Нужна помощь с API",
    timestamp: "09:15",
    members: 8,
  },
  {
    id: "3",
    name: "дизайн",
    type: "channel",
    unread: 0,
    lastMessage: "Новые макеты готовы",
    timestamp: "Вчера",
    members: 5,
  },
];

const directMessages: Channel[] = [
  {
    id: "dm-1",
    name: "Иван Смирнов",
    type: "direct",
    unread: 2,
    lastMessage: "Отправил правки",
    timestamp: "11:45",
  },
  {
    id: "dm-2",
    name: "Мария Козлова",
    type: "direct",
    unread: 0,
    lastMessage: "Спасибо за обратную связь!",
    timestamp: "10:20",
  },
  {
    id: "dm-3",
    name: "Петр Волков",
    type: "direct",
    unread: 5,
    lastMessage: "Можем созвониться?",
    timestamp: "09:30",
  },
];

const messages: Message[] = [
  {
    id: "1",
    author: "Анна Петрова",
    avatar: "АП",
    content: "Всем привет! Начинаем планирование нового спринта. У кого есть вопросы по задачам?",
    timestamp: "09:00",
  },
  {
    id: "2",
    author: "Иван Смирнов",
    avatar: "ИС",
    content: "Доброе утро! У меня вопрос по задаче #345 - нужно уточнить требования к API",
    timestamp: "09:15",
    reactions: [{ emoji: "👍", count: 3 }],
  },
  {
    id: "3",
    author: "Мария Козлова",
    avatar: "МК",
    content: "Я подготовила новые макеты дашборда. Скоро выложу в Figma",
    timestamp: "09:30",
    reactions: [
      { emoji: "🎨", count: 2 },
      { emoji: "👏", count: 4 },
    ],
  },
  {
    id: "4",
    author: "Петр Волков",
    avatar: "ПВ",
    content: "Отлично! Жду. Также завершил интеграцию платежной системы, на проверке",
    timestamp: "10:15",
  },
];

export function CommunicationCenter() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0]);
  const [messageInput, setMessageInput] = useState("");

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    // Handle message sending
    setMessageInput("");
  };

  return (
    <div className="flex h-full">
      {/* Channels Sidebar */}
      <div className="w-64 border-r bg-muted/30">
        <div className="border-b p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Поиск..." className="pl-9" />
          </div>
        </div>

        <div className="h-[calc(100vh-8rem)] overflow-auto">
          <Tabs defaultValue="channels" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="channels" className="flex-1">
                Каналы
              </TabsTrigger>
              <TabsTrigger value="direct" className="flex-1">
                Личные
              </TabsTrigger>
            </TabsList>

            <TabsContent value="channels" className="mt-0 space-y-1 p-2">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Создать канал
              </Button>
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-muted ${
                    selectedChannel.id === channel.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedChannel(channel)}
                >
                  {channel.pinned && <Pin className="h-3 w-3 text-muted-foreground" />}
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm">{channel.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{channel.lastMessage}</p>
                  </div>
                  {channel.unread > 0 && (
                    <Badge variant="destructive" className="h-5 min-w-[20px] px-1 text-xs">
                      {channel.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </TabsContent>

            <TabsContent value="direct" className="mt-0 space-y-1 p-2">
              {directMessages.map((dm) => (
                <div
                  key={dm.id}
                  className={`flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-muted ${
                    selectedChannel.id === dm.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedChannel(dm)}
                >
                  <SimpleAvatar className="h-8 w-8">
                    <SimpleAvatarFallback className="text-xs">
                      {dm.name.split(' ').map(n => n[0]).join('')}
                    </SimpleAvatarFallback>
                  </SimpleAvatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm">{dm.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{dm.lastMessage}</p>
                  </div>
                  {dm.unread > 0 && (
                    <Badge variant="destructive" className="h-5 min-w-[20px] px-1 text-xs">
                      {dm.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            {selectedChannel.type === 'channel' ? (
              <Hash className="h-5 w-5 text-muted-foreground" />
            ) : (
              <SimpleAvatar className="h-8 w-8">
                <SimpleAvatarFallback className="text-xs">
                  {selectedChannel.name.split(' ').map(n => n[0]).join('')}
                </SimpleAvatarFallback>
              </SimpleAvatar>
            )}
            <div>
              <h2 className="text-sm">{selectedChannel.name}</h2>
              {selectedChannel.members && (
                <p className="text-xs text-muted-foreground">
                  {selectedChannel.members} участников
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3">
                <SimpleAvatar className="h-8 w-8">
                  <SimpleAvatarFallback className="text-xs">{message.avatar}</SimpleAvatarFallback>
                </SimpleAvatar>
                <div className="flex-1">
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="text-sm">{message.author}</span>
                    <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{message.content}</p>
                  {message.reactions && (
                    <div className="mt-2 flex gap-2">
                      {message.reactions.map((reaction, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="h-6 gap-1 px-2 text-xs"
                        >
                          {reaction.emoji} {reaction.count}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t p-4">
          <div className="flex gap-2">
            <Textarea
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder={`Сообщение в ${selectedChannel.name}...`}
              className="min-h-[60px] resize-none"
            />
            <Button onClick={handleSendMessage} disabled={!messageInput.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Info Sidebar */}
      <div className="w-80 border-l bg-muted/30 p-4">
        <h3 className="mb-4">Информация о канале</h3>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-sm">Участники ({selectedChannel.members || 1})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {['Анна Петрова', 'Иван Смирнов', 'Мария Козлова', 'Петр Волков'].map((name, index) => (
                <div key={index} className="flex items-center gap-2">
                  <SimpleAvatar className="h-6 w-6">
                    <SimpleAvatarFallback className="text-xs">
                      {name.split(' ').map(n => n[0]).join('')}
                    </SimpleAvatarFallback>
                  </SimpleAvatar>
                  <span className="text-sm">{name}</span>
                  <div className="ml-auto h-2 w-2 rounded-full bg-green-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Закрепленные сообщения</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Важное объявление:</p>
                <p className="mt-1 text-sm">Спринт-планирование в среду в 14:00</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Ссылка на документацию:</p>
                <p className="mt-1 text-sm">API Reference v2.0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Archive className="mr-2 h-4 w-4" />
            Архив сообщений
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Users className="mr-2 h-4 w-4" />
            Управление участниками
          </Button>
        </div>
      </div>
    </div>
  );
}