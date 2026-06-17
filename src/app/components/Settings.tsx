import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Settings as SettingsIcon, Bell, Users, Database, Zap, Shield, Palette } from "lucide-react";

export function Settings() {
  const handleSave = () => {
    alert("Настройки сохранены");
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className="mb-8">
          <h1 className="mb-2">Настройки</h1>
          <p className="text-muted-foreground">
            Управление системой и интеграциями
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">Общие</TabsTrigger>
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            <TabsTrigger value="integrations">Интеграции</TabsTrigger>
            <TabsTrigger value="team">Команда</TabsTrigger>
            <TabsTrigger value="security">Безопасность</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Основные настройки</CardTitle>
                <CardDescription>
                  Настройте основные параметры системы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="workspace-name" className="text-sm">Название рабочего пространства</label>
                  <Input id="workspace-name" defaultValue="ПроектПро" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="language" className="text-sm">Язык интерфейса</label>
                  <SimpleSelect defaultValue="Русский">
                    <SimpleSelectTrigger id="language">
                      <SimpleSelectValue />
                    </SimpleSelectTrigger>
                    <SimpleSelectContent>
                      <SimpleSelectItem value="Русский">Русский</SimpleSelectItem>
                      <SimpleSelectItem value="English">English</SimpleSelectItem>
                    </SimpleSelectContent>
                  </SimpleSelect>
                </div>
                <div className="space-y-2">
                  <label htmlFor="timezone" className="text-sm">Часовой пояс</label>
                  <SimpleSelect defaultValue="Москва (MSK)">
                    <SimpleSelectTrigger id="timezone">
                      <SimpleSelectValue />
                    </SimpleSelectTrigger>
                    <SimpleSelectContent>
                      <SimpleSelectItem value="Москва (MSK)">Москва (MSK)</SimpleSelectItem>
                      <SimpleSelectItem value="Санкт-Петербург">Санкт-Петербург</SimpleSelectItem>
                      <SimpleSelectItem value="Новосибирск">Новосибирск</SimpleSelectItem>
                    </SimpleSelectContent>
                  </SimpleSelect>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm">Темная тема</div>
                    <p className="text-sm text-muted-foreground">
                      Включить темное оформление интерфейса
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm">Компактный режим</div>
                    <p className="text-sm text-muted-foreground">
                      Уменьшить отступы для большей плотности
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
                <CardDescription>
                  Настройте, какие уведомления вы хотите получать
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm">Email уведомления</div>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления на электронную почту
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm">Push уведомления</div>
                    <p className="text-sm text-muted-foreground">
                      Показывать всплывающие уведомления в браузере
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm">Новые задачи</div>
                    <p className="text-sm text-muted-foreground">
                      Уведомления о назначенных задачах
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm">Комментарии</div>
                    <p className="text-sm text-muted-foreground">
                      Уведомления о новых комментариях
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm">Дедлайны</div>
                    <p className="text-sm text-muted-foreground">
                      Напоминания о приближающихся сроках
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm">Еженедельный отчет</div>
                    <p className="text-sm text-muted-foreground">
                      Сводка по проектам каждый понедельник
                    </p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  1С:Элемент
                  <Badge variant="secondary">Подключено</Badge>
                </CardTitle>
                <CardDescription>
                  Интеграция с системой 1С для синхронизации данных
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm">URL сервера 1С</label>
                  <Input defaultValue="https://1c.company.ru/api" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm">API ключ</label>
                  <Input type="password" defaultValue="••••••••••••••••" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm">Автоматическая синхронизация</div>
                    <p className="text-sm text-muted-foreground">
                      Синхронизировать данные каждый час
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button variant="outline">Проверить подключение</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Другие интеграции
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="text-sm">Telegram Bot</h4>
                    <p className="text-xs text-muted-foreground">
                      Получайте уведомления в Telegram
                    </p>
                  </div>
                  <Button variant="outline">Подключить</Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="text-sm">Slack</h4>
                    <p className="text-xs text-muted-foreground">
                      Интеграция с корпоративным Slack
                    </p>
                  </div>
                  <Button variant="outline">Подключить</Button>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <h4 className="text-sm">GitLab</h4>
                    <p className="text-xs text-muted-foreground">
                      Связать задачи с репозиториями
                    </p>
                  </div>
                  <Button variant="outline">Подключить</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Участники команды</CardTitle>
                    <CardDescription>
                      Управление доступом и ролями
                    </CardDescription>
                  </div>
                  <Button>Пригласить участника</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Анна Петрова', 'Иван Смирнов', 'Мария Козлова', 'Петр Волков', 'Елена Новикова'].map((name, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <Users className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm">{name}</p>
                          <p className="text-xs text-muted-foreground">
                            {index === 0 ? 'Администратор' : index === 1 ? 'Менеджер' : 'Разработчик'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          {index === 0 ? 'Владелец' : 'Участник'}
                        </Badge>
                        <Button variant="ghost" size="sm">Изменить</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Безопасность
                </CardTitle>
                <CardDescription>
                  Настройки безопасности и доступа
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm">Двухфакторная аутентификация</div>
                    <p className="text-sm text-muted-foreground">
                      Дополнительная защита вашего аккаунта
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="text-sm">Автоматический выход</div>
                    <p className="text-sm text-muted-foreground">
                      Выход после 30 минут неактивности
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="text-sm">Активные сессии</div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm">MacBook Pro (текущая)</p>
                        <p className="text-xs text-muted-foreground">Москва, Россия</p>
                      </div>
                      <Badge variant="secondary">Активна</Badge>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="text-sm">iPhone 14</p>
                        <p className="text-xs text-muted-foreground">Москва, Россия</p>
                      </div>
                      <Button variant="ghost" size="sm">Завершить</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-end gap-4">
          <Button variant="outline">Отмена</Button>
          <Button onClick={handleSave}>Сохранить изменения</Button>
        </div>
      </div>
    </div>
  );
}
