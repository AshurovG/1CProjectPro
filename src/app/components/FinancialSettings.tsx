import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  DollarSign,
  Calculator,
  TrendingUp,
  Settings,
  Save,
  Plus,
  Trash2,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";

interface FinancialSettingsProps {
  open: boolean;
  onClose: () => void;
  onSave: (settings: FinancialConfig) => void;
}

export interface FinancialConfig {
  budget: {
    total: number;
    currency: string;
    allocation: Array<{
      category: string;
      amount: number;
      percentage: number;
    }>;
  };
  revenue: {
    expectedTotal: number;
    sources: Array<{
      name: string;
      amount: number;
      date: string;
    }>;
  };
  kpis: {
    targetROI: number;
    maxPaybackPeriod: number;
    discountRate: number;
    riskLevel: "low" | "medium" | "high";
  };
  costTracking: {
    trackBy: "phase" | "category" | "resource";
    updateFrequency: "realtime" | "daily" | "weekly";
    autoSync1C: boolean;
  };
}

export function FinancialSettings({ open, onClose, onSave }: FinancialSettingsProps) {
  const [budgetCategories, setBudgetCategories] = useState([
    { category: "Персонал", amount: 2400000, percentage: 48 },
    { category: "Инфраструктура", amount: 1000000, percentage: 20 },
    { category: "Маркетинг", amount: 800000, percentage: 16 },
    { category: "Прочее", amount: 800000, percentage: 16 },
  ]);

  const [revenueSources, setRevenueSources] = useState([
    { name: "Подписка", amount: 3000000, date: "2025-12-01" },
    { name: "Единоразовые платежи", amount: 2500000, date: "2026-01-01" },
  ]);

  const [totalBudget, setTotalBudget] = useState(5000000);
  const [expectedRevenue, setExpectedRevenue] = useState(8500000);
  const [targetROI, setTargetROI] = useState(70);
  const [maxPaybackPeriod, setMaxPaybackPeriod] = useState(24);
  const [discountRate, setDiscountRate] = useState(10);

  const addBudgetCategory = () => {
    setBudgetCategories([
      ...budgetCategories,
      { category: "Новая категория", amount: 0, percentage: 0 },
    ]);
  };

  const removeBudgetCategory = (index: number) => {
    setBudgetCategories(budgetCategories.filter((_, i) => i !== index));
  };

  const updateBudgetCategory = (index: number, field: string, value: any) => {
    const updated = [...budgetCategories];
    updated[index] = { ...updated[index], [field]: value };
    
    if (field === 'amount') {
      const total = updated.reduce((sum, cat) => sum + cat.amount, 0);
      updated[index].percentage = total > 0 ? (value / total) * 100 : 0;
    }
    
    setBudgetCategories(updated);
  };

  const addRevenueSource = () => {
    setRevenueSources([
      ...revenueSources,
      { name: "Новый источник", amount: 0, date: "" },
    ]);
  };

  const removeRevenueSource = (index: number) => {
    setRevenueSources(revenueSources.filter((_, i) => i !== index));
  };

  const updateRevenueSource = (index: number, field: string, value: any) => {
    const updated = [...revenueSources];
    updated[index] = { ...updated[index], [field]: value };
    setRevenueSources(updated);
  };

  const handleSave = () => {
    const config: FinancialConfig = {
      budget: {
        total: totalBudget,
        currency: "RUB",
        allocation: budgetCategories,
      },
      revenue: {
        expectedTotal: expectedRevenue,
        sources: revenueSources,
      },
      kpis: {
        targetROI: targetROI,
        maxPaybackPeriod: maxPaybackPeriod,
        discountRate: discountRate,
        riskLevel: "medium",
      },
      costTracking: {
        trackBy: "category",
        updateFrequency: "realtime",
        autoSync1C: true,
      },
    };
    onSave(config);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Настройка финансовых параметров проекта</DialogTitle>
          <DialogDescription>
            Определите бюджет, ожидаемую выручку и ключевые финансовые показатели
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-auto">
          <Tabs defaultValue="budget" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="budget">
                <DollarSign className="h-4 w-4 mr-2" />
                Бюджет
              </TabsTrigger>
              <TabsTrigger value="revenue">
                <TrendingUp className="h-4 w-4 mr-2" />
                Выручка
              </TabsTrigger>
              <TabsTrigger value="kpis">
                <Calculator className="h-4 w-4 mr-2" />
                KPI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="budget" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Общий бюджет проекта</CardTitle>
                  <CardDescription>Определите общую сумму бюджета</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="total-budget">Общий бюджет (₽)</Label>
                      <Input
                        id="total-budget"
                        type="number"
                        value={totalBudget}
                        onChange={(e) => setTotalBudget(Number(e.target.value))}
                        placeholder="5000000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="currency">Валюта</Label>
                      <Select defaultValue="RUB">
                        <SelectTrigger id="currency">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="RUB">Рубли (₽)</SelectItem>
                          <SelectItem value="USD">Доллары ($)</SelectItem>
                          <SelectItem value="EUR">Евро (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Распределение бюджета</CardTitle>
                      <CardDescription>Распределите бюджет по категориям расходов</CardDescription>
                    </div>
                    <Button onClick={addBudgetCategory} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Добавить категорию
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {budgetCategories.map((category, index) => (
                      <div key={index} className="flex items-end gap-3 p-3 bg-neutral-50 rounded-lg">
                        <div className="flex-1">
                          <Label>Категория</Label>
                          <Input
                            value={category.category}
                            onChange={(e) => updateBudgetCategory(index, 'category', e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <Label>Сумма (₽)</Label>
                          <Input
                            type="number"
                            value={category.amount}
                            onChange={(e) => updateBudgetCategory(index, 'amount', Number(e.target.value))}
                          />
                        </div>
                        <div className="w-24">
                          <Label>%</Label>
                          <Input
                            type="number"
                            value={category.percentage.toFixed(1)}
                            readOnly
                            disabled
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBudgetCategory(index)}
                          disabled={budgetCategories.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-neutral-900">Итого распределено:</span>
                      <span className="text-neutral-900">
                        {budgetCategories.reduce((sum, cat) => sum + cat.amount, 0).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ожидаемая выручка</CardTitle>
                  <CardDescription>Прогнозируемая общая выручка от проекта</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="expected-revenue">Общая ожидаемая выручка (₽)</Label>
                    <Input
                      id="expected-revenue"
                      type="number"
                      value={expectedRevenue}
                      onChange={(e) => setExpectedRevenue(Number(e.target.value))}
                      placeholder="8500000"
                    />
                    <p className="text-neutral-500 mt-2">
                      Потенциальная прибыль: {(expectedRevenue - totalBudget).toLocaleString('ru-RU')} ₽
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Источники выручки</CardTitle>
                      <CardDescription>Укажите ожидаемые источники дохода</CardDescription>
                    </div>
                    <Button onClick={addRevenueSource} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Добавить источник
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {revenueSources.map((source, index) => (
                      <div key={index} className="flex items-end gap-3 p-3 bg-neutral-50 rounded-lg">
                        <div className="flex-1">
                          <Label>Название</Label>
                          <Input
                            value={source.name}
                            onChange={(e) => updateRevenueSource(index, 'name', e.target.value)}
                          />
                        </div>
                        <div className="flex-1">
                          <Label>Сумма (₽)</Label>
                          <Input
                            type="number"
                            value={source.amount}
                            onChange={(e) => updateRevenueSource(index, 'amount', Number(e.target.value))}
                          />
                        </div>
                        <div className="flex-1">
                          <Label>Ожидаемая дата</Label>
                          <Input
                            type="date"
                            value={source.date}
                            onChange={(e) => updateRevenueSource(index, 'date', e.target.value)}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeRevenueSource(index)}
                          disabled={revenueSources.length === 1}
                        >
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex justify-between">
                      <span className="text-neutral-900">Итого по источникам:</span>
                      <span className="text-neutral-900">
                        {revenueSources.reduce((sum, src) => sum + src.amount, 0).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kpis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Целевые финансовые показатели</CardTitle>
                  <CardDescription>Установите ключевые метрики эффективности проекта</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="target-roi">Целевой ROI (%)</Label>
                    <Input
                      id="target-roi"
                      type="number"
                      value={targetROI}
                      onChange={(e) => setTargetROI(Number(e.target.value))}
                      placeholder="70"
                    />
                    <p className="text-neutral-500 mt-1">Минимальная приемлемая окупаемость инвестиций</p>
                  </div>

                  <div>
                    <Label htmlFor="payback-period">Максимальный период окупаемости (месяцы)</Label>
                    <Input
                      id="payback-period"
                      type="number"
                      value={maxPaybackPeriod}
                      onChange={(e) => setMaxPaybackPeriod(Number(e.target.value))}
                      placeholder="24"
                    />
                    <p className="text-neutral-500 mt-1">Максимально допустимый срок возврата инвестиций</p>
                  </div>

                  <div>
                    <Label htmlFor="discount-rate">Ставка дисконтирования (%)</Label>
                    <Input
                      id="discount-rate"
                      type="number"
                      value={discountRate}
                      onChange={(e) => setDiscountRate(Number(e.target.value))}
                      placeholder="10"
                    />
                    <p className="text-neutral-500 mt-1">Используется для расчета NPV (чистой приведенной стоимости)</p>
                  </div>

                  <div>
                    <Label htmlFor="risk-level">Уровень риска проекта</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="risk-level">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Низкий - Стабильный проект с предсказуемыми затратами</SelectItem>
                        <SelectItem value="medium">Средний - Умеренные риски и неопределенность</SelectItem>
                        <SelectItem value="high">Высокий - Инновационный проект с высокой неопределенностью</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Учет затрат</CardTitle>
                  <CardDescription>Настройки отслеживания расходов</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="track-by">Отслеживать затраты по</Label>
                    <Select defaultValue="category">
                      <SelectTrigger id="track-by">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="phase">Фазам проекта</SelectItem>
                        <SelectItem value="category">Категориям расходов</SelectItem>
                        <SelectItem value="resource">Ресурсам (персонал, оборудование)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="update-frequency">Частота обновления данных</Label>
                    <Select defaultValue="realtime">
                      <SelectTrigger id="update-frequency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">В реальном времени</SelectItem>
                        <SelectItem value="daily">Ежедневно</SelectItem>
                        <SelectItem value="weekly">Еженедельно</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Прогнозные расчеты</CardTitle>
                  <CardDescription>На основе введенных данных</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between p-3 bg-neutral-50 rounded">
                    <span className="text-neutral-600">Ожидаемая прибыль:</span>
                    <span className="text-neutral-900">
                      {(expectedRevenue - totalBudget).toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-neutral-50 rounded">
                    <span className="text-neutral-600">Прогнозный ROI:</span>
                    <span className="text-green-600">
                      {totalBudget > 0 ? (((expectedRevenue - totalBudget) / totalBudget) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="flex justify-between p-3 bg-neutral-50 rounded">
                    <span className="text-neutral-600">Маржа прибыли:</span>
                    <span className="text-neutral-900">
                      {expectedRevenue > 0 ? (((expectedRevenue - totalBudget) / expectedRevenue) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Сохранить настройки
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
