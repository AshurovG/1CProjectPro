import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Database,
  Settings,
  Download,
  Upload,
  Activity,
  Clock,
  Shield,
  Link as LinkIcon,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function Integration1C() {
  const [isConnected, setIsConnected] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 2000);
  };

  const syncHistory = [
    {
      id: 1,
      timestamp: "2025-11-13 14:30:25",
      type: "auto",
      status: "success",
      recordsProcessed: 245,
      module: "1С:Бухгалтерия",
    },
    {
      id: 2,
      timestamp: "2025-11-13 14:15:12",
      type: "auto",
      status: "success",
      recordsProcessed: 189,
      module: "1С:Элемент",
    },
    {
      id: 3,
      timestamp: "2025-11-13 14:00:08",
      type: "manual",
      status: "success",
      recordsProcessed: 312,
      module: "1С:Бухгалтерия",
    },
    {
      id: 4,
      timestamp: "2025-11-13 13:45:33",
      type: "auto",
      status: "error",
      recordsProcessed: 0,
      module: "1С:Зарплата",
      error: "Ошибка подключения к базе данных",
    },
    {
      id: 5,
      timestamp: "2025-11-13 13:30:45",
      type: "auto",
      status: "success",
      recordsProcessed: 156,
      module: "1С:Элемент",
    },
  ];

  const connectedModules = [
    {
      name: "1С:Бухгалтерия",
      version: "3.0.129",
      status: "active",
      lastSync: "10 минут назад",
      database: "accounting_db",
      entities: ["Проводки", "Счета", "Контрагенты", "Документы"],
    },
    {
      name: "1С:Элемент",
      version: "2.5.14",
      status: "active",
      lastSync: "15 минут назад",
      database: "element_db",
      entities: ["Проекты", "Задачи", "Сотрудники"],
    },
    {
      name: "1С:Зарплата и управление персоналом",
      version: "3.1.24",
      status: "warning",
      lastSync: "30 минут назад",
      database: "hrms_db",
      entities: ["Сотрудники", "Начисления", "Табель"],
    },
  ];

  const financialMappings = [
    {
      id: 1,
      projectField: "Бюджет проекта",
      c1Field: "Статья затрат 'Проекты'",
      direction: "bidirectional",
      syncFrequency: "Каждые 15 минут",
    },
    {
      id: 2,
      projectField: "Фактические затраты",
      c1Field: "Проводки по счету 26",
      direction: "from_1c",
      syncFrequency: "Каждые 15 минут",
    },
    {
      id: 3,
      projectField: "Доходы проекта",
      c1Field: "Проводки по счету 90",
      direction: "from_1c",
      syncFrequency: "Каждые 15 минут",
    },
    {
      id: 4,
      projectField: "Задачи проекта",
      c1Field: "Элемент: Задачи",
      direction: "bidirectional",
      syncFrequency: "В реальном времени",
    },
    {
      id: 5,
      projectField: "Команда проекта",
      c1Field: "ЗУП: Сотрудники",
      direction: "from_1c",
      syncFrequency: "Ежедневно",
    },
  ];

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Header */}
      <div className="border-b bg-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-neutral-900">Интеграция с 1С</h1>
            <p className="text-neutral-600 mt-1">
              Управление подключениями и синхронизацией данных с системами 1С
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleSync} disabled={syncing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Синхронизация...' : 'Синхронизировать'}
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Экспорт настроек
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {/* Connection Status */}
        <Card className={`mb-6 ${isConnected ? 'border-green-200 bg-green-50' : 'border-orange-200 bg-orange-50'}`}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {isConnected ? (
                <CheckCircle2 className="h-6 w-6 text-green-600 mt-1" />
              ) : (
                <AlertCircle className="h-6 w-6 text-orange-600 mt-1" />
              )}
              <div className="flex-1">
                <h3 className="text-neutral-900 mb-1">
                  {isConnected ? 'Интеграция активна' : 'Требуется настройка подключения'}
                </h3>
                <p className="text-neutral-600">
                  {isConnected
                    ? 'Все модули 1С успешно подключены и работают в штатном режиме. Последняя синхронизация: 10 минут назад.'
                    : 'Для начала работы необходимо настроить подключение к базам данных 1С.'}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-neutral-500">Автосинхронизация</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                    <span className="text-neutral-900">{autoSync ? 'Вкл' : 'Выкл'}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="modules" className="space-y-6">
          <TabsList>
            <TabsTrigger value="modules">
              <Database className="h-4 w-4 mr-2" />
              Подключенные модули
            </TabsTrigger>
            <TabsTrigger value="mappings">
              <LinkIcon className="h-4 w-4 mr-2" />
              Связи данных
            </TabsTrigger>
            <TabsTrigger value="history">
              <Activity className="h-4 w-4 mr-2" />
              История синхронизации
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid gap-6">
              {connectedModules.map((module) => (
                <Card key={module.name}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Database className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-neutral-900">{module.name}</CardTitle>
                          <CardDescription className="mt-1">
                            Версия {module.version} • База данных: {module.database}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {module.status === 'active' ? (
                          <Badge className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Активно
                          </Badge>
                        ) : (
                          <Badge className="bg-orange-50 text-orange-700 border-orange-200">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Требует внимания
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-neutral-600">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Последняя синхронизация: {module.lastSync}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Синхронизировать
                        </Button>
                      </div>

                      <div>
                        <p className="text-neutral-600 mb-2">Синхронизируемые сущности:</p>
                        <div className="flex flex-wrap gap-2">
                          {module.entities.map((entity) => (
                            <Badge key={entity} variant="outline">
                              {entity}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4 mr-2" />
                          Настроить
                        </Button>
                        <Button variant="outline" size="sm">
                          <Shield className="h-4 w-4 mr-2" />
                          Проверить подключение
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Добавить новый модуль</CardTitle>
                <CardDescription>Подключите дополнительные модули 1С для расширения функциональности</CardDescription>
              </CardHeader>
              <CardContent>
                <Button>
                  <Database className="h-4 w-4 mr-2" />
                  Добавить модуль 1С
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mappings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Связи финансовых данных</CardTitle>
                <CardDescription>
                  Настройка соответствия между полями ПроектПро и 1С для автоматической синхронизации
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Поле в ПроектПро</TableHead>
                      <TableHead>Поле в 1С</TableHead>
                      <TableHead>Направление</TableHead>
                      <TableHead>Частота синхронизации</TableHead>
                      <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {financialMappings.map((mapping) => (
                      <TableRow key={mapping.id}>
                        <TableCell>{mapping.projectField}</TableCell>
                        <TableCell className="text-neutral-600">{mapping.c1Field}</TableCell>
                        <TableCell>
                          {mapping.direction === 'bidirectional' ? (
                            <Badge variant="outline">
                              <Upload className="h-3 w-3 mr-1" />
                              <Download className="h-3 w-3 mr-1" />
                              Двусторонняя
                            </Badge>
                          ) : mapping.direction === 'from_1c' ? (
                            <Badge variant="outline">
                              <Download className="h-3 w-3 mr-1" />
                              Из 1С
                            </Badge>
                          ) : (
                            <Badge variant="outline">
                              <Upload className="h-3 w-3 mr-1" />
                              В 1С
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-neutral-600">{mapping.syncFrequency}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            Изменить
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Добавить новую связь</CardTitle>
                <CardDescription>Настройте синхронизацию дополнительных полей</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project-field">Поле в ПроектПро</Label>
                    <Select>
                      <SelectTrigger id="project-field">
                        <SelectValue placeholder="Выберите поле" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">Бюджет проекта</SelectItem>
                        <SelectItem value="expenses">Фактические затраты</SelectItem>
                        <SelectItem value="revenue">Доходы</SelectItem>
                        <SelectItem value="team">Команда</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="c1-field">Поле в 1С</Label>
                    <Input id="c1-field" placeholder="Например: Счет 26" />
                  </div>
                </div>
                <Button className="mt-4">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Создать связь
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>История синхронизации</CardTitle>
                <CardDescription>Журнал всех операций синхронизации с 1С</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата и время</TableHead>
                      <TableHead>Модуль 1С</TableHead>
                      <TableHead>Тип</TableHead>
                      <TableHead>Записей обработано</TableHead>
                      <TableHead>Статус</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {syncHistory.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="text-neutral-900">{record.timestamp}</TableCell>
                        <TableCell className="text-neutral-600">{record.module}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {record.type === 'auto' ? 'Автоматическая' : 'Ручная'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-neutral-600">{record.recordsProcessed}</TableCell>
                        <TableCell>
                          {record.status === 'success' ? (
                            <Badge className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Успешно
                            </Badge>
                          ) : (
                            <Badge className="bg-red-50 text-red-700 border-red-200">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Ошибка
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Общие настройки синхронизации</CardTitle>
                <CardDescription>Параметры автоматической синхронизации данных</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-900">Автоматическая синхронизация</p>
                    <p className="text-neutral-500">Включить периодическую синхронизацию данных</p>
                  </div>
                  <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                </div>

                <div>
                  <Label htmlFor="sync-interval">Интервал синхронизации</Label>
                  <Select defaultValue="15">
                    <SelectTrigger id="sync-interval">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Каждые 5 минут</SelectItem>
                      <SelectItem value="15">Каждые 15 минут</SelectItem>
                      <SelectItem value="30">Каждые 30 минут</SelectItem>
                      <SelectItem value="60">Каждый час</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-900">Синхронизация в реальном времени</p>
                    <p className="text-neutral-500">Немедленная синхронизация при изменении данных</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-neutral-900">Уведомления об ошибках</p>
                    <p className="text-neutral-500">Отправлять уведомления при сбоях синхронизации</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Безопасность и доступ</CardTitle>
                <CardDescription>Настройки безопасности подключения к 1С</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="api-key">API ключ 1С</Label>
                  <Input id="api-key" type="password" value="••••••••••••••••" readOnly />
                  <p className="text-neutral-500 mt-1">Используется для аутентификации при подключении</p>
                </div>

                <div>
                  <Label htmlFor="connection-string">Строка подключения</Label>
                  <Input
                    id="connection-string"
                    type="password"
                    value="••••••••••••••••••••••••"
                    readOnly
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Обновить ключи
                  </Button>
                  <Button variant="outline">
                    <Shield className="h-4 w-4 mr-2" />
                    Тест подключения
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}