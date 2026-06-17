import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
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
  Wallet,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from "recharts";

interface FinancialReportsProps {
  projectId: string | null;
}

// Мок-данные для финансовых показателей
const financialData = {
  "project-1": {
    name: "Разработка Web платформы",
    budget: {
      planned: 5000000,
      spent: 3400000,
      remaining: 1600000,
      variance: -200000, // Перерасход
    },
    revenue: {
      expected: 8500000,
      current: 2100000,
      projected: 9200000,
    },
    costs: {
      personnel: 2400000,
      infrastructure: 600000,
      marketing: 200000,
      other: 200000,
    },
    roi: 84, // %
    npv: 3200000, // Чистая приведенная стоимость
    irr: 28.5, // Внутренняя норма доходности %
    paybackPeriod: 18, // месяцы
    breakEvenPoint: "Март 2026",
    lastSync: "10 минут назад",
  },
  "project-2": {
    name: "Маркетинговая кампания Q4",
    budget: {
      planned: 2500000,
      spent: 1125000,
      remaining: 1375000,
      variance: 50000, // Экономия
    },
    revenue: {
      expected: 4200000,
      current: 1500000,
      projected: 4800000,
    },
    costs: {
      personnel: 500000,
      advertising: 400000,
      marketing: 150000,
      other: 75000,
    },
    roi: 92,
    npv: 1800000,
    irr: 35.2,
    paybackPeriod: 12,
    breakEvenPoint: "Январь 2026",
    lastSync: "5 минут назад",
  },
};

const monthlyBudgetData = [
  { month: "Янв", planned: 400000, actual: 420000, revenue: 300000 },
  { month: "Фев", planned: 450000, actual: 440000, revenue: 400000 },
  { month: "Мар", planned: 500000, actual: 510000, revenue: 550000 },
  { month: "Апр", planned: 550000, actual: 530000, revenue: 600000 },
  { month: "Май", planned: 600000, actual: 580000, revenue: 650000 },
  { month: "Июн", planned: 650000, actual: 640000, revenue: 700000 },
  { month: "Июл", planned: 700000, actual: 280000, revenue: 150000 },
];

const forecastData = [
  { month: "Июл", actual: 3400000, forecast: null },
  { month: "Авг", actual: null, forecast: 4000000 },
  { month: "Сен", actual: null, forecast: 4650000 },
  { month: "Окт", actual: null, forecast: 5300000 },
  { month: "Ноя", actual: null, forecast: 6100000 },
  { month: "Дек", actual: null, forecast: 7000000 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export function FinancialReports({ projectId }: FinancialReportsProps) {
  const [syncing, setSyncing] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projectId || "project-1");

  const project = financialData[selectedProjectId as keyof typeof financialData] || financialData["project-1"];

  if (!project) {
    return (
      <div className="p-8">
        <Card>
          <CardContent className="p-12 text-center">
            <Wallet className="mx-auto h-12 w-12 text-neutral-400 mb-4" />
            <p className="text-neutral-600">Выберите проект для просмотра финансовых отчетов</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSync1C = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
    }, 2000);
  };

  const costBreakdownData = Object.entries(project.costs).map(([key, value]) => ({
    name: key === 'personnel' ? 'Персонал' : 
          key === 'infrastructure' ? 'Инфраструктура' :
          key === 'advertising' ? 'Реклама' :
          key === 'marketing' ? 'Маркетинг' : 'Прочее',
    value: value,
  }));

  const budgetUtilization = (project.budget.spent / project.budget.planned) * 100;
  const revenueProgress = (project.revenue.current / project.revenue.expected) * 100;
  const isOverBudget = project.budget.variance < 0;

  return (
    <div className="flex flex-col h-full bg-neutral-50">
      {/* Header */}
      <div className="border-b bg-white px-8 py-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-neutral-900">Финансовые отчеты</h1>
              <Select value={selectedProjectId} onValueChange={setSelectedProjectId}>
                <SelectTrigger className="w-[300px]">
                  <SelectValue placeholder="Выберите проект" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="project-1">Разработка Web платформы</SelectItem>
                  <SelectItem value="project-2">Маркетинговая кампания Q4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-neutral-600">
              Просмотр финансовых показателей и отчетов проекта
            </p>
          </div>
          <div className="flex items-start gap-3 flex-shrink-0">
            <div className="flex flex-col items-end gap-1">
              <Button onClick={handleSync1C} disabled={syncing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Синхронизация...' : 'Синхронизировать'}
              </Button>
              <p className="text-xs text-muted-foreground whitespace-nowrap">
                Синхронизация: {project.lastSync}
              </p>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>ROI (Окупаемость)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <span className="text-neutral-900">{project.roi}%</span>
                <Badge variant={project.roi > 50 ? "default" : "secondary"} className="bg-green-50 text-green-700 border-green-200">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Отлично
                </Badge>
              </div>
              <p className="text-neutral-500 mt-2">Период окупаемости: {project.paybackPeriod} мес.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>NPV (Чистая стоимость)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <span className="text-neutral-900">
                  {(project.npv / 1000000).toFixed(1)} млн ₽
                </span>
                <ArrowUpRight className="h-5 w-5 text-green-600" />
              </div>
              <p className="text-neutral-500 mt-2">IRR: {project.irr}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Бюджет проекта</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <span className="text-neutral-900">
                  {(project.budget.spent / 1000000).toFixed(1)} / {(project.budget.planned / 1000000).toFixed(1)} млн ₽
                </span>
                {isOverBudget ? (
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                ) : (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                )}
              </div>
              <div className="mt-3">
                <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${isOverBudget ? 'bg-orange-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Точка безубыточности</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline justify-between">
                <span className="text-neutral-900">{project.breakEvenPoint}</span>
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <p className="text-neutral-500 mt-2">
                Прогноз выручки: {(project.revenue.projected / 1000000).toFixed(1)} млн ₽
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Budget Variance Alert */}
        {isOverBudget && (
          <Card className="mb-8 border-orange-200 bg-orange-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-orange-600 mt-1" />
                <div className="flex-1">
                  <h3 className="text-neutral-900 mb-1">Превышение бюджета</h3>
                  <p className="text-neutral-600">
                    Проект превысил плановый бюджет на {Math.abs(project.budget.variance).toLocaleString('ru-RU')} ₽. 
                    Рекомендуется пересмотреть затраты или согласовать дополнительное финансирование.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Пересмотреть бюджет
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">
              <BarChart3 className="h-4 w-4 mr-2" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="budget">
              <Wallet className="h-4 w-4 mr-2" />
              Бюджет
            </TabsTrigger>
            <TabsTrigger value="revenue">
              <TrendingUp className="h-4 w-4 mr-2" />
              Выручка
            </TabsTrigger>
            <TabsTrigger value="costs">
              <PieChart className="h-4 w-4 mr-2" />
              Расходы
            </TabsTrigger>
            <TabsTrigger value="forecast">
              <BarChart3 className="h-4 w-4 mr-2" />
              Прогноз
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Динамика бюджета по месяцам</CardTitle>
                  <CardDescription>Сравнение плановых и фактических затрат</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyBudgetData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" />
                      <YAxis stroke="#6b7280" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}
                        formatter={(value: number) => `${(value / 1000).toFixed(0)} тыс. ₽`}
                      />
                      <Legend />
                      <Bar dataKey="planned" fill="#3b82f6" name="План" />
                      <Bar dataKey="actual" fill="#10b981" name="Факт" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Структура расходов</CardTitle>
                  <CardDescription>Распределение затрат по категориям</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RePieChart>
                      <Pie
                        data={costBreakdownData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {costBreakdownData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => `${value.toLocaleString('ru-RU')} ₽`} />
                    </RePieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Выручка vs Затраты</CardTitle>
                <CardDescription>Сравнительный анализ финансовых потоков</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyBudgetData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}
                      formatter={(value: number) => `${(value / 1000).toFixed(0)} тыс. ₽`}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name="Выручка" />
                    <Line type="monotone" dataKey="actual" stroke="#3b82f6" strokeWidth={2} name="Затраты" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Плановый бюджет</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-900">{project.budget.planned.toLocaleString('ru-RU')} ₽</p>
                  <p className="text-neutral-500 mt-1">Утверждено</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Потрачено</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-900">{project.budget.spent.toLocaleString('ru-RU')} ₽</p>
                  <p className="text-neutral-500 mt-1">{budgetUtilization.toFixed(1)}% от плана</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Остаток</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-900">{project.budget.remaining.toLocaleString('ru-RU')} ₽</p>
                  <p className={`mt-1 ${isOverBudget ? 'text-orange-600' : 'text-green-600'}`}>
                    {isOverBudget ? 'Перерасход' : 'Экономия'}: {Math.abs(project.budget.variance).toLocaleString('ru-RU')} ₽
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Детализация бюджета</CardTitle>
                <CardDescription>Подробная информация о расходах по статьям</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Статья расходов</TableHead>
                      <TableHead className="text-right">План</TableHead>
                      <TableHead className="text-right">Факт</TableHead>
                      <TableHead className="text-right">Отклонение</TableHead>
                      <TableHead className="text-right">%</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(project.costs).map(([key, value]) => {
                      const planned = value * 1.1; // Примерный план
                      const variance = value - planned;
                      const percentage = (value / planned) * 100;
                      
                      return (
                        <TableRow key={key}>
                          <TableCell>
                            {key === 'personnel' ? 'Персонал' : 
                             key === 'infrastructure' ? 'Инфраструктура' :
                             key === 'advertising' ? 'Реклама' :
                             key === 'marketing' ? 'Маркетинг' : 'Прочие расходы'}
                          </TableCell>
                          <TableCell className="text-right">{planned.toLocaleString('ru-RU')} ₽</TableCell>
                          <TableCell className="text-right">{value.toLocaleString('ru-RU')} ₽</TableCell>
                          <TableCell className={`text-right ${variance < 0 ? 'text-green-600' : 'text-orange-600'}`}>
                            {variance > 0 ? '+' : ''}{variance.toLocaleString('ru-RU')} ₽
                          </TableCell>
                          <TableCell className="text-right">{percentage.toFixed(1)}%</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Ожидаемая выручка</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-900">{(project.revenue.expected / 1000000).toFixed(1)} млн ₽</p>
                  <p className="text-neutral-500 mt-1">По плану</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Текущая выручка</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-900">{(project.revenue.current / 1000000).toFixed(1)} млн ₽</p>
                  <p className="text-neutral-500 mt-1">{revenueProgress.toFixed(1)}% от плана</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Прогноз выручки</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-900">{(project.revenue.projected / 1000000).toFixed(1)} млн ₽</p>
                  <p className="text-green-600 mt-1">
                    +{(((project.revenue.projected - project.revenue.expected) / project.revenue.expected) * 100).toFixed(1)}% к плану
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>График выручки</CardTitle>
                <CardDescription>Помесячная динамика поступлений</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={monthlyBudgetData}>
                    <defs>
                      <linearGradient id="colorRevenueTab" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}
                      formatter={(value: number) => `${(value / 1000).toFixed(0)} тыс. ₽`}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10b981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenueTab)"
                      name="Выручка"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs" className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Распределение расходов</CardTitle>
                  <CardDescription>По категориям затрат</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costBreakdownData.map((item, index) => {
                      const total = costBreakdownData.reduce((sum, i) => sum + i.value, 0);
                      const percentage = (item.value / total) * 100;
                      
                      return (
                        <div key={item.name}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-neutral-900">{item.name}</span>
                            <span className="text-neutral-600">{item.value.toLocaleString('ru-RU')} ₽</span>
                          </div>
                          <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full"
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: COLORS[index % COLORS.length]
                              }}
                            />
                          </div>
                          <p className="text-neutral-500 mt-1">{percentage.toFixed(1)}% от общих затрат</p>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Топ затратных статей</CardTitle>
                  <CardDescription>Наибольшие расходы</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costBreakdownData
                      .sort((a, b) => b.value - a.value)
                      .map((item, index) => (
                        <div key={item.name} className="flex items-center gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center">
                            <span className="text-neutral-900">#{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-neutral-900">{item.name}</p>
                            <p className="text-neutral-500">{item.value.toLocaleString('ru-RU')} ₽</p>
                          </div>
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[costBreakdownData.indexOf(item) % COLORS.length] }}
                          />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Финансовый прогноз</CardTitle>
                <CardDescription>Прогнозируемая динамика затрат на ближайшие месяцы</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={forecastData}>
                    <defs>
                      <linearGradient id="colorActualForecastTab" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorForecastTab" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb' }}
                      formatter={(value: number) => `${(value / 1000000).toFixed(1)} млн ₽`}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#colorActualForecastTab)"
                      name="Фактические затраты"
                    />
                    <Area
                      type="monotone"
                      dataKey="forecast"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      fillOpacity={1}
                      fill="url(#colorForecastTab)" 
                      name="Прогноз"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Сценарий "Оптимистичный"</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Итоговые затраты:</span>
                    <span className="text-neutral-900">6.5 млн ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">ROI:</span>
                    <span className="text-green-600">+95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">NPV:</span>
                    <span className="text-green-600">3.8 млн ₽</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Сценарий "Реалистичный"</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Итоговые затраты:</span>
                    <span className="text-neutral-900">7.0 млн ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">ROI:</span>
                    <span className="text-green-600">+84%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">NPV:</span>
                    <span className="text-green-600">3.2 млн ₽</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Сценарий "Пессимистичный"</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Итоговые затраты:</span>
                    <span className="text-neutral-900">8.2 млн ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">ROI:</span>
                    <span className="text-orange-600">+62%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">NPV:</span>
                    <span className="text-orange-600">2.1 млн ₽</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Integration Info */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-neutral-900 mb-1">Интеграция с 1С:Бухгалтерия</h3>
                <p className="text-neutral-600 mb-3">
                  Финансовые данные автоматически синхронизируются с системой 1С:Бухгалтерия каждые 15 минут. 
                  Все расходы, доходы и бюджеты обновляются в реальном времени.
                </p>
                <div className="flex gap-4 text-neutral-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    <span>Подключено</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-blue-600" />
                    <span>Автосинхронизация включена</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Настроить интеграцию
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}