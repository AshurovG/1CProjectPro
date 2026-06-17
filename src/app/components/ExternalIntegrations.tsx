import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { 
  Trello, 
  CheckSquare, 
  FileText, 
  LayoutGrid, 
  Download, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ExternalLink,
  Key,
  Settings2
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface ImportStats {
  projects: number;
  tasks: number;
  users: number;
}

interface IntegrationService {
  id: string;
  name: string;
  icon: any;
  description: string;
  color: string;
  connected: boolean;
  lastSync?: string;
}

export function ExternalIntegrations() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [apiKey, setApiKey] = useState("");
  const [workspace, setWorkspace] = useState("");

  const services: IntegrationService[] = [
    {
      id: 'trello',
      name: 'Trello',
      icon: Trello,
      description: 'Импорт досок, карточек и участников из Trello',
      color: 'bg-blue-600',
      connected: false
    },
    {
      id: 'jira',
      name: 'Jira',
      icon: CheckSquare,
      description: 'Импорт проектов, задач и спринтов из Jira',
      color: 'bg-blue-700',
      connected: false
    },
    {
      id: 'confluence',
      name: 'Confluence',
      icon: FileText,
      description: 'Импорт документации и страниц из Confluence',
      color: 'bg-indigo-600',
      connected: false
    },
    {
      id: 'asana',
      name: 'Asana',
      icon: LayoutGrid,
      description: 'Импорт проектов, задач и команд из Asana',
      color: 'bg-pink-600',
      connected: false
    }
  ];

  const handleConnect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleImport = async () => {
    if (!apiKey || !workspace) {
      toast.error("Заполните все обязательные поля");
      return;
    }

    setIsImporting(true);
    setImportProgress(0);

    // Симуляция импорта
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsImporting(false);
          toast.success("Импорт успешно завершен!", {
            description: `Данные из ${services.find(s => s.id === selectedService)?.name} успешно импортированы`
          });
          setSelectedService(null);
          setApiKey("");
          setWorkspace("");
          return 100;
        }
        return prev + 10;
      });
    }, 400);
  };

  const getImportInstructions = (serviceId: string) => {
    const instructions = {
      trello: {
        steps: [
          "Войдите в свой аккаунт Trello",
          "Перейдите в Настройки → Power-Ups & Integrations",
          "Создайте новый API ключ",
          "Скопируйте ключ и токен",
          "Введите workspace URL (например: mycompany.trello.com)"
        ],
        fields: [
          { label: "API Key", placeholder: "Введите API ключ Trello" },
          { label: "API Token", placeholder: "Введите API токен" },
          { label: "Workspace URL", placeholder: "mycompany.trello.com" }
        ]
      },
      jira: {
        steps: [
          "Войдите в Atlassian Cloud",
          "Создайте API токен в настройках безопасности",
          "Скопируйте email и API токен",
          "Укажите URL вашего Jira сайта"
        ],
        fields: [
          { label: "Email", placeholder: "your-email@company.com" },
          { label: "API Token", placeholder: "Введите API токен Jira" },
          { label: "Jira URL", placeholder: "yourcompany.atlassian.net" }
        ]
      },
      confluence: {
        steps: [
          "Войдите в Confluence",
          "Перейдите в User Settings → Personal Access Tokens",
          "Создайте новый токен с правами на чтение",
          "Скопируйте токен и URL пространства"
        ],
        fields: [
          { label: "Access Token", placeholder: "Введите токен доступа" },
          { label: "Space Key", placeholder: "PROJ" },
          { label: "Confluence URL", placeholder: "yourcompany.atlassian.net/wiki" }
        ]
      },
      asana: {
        steps: [
          "Войдите в Asana",
          "Перейдите в My Settings → Apps → Developer Apps",
          "Создайте Personal Access Token",
          "Скопируйте токен",
          "Укажите название workspace"
        ],
        fields: [
          { label: "Personal Access Token", placeholder: "Введите токен Asana" },
          { label: "Workspace Name", placeholder: "Название workspace" }
        ]
      }
    };

    return instructions[serviceId as keyof typeof instructions];
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="mb-2">Внешние интеграции</h1>
          <p className="text-muted-foreground">
            Импорт проектов и задач из популярных систем управления проектами
          </p>
        </div>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList>
            <TabsTrigger value="services">Сервисы</TabsTrigger>
            <TabsTrigger value="history">История импорта</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            {selectedService ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {(() => {
                        const service = services.find(s => s.id === selectedService);
                        const Icon = service?.icon;
                        return (
                          <>
                            <div className={`${service?.color} p-3 rounded-lg`}>
                              {Icon && <Icon className="h-6 w-6 text-white" />}
                            </div>
                            <div>
                              <CardTitle>Подключение к {service?.name}</CardTitle>
                              <CardDescription>{service?.description}</CardDescription>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    <Button variant="outline" onClick={() => setSelectedService(null)}>
                      Назад
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg bg-blue-50 border border-blue-200 p-4">
                    <div className="flex items-start gap-3">
                      <Settings2 className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="space-y-2">
                        <h4 className="text-sm text-blue-900">Инструкция по подключению</h4>
                        <ol className="space-y-1 text-sm text-blue-800 list-decimal list-inside">
                          {getImportInstructions(selectedService)?.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4>Параметры подключения</h4>
                    {getImportInstructions(selectedService)?.fields.map((field, index) => (
                      <div key={index} className="space-y-2">
                        <Label htmlFor={`field-${index}`}>
                          {field.label} <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id={`field-${index}`}
                          type={field.label.includes('Token') || field.label.includes('Key') ? 'password' : 'text'}
                          placeholder={field.placeholder}
                          value={index === 0 ? apiKey : workspace}
                          onChange={(e) => index === 0 ? setApiKey(e.target.value) : setWorkspace(e.target.value)}
                        />
                      </div>
                    ))}
                  </div>

                  {isImporting && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Импорт данных...</span>
                        <span>{importProgress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${importProgress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button 
                      onClick={handleImport} 
                      disabled={isImporting}
                      className="flex-1"
                    >
                      {isImporting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Импорт...
                        </>
                      ) : (
                        <>
                          <Download className="mr-2 h-4 w-4" />
                          Начать импорт
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={() => {
                      // Тестовое подключение
                      toast.info("Проверка подключения...");
                      setTimeout(() => {
                        toast.success("Подключение успешно!");
                      }, 1500);
                    }}>
                      Проверить подключение
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Card key={service.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`${service.color} p-3 rounded-lg`}>
                              <Icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <CardTitle>{service.name}</CardTitle>
                              <CardDescription className="mt-1">
                                {service.description}
                              </CardDescription>
                            </div>
                          </div>
                          {service.connected && (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Подключено
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => handleConnect(service.id)}
                            variant={service.connected ? "outline" : "default"}
                            className="flex-1"
                          >
                            <Download className="mr-2 h-4 w-4" />
                            {service.connected ? 'Импортировать еще' : 'Подключить'}
                          </Button>
                          <Button variant="ghost" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>История импорта</CardTitle>
                <CardDescription>Все выполненные импорты данных</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      service: 'Trello',
                      date: '5 декабря 2024, 14:30',
                      stats: { projects: 3, tasks: 45, users: 8 },
                      status: 'success'
                    },
                    {
                      service: 'Jira',
                      date: '1 декабря 2024, 10:15',
                      stats: { projects: 5, tasks: 127, users: 15 },
                      status: 'success'
                    },
                    {
                      service: 'Asana',
                      date: '28 ноября 2024, 16:45',
                      stats: { projects: 2, tasks: 34, users: 6 },
                      status: 'success'
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm">Импорт из {item.service}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right text-xs text-muted-foreground">
                          <p>{item.stats.projects} проектов</p>
                          <p>{item.stats.tasks} задач</p>
                          <p>{item.stats.users} пользователей</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Настройки импорта</CardTitle>
                <CardDescription>Параметры импорта данных из внешних систем</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Автоматическая синхронизация</p>
                      <p className="text-xs text-muted-foreground">
                        Периодическое обновление данных из подключенных систем
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Настроить
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Сопоставление полей</p>
                      <p className="text-xs text-muted-foreground">
                        Настройка соответствия полей при импорте
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Настроить
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Обработка конфликтов</p>
                      <p className="text-xs text-muted-foreground">
                        Действия при обнаружении дублирующихся данных
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Настроить
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm">Уведомления об импорте</p>
                      <p className="text-xs text-muted-foreground">
                        Получать уведомления о завершении импорта
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Настроить
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="rounded-lg bg-yellow-50 border border-yellow-200 p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm text-yellow-900">Безопасность данных</h4>
                        <p className="text-xs text-yellow-800 mt-1">
                          Все API ключи и токены хранятся в зашифрованном виде. Мы не имеем доступа к вашим учетным данным.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}