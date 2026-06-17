import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SimpleAvatar, SimpleAvatarFallback } from "./SimpleAvatar";
import { Badge } from "./ui/badge";
import { Send, Bot, User, Lightbulb, TrendingUp, AlertTriangle, Sparkles, Paperclip } from "lucide-react";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Здравствуйте! Я ваш AI-помощник в управлении проектами. Могу помочь с анализом задач, планированием, распределением ресурсов и оптимизацией рабочих процессов. Чем могу помочь?",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    suggestions: [
      "Проанализировать текущие проекты",
      "Найти узкие места в процессах",
      "Предложить оптимизацию задач",
      "Создать отчет по эффективности",
    ],
  },
];

const quickActions = [
  {
    icon: TrendingUp,
    title: "Анализ эффективности",
    description: "Получить отчет по продуктивности команды",
    color: "text-green-600",
  },
  {
    icon: AlertTriangle,
    title: "Риски проекта",
    description: "Выявить потенциальные проблемы",
    color: "text-orange-600",
  },
  {
    icon: Lightbulb,
    title: "Умные рекомендации",
    description: "Предложения по улучшению процессов",
    color: "text-purple-600",
  },
  {
    icon: Sparkles,
    title: "Автоматизация",
    description: "Настроить автоматические действия",
    color: "text-blue-600",
  },
];

export function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("анализ") || lowerInput.includes("эффективност")) {
      return "Проведя анализ ваших проектов, я выявил следующее:\n\n📊 Общая эффективность команды: 94%\n✅ Выполнено задач в срок: 87%\n⚠️ Задачи с просрочкой: 3 (требуют внимания)\n🚀 Средняя скорость выполнения задач увеличилась на 12% за последний месяц\n\nРекомендую обратить внимание на проект 'Мобильное приложение iOS' - там наблюдается небольшое отставание от графика.";
    }
    
    if (lowerInput.includes("риск") || lowerInput.includes("проблем")) {
      return "Обнаружены следующие потенциальные риски:\n\n🔴 ВЫСОКИЙ: В проекте 'Разработка Web' задача 'Модуль авторизации' может не успеть к дедлайну - рекомендую добавить ресурсы\n🟡 СРЕДНИЙ: Проект 'Маркетинг Q4' - 2 члена команды в отпуске на следующей неделе\n🟢 НИЗКИЙ: Незначительная задержка в тестировании\n\nПредлагаю перераспределить задачи и провести ежедневные stand-up встречи для контроля.";
    }
    
    if (lowerInput.includes("рекоменд") || lowerInput.includes("совет")) {
      return "На основе анализа ваших процессов, вот мои рекомендации:\n\n💡 Автоматизируйте повторяющиеся задачи - это сэкономит до 15% времени\n📅 Используйте спринты длиной 2 недели для более гибкого планирования\n👥 Распределите нагрузку равномернее - у Ивана Смирнова перегрузка (14 активных задач)\n🎯 Приоритизируйте задачи с помощью матрицы Эйзенхауэра\n\nХотите, чтобы я автоматически применил эти улучшения?";
    }
    
    return "Я проанализировал ваш запрос. Могу помочь с:\n\n• Детальным анализом проектов и задач\n• Планированием и оптимизацией рабочих процессов\n• Выявлением рисков и узких мест\n• Автоматизацией рутинных операций\n• Созданием отчетов и аналитики\n• Рекомендациями по улучшению эффективности\n\nУточните, что именно вас интересует?";
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
    setTimeout(() => handleSend(), 500);
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col">
        <div className="border-b bg-background p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Bot className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="mb-0">AI Помощник</h1>
              <p className="text-sm text-muted-foreground">Интеллектуальный анализ проектов</p>
            </div>
            <Badge variant="secondary" className="ml-auto">
              <Sparkles className="mr-1 h-3 w-3" />
              Powered by DeepSeek
            </Badge>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="mx-auto max-w-3xl space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <SimpleAvatar className="h-8 w-8">
                  <SimpleAvatarFallback>
                    {message.role === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </SimpleAvatarFallback>
                </SimpleAvatar>
                <div className={`flex-1 ${message.role === 'user' ? 'flex justify-end' : ''}`}>
                  <div
                    className={`rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                    style={{ maxWidth: '85%' }}
                  >
                    <p className="whitespace-pre-line text-sm">{message.content}</p>
                    {message.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="secondary"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={message.role === 'user' ? 'bg-primary-foreground/20 hover:bg-primary-foreground/30' : ''}
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {message.timestamp.toLocaleTimeString('ru-RU', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <SimpleAvatar className="h-8 w-8">
                  <SimpleAvatarFallback>
                    <Bot className="h-4 w-4" />
                  </SimpleAvatarFallback>
                </SimpleAvatar>
                <div className="rounded-lg bg-muted p-4">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t bg-background p-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex gap-2">
              <Button variant="outline" size="icon" className="shrink-0">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Задайте вопрос или опишите задачу..."
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-80 border-l bg-muted/30 p-4">
        <h3 className="mb-4">Быстрые действия</h3>
        <div className="space-y-3">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => handleQuickAction(action.description)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <action.icon className={`h-5 w-5 ${action.color}`} />
                  <div>
                    <CardTitle className="text-sm">{action.title}</CardTitle>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <h3 className="mb-4">Возможности</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Анализ проектов в реальном времени</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Прогнозирование рисков</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Умные рекомендации</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Автоматизация задач</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Интеграция с 1С:Элемент</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}