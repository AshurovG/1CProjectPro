import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { SimpleProgress } from "./SimpleProgress";
import { TrendingUp, TrendingDown, Users, Clock, CheckCircle2, Target, Zap, Workflow, BarChart3, FileText, Download, Calendar as CalendarIcon, DollarSign, AlertCircle, Activity, GanttChartSquare } from "lucide-react";
import { View } from "../App";
import { Button } from "./ui/button";
import { GanttChart } from "./GanttChart";

interface AnalyticsProps {
  projectId: string | null;
  currentView: View;
}

const teamPerformance = [
  { name: 'Ильмира Хайруллова', tasks: 28, efficiency: 98, role: 'PM' },
  { name: 'Иван Смирнов', tasks: 24, efficiency: 96, role: 'Dev' },
  { name: 'Мария Козлова', tasks: 22, efficiency: 94, role: 'Design' },
  { name: 'Петр Волков', tasks: 20, efficiency: 92, role: 'Dev' },
  { name: 'Елена Новикова', tasks: 18, efficiency: 98, role: 'QA' },
];

const monthlyData = [
  { month: 'Май', completed: 45, inProgress: 23, planned: 12 },
  { month: 'Июнь', completed: 52, inProgress: 28, planned: 15 },
  { month: 'Июль', completed: 61, inProgress: 25, planned: 18 },
  { month: 'Август', completed: 58, inProgress: 30, planned: 20 },
  { month: 'Сентябрь', completed: 68, inProgress: 27, planned: 16 },
  { month: 'Октябрь', completed: 72, inProgress: 32, planned: 22 },
];

const kpis = [
  {
    title: "Эффективность команды",
    value: "94%",
    change: "+5.2%",
    trend: "up",
    icon: Target,
    color: "text-green-600",
  },
  {
    title: "Средняя скорость",
    value: "45",
    change: "+8.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    title: "Время на задачу",
    value: "2.3д",
    change: "-12%",
    trend: "down",
    icon: Clock,
    color: "text-purple-600",
  },
  {
    title: "Завершено в срок",
    value: "87%",
    change: "+3.5%",
    trend: "up",
    icon: CheckCircle2,
    color: "text-orange-600",
  },
];

const scrumMetrics = [
  { sprint: 'Спринт 1', velocity: 45, planned: 40, completed: 38 },
  { sprint: 'Спринт 2', velocity: 48, planned: 45, completed: 45 },
  { sprint: 'Спринт 3', velocity: 52, planned: 50, completed: 50 },
];

const waterfallPhases = [
  { phase: 'Анализ', planned: 15, actual: 14, status: 'completed' },
  { phase: 'Проектирование', planned: 20, actual: 22, status: 'completed' },
  { phase: 'Разработка', planned: 40, actual: 28, status: 'in-progress' },
  { phase: 'Тестирование', planned: 15, actual: 0, status: 'pending' },
  { phase: 'Внедрение', planned: 10, actual: 0, status: 'pending' },
];

const clientMilestones = [
  { 
    name: 'Прототип интерфейса',
    deadline: '15 мая 2024',
    status: 'completed',
    description: 'Разработка и согласование дизайна пользовательского интерфейса'
  },
  { 
    name: 'Базовая функциональность',
    deadline: '30 июня 2024',
    status: 'completed',
    description: 'Реализация основных функций системы'
  },
  { 
    name: 'Интеграция с 1С',
    deadline: '15 августа 2024',
    status: 'in-progress',
    description: 'Подключение и настройка интеграции с 1С:Элемент'
  },
  { 
    name: 'Бета-тестирование',
    deadline: '30 сентября 2024',
    status: 'pending',
    description: 'Тестирование системы на реальных данных'
  },
  { 
    name: 'Релиз продукта',
    deadline: '31 октября 2024',
    status: 'pending',
    description: 'Финальный запуск и передача системы'
  },
];

const budgetData = [
  { category: 'Разработка', planned: 2500000, actual: 2100000, percent: 84 },
  { category: 'Дизайн', planned: 800000, actual: 750000, percent: 94 },
  { category: 'Тестирование', planned: 600000, actual: 450000, percent: 75 },
  { category: 'Инфраструктура', planned: 400000, actual: 380000, percent: 95 },
];

const qualityMetrics = [
  { metric: 'Покрытие тестами', value: 87, target: 85, status: 'good' },
  { metric: 'Технический долг', value: 12, target: 15, status: 'good' },
  { metric: 'Критические баги', value: 2, target: 5, status: 'good' },
  { metric: 'Время ревью кода', value: 4.2, target: 6, status: 'good' },
];

const resourceUtilization = [
  { resource: 'Разработчики', allocated: 5, utilized: 4.8, utilization: 96 },
  { resource: 'Дизайнеры', allocated: 2, utilized: 1.9, utilization: 95 },
  { resource: 'QA специалисты', allocated: 2, utilized: 2, utilization: 100 },
  { resource: 'DevOps', allocated: 1, utilized: 0.7, utilization: 70 },
];

// Данные для диаграммы Ганта
const ganttTasks = [
  {
    id: 1,
    name: 'Инициация проекта',
    assignee: 'Ильмира Хайруллова',
    start: new Date(2024, 4, 1), // 1 мая
    end: new Date(2024, 4, 7),
    progress: 100,
    status: 'completed',
    dependencies: []
  },
  {
    id: 2,
    name: 'Проектирование архитектуры',
    assignee: 'Иван Смирнов',
    start: new Date(2024, 4, 8),
    end: new Date(2024, 4, 28),
    progress: 100,
    status: 'completed',
    dependencies: [1]
  },
  {
    id: 3,
    name: 'Дизайн интерфейсов',
    assignee: 'Мария Козлова',
    start: new Date(2024, 4, 15),
    end: new Date(2024, 5, 10),
    progress: 100,
    status: 'completed',
    dependencies: [1]
  },
  {
    id: 4,
    name: 'Разработка Backend',
    assignee: 'Петр Волков',
    start: new Date(2024, 5, 1),
    end: new Date(2024, 6, 25),
    progress: 75,
    status: 'in-progress',
    dependencies: [2]
  },
  {
    id: 5,
    name: 'Разработка Frontend',
    assignee: 'Иван Смирнов',
    start: new Date(2024, 5, 11),
    end: new Date(2024, 7, 5),
    progress: 60,
    status: 'in-progress',
    dependencies: [3]
  },
  {
    id: 6,
    name: 'Интеграция с 1С',
    assignee: 'Петр Волков',
    start: new Date(2024, 6, 26),
    end: new Date(2024, 7, 15),
    progress: 40,
    status: 'in-progress',
    dependencies: [4]
  },
  {
    id: 7,
    name: 'Тестирование системы',
    assignee: 'Елена Новикова',
    start: new Date(2024, 7, 6),
    end: new Date(2024, 8, 15),
    progress: 20,
    status: 'in-progress',
    dependencies: [5]
  },
  {
    id: 8,
    name: 'Бета-тестирование',
    assignee: 'Ильмира Хайруллова',
    start: new Date(2024, 8, 16),
    end: new Date(2024, 8, 30),
    progress: 0,
    status: 'pending',
    dependencies: [6, 7]
  },
  {
    id: 9,
    name: 'Подготовка к релизу',
    assignee: 'Ильмира Хайруллова',
    start: new Date(2024, 9, 1),
    end: new Date(2024, 9, 15),
    progress: 0,
    status: 'pending',
    dependencies: [8]
  },
  {
    id: 10,
    name: 'Релиз и внедрение',
    assignee: 'Вся команда',
    start: new Date(2024, 9, 16),
    end: new Date(2024, 9, 31),
    progress: 0,
    status: 'pending',
    dependencies: [9]
  },
];

export function Analytics({ projectId, currentView }: AnalyticsProps) {
  const maxCompleted = Math.max(...monthlyData.map(d => d.completed));
  const isAgileView = currentView === 'kanban' || currentView === 'scrum';
  const isScrumView = currentView === 'scrum';
  const isWaterfallView = currentView === 'waterfall';

  const handleExportReport = () => {
    console.log('Экспорт отчета для заказчика');
  };

  return (
    <div className="h-full overflow-auto">
      <div className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="mb-2">Аналитика и отчеты</h1>
            <p className="text-muted-foreground">
              Детальная статистика по проектам и эффективности команды
            </p>
          </div>
          <div className="flex gap-2">
            {isAgileView && (
              <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
                {isScrumView ? <Zap className="h-4 w-4 text-primary" /> : <Workflow className="h-4 w-4 text-primary" />}
                <span className="text-sm">{isScrumView ? 'Scrum проект' : 'Kanban проект'}</span>
              </div>
            )}
            {isWaterfallView && (
              <div className="flex items-center gap-2 rounded-lg bg-green-500/10 px-3 py-2">
                <BarChart3 className="h-4 w-4 text-green-600" />
                <span className="text-sm">Waterfall проект</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">{kpi.title}</CardTitle>
                <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="mb-1">{kpi.value}</div>
                <div className="flex items-center gap-1 text-xs">
                  {kpi.trend === 'up' ? (
                    <TrendingUp className="h-3 w-3 text-green-600" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-green-600" />
                  )}
                  <span className="text-green-600">{kpi.change}</span>
                  <span className="text-muted-foreground">за месяц</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="gantt">
              <GanttChartSquare className="h-4 w-4 mr-1" />
              Диаграмма Ганта
            </TabsTrigger>
            <TabsTrigger value="team">Команда</TabsTrigger>
            <TabsTrigger value="client">Отчет для заказчика</TabsTrigger>
            <TabsTrigger value="budget">Бюджет</TabsTrigger>
            <TabsTrigger value="quality">Качество</TabsTrigger>
            <TabsTrigger value="resources">Ресурсы</TabsTrigger>
            {isScrumView && <TabsTrigger value="sprints">Спринты</TabsTrigger>}
            {isWaterfallView && <TabsTrigger value="phases">Фазы</TabsTrigger>}
            {isAgileView && <TabsTrigger value="velocity">Скорость</TabsTrigger>}
            <TabsTrigger value="tasks">Задачи</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Выполнение задач по месяцам</CardTitle>
                <CardDescription>Динамика выполнения задач</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data) => (
                    <div key={data.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{data.month}</span>
                        <span className="text-muted-foreground">
                          {data.completed + data.inProgress + data.planned} задач
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div
                          className="h-8 bg-green-500 rounded-l transition-all"
                          style={{ width: `${(data.completed / maxCompleted) * 60}%` }}
                          title={`Выполнено: ${data.completed}`}
                        />
                        <div
                          className="h-8 bg-blue-500 transition-all"
                          style={{ width: `${(data.inProgress / maxCompleted) * 60}%` }}
                          title={`В работе: ${data.inProgress}`}
                        />
                        <div
                          className="h-8 bg-gray-400 rounded-r transition-all"
                          style={{ width: `${(data.planned / maxCompleted) * 60}%` }}
                          title={`Запланировано: ${data.planned}`}
                        />
                      </div>
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded bg-green-500" />
                          Выполнено: {data.completed}
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded bg-blue-500" />
                          В работе: {data.inProgress}
                        </span>
                        <span className="flex items-center gap-1">
                          <div className="h-3 w-3 rounded bg-gray-400" />
                          Планируется: {data.planned}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Распределение задач</CardTitle>
                  <CardDescription>По типам работ</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Разработка</span>
                      <span>45%</span>
                    </div>
                    <SimpleProgress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Дизайн</span>
                      <span>25%</span>
                    </div>
                    <SimpleProgress value={25} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Тестирование</span>
                      <span>18%</span>
                    </div>
                    <SimpleProgress value={18} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Документация</span>
                      <span>12%</span>
                    </div>
                    <SimpleProgress value={12} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Скорость спринта</CardTitle>
                  <CardDescription>Story points по неделям</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { week: 'Неделя 1', velocity: 34 },
                    { week: 'Неделя 2', velocity: 42 },
                    { week: 'Неделя 3', velocity: 38 },
                    { week: 'Неделя 4', velocity: 45 },
                    { week: 'Неделя 5', velocity: 48 },
                    { week: 'Неделя 6', velocity: 52 },
                  ].map((item) => (
                    <div key={item.week} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.week}</span>
                        <span>{item.velocity} points</span>
                      </div>
                      <SimpleProgress value={(item.velocity / 60) * 100} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="gantt" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Диаграмма Ганта</CardTitle>
                <CardDescription>Временная шкала и прогресс выполнения задач проекта</CardDescription>
              </CardHeader>
              <CardContent>
                <GanttChart tasks={ganttTasks as any} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Производительность команды</CardTitle>
                <CardDescription>Статистика по каждому участнику</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamPerformance.map((member) => (
                    <div key={member.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.tasks} задач · {member.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">{member.efficiency}%</p>
                          <p className="text-xs text-muted-foreground">эффективность</p>
                        </div>
                      </div>
                      <SimpleProgress value={member.efficiency} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="client" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Отчет для заказчика</CardTitle>
                    <CardDescription>Статус выполнения проекта и ключевые показатели</CardDescription>
                  </div>
                  <Button onClick={handleExportReport}>
                    <Download className="mr-2 h-4 w-4" />
                    Экспортировать PDF
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <CalendarIcon className="h-4 w-4" />
                      Прогресс проекта
                    </div>
                    <div className="mb-2">68%</div>
                    <SimpleProgress value={68} className="h-2" />
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <DollarSign className="h-4 w-4" />
                      Освоение бюджета
                    </div>
                    <div className="mb-2">3 680 000 ₽ / 4 300 000 ₽</div>
                    <SimpleProgress value={86} className="h-2" />
                  </div>
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Activity className="h-4 w-4" />
                      Качество
                    </div>
                    <div className="mb-2 text-green-600">Высокое</div>
                    <p className="text-xs text-muted-foreground">Все показатели в норме</p>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4">Ключевые этапы</h4>
                  <div className="space-y-3">
                    {clientMilestones.map((milestone, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="text-sm">{milestone.name}</h5>
                              <div className={`px-2 py-0.5 rounded text-xs ${
                                milestone.status === 'completed' ? 'bg-green-100 text-green-800' :
                                milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {milestone.status === 'completed' ? 'Завершено' :
                                 milestone.status === 'in-progress' ? 'В процессе' : 'Запланировано'}
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">{milestone.description}</p>
                          </div>
                          <div className="text-xs text-muted-foreground ml-4 flex items-center gap-1">
                            <CalendarIcon className="h-3 w-3" />
                            {milestone.deadline}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-4">Текущие риски и проблемы</h4>
                  <div className="space-y-2">
                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm">Интеграция с 1С:Элемент</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Требуется дополнительное согласование технических требований с отделом заказчика
                          </p>
                          <p className="text-xs text-yellow-700 mt-2">
                            Статус: В работе • Влияние: Среднее • Срок решения: 2 недели
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-4">Рекомендации</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Проект идет в соответствии с планом, все ключевые метрики в пределах нормы</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Рекомендуем провести демонстрацию текущих результатов заказчику на следующей неделе</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>Планируется начало бета-тестирования в срок</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Освоение бюджета</CardTitle>
                <CardDescription>Плановые и фактические расходы по категориям</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetData.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.category}</span>
                        <span className="text-muted-foreground">
                          {item.actual.toLocaleString()} ₽ / {item.planned.toLocaleString()} ₽
                        </span>
                      </div>
                      <SimpleProgress value={item.percent} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Освоено {item.percent}% от плана
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <span>Итого</span>
                    <div className="text-right">
                      <p className="text-sm">3 680 000 ₽ / 4 300 000 ₽</p>
                      <p className="text-xs text-green-600">Экономия: 620 000 ₽ (14%)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Метрики качества</CardTitle>
                <CardDescription>Показатели качества разработки и тестирования</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qualityMetrics.map((item) => (
                    <div key={item.metric} className="rounded-lg border p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">{item.metric}</span>
                        <div className={`px-2 py-1 rounded text-xs ${
                          item.status === 'good' ? 'bg-green-100 text-green-800' :
                          item.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.status === 'good' ? 'Норма' : 
                           item.status === 'warning' ? 'Внимание' : 'Критично'}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground">Текущее</p>
                          <p>{item.value}{item.metric.includes('Время') ? ' ч' : item.metric.includes('долг') || item.metric.includes('баги') ? '' : '%'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Целевое</p>
                          <p>{item.target}{item.metric.includes('Время') ? ' ч' : item.metric.includes('долг') || item.metric.includes('баги') ? '' : '%'}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Использование ресурсов</CardTitle>
                <CardDescription>Загрузка команды и эффективность использования</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceUtilization.map((resource) => (
                    <div key={resource.resource} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>{resource.resource}</span>
                        <span className="text-muted-foreground">
                          {resource.utilized} / {resource.allocated} чел.
                        </span>
                      </div>
                      <SimpleProgress value={resource.utilization} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        Утилизация: {resource.utilization}%
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    Средняя утилизация команды: <strong>90%</strong>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {isScrumView && (
            <TabsContent value="sprints" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>История спринтов</CardTitle>
                  <CardDescription>Метрики производительности по спринтам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scrumMetrics.map((sprint) => (
                      <div key={sprint.sprint} className="space-y-2 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm">{sprint.sprint}</h4>
                          <div className="flex gap-4 text-sm">
                            <span className="text-muted-foreground">Velocity: <strong>{sprint.velocity} SP</strong></span>
                          </div>
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                          <div>
                            <p className="mb-1 text-xs text-muted-foreground">Запланировано</p>
                            <SimpleProgress value={(sprint.planned / 60) * 100} className="h-2" />
                            <p className="mt-1 text-xs">{sprint.planned} SP</p>
                          </div>
                          <div>
                            <p className="mb-1 text-xs text-muted-foreground">Завершено</p>
                            <SimpleProgress value={(sprint.completed / 60) * 100} className="h-2" />
                            <p className="mt-1 text-xs">{sprint.completed} SP</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {isWaterfallView && (
            <TabsContent value="phases" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Выполнение фаз проекта</CardTitle>
                  <CardDescription>Плановое и фактическое время по фазам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {waterfallPhases.map((phase) => (
                      <div key={phase.phase} className="space-y-2 rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm">{phase.phase}</h4>
                          <div className={`px-2 py-1 rounded text-xs ${
                            phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                            phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {phase.status === 'completed' ? 'Завершено' :
                             phase.status === 'in-progress' ? 'В процессе' : 'Ожидание'}
                          </div>
                        </div>
                        <div className="grid gap-2 md:grid-cols-2">
                          <div>
                            <p className="mb-1 text-xs text-muted-foreground">План (дни)</p>
                            <p className="text-sm">{phase.planned}</p>
                          </div>
                          <div>
                            <p className="mb-1 text-xs text-muted-foreground">Факт (дни)</p>
                            <p className="text-sm">{phase.actual || '-'}</p>
                          </div>
                        </div>
                        {phase.actual > 0 && (
                          <div className="mt-2">
                            <p className="mb-1 text-xs text-muted-foreground">Прогресс</p>
                            <SimpleProgress 
                              value={phase.status === 'completed' ? 100 : (phase.actual / phase.planned) * 100} 
                              className="h-2" 
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="velocity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Скорость команды</CardTitle>
                <CardDescription>Метрики производительности</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Текущая скорость</span>
                    <span>52 points/неделя</span>
                  </div>
                  <SimpleProgress value={87} className="h-3" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Средняя скорость</span>
                    <span>40 points/неделя</span>
                  </div>
                  <SimpleProgress value={67} className="h-3" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Прогресс к цели</span>
                    <span>94%</span>
                  </div>
                  <SimpleProgress value={94} className="h-3" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Всего задач</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">247</div>
                  <p className="text-xs text-muted-foreground">+18 за последнюю неделю</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Среднее время выполнения</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">2.3 дня</div>
                  <p className="text-xs text-green-600">-0.4 дня улучшение</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Процент выполнения</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">87%</div>
                  <p className="text-xs text-green-600">+3.5% рост</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}