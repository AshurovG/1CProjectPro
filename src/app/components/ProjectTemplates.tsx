import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Code2,
  Megaphone,
  Smartphone,
  Store,
  Rocket,
  Building2,
  Users,
  Search,
  Star,
  Clock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface ProjectTemplatesProps {
  open: boolean;
  onClose: () => void;
  onSelectTemplate: (template: ProjectTemplate) => void;
  onCreateNew: () => void;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: typeof Code2;
  category: string;
  methodology: "kanban" | "scrum" | "waterfall";
  estimatedDuration: string;
  teamSize: string;
  budget: {
    min: number;
    max: number;
  };
  tasks: Array<{
    title: string;
    description: string;
    status: string;
    priority: string;
  }>;
  milestones?: Array<{
    name: string;
    duration: string;
  }>;
  phases?: Array<{
    name: string;
    duration: string;
  }>;
  financialMetrics: {
    expectedROI: number;
    paybackPeriod: number;
    riskLevel: "low" | "medium" | "high";
  };
  popular?: boolean;
  recommended?: boolean;
}

const templates: ProjectTemplate[] = [
  {
    id: "web-development",
    name: "Разработка веб-платформы",
    description: "Полный цикл разработки веб-приложения с современным стеком технологий",
    icon: Code2,
    category: "Разработка",
    methodology: "scrum",
    estimatedDuration: "6 месяцев",
    teamSize: "6-10 человек",
    budget: {
      min: 3000000,
      max: 8000000,
    },
    financialMetrics: {
      expectedROI: 85,
      paybackPeriod: 18,
      riskLevel: "medium",
    },
    popular: true,
    tasks: [
      { title: "Анализ требований", description: "Сбор и документирование требований", status: "todo", priority: "high" },
      { title: "Проектирование архитектуры", description: "Разработка системной архитектуры", status: "todo", priority: "high" },
      { title: "Дизайн UI/UX", description: "Создание пользовательского интерфейса", status: "todo", priority: "medium" },
      { title: "Backend разработка", description: "Разработка серверной части", status: "todo", priority: "high" },
      { title: "Frontend разработка", description: "Разработка клиентской части", status: "todo", priority: "high" },
      { title: "Тестирование", description: "QA и тестирование функционала", status: "todo", priority: "medium" },
    ],
    milestones: [
      { name: "MVP готов", duration: "3 месяца" },
      { name: "Beta-версия", duration: "4.5 месяца" },
      { name: "Релиз", duration: "6 месяцев" },
    ],
  },
  {
    id: "marketing-campaign",
    name: "Маркетинговая кампания",
    description: "Комплексная маркетинговая стратегия для продвижения продукта",
    icon: Megaphone,
    category: "Маркетинг",
    methodology: "kanban",
    estimatedDuration: "3 месяца",
    teamSize: "4-6 человек",
    budget: {
      min: 1500000,
      max: 4000000,
    },
    financialMetrics: {
      expectedROI: 120,
      paybackPeriod: 9,
      riskLevel: "low",
    },
    recommended: true,
    tasks: [
      { title: "Исследование рынка", description: "Анализ целевой аудитории", status: "todo", priority: "high" },
      { title: "Разработка стратегии", description: "Создание маркетингового плана", status: "todo", priority: "high" },
      { title: "Контент-план", description: "Планирование контента", status: "todo", priority: "medium" },
      { title: "Запуск рекламы", description: "Настройка рекламных кампаний", status: "todo", priority: "high" },
      { title: "SMM продвижение", description: "Работа с социальными сетями", status: "todo", priority: "medium" },
      { title: "Аналитика результатов", description: "Отслеживание метрик", status: "todo", priority: "medium" },
    ],
  },
  {
    id: "mobile-app",
    name: "Мобильное приложение",
    description: "Разработка нативного мобильного приложения для iOS и Android",
    icon: Smartphone,
    category: "Разработка",
    methodology: "scrum",
    estimatedDuration: "8 месяцев",
    teamSize: "8-12 человек",
    budget: {
      min: 5000000,
      max: 12000000,
    },
    financialMetrics: {
      expectedROI: 95,
      paybackPeriod: 24,
      riskLevel: "high",
    },
    tasks: [
      { title: "Прототипирование", description: "Создание прототипа приложения", status: "todo", priority: "high" },
      { title: "UI/UX дизайн", description: "Дизайн мобильного интерфейса", status: "todo", priority: "high" },
      { title: "iOS разработка", description: "Разработка для iOS", status: "todo", priority: "high" },
      { title: "Android разработка", description: "Разработка для Android", status: "todo", priority: "high" },
      { title: "Backend API", description: "Разработка серверной части", status: "todo", priority: "high" },
      { title: "Публикация в Store", description: "Размещение в App Store и Google Play", status: "todo", priority: "medium" },
    ],
    milestones: [
      { name: "Прототип", duration: "2 месяца" },
      { name: "Beta iOS", duration: "5 месяцев" },
      { name: "Beta Android", duration: "6 месяцев" },
      { name: "Релиз", duration: "8 месяцев" },
    ],
  },
  {
    id: "ecommerce",
    name: "Интернет-магазин",
    description: "Создание полнофункционального интернет-магазина с интеграцие оплаты",
    icon: Store,
    category: "E-commerce",
    methodology: "waterfall",
    estimatedDuration: "5 месяцев",
    teamSize: "5-8 человек",
    budget: {
      min: 2500000,
      max: 6000000,
    },
    financialMetrics: {
      expectedROI: 110,
      paybackPeriod: 15,
      riskLevel: "medium",
    },
    popular: true,
    phases: [
      { name: "Планирование", duration: "3 недели" },
      { name: "Дизайн", duration: "4 недели" },
      { name: "Разработка", duration: "10 недель" },
      { name: "Тестирование", duration: "3 недели" },
      { name: "Запуск", duration: "1 неделя" },
    ],
    tasks: [
      { title: "Настройка каталога товаров", description: "Структура и категории", status: "todo", priority: "high" },
      { title: "Интеграция оплаты", description: "Подключение платежных систем", status: "todo", priority: "high" },
      { title: "Корзина и заказы", description: "Функционал оформления заказов", status: "todo", priority: "high" },
      { title: "Личный кабинет", description: "Функционал для пользователей", status: "todo", priority: "medium" },
      { title: "Интеграция доставки", description: "Подключение служб доставки", status: "todo", priority: "medium" },
      { title: "SEO оптимизация", description: "Настройка для поисковых систем", status: "todo", priority: "low" },
    ],
  },
  {
    id: "startup-mvp",
    name: "MVP для стартапа",
    description: "Быстрая разработка минимально жизнеспособного продукта",
    icon: Rocket,
    category: "Стартап",
    methodology: "scrum",
    estimatedDuration: "2 месяца",
    teamSize: "3-5 человек",
    budget: {
      min: 800000,
      max: 2000000,
    },
    financialMetrics: {
      expectedROI: 150,
      paybackPeriod: 12,
      riskLevel: "high",
    },
    recommended: true,
    tasks: [
      { title: "Определение core функций", description: "Выбор ключевого функционала", status: "todo", priority: "high" },
      { title: "Быстрое прототипирование", description: "Создание прототипа", status: "todo", priority: "high" },
      { title: "Базовый дизайн", description: "Минимальный UI", status: "todo", priority: "medium" },
      { title: "Разработка MVP", description: "Реализация основного функционала", status: "todo", priority: "high" },
      { title: "Тестирование с пользователями", description: "Сбор обратной связи", status: "todo", priority: "high" },
      { title: "Итерация и улучшения", description: "Доработка по фидбеку", status: "todo", priority: "medium" },
    ],
    milestones: [
      { name: "Прототип", duration: "2 недели" },
      { name: "MVP v1", duration: "6 недель" },
      { name: "MVP v2", duration: "8 недель" },
    ],
  },
  {
    id: "enterprise-integration",
    name: "Корпоративная система",
    description: "Интеграция с 1С и корпоративными системами",
    icon: Building2,
    category: "Корпоративное",
    methodology: "waterfall",
    estimatedDuration: "4 месяца",
    teamSize: "4-6 человек",
    budget: {
      min: 2000000,
      max: 5000000,
    },
    financialMetrics: {
      expectedROI: 75,
      paybackPeriod: 20,
      riskLevel: "low",
    },
    phases: [
      { name: "Анализ систем", duration: "3 недели" },
      { name: "Проектирование интеграции", duration: "4 недели" },
      { name: "Разработка коннекторов", duration: "8 недель" },
      { name: "Тестирование и отладка", duration: "3 недели" },
      { name: "Внедрение", duration: "2 недели" },
    ],
    tasks: [
      { title: "Анализ 1С конфигурации", description: "Изучение текущей конфигурации", status: "todo", priority: "high" },
      { title: "Разработка API", description: "Создание интеграционного API", status: "todo", priority: "high" },
      { title: "Синхронизация данных", description: "Настройка обмена данными", status: "todo", priority: "high" },
      { title: "Настр��йка безопасности", description: "Обеспечение защиты данных", status: "todo", priority: "high" },
      { title: "Документация", description: "Создание технической документации", status: "todo", priority: "medium" },
      { title: "Обучение сотрудников", description: "Проведение тренингов", status: "todo", priority: "medium" },
    ],
  },
  {
    id: "hr-management",
    name: "HR система",
    description: "Система управления персоналом и подбора кадров",
    icon: Users,
    category: "HR",
    methodology: "kanban",
    estimatedDuration: "4 месяца",
    teamSize: "5-7 человек",
    budget: {
      min: 1800000,
      max: 4500000,
    },
    financialMetrics: {
      expectedROI: 88,
      paybackPeriod: 16,
      riskLevel: "medium",
    },
    tasks: [
      { title: "База сотрудников", description: "Разработка базы данных персонала", status: "todo", priority: "high" },
      { title: "Рекрутинг модуль", description: "Функционал подбора персонала", status: "todo", priority: "high" },
      { title: "Учет рабочего времени", description: "Табель и отчеты", status: "todo", priority: "medium" },
      { title: "Оценка эффективности", description: "Система оценки сотрудников", status: "todo", priority: "medium" },
      { title: "Документооборот", description: "Управление HR документами", status: "todo", priority: "medium" },
      { title: "Интеграция с 1С ЗУП", description: "Связь с 1С:Зарплата", status: "todo", priority: "high" },
    ],
  },
];

export function ProjectTemplates({ open, onClose, onSelectTemplate, onCreateNew }: ProjectTemplatesProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", "Разработка", "Маркетинг", "E-commerce", "Стартап", "Корпоративное", "HR"];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatBudget = (min: number, max: number) => {
    const formatNum = (num: number) => {
      if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)} млн`;
      }
      return `${(num / 1000).toFixed(0)} тыс`;
    };
    return `${formatNum(min)} - ${formatNum(max)} ₽`;
  };

  const getRiskBadge = (level: string) => {
    const colors = {
      low: "bg-green-50 text-green-700 border-green-200",
      medium: "bg-orange-50 text-orange-700 border-orange-200",
      high: "bg-red-50 text-red-700 border-red-200",
    };
    const labels = {
      low: "Низкий риск",
      medium: "Средний риск",
      high: "Высокий риск",
    };
    return (
      <Badge className={colors[level as keyof typeof colors]}>
        {labels[level as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Создание нового проекта</DialogTitle>
          <DialogDescription>
            Выберите готовый шаблон с предустановленными задачами, бюджетом и финансовыми метриками
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-hidden flex-1">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Поиск шаблона..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Create New Project Button */}
          <Button variant="default" onClick={onCreateNew} className="w-full">
            Создать новый проект
          </Button>

          {/* Templates List */}
          <div className="flex-1 overflow-auto">
            <div className="space-y-3 pb-4">
              {filteredTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <Card
                    key={template.id}
                    className="hover:border-blue-300 transition-colors cursor-pointer"
                    onClick={() => onSelectTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-blue-600" />
                        </div>
                        
                        {/* Main Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <h4 className="text-neutral-900 mb-1">{template.name}</h4>
                              <p className="text-sm text-neutral-600">{template.description}</p>
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                              {template.popular && (
                                <Badge className="bg-orange-50 text-orange-700 border-orange-200">
                                  <Star className="h-3 w-3 mr-1" />
                                  Популярный
                                </Badge>
                              )}
                              {template.recommended && (
                                <Badge className="bg-purple-50 text-purple-700 border-purple-200">
                                  <Sparkles className="h-3 w-3 mr-1" />
                                  Рекомендуем
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Details Grid */}
                          <div className="grid grid-cols-3 gap-6 mt-3 pt-3 border-t">
                            <div className="text-sm">
                              <p className="text-neutral-500 text-xs mb-1">Период</p>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-neutral-400 flex-shrink-0" />
                                <span className="text-neutral-900">{template.estimatedDuration}</span>
                              </div>
                            </div>
                            <div className="text-sm">
                              <p className="text-neutral-500 text-xs mb-1">ROI</p>
                              <p className="text-green-600">+{template.financialMetrics.expectedROI}%</p>
                            </div>
                            <div className="text-sm">
                              <p className="text-neutral-500 text-xs mb-1">Окупаемость</p>
                              <p className="text-neutral-900">{template.financialMetrics.paybackPeriod} мес.</p>
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between mt-3 pt-3 border-t">
                            <div className="flex gap-2 flex-1">
                              <Badge variant="outline">
                                {template.methodology === "kanban" ? "Kanban" : 
                                 template.methodology === "scrum" ? "Scrum" : "Waterfall"}
                              </Badge>
                              <Badge variant="outline">{template.category}</Badge>
                            </div>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="ml-4 flex-shrink-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectTemplate(template);
                              }}
                            >
                              Выбрать
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-600">Шаблоны не найдены</p>
                <p className="text-neutral-500 mt-1">Попробуйте изменить критерии поиска</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}